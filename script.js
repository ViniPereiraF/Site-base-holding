/**
 * Holding Vinicius — main.js
 * Handles: loader, nav, scroll reveals, hero canvas,
 * card flip, counters, FAQ, form, mobile animations.
 */

'use strict';

/* ─── CONSTANTS ─── */
const WA_NUMBER = '5577991347726';
const SESSION_KEY = 'atlas_visited';
const IS_MOBILE = () => window.innerWidth <= 680;

/* ─── LOGO INJECTION ─── */
function injectLogos() {
  if (typeof LOGOS === 'undefined') return;
  const map = {
    'img-crystals': LOGOS.logo1_crystals,
    'img-cafe':     LOGOS.logo2_cafe,
    'img-temperos': LOGOS.logo4_temperos,
    'img-mel':      LOGOS.logo5_mel,
    'img-cidinha':  LOGOS.logo6_cidinha,
    'img-regiane':  LOGOS.logo7_regiane,
    'img-granja':   LOGOS.logo8_granja,
    'img-dark':     LOGOS.logo9_dark,
  };
  Object.entries(map).forEach(([id, src]) => {
    const el = document.getElementById(id);
    if (el && src) el.src = src;
  });
}

/* ─── LOADER ─── */
window.addEventListener('load', () => {
  injectLogos();
  const loader = document.getElementById('loader');
  if (!loader) return;
  if (sessionStorage.getItem(SESSION_KEY)) {
    loader.style.display = 'none';
  } else {
    sessionStorage.setItem(SESSION_KEY, '1');
    setTimeout(() => loader.classList.add('hidden'), 1900);
  }
});

/* ─── MOBILE NAV ─── */
(function initNav() {
  function waitForNav() {
    if (!document.getElementById('navLinks')) { setTimeout(waitForNav, 50); return; }
    const ov = document.createElement('div');
    ov.className = 'mob-overlay';
    ov.id = 'mobOverlay';
    ov.addEventListener('click', closeMenu);
    document.body.appendChild(ov);
  }
  waitForNav();
})();

function openMenu() {
  ['mainNav','navLinks'].forEach(id => document.getElementById(id)?.classList.add('open'));
  document.getElementById('mobOverlay')?.classList.add('show');
  document.getElementById('drawerClose')?.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  ['mainNav','navLinks'].forEach(id => document.getElementById(id)?.classList.remove('open'));
  document.getElementById('mobOverlay')?.classList.remove('show');
  document.getElementById('drawerClose')?.classList.remove('visible');
  document.body.style.overflow = '';
}

function toggleMenu() {
  document.getElementById('navLinks')?.classList.contains('open') ? closeMenu() : openMenu();
}

