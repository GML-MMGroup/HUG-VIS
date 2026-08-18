const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-28% 0px -62% 0px', threshold: [0, 0.15, 0.4] });
sections.forEach((section) => sectionObserver.observe(section));

const galleryItems = {
  portrait: {
    src: 'images/site/fig04_head_expression1.webp',
    alt: 'Qualitative comparison of audio-driven and video-driven portrait synthesis systems',
    caption: 'Portrait synthesis exposes different trade-offs in identity, expression, and lip synchronization.'
  },
  body: {
    src: 'images/site/fig05_temporal_upperbody.webp',
    alt: 'Temporal comparison of full-frame video-driven human synthesis systems',
    caption: 'Full-frame sequences reveal motion-following, action-completion, appearance, and background failures over time.'
  },
  matting: {
    src: 'images/site/fig09_green_screen_segmentation.webp',
    alt: 'Temporal alpha matte predictions from nine foreground extraction systems',
    caption: 'Seven sampled frames localize leakage, thin-structure errors, and unstable boundaries that averages can obscure.'
  }
};

const galleryImageButton = document.querySelector('[data-gallery-image]');
const galleryImage = galleryImageButton?.querySelector('img');
const galleryCaption = document.querySelector('[data-gallery-caption]');

document.querySelectorAll('[data-gallery-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const item = galleryItems[tab.dataset.galleryTab];
    if (!item || !galleryImage || !galleryImageButton || !galleryCaption) return;
    document.querySelectorAll('[data-gallery-tab]').forEach((button) => {
      button.setAttribute('aria-selected', String(button === tab));
    });
    galleryImage.animate([{ opacity: 0.15 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
    galleryImage.src = item.src;
    galleryImage.alt = item.alt;
    galleryImageButton.dataset.lightbox = item.src;
    galleryCaption.textContent = item.caption;
  });
});

const lightbox = document.querySelector('[data-lightbox-dialog]');
const lightboxImage = document.querySelector('[data-lightbox-image]');

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-lightbox]');
  if (!trigger || !lightbox || !lightboxImage) return;
  lightboxImage.src = trigger.dataset.lightbox;
  lightbox.showModal();
});

document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const copyButton = document.querySelector('[data-copy-bib]');
const copyStatus = document.querySelector('[data-copy-status]');
copyButton?.addEventListener('click', async () => {
  const bibtex = document.querySelector('[data-bibtex]')?.textContent ?? '';
  try {
    await navigator.clipboard.writeText(bibtex);
    copyStatus.textContent = 'Copied';
    copyButton.textContent = 'Copied';
    window.setTimeout(() => {
      copyStatus.textContent = 'Ready to copy';
      copyButton.textContent = 'Copy draft BibTeX';
    }, 1800);
  } catch {
    copyStatus.textContent = 'Select the text to copy';
  }
});
