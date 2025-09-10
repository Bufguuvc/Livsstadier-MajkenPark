// Page Loader
window.addEventListener('load', function() {
    console.log('Page loaded successfully');
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
const body = document.body;

console.log('Navigation elements found:', { navToggle: !!navToggle, navMenu: !!navMenu });

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        console.log('Mobile menu toggle clicked');
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing navigation');
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            console.log('Navigation link clicked:', this.getAttribute('href'));
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                console.log('Scrolling to target:', targetId);
                // Update active navigation state immediately
                updateActiveNavLink(targetId);
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Function to update active navigation link
    function updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
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
    
    // Update active navigation link based on scroll position
    let current = 'hero'; // Default to hero section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    // Update active state for navigation links
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
