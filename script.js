// Contact Form Validation and Submission Handler
class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.submitButton = this.form.querySelector('.submit-button');
        this.statusElement = document.getElementById('form-status');
        
        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s'-]+$/,
                messages: {
                    required: 'Name is required',
                    minLength: 'Name must be at least 2 characters long',
                    pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes'
                }
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                messages: {
                    required: 'Email is required',
                    pattern: 'Please enter a valid email address'
                }
            },
            company: {
                required: false,
                minLength: 2,
                messages: {
                    minLength: 'Company name must be at least 2 characters long if provided'
                }
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                messages: {
                    required: 'Message is required',
                    minLength: 'Message must be at least 10 characters long',
                    maxLength: 'Message must be less than 1000 characters'
                }
            }
        };
        
        this.init();
    }
    
    init() {
        // Add form submit event listener
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Add real-time validation on input and blur events
        this.form.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
        
        // Add focus management for accessibility
        this.form.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => this.handleFocus(input));
            input.addEventListener('blur', () => this.handleBlur(input));
        });
    }
    
    handleFocus(input) {
        input.parentElement.classList.add('focused');
    }
    
    handleBlur(input) {
        input.parentElement.classList.remove('focused');
    }
    
    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const rules = this.validationRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        // Clear previous error state
        input.classList.remove('error');
        errorElement.textContent = '';
        
        // Skip validation if field is not required and empty
        if (!rules.required && value === '') {
            return true;
        }
        
        // Required validation
        if (rules.required && value === '') {
            this.showFieldError(input, errorElement, rules.messages.required);
            return false;
        }
        
        // Skip further validation if field is empty and not required
        if (value === '') {
            return true;
        }
        
        // Minimum length validation
        if (rules.minLength && value.length < rules.minLength) {
            this.showFieldError(input, errorElement, rules.messages.minLength);
            return false;
        }
        
        // Maximum length validation
        if (rules.maxLength && value.length > rules.maxLength) {
            this.showFieldError(input, errorElement, rules.messages.maxLength);
            return false;
        }
        
        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(input, errorElement, rules.messages.pattern);
            return false;
        }
        
        return true;
    }
    
    showFieldError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        
        // Announce error to screen readers
        errorElement.setAttribute('aria-live', 'assertive');
        setTimeout(() => {
            errorElement.setAttribute('aria-live', 'polite');
        }, 1000);
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('.form-input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            this.showStatus('Please correct the errors below and try again.', 'error');
            this.focusFirstError();
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        this.showStatus('Sending your message...', 'loading');
        
        try {
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission (in production, this would be a real API call)
            const response = await this.submitForm(data);
            
            if (response.success) {
                this.showStatus('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.resetForm();
            } else {
                this.showStatus(response.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showStatus('An error occurred. Please try again later.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async submitForm(data) {
        // Simulate API call with delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate success (90% success rate for demo)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: 'Server error occurred' });
                }
            }, 1500);
        });
        
        // In production, you would use something like:
        // const response = await fetch('https://formspree.io/f/your-form-id', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // });
        // return response.ok ? { success: true } : { success: false, message: 'Submission failed' };
    }
    
    setLoadingState(isLoading) {
        this.submitButton.disabled = isLoading;
        this.submitButton.textContent = isLoading ? 'Sending...' : 'Send Message';
    }
    
    showStatus(message, type) {
        this.statusElement.textContent = message;
        this.statusElement.className = `form-status ${type}`;
        
        // Announce status change to screen readers
        this.statusElement.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    }
    
    focusFirstError() {
        const firstErrorInput = this.form.querySelector('.form-input.error');
        if (firstErrorInput) {
            firstErrorInput.focus();
        }
    }
    
    resetForm() {
        this.form.reset();
        this.form.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error');
        });
        this.form.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    }
}

// Initialize the contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new ContactForm('contactForm');
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
});