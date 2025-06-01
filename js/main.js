// Import modules
import { initChat } from './chat.js';
import { initDarkMode } from './darkMode.js';

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the chat functionality
  initChat();
  
  // Initialize dark mode
  initDarkMode();
  
  // Smooth scrolling for navigation links
  setupSmoothScrolling();
  
  // Add animations to elements as they come into view
  setupScrollAnimations();
  
  // Form handling
  setupFormHandling();
  
  // Header scroll effect
  setupHeaderScroll();
});

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a, .hero-buttons a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add animations to elements as they enter the viewport
function setupScrollAnimations() {
  const animateElements = document.querySelectorAll(
    '.hero-content, .section-title, .project-card, .about-content, .contact-container, .skill-tags'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-fade-up', 'visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(element => {
    element.classList.add('scroll-fade-up');
    observer.observe(element);
  });
}

// Setup form handling with improved validation and feedback
function setupFormHandling() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Add validation styles on blur
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateInput(input);
      });
      
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          validateInput(input);
        }
      });
    });
    
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all inputs
      let isValid = true;
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) return;
      
      // Show loading state
      submitButton.classList.add('loading');
      submitButton.disabled = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
        // Remove validation styles
        inputs.forEach(input => {
          input.classList.remove('valid');
        });
      } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
      } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
      }
    });
  }
}

// Validate individual form inputs
function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;
  
  // Remove existing validation styles
  input.classList.remove('valid', 'invalid');
  
  if (!value) {
    input.classList.add('invalid');
    isValid = false;
  } else if (input.type === 'email' && !isValidEmail(value)) {
    input.classList.add('invalid');
    isValid = false;
  } else {
    input.classList.add('valid');
  }
  
  return isValid;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show notification message
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });
  
  // Remove notification after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Setup header scroll effect
function setupHeaderScroll() {
  const header = document.querySelector('header');
  const scrollThreshold = 50;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}