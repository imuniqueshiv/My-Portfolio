
// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
    header.classList.add('scrolled');
    } else {
    header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
    icon.classList.remove('bi-list');
    icon.classList.add('bi-x');
    } else {
    icon.classList.remove('bi-x');
    icon.classList.add('bi-list');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = mobileBtn.querySelector('i');
    icon.classList.remove('bi-x');
    icon.classList.add('bi-list');
    });
});

// --- Smooth Typewriter Effect for Hero Name ---
const heroName = document.querySelector('.hero-name');
if (heroName) {
    const textToType = heroName.textContent.trim();
    heroName.textContent = ''; // Clear original text
    heroName.classList.add('typing-active');
    
    let charIndex = 0;
    function typeText() {
    if (charIndex < textToType.length) {
        heroName.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 120); // Slow, elegant typing speed
    } else {
        heroName.classList.remove('typing-active');
        heroName.classList.add('typing-done');
    }
    }
    // Start typing after initial CSS fade-in
    setTimeout(typeText, 800);
}

// --- Staggered Scroll Reveal Animations ---
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before it hits the bottom
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Unobserve after revealing to prevent refiring
    }
    });
}, observerOptions);

// Grab all elements we want to smoothly cascade in
const revealElements = document.querySelectorAll('.project-card, .skill-item, .cert-item, .about-content, .timeline-item, .footer .container');

revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    // Create a fluid, wave-like delay based on an item's order
    let delay = (index % 4) * 0.15; 
    el.style.transitionDelay = `${delay}s`;
    revealObserver.observe(el);
});

