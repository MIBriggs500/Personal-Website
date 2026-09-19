document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('animated-logo');
    const heroTarget = document.getElementById('hero-target');
    const navTarget = document.getElementById('nav-target');
    const navbar = document.getElementById('navbar');

    let bounds = {};

    function calculateBounds() {
        const currentScroll = window.scrollY;

        const heroRect = heroTarget.getBoundingClientRect();
        const navRect = navTarget.getBoundingClientRect();

        logo.style.transform = 'none';
        const logoRect = logo.getBoundingClientRect();

        bounds.startScale = 1;

        // Final logo height in the nav bar
        const targetHeight = 28;
        bounds.endScale = targetHeight / logoRect.height;
        if (bounds.endScale > 1) bounds.endScale = 1;

        const heroAbsoluteTop = heroRect.top + currentScroll;
        bounds.startX = heroRect.left + (heroRect.width - logoRect.width) / 2;
        bounds.startY = heroAbsoluteTop + (heroRect.height - logoRect.height) / 2;

        bounds.endX = navRect.left;
        bounds.endY = navRect.top + (navRect.height - (logoRect.height * bounds.endScale)) / 2;

        updateLogoPosition();
    }

    function updateLogoPosition() {
        const scrollY = window.scrollY;
        const maxScroll = 400; // Animation completes after 400px of scroll

        let progress = Math.min(scrollY / maxScroll, 1);

        // Ease-in-out function for a smoother, organic feel
        const easeProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Calculate the current Y relative to the viewport
        const currentViewportStartY = bounds.startY - scrollY;

        const currentX = bounds.startX + (bounds.endX - bounds.startX) * easeProgress;
        const currentY = currentViewportStartY + (bounds.endY - currentViewportStartY) * easeProgress;
        const currentScale = bounds.startScale + (bounds.endScale - bounds.startScale) * easeProgress;

        logo.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;

        // Add dynamic styling to navbar background
        if (progress > 0.1) {
            navbar.style.background = `rgba(3, 0, 20, ${0.4 + (0.4 * progress)})`;
            navbar.style.backdropFilter = `blur(${12 * progress}px)`;
            navbar.style.webkitBackdropFilter = `blur(${12 * progress}px)`;
            navbar.style.borderBottom = `1px solid rgba(255, 255, 255, ${0.1 * progress})`;
        } else {
            navbar.style.background = `transparent`;
            navbar.style.backdropFilter = `blur(0px)`;
            navbar.style.webkitBackdropFilter = `blur(0px)`;
            navbar.style.borderBottom = `1px solid transparent`;
        }
    }

    window.addEventListener('resize', calculateBounds);
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateLogoPosition);
    });

    document.fonts.ready.then(() => {
        calculateBounds();
    });
});
