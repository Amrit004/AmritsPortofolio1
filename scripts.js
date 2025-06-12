// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
  }

  // Initialize animations
  initAnimations();
});

async function handleSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');
  
  // Save original button content
  const originalBtnContent = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  try {
    const formData = new FormData(this);
    const response = await fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      formStatus.innerHTML = '<p class="success"><i class="fas fa-check-circle"></i> Thanks for your message! I\'ll get back to you soon.</p>';
      this.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.innerHTML = '';
      }, 5000);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
    formStatus.innerHTML = '<p class="error"><i class="fas fa-exclamation-circle"></i> Oops! There was a problem sending your message. Please try again later or email me directly.</p>';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update URL without page jump
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });
});

// Initialize animations
function initAnimations() {
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.card, .section-title, .about-content');
  
  // Set initial state
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // For project cards, add staggered delay
        if (entry.target.classList.contains('card')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe all animateable elements
 animateElements.forEach(el => observer.observe(el));

}