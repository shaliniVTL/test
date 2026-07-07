/* ==========================================================================
   PORTFOLIO WEBSITE INTERACTIONS & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initTypingEffect();
  initSkillsTabs();
  initProjectsFilter();
  initContactForm();
  initScrollAnimations();
});

/* ==========================================================================
   NAVIGATION LOGIC
   ========================================================================== */
function initNavigation() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  // Toggle Menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
      // Toggle burger icon to X icon
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('show-menu')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Remove Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      const icon = navToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });

  // Scroll Header Shadow & Scroll To Top Visibility
  window.addEventListener('scroll', () => {
    // Header shadow
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }

    // Scroll to Top button
    if (window.scrollY >= 560) {
      scrollToTopBtn.classList.add('show-scroll');
    } else {
      scrollToTopBtn.classList.remove('show-scroll');
    }

    // Active Link Highlighting
    highlightActiveLink();
  });

  // Highlight Nav Link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active-link');
        } else {
          link.classList.remove('active-link');
        }
      }
    });
  }
}

/* ==========================================================================
   THEME TOGGLER LOGIC (LIGHT / DARK MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleDesktop = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  const darkThemeClass = 'light-mode'; // Using light-mode class to toggle (default is dark)
  const iconDark = 'fa-moon';
  const iconLight = 'fa-sun';

  // Read saved theme
  const selectedTheme = localStorage.getItem('selected-theme');
  
  // Set initial icon and theme state
  if (selectedTheme === 'light') {
    document.body.classList.add(darkThemeClass);
    setThemeIcon(iconLight);
  } else {
    document.body.classList.remove(darkThemeClass);
    setThemeIcon(iconDark);
  }

  // Event Listeners
  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    document.body.classList.toggle(darkThemeClass);
    
    const isLight = document.body.classList.contains(darkThemeClass);
    localStorage.setItem('selected-theme', isLight ? 'light' : 'dark');
    setThemeIcon(isLight ? iconLight : iconDark);
  }

  function setThemeIcon(iconClass) {
    const iconDesktop = themeToggleDesktop ? themeToggleDesktop.querySelector('i') : null;
    const iconMobile = themeToggleMobile ? themeToggleMobile.querySelector('i') : null;
    
    if (iconDesktop) {
      iconDesktop.className = `fa-solid ${iconClass}`;
    }
    if (iconMobile) {
      iconMobile.className = `fa-solid ${iconClass}`;
    }
  }
}

/* ==========================================================================
   TYPING EFFECT ANIMATION
   ========================================================================== */
function initTypingEffect() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  const words = ["creative web apps", "modern interfaces", "intuitive designs", "clean codebases"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing loop
  setTimeout(type, 1000);
}

/* ==========================================================================
   SKILLS TABS LOGIC
   ========================================================================== */
function initSkillsTabs() {
  const tabs = document.querySelectorAll('.skills-tab-btn');
  const contents = document.querySelectorAll('.skills-group');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update active tab button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active skills content group
      contents.forEach(content => {
        if (content.id === target) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECTS FILTER LOGIC
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      projectCards.forEach(card => {
        // First hide everything using transitions
        card.classList.add('fade-out');
        card.classList.remove('fade-in');

        setTimeout(() => {
          if (filterVal === 'all' || card.dataset.category === filterVal) {
            card.classList.remove('fade-out');
            card.classList.add('fade-in');
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }, 300); // matches the transition time in style.css
      });
    });
  });
}

/* ==========================================================================
   CONTACT FORM VALIDATION & SIMULATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.loading-spinner');
  const formFeedback = document.getElementById('form-feedback');

  const fields = [
    { id: 'name', errorId: 'name-error', validate: val => val.trim().length > 0 },
    { id: 'email', errorId: 'email-error', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { id: 'subject', errorId: 'subject-error', validate: val => val.trim().length > 0 },
    { id: 'message', errorId: 'message-error', validate: val => val.trim().length > 0 }
  ];

  // Helper to validate a single field
  function validateField(field) {
    const input = document.getElementById(field.id);
    const isValid = field.validate(input.value);
    const parent = input.parentElement;

    if (isValid) {
      parent.classList.remove('invalid');
    } else {
      parent.classList.add('invalid');
    }

    return isValid;
  }

  // Real-time validation on input/blur
  fields.forEach(field => {
    const input = document.getElementById(field.id);
    
    input.addEventListener('input', () => {
      // If previously invalid, revalidate on input to remove error early
      if (input.parentElement.classList.contains('invalid')) {
        validateField(field);
      }
    });

    input.addEventListener('blur', () => {
      validateField(field);
    });
  });

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let formValid = true;
    fields.forEach(field => {
      const isFieldValid = validateField(field);
      if (!isFieldValid) {
        formValid = false;
      }
    });

    if (!formValid) {
      showFeedback('Please fix the errors above before submitting.', 'error');
      return;
    }

    // Trigger simulation
    submitFormSimulation();
  });

  function submitFormSimulation() {
    // Disable submit button & show loader
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    spinner.classList.remove('hidden');
    formFeedback.classList.add('hidden');

    // Simulate server delay of 1.5s
    setTimeout(() => {
      // Re-enable submit button
      submitBtn.disabled = false;
      btnText.classList.remove('hidden');
      spinner.classList.add('hidden');

      // Show success feedback
      showFeedback('Thank you! Your message has been sent successfully.', 'success');

      // Reset form fields
      form.reset();
      
      // Clear feedback message after 5 seconds
      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 5000);

    }, 1500);
  }

  function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.classList.remove('hidden');
  }
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback: make everything visible immediately if browser lacks support
    revealElements.forEach(el => el.classList.add('reveal'));
    return;
  }

  const observerOptions = {
    root: null, // use viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        // Once revealed, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}
