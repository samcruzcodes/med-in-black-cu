const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-navigation');
const drawerClose = document.querySelector('.drawer-close');
const drawerOverlay = document.querySelector('.drawer-overlay');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const navigationLinks = document.querySelectorAll('.site-navigation a');
let lastFocusedElement = menuToggle;

function getFocusableElements() {
  return siteNavigation.querySelectorAll('a, button');
}

function closeDropdowns() {
  dropdownToggles.forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.parentElement.classList.remove('is-open');
  });
}

function closeDrawer() {
  siteNavigation.classList.remove('is-open');
  document.querySelector('.site-header').classList.remove('drawer-is-open');
  document.body.classList.remove('drawer-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  closeDropdowns();
  lastFocusedElement.focus();
}

function openDrawer() {
  lastFocusedElement = document.activeElement;
  siteNavigation.classList.add('is-open');
  document.querySelector('.site-header').classList.add('drawer-is-open');
  document.body.classList.add('drawer-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close menu');
  drawerClose.focus();
}

menuToggle.addEventListener('click', () => {
  if (siteNavigation.classList.contains('is-open')) {
    closeDrawer();
  } else {
    openDrawer();
  }
});

drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    closeDropdowns();
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.parentElement.classList.toggle('is-open', !isOpen);
  });
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', closeDrawer);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && siteNavigation.classList.contains('is-open')) {
    closeDrawer();
  }
  if (event.key === 'Tab' && siteNavigation.classList.contains('is-open')) {
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});
