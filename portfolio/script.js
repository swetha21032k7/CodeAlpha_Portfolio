// Theme Toggle
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const isDark = currentTheme === 'dark';

    if (isDark) {
      body.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
      const isDarkMode = body.getAttribute('data-theme') === 'dark';
      body.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
      themeToggle.textContent = isDarkMode ? '🌙' : '☀️';
      localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Typing Effect
    const typeTexts = ['Software Developer', 'Frontend Developer', 'AI Enthusiast'];
    const typingText = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentText = typeTexts[textIndex];
      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typeTexts.length;
        typeSpeed = 500;
      }

      setTimeout(typeWriter, typeSpeed);
    }

    // Scroll Reveal
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');

          // Animate skill bars
          const progressBars = entry.target.querySelectorAll('.progress');
          progressBars.forEach(bar => {
            bar.style.setProperty('--width', bar.dataset.width);
          });

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      alert(`Thank you, ${name}! Your message has been sent successfully. (Demo mode)`);
      contactForm.reset();
    });

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', () => {
      typeWriter();
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

      // Navbar shadow on scroll
      window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
          navbar.style.boxShadow = 'var(--shadow)';
        } else {
          navbar.style.boxShadow = 'none';
        }
      });
    });