/* ═══════════════════════════════════════════
   MAIN.JS — Portfolio Entry Point
   Initializes all sections + GSAP animations
═══════════════════════════════════════════ */

import { initNeuralCanvas } from './canvas/neural-bg.js';
import { initHero } from './sections/hero.js';
import { initProjects } from './sections/projects.js';
import { initBlogs } from './sections/blogs.js';
import { initStats } from './sections/stats.js';
import { initChatbot } from './sections/chatbot.js';

// ── Wait for GSAP + Three.js CDNs to load
window.addEventListener('load', () => {
    initAll();
});

function initAll() {
    // Init sections
    initNeuralCanvas();
    initHero();
    initProjects();
    initBlogs();
    initStats();
    initChatbot();

    // Init GSAP animations
    initGSAP();

    // Navigation
    initNav();
}

/* ─── GSAP Scroll Animations ──────────────────── */
function initGSAP() {
    if (typeof gsap === 'undefined') {
        // Fallback: just show everything
        document.querySelectorAll('.reveal, .fade-up').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero fade-up elements (staggered)
    gsap.utils.toArray('.hero-content .fade-up').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            delay: 0.2 + i * 0.15,
        });
    });

    // Section reveal elements
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
            },
        });
    });

    // Section headers — slide in from left
    gsap.utils.toArray('.section-header').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -30 },
            {
                opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            }
        );
    });

    // Timeline cards — alternating left/right
    gsap.utils.toArray('.timeline-item').forEach(item => {
        const side = item.dataset.side;
        gsap.fromTo(item,
            { opacity: 0, x: side === 'right' ? 60 : -60 },
            {
                opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: item, start: 'top 85%', once: true },
            }
        );
    });

    // Nav progress bar
    gsap.to('.scroll-line', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { scrub: 0.3 },
    });
}

/* ─── Navigation ──────────────────────────────── */
function initNav() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section[id]');

    // Scrolled class
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        updateActiveLink();
    }, { passive: true });

    // Active section highlight
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    // Smooth scroll on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile nav
                navLinksContainer?.classList.remove('open');
            }
        });
    });

    // Mobile hamburger toggle
    navToggle?.addEventListener('click', () => {
        navLinksContainer?.classList.toggle('open');
    });
}
