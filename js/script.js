// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initScrollSpy();
    initSmoothScroll();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active navigation link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu when link is clicked
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling functionality
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll spy functionality for active navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set initial active link
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .doctor-card, .testimonial-card, .stat, .feature, .about-text, .contact-item, .treatment-item, .treatment-category'
    );

    elementsToAnimate.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Counter animation for stats
    animateCounters();
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = counter.textContent;
                const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''));
                
                if (!isNaN(numericValue)) {
                    animateCounter(counter, numericValue, targetValue);
                    counterObserver.unobserve(counter);
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target, originalText) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Preserve the original format (e.g., "10,000+", "25+", "98%")
        const suffix = originalText.replace(/[0-9,]/g, '');
        const formattedNumber = Math.floor(current).toLocaleString();
        element.textContent = formattedNumber + suffix;
    }, stepTime);
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('appointment-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateForm(formData);
    
    // Clear previous errors
    clearFormErrors(form);
    
    if (errors.length === 0) {
        // Form is valid, simulate submission
        submitForm(formData);
    } else {
        // Display errors
        displayFormErrors(form, errors);
    }
}

function validateForm(formData) {
    const errors = [];
    
    // Name validation
    const name = formData.get('name');
    if (!name || name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Please enter a valid name (at least 2 characters)' });
    }
    
    // Email validation
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    // Phone validation
    const phone = formData.get('phone');
    const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,}$/;
    if (!phone || !phoneRegex.test(phone)) {
        errors.push({ field: 'phone', message: 'Please enter a valid phone number (at least 10 digits)' });
    }
    
    // Treatment validation
    const service = formData.get('service');
    if (!service) {
        errors.push({ field: 'service', message: 'Please select a treatment' });
    }
    
    // Message validation
    const message = formData.get('message');
    if (!message || message.trim().length < 10) {
        errors.push({ field: 'message', message: 'Please provide a brief description (at least 10 characters)' });
    }
    
    return errors;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    let isValid = true;
    let message = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters long';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            break;
            
        case 'service':
            if (!value) {
                isValid = false;
                message = 'Please select a treatment';
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        displayFieldError(field, message);
    }
    
    return isValid;
}

function clearErrors(e) {
    const field = e.target;
    clearFieldError(field);
}

function displayFormErrors(form, errors) {
    errors.forEach(error => {
        const field = form.querySelector(`[name="${error.field}"]`);
        if (field) {
            displayFieldError(field, error.message);
        }
    });
    
    // Scroll to first error
    if (errors.length > 0) {
        const firstErrorField = form.querySelector(`[name="${errors[0].field}"]`);
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
    }
}

function displayFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#e76f51';
    field.style.boxShadow = '0 0 0 3px rgba(231, 111, 81, 0.1)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
        color: #e76f51;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearFormErrors(form) {
    const errors = form.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    });
}

function submitForm(formData) {
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('appointment-form').reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
    }, 2000);
}

function showSuccessMessage() {
    // Create success message overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    messageBox.innerHTML = `
        <div style="color: #2d8f47; font-size: 4rem; margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="color: #264653; margin-bottom: 1rem;">Appointment Request Sent!</h3>
        <p style="color: #6c757d; margin-bottom: 1.5rem; line-height: 1.6;">
            Thank you for contacting us. We'll get back to you within 24 hours to confirm your appointment.
        </p>
        <button onclick="closeSuccessMessage()" style="
            background: linear-gradient(135deg, #2d8f47, #52b788);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
        " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            Close
        </button>
    `;
    
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
    
    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        messageBox.style.transform = 'scale(1)';
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            closeSuccessMessage();
        }
    }, 5000);
    
    // Make close function globally available
    window.closeSuccessMessage = function() {
        overlay.style.opacity = '0';
        messageBox.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    };
}

// Utility functions for enhanced user experience
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images when page loads
function preloadImages() {
    const images = [
        'images/ayurveda-hero.jpg',
        'images/doctor1.jpg',
        'images/doctor2.jpg',
        'images/doctor3.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload function
preloadImages();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close success message
        if (window.closeSuccessMessage) {
            window.closeSuccessMessage();
        }
    }
});