document.addEventListener('click', e => { if (e.target.closest('#navLinks a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

/* ─── NAV SCROLL ─── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav')?.classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const delay = parseInt(target.dataset.delay || 0);
      setTimeout(() => target.classList.add('visible'), delay);
      io.unobserve(target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}
initReveal();

/* ─── HERO CANVAS — particles ─── */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Skip heavy particle effect on mobile to save battery
  if (IS_MOBILE()) { canvas.style.display = 'none'; return; }

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.size = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = 1;
    }
    step() {
      this.x += this.vx; this.y += this.vy; this.life -= 0.002;
      if (this.y < -10 || this.life <= 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${this.opacity * this.life})`;
      ctx.fill();
    }
  }

  const init = () => { resize(); particles = Array.from({length: 80}, () => new Particle()); };

  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.step(); p.draw(); });
    // Connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 80) {
          ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 80) * 0.05})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(tick);
  };

  init(); tick();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); init(); tick(); });
}
initHeroCanvas();

/* ─── HERO PARALLAX (desktop only) ─── */
window.addEventListener('scroll', () => {
  if (IS_MOBILE()) return;
  const hc = document.querySelector('.hero-content');
  if (!hc) return;
  const s = scrollY;
  if (s < innerHeight) {
    hc.style.transform = `translateY(${s * 0.22}px)`;
    hc.style.opacity = Math.max(0, 1 - (s / innerHeight) * 1.3);
  }
}, { passive: true });

/* ─── COUNTER ANIMATION ─── */
const aboutEl = document.querySelector('.about');
if (aboutEl) {
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('[data-target]').forEach(el => {
      const target = +el.dataset.target;
      const t0 = performance.now();
      const run = now => {
        const p = Math.min((now - t0) / 1200, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    });
    obs.disconnect();
  }, { threshold: 0.3 }).observe(aboutEl);
}

/* ─── MARQUEE PAUSE ON HOVER ─── */
const marquee = document.querySelector('.marquee-track');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}

/* ─── CARD FLIP ─── */
function flipCard(btn) { btn.closest('.company-card')?.classList.add('flipped'); }
function unflipCard(btn) { btn.closest('.company-card')?.classList.remove('flipped'); }

function resetAllCards() {
  document.querySelectorAll('.company-card.flipped').forEach(c => c.classList.remove('flipped'));
}
window.addEventListener('load', resetAllCards);
window.addEventListener('pageshow', resetAllCards);
document.addEventListener('visibilitychange', () => { if (!document.hidden) resetAllCards(); });

/* ─── CARD GLOW (desktop mouse tracking) ─── */
if (!IS_MOBILE()) {
  document.querySelectorAll('.company-card').forEach(card => {
    const front = card.querySelector('.card-front');
    if (!front) return;
    card.addEventListener('mousemove', ({ clientX, clientY }) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      front.style.setProperty('--mx', ((clientX - left) / width * 100) + '%');
      front.style.setProperty('--my', ((clientY - top) / height * 100) + '%');
    });
  });
}

/* ─── MOBILE TOUCH SWIPE ON CARDS (flip on swipe left) ─── */
if (IS_MOBILE()) {
  document.querySelectorAll('.company-card').forEach(card => {
    let startX = 0;
    card.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    card.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx < -40) card.classList.add('flipped');
      if (dx > 40) card.classList.remove('flipped');
    }, { passive: true });
  });
}

/* ─── MOBILE SCROLL ANIMATIONS ─── */
function initMobileAnimations() {
  if (!IS_MOBILE()) return;

  // Staggered card entry on scroll
  const cardIO = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.style.transitionDelay = `${delay}ms`;
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
      delay += 80;
      cardIO.unobserve(target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.company-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardIO.observe(card);
  });

  // Pulse animation on stat boxes when tapped
  document.querySelectorAll('.stat-box').forEach(box => {
    box.addEventListener('touchstart', () => {
      box.style.transform = 'scale(0.97)';
      box.style.transition = 'transform 0.1s ease';
    }, { passive: true });
    box.addEventListener('touchend', () => {
      box.style.transform = 'scale(1)';
    }, { passive: true });
  });

  // Pillar cards slide in from alternating sides
  const pillarIO = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }, i) => {
      if (!isIntersecting) return;
      setTimeout(() => {
        target.style.opacity = '1';
        target.style.transform = 'translateX(0)';
      }, i * 100);
      pillarIO.unobserve(target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.pillar').forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = i % 2 === 0 ? 'translateX(-20px)' : 'translateX(20px)';
    p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    pillarIO.observe(p);
  });

  // Grupo nodes bounce in
  const nodeIO = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }, i) => {
      if (!isIntersecting) return;
      setTimeout(() => {
        target.style.opacity = '1';
        target.style.transform = 'scale(1) translateY(0)';
      }, i * 120);
      nodeIO.unobserve(target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.grupo-node').forEach(n => {
    n.style.opacity = '0';
    n.style.transform = 'scale(0.85) translateY(16px)';
    n.style.transition = 'opacity 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
    nodeIO.observe(n);
  });
}
initMobileAnimations();

/* ─── QUOTE FADE ─── */
const quoteText = document.querySelector('.quote-text');
if (quoteText) {
  quoteText.style.cssText += 'opacity:0;transform:translateY(20px);';
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    quoteText.style.transition = 'opacity 1s ease, transform 1s ease';
    quoteText.style.opacity = '1';
    quoteText.style.transform = 'translateY(0)';
    obs.disconnect();
  }, { threshold: 0.3 }).observe(quoteText);
}

/* ─── FAQ ─── */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ─── CONTACT FORM → WHATSAPP ─── */
function handleFormSubmit(e) {
  e.preventDefault();
  const val = id => document.getElementById(id)?.value?.trim() || '';
  const nome = val('f-nome'), email = val('f-email'), empresa = val('f-empresa'),
        cnpj = val('f-cnpj'), setor = val('f-setor'), fat = val('f-fat'),
        local = val('f-local'), assunto = val('f-assunto'), msg = val('f-msg');

  let txt = `*Holding Vinicius — Novo Contato*\n\n👤 *SEUS DADOS*\nNome: ${nome}\n`;
  if (email) txt += `E-mail: ${email}\n`;
  if (empresa || cnpj || setor || fat || local) {
    txt += `\n🏢 *DADOS DA EMPRESA*\n`;
    if (empresa) txt += `Empresa: ${empresa}\n`;
    if (cnpj)    txt += `CNPJ: ${cnpj}\n`;
    if (setor)   txt += `Setor: ${setor}\n`;
    if (fat)     txt += `Faturamento: ${fat}\n`;
    if (local)   txt += `Local: ${local}\n`;
  }
  txt += `\n📋 *MENSAGEM*\n`;
  if (assunto) txt += `Assunto: ${assunto}\n`;
  txt += `\n${msg}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(txt)}`, '_blank');
}

/* ─── STAT BOX RIPPLE ─── */
const style = document.createElement('style');
style.textContent = '@keyframes ripple{from{transform:scale(0);opacity:1}to{transform:scale(2.5);opacity:0}}';
document.head.appendChild(style);

document.querySelectorAll('.stat-box').forEach(box => {
  box.addEventListener('click', ({ clientX, clientY }) => {
    const { top, left, width, height } = box.getBoundingClientRect();
    const size = Math.max(width, height);
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;`
      + `background:rgba(201,168,76,0.12);`
      + `top:${clientY - top - size/2}px;left:${clientX - left - size/2}px;`
      + `animation:ripple 0.6s ease-out forwards;pointer-events:none;z-index:10`;
    box.style.position = 'relative';
    box.appendChild(el);
    setTimeout(() => el.remove(), 700);
  });
});
