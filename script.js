const header = document.getElementById('siteHeader');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const privacyButton = document.getElementById('privacyButton');
const privacyModal = document.getElementById('privacyModal');
const closePrivacy = document.getElementById('closePrivacy');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeImage = document.getElementById('closeImage');
const galleryItems = document.querySelectorAll('.gallery-item');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

let lastScrollY = window.scrollY;

function toggleMobileMenu(forceClose) {
  const shouldClose = forceClose ?? !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', shouldClose);
  menuButton.classList.toggle('menu-open', !shouldClose);
  menuButton.setAttribute('aria-expanded', String(!shouldClose));
}

menuButton.addEventListener('click', () => toggleMobileMenu());

document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => toggleMobileMenu(true));
});

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 120) {
    header.style.transform = 'translateY(-120%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = currentY;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-42% 0px -52% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

function openModal(modal) {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

privacyButton.addEventListener('click', () => openModal(privacyModal));
closePrivacy.addEventListener('click', () => closeModal(privacyModal));

privacyModal.addEventListener('click', (event) => {
  if (event.target === privacyModal) {
    closeModal(privacyModal);
  }
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    modalImage.src = item.dataset.image;
    modalImage.alt = item.querySelector('img').alt;
    openModal(imageModal);
  });
});

closeImage.addEventListener('click', () => closeModal(imageModal));

imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) {
    closeModal(imageModal);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal(privacyModal);
    closeModal(imageModal);
    toggleMobileMenu(true);
  }
});
