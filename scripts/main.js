// --- Navigation, scroll effects & reveal animations ---
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('siteHeader');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('navLinks');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function setMenu(open) {
        navLinks.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
    }

    // Toggle mobile navigation menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            setMenu(!navLinks.classList.contains('active'));
        });
    }

    // Close mobile menu when clicking a link or pressing Escape
    navAnchors.forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            setMenu(false);
            navToggle.focus();
        }
    });

    // Header gets a subtle shadow once the page is scrolled
    function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Highlight the nav link for the section currently in view
    const sections = document.querySelectorAll('main section[id]');
    if ('IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navAnchors.forEach(a => {
                    const active = a.getAttribute('href') === `#${entry.target.id}`;
                    a.classList.toggle('active', active);
                    if (active) a.setAttribute('aria-current', 'true');
                    else a.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(section => navObserver.observe(section));

        // Fade sections in as they scroll into view
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    // Keep the footer year current
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
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

    // Only allow relative paths and http(s) links in data-driven buttons
    function safeHref(href) {
        return /^(https?:\/\/|[\w./#-]+$)/i.test(href) ? href : '#';
    }

    function renderLinks(links) {
        if (!Array.isArray(links) || !links.length) return '';
        const buttons = links.map(l =>
            `<a class="btn btn-primary" href="${escapeHtml(safeHref(l.href))}">${escapeHtml(l.label)} &rarr;</a>`
        ).join('');
        return `<div class="overlay-actions">${buttons}</div>`;
    }

    function openOverlay(html) {
        if (!overlay.classList.contains('open')) {
            lastFocused = document.activeElement;
        }
        overlayContent.innerHTML = html;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        overlay.scrollTop = 0;
        overlayClose.focus();
    }

    function closeOverlay() {
        if (!overlay.classList.contains('open')) return;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocused && lastFocused.focus) lastFocused.focus();
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
            ${renderLinks(p.links)}
        `);
    }

    function renderAllProjects() {
        const order = (typeof projectOrder !== 'undefined') ? projectOrder : Object.keys(projectsData || {});
        const cards = order.filter(id => projectsData[id]).map(id => {
            const p = projectsData[id];
            return `<article class="card">
                <div class="card-content">
                    <span class="card-tag">${escapeHtml(p.tag)}</span>
                    <h3>${escapeHtml(p.title)}</h3>
                    ${p.summary ? `<p>${escapeHtml(p.summary)}</p>` : ''}
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
            <time class="post-date"${post.iso ? ` datetime="${escapeHtml(post.iso)}"` : ''}>${escapeHtml(post.date)}</time>
            <h2 id="overlayTitle">${escapeHtml(post.title)}</h2>
            ${post.body}
        `);
    }

    function renderAllPosts() {
        const order = (typeof blogOrder !== 'undefined') ? blogOrder : Object.keys(blogData || {});
        const cards = order.filter(slug => blogData[slug]).map(slug => {
            const post = blogData[slug];
            return `<article class="card blog-card">
                <div class="card-content">
                    <time class="post-date"${post.iso ? ` datetime="${escapeHtml(post.iso)}"` : ''}>${escapeHtml(post.date)}</time>
                    <h3><a href="#blog/${slug}">${escapeHtml(post.title)}</a></h3>
                    ${post.summary ? `<p>${escapeHtml(post.summary)}</p>` : ''}
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
        if (!overlay.classList.contains('open')) return;

        if (e.key === 'Escape') {
            overlayClose.click();
            return;
        }

        // Keep keyboard focus inside the dialog while it is open
        if (e.key === 'Tab') {
            const focusable = overlay.querySelectorAll('a[href], button:not([disabled])');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
});
