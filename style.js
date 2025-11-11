// Optimized Portfolio JavaScript - Under 150 Lines

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Effects (Navbar + Active Links)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;

    // Navbar background
    navbar.style.background = scrollY > 50 ? 'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = scrollY > 50 ? '0 2px 20px rgba(0, 0, 0, 0.3)' : 'none';

    // Active navigation
    const sections = ['home', 'about', 'projects', 'contact'];
    let current = 'home';

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop - 270) {
            current = section;
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    // Back to top button
    const backBtn = document.querySelector('.back-to-top');
    if (backBtn) {
        backBtn.style.opacity = scrollY > 300 ? '1' : '0';
        backBtn.style.visibility = scrollY > 300 ? 'visible' : 'hidden';
    }
});

// Contact Form
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const errors = {};

    // Simple validation
    if (!data.get('name').trim()) errors.name = 'Name required';
    if (!data.get('email').trim() || !data.get('email').includes('@')) errors.email = 'Valid email required';
    if (!data.get('message').trim()) errors.message = 'Message required';

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach(field => {
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl) errorEl.textContent = errors[field];
        });
        return;
    }

    // Submit simulation
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        setTimeout(() => formStatus.style.display = 'none', 5000);
    }, 2000);
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
        } else {
            target.style.opacity = '0';
            target.style.transform = 'translateY(30px)';
        }
    });
}, { threshold: 0.1 });

// Initialize animations and back to top
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements
    document.querySelectorAll('.project-card, .about-text, .about-skills, .contact-info, .contact-form-container, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Create back to top button
    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backBtn.className = 'back-to-top';
    backBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        border: none; border-radius: 50%; color: white; font-size: 1.2rem;
        cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 1000;
    `;
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(backBtn);
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
});

// Always start at top on refresh
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 0), 100));
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

console.log('🚀 Portfolio loaded! Contact: sharimsheikh55@gmail.com | Phone: 03154572663');