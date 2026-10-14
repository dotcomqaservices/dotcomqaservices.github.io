const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    primaryNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    primaryNav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
if (contactForm && formNote) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const fields = [
      `Name: ${formData.get('name')}`,
      `Work email: ${formData.get('email')}`,
      `Phone / WhatsApp: ${formData.get('phone') || 'Not provided'}`,
      `Service: ${formData.get('service')}`,
      '',
      'Brief:',
      String(formData.get('message') || '')
    ];
    const subject = encodeURIComponent(`New ${formData.get('service')} enquiry from ${formData.get('name')}`);
    const body = encodeURIComponent(fields.join('\n'));
    formNote.textContent = 'Your email app is opening with your brief ready to send. If it does not open, email hello@dotcom.ai.';
    formNote.dataset.state = 'success';
    window.location.href = `mailto:hello@dotcom.ai?subject=${subject}&body=${body}`;
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
