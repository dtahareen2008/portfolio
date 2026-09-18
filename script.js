/**
 * ==============================================================================
 * PORTFOLIO SCRIPTS - D. TAHAREEN
 * Modern, clean Vanilla JavaScript for interactivity, theme toggle, animations
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  // Open menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  // Close menu with 'X' button
  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close menu when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.remove('show-menu');
      }
    });
  });

  // Close menu when clicking outside of the drawer
  document.addEventListener('click', (event) => {
    if (
      navMenu &&
      navMenu.classList.contains('show-menu') &&
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      navMenu.classList.remove('show-menu');
    }
  });

  /* --------------------------------------------------------------------------
     3. TYPEWRITER EFFECT IN HERO SECTION
     -------------------------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      'CSE Student',
      '2nd-Year Engineering Student',
      'Aspiring Software Developer',
      'Tech & Web Enthusiast',
      'Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const delayBetweenWords = 1800;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        // Remove one character
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Add one character
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      // When word is completely typed out
      if (!isDeleting && charIndex === currentRole.length) {
        speed = delayBetweenWords;
        isDeleting = true;
      }
      // When word is completely erased
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400; // brief pause before next word
      }

      setTimeout(typeEffect, speed);
    }

    // Start typing
    typeEffect();
  }

  /* --------------------------------------------------------------------------
     4. ACTIVE NAVIGATION LINK ON SCROLL
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function scrollActive() {
    const scrollY = window.pageYOffset || window.scrollY;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active-link');
        } else {
          targetNavLink.classList.remove('active-link');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollActive);

  /* --------------------------------------------------------------------------
     5. SHOW / HIDE SCROLL-TO-TOP BUTTON
     -------------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scroll-top');

  function toggleScrollTop() {
    const scrollY = window.pageYOffset || window.scrollY;
    if (scrollTopBtn) {
      if (scrollY >= 350) {
        scrollTopBtn.classList.add('show-scroll');
      } else {
        scrollTopBtn.classList.remove('show-scroll');
      }
    }
  }

  window.addEventListener('scroll', toggleScrollTop);

  /* --------------------------------------------------------------------------
     6. COPY EMAIL ADDRESS BUTTON
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactEmail = document.getElementById('contact-email');

  if (copyEmailBtn && contactEmail) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = contactEmail.textContent.trim();
      try {
        await navigator.clipboard.writeText(emailText);
        const originalHtml = copyEmailBtn.innerHTML;
        
        // Show success icon
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        copyEmailBtn.title = 'Copied!';

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHtml;
          copyEmailBtn.title = 'Copy Email';
        }, 2000);
      } catch (err) {
        console.error('Clipboard copy failed: ', err);
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION & INTERACTION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackBox = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Basic validation check
      if (!name || !email || !subject || !message) {
        showFeedback('Please fill out all required fields.', 'error');
        return;
      }

      // Email format regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // Button sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending...</span>';
      }

      // Simulate sending delay for smooth UI feedback
      setTimeout(() => {
        showFeedback(
          `Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`,
          'success'
        );

        // Reset form
        contactForm.reset();

        // Restore submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-regular fa-paper-plane"></i>';
        }
      }, 900);
    });
  }

  function showFeedback(text, type) {
    if (!feedbackBox) return;

    feedbackBox.textContent = text;
    feedbackBox.className = `form-feedback ${type}`;

    // Auto-clear success message after 7 seconds
    if (type === 'success') {
      setTimeout(() => {
        feedbackBox.className = 'form-feedback';
        feedbackBox.textContent = '';
      }, 7000);
    }
  }

  /* --------------------------------------------------------------------------
     8. FOOTER CURRENT YEAR
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
