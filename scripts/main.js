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

// Easter Egg to bring up search box if clicked
//html reference is "EasterEgg"
// If clicks MARS bring up easter egg box
document.addEventListener('DOMContentLoaded', () => {
    const EasterEgg = document.getElementById('EasterEgg');
    const EasterEggBox = document.getElementById('EasterEggBox');

    EasterEgg.addEventListener('click', () => {
        EasterEggBox.style.display = 'flex';
    });
});

// Secret code logic
//codes: music, cat
