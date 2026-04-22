// Rainier Avenue Church — site interactions
(function () {
  'use strict';

  // Mark the document as JS-ready so progressive-enhancement CSS can apply.
  document.documentElement.classList.add('js-ready');

  // -------- Launch overlay (only on first visit per session) --------
  function handleLaunch() {
    const overlay = document.querySelector('.launch-overlay');
    if (!overlay) return;
    const seen = sessionStorage.getItem('rac_launch_seen');
    if (seen) {
      overlay.classList.add('is-done');
      overlay.style.animation = 'none';
      return;
    }
    sessionStorage.setItem('rac_launch_seen', '1');
    setTimeout(() => overlay.classList.add('is-done'), 3700);
  }

  // -------- Mobile nav --------
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
      });
    });
  }

  // -------- Scroll reveal --------
  function initReveal() {
    const all = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      all.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' });
    all.forEach(el => io.observe(el));

    // Failsafe: anything still hidden after 1.5s gets revealed.
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('is-visible');
      });
    }, 1500);
  }

  // -------- Mark active nav link --------
  function markActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.primary-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http')) return;
      if (href === path || (path === '' && href === 'index.html') ||
          (path === 'index.html' && href === 'index.html')) {
        a.classList.add('is-active');
      }
    });
  }

  // -------- Year in footer --------
  function setYear() {
    const y = document.getElementById('current-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    handleLaunch();
    initNav();
    initReveal();
    markActiveNav();
    setYear();
  });
})();
