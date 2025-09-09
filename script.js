// Page Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Contact Function
function scrollToContact() {
    const contactSection = document.querySelector('#kontakt');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Testimonial Banner Functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonialBanner = document.getElementById('testimonialBanner');
    const bannerContainer = document.querySelector('.testimonial-banner-container');
    
    if (testimonialBanner && bannerContainer) {
        // Add keyboard accessibility
        bannerContainer.setAttribute('tabindex', '0');
        bannerContainer.setAttribute('role', 'region');
        bannerContainer.setAttribute('aria-label', 'Customer testimonials - hover to pause scrolling');
        
        // Keyboard controls for accessibility
        bannerContainer.addEventListener('keydown', function(e) {
            if (e.key === 'Space' || e.key === 'Enter') {
                e.preventDefault();
                // Toggle animation pause
                const currentState = testimonialBanner.style.animationPlayState;
                testimonialBanner.style.animationPlayState = 
                    currentState === 'paused' ? 'running' : 'paused';
            }
        });
        
        // Enhanced hover functionality with smooth transitions
        let hoverTimeout;
        
        bannerContainer.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            testimonialBanner.style.animationPlayState = 'paused';
        });
        
        bannerContainer.addEventListener('mouseleave', function() {
            // Small delay before resuming to prevent flickering
            hoverTimeout = setTimeout(() => {
                testimonialBanner.style.animationPlayState = 'running';
            }, 100);
        });
        
        // Focus management for accessibility
        bannerContainer.addEventListener('focus', function() {
            testimonialBanner.style.animationPlayState = 'paused';
        });
        
        bannerContainer.addEventListener('blur', function() {
            testimonialBanner.style.animationPlayState = 'running';
        });
        
        // Intersection Observer for performance optimization
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    testimonialBanner.style.animationPlayState = 'running';
                } else {
                    testimonialBanner.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(bannerContainer);
    }
});

// Contact Form Handling
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        alert('Udfyld venligst alle påkrævede felter.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Indtast venligst en gyldig email adresse.');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Sender...</span>';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Tak for din besked! Vi vender tilbage til dig snarest.');
        form.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Active Navigation Link Based on Scroll Position
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.testimonial-card, .contact-card, .about-photo');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        showSlide(0);
    }
});