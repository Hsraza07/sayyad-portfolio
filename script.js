/**
 * PORTFOLIO JAVASCRIPT INTERACTIONS
 * Client: Sayyad Hanifraza Sardar
 * Role: Aspiring Python Full Stack Developer
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Theme Switcher (Dark / Light Mode, Dark Default)
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = localStorage.getItem('hs_portfolio_theme') || 'dark';

  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');

    if (isLight) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('hs_portfolio_theme', 'light');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('hs_portfolio_theme', 'dark');
    }
  });

  // -------------------------------------------------------------------------
  // 2. Mobile Navigation Drawer & Hamburger
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const navLinksItems = document.querySelectorAll('.nav-link');

  const toggleMobileNav = (state) => {
    const shouldOpen = typeof state === 'boolean' ? state : !navLinks.classList.contains('active');
    mobileToggle.classList.toggle('open', shouldOpen);
    navLinks.classList.toggle('active', shouldOpen);
    mobileOverlay.classList.toggle('active', shouldOpen);
    mobileToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  };

  mobileToggle?.addEventListener('click', () => toggleMobileNav());
  mobileOverlay?.addEventListener('click', () => toggleMobileNav(false));

  navLinksItems.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMobileNav(false);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 3. Sticky Navbar Blur & Active ScrollSpy
  // -------------------------------------------------------------------------
  const navbarWrapper = document.getElementById('navbar-wrapper');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Sticky blur styling on scroll
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }

    // ScrollSpy active link indicator
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
      }
    });

    // Back to top visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0.7';
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  // -------------------------------------------------------------------------
  // 4. Dynamic Typewriter Effect for Hero Title
  // -------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Aspiring Python Full Stack Developer',
    'Backend & Django Enthusiast',
    'Frontend & React Explorer',
    'BCS Graduate | Grade O (Outstanding)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRoles() {
    if (!typingElement) return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typingElement.textContent = roles[0];
      return;
    }

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full text
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      // Move to next title
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeRoles, typingSpeed);
  }

  // Start typing
  typeRoles();

  // -------------------------------------------------------------------------
  // 5. Project Preview Modal
  // -------------------------------------------------------------------------
  const openModalBtn = document.getElementById('open-project-modal-btn');
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');

  const openModal = () => {
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalBtn?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  modalDismissBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal?.classList.contains('active')) closeModal();
      if (navLinks?.classList.contains('active')) toggleMobileNav(false);
    }
  });

  // -------------------------------------------------------------------------
  // 6. Resume Download Handler
  // -------------------------------------------------------------------------
  const resumeBtn = document.getElementById('resume-btn');
  resumeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    // Check if resume file is present or provide prompt
    const resumePath = 'assets/Sayyad_Hanifraza_Sardar_Resume.pdf';
    
    // Attempt download via virtual anchor
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Sayyad_Hanifraza_Sardar_Resume.pdf';
    document.body.appendChild(link);

    // Provide friendly fallback alert if the file is not yet uploaded locally
    fetch(resumePath, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          link.click();
        } else {
          showResumeGuideModal();
        }
      })
      .catch(() => {
        showResumeGuideModal();
      })
      .finally(() => {
        document.body.removeChild(link);
      });
  });

  function showResumeGuideModal() {
    alert(
      "📄 Resume Download Placeholder:\n\n" +
      "To enable your real resume download:\n" +
      "1. Save your resume PDF as 'Sayyad_Hanifraza_Sardar_Resume.pdf'\n" +
      "2. Place it in the 'assets/' folder of this website.\n\n" +
      "Your resume will then automatically download when recruiters click this button!"
    );
  }

  // -------------------------------------------------------------------------
  // 7. Contact Form Client-Side Validation & Feedback
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateField = (input, condition) => {
    const group = input.closest('.form-group');
    if (!condition) {
      group.classList.add('has-error');
      return false;
    } else {
      group.classList.remove('has-error');
      return true;
    }
  };

  // Real-time error removal on input
  nameInput?.addEventListener('input', () => validateField(nameInput, nameInput.value.trim().length >= 2));
  emailInput?.addEventListener('input', () => validateField(emailInput, validateEmail(emailInput.value.trim())));
  subjectInput?.addEventListener('input', () => validateField(subjectInput, subjectInput.value.trim().length > 0));
  messageInput?.addEventListener('input', () => validateField(messageInput, messageInput.value.trim().length >= 10));

  // Netlify Forms handles the real submission. Do not prevent the native POST.
  // Browser validation is provided by the required/email input attributes.

  // -------------------------------------------------------------------------
  // 8. Interactive Background Canvas (Ambient Constellation Particles)
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 35), 45); // Lightweight for optimal performance

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }
});
