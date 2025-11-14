// Auth Page Smooth Transitions (Login <-> Signup Flip Effect)

document.addEventListener('DOMContentLoaded', function() {
  // Only run on auth pages
  if (!document.querySelector('.auth-page-wrapper')) return;

  // Get all navigation links within auth pages
  const authLinks = document.querySelectorAll('.auth-nav-link');
  
  authLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Check if it's a login/signup link (not external like /listings)
      if (href === '/login' || href === '/signup') {
        e.preventDefault();
        
        // Add exit animation
        const wrapper = document.querySelector('.auth-page-wrapper');
        const container = document.querySelector('.auth-split-container');
        const leftPanel = document.querySelector('.auth-left-panel');
        const rightPanel = document.querySelector('.auth-right-panel');
        
        // Current page detection
        const isOnLogin = window.location.pathname === '/login';
        const isGoingToSignup = href === '/signup';
        
        // Add exit class
        wrapper.style.animation = 'fadeOut 0.4s ease-out forwards';
        
        // Flip animation based on direction
        if (isGoingToSignup) {
          // Login -> Signup: Blue goes left to right, Form goes right to left
          leftPanel.style.animation = 'slideOutRight 0.5s ease-out forwards';
          rightPanel.style.animation = 'slideOutLeft 0.5s ease-out forwards';
        } else {
          // Signup -> Login: Form goes left to right, Blue goes right to left
          leftPanel.style.animation = 'slideOutLeft 0.5s ease-out forwards';
          rightPanel.style.animation = 'slideOutRight 0.5s ease-out forwards';
        }
        
        // Navigate after animation
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
});
