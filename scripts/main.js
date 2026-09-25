document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle Mobile Navigation Menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});

// --- Project / Blog Detail Overlay Router ---
// Renders project & blog "pages" inside index.html via #project/<id> and
// #blog/<slug> hash routes, instead of separate HTML files.
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('detailOverlay');
    const overlayContent = document.getElementById('overlayContent');
    const overlayClose = document.getElementById('overlayClose');
    let lastFocused = null;

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function openOverlay(html) {
        overlayContent.innerHTML = html;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lastFocused = document.activeElement;
        overlayClose.focus();
    }

    function closeOverlay() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }

    function renderProject(id) {
        const p = (typeof projectsData !== 'undefined') ? projectsData[id] : null;
        if (!p) {
            openOverlay(`<p><a href="#project/all">&larr; Back to all projects</a></p><h2 id="overlayTitle">Project not found</h2>`);
            return;
        }
        openOverlay(`
            <p><a href="#project/all">&larr; Back to all projects</a></p>
            <span class="card-tag">${escapeHtml(p.tag)}</span>
            <h2 id="overlayTitle">${escapeHtml(p.title)}</h2>
            ${p.body}
        `);
    }

    function renderAllProjects() {
        const order = (typeof projectOrder !== 'undefined') ? projectOrder : Object.keys(projectsData || {});
        const cards = order.map(id => {
            const p = projectsData[id];
            return `<article class="card">
                <div class="card-content">
                    <span class="card-tag">${escapeHtml(p.tag)}</span>
                    <h3>${escapeHtml(p.title)}</h3>
                    <a href="#project/${id}" class="card-link">View Project &rarr;</a>
                </div>
            </article>`;
        }).join('');
        openOverlay(`<h2 id="overlayTitle">All Projects</h2><div class="card-grid overlay-grid">${cards}</div>`);
    }

    function renderPost(slug) {
        const post = (typeof blogData !== 'undefined') ? blogData[slug] : null;
        if (!post) {
            openOverlay(`<p><a href="#blog/all">&larr; Back to all posts</a></p><h2 id="overlayTitle">Post not found</h2>`);
            return;
        }
        openOverlay(`
            <p><a href="#blog/all">&larr; Back to all posts</a></p>
            <time class="post-date">${escapeHtml(post.date)}</time>
            <h2 id="overlayTitle">${escapeHtml(post.title)}</h2>
            ${post.body}
        `);
    }

    function renderAllPosts() {
        const order = (typeof blogOrder !== 'undefined') ? blogOrder : Object.keys(blogData || {});
        const cards = order.map(slug => {
            const post = blogData[slug];
            return `<article class="card blog-card">
                <div class="card-content">
                    <time datetime="" class="post-date">${escapeHtml(post.date)}</time>
                    <h3><a href="#blog/${slug}">${escapeHtml(post.title)}</a></h3>
                    <a href="#blog/${slug}" class="card-link">Read Post &rarr;</a>
                </div>
            </article>`;
        }).join('');
        openOverlay(`<h2 id="overlayTitle">All Posts</h2><div class="card-grid overlay-grid">${cards}</div>`);
    }

    function route() {
        const hash = window.location.hash.slice(1); // e.g. "project/robert"
        if (!hash || (!hash.startsWith('project/') && !hash.startsWith('blog/'))) {
            closeOverlay();
            return;
        }
        const [type, id] = hash.split('/');
        if (type === 'project') {
            id === 'all' ? renderAllProjects() : renderProject(id);
        } else if (type === 'blog') {
            id === 'all' ? renderAllPosts() : renderPost(id);
        }
    }

    window.addEventListener('hashchange', route);
    route(); // handle direct link / refresh on a detail hash

    overlayClose.addEventListener('click', () => {
        history.pushState('', document.title, window.location.pathname + window.location.search);
        closeOverlay();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlayClose.click();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) overlayClose.click();
    });
});