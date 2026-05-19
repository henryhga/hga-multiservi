'use strict';

/* ═══════════════════════════════════════════════════════════
   THREE.JS — PARTICLES + WATER PLANE
   ═══════════════════════════════════════════════════════════ */
(function initThree() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = () => canvas.clientWidth;
  const H = () => canvas.clientHeight;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(65, W() / H(), 0.1, 200);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H(), false);

  /* ── SMALL AMBIENT PARTICLES ── */
  const SMALL = 320;
  const sPts  = new Float32Array(SMALL * 3);
  const sSpeeds = [];
  for (let i = 0; i < SMALL; i++) {
    sPts[i*3]   = (Math.random() - 0.5) * 22;
    sPts[i*3+1] = (Math.random() - 0.5) * 14;
    sPts[i*3+2] = (Math.random() - 0.5) * 8;
    sSpeeds.push({ x: (Math.random()-0.5)*0.006, y: (Math.random()-0.5)*0.003, p: Math.random()*Math.PI*2 });
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPts, 3));
  const sMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.04, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
  scene.add(new THREE.Points(sGeo, sMat));

  /* ── LARGER GLOW ORBS ── */
  const LARGE = 20;
  const lPts  = new Float32Array(LARGE * 3);
  const lSpeeds = [];
  for (let i = 0; i < LARGE; i++) {
    lPts[i*3]   = (Math.random()-0.5)*18;
    lPts[i*3+1] = (Math.random()-0.5)*10;
    lPts[i*3+2] = (Math.random()-0.5)*4;
    lSpeeds.push({ x: (Math.random()-0.5)*0.003, y: (Math.random()-0.5)*0.002, p: Math.random()*Math.PI*2 });
  }
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(lPts, 3));
  const lMat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.18, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false });
  scene.add(new THREE.Points(lGeo, lMat));

  /* ── WATER WIREFRAME PLANE ── */
  const wGeo  = new THREE.PlaneGeometry(26, 8, 90, 24);
  const wMat  = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.028, depthWrite: false });
  const water = new THREE.Mesh(wGeo, wMat);
  water.rotation.x = -Math.PI / 2.4;
  water.position.y = -4;
  water.position.z = -1;
  scene.add(water);

  /* ── HORIZONTAL GLOW PLANE at water surface ── */
  const hGeo = new THREE.PlaneGeometry(20, 0.8);
  const hMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.018, side: THREE.DoubleSide, depthWrite: false });
  const hLine = new THREE.Mesh(hGeo, hMat);
  hLine.rotation.x = -Math.PI / 2;
  hLine.position.y = -3.2;
  scene.add(hLine);

  /* ── MOUSE PARALLAX ── */
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', e => {
    mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* ── RESIZE ── */
  window.addEventListener('resize', () => {
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H(), false);
  });

  /* ── ANIMATION LOOP ── */
  let tick = 0;
  (function animate() {
    requestAnimationFrame(animate);
    const t = tick++ * 0.01;

    // drift small particles
    const sp = sGeo.attributes.position.array;
    for (let i = 0; i < SMALL; i++) {
      sp[i*3]   += sSpeeds[i].x;
      sp[i*3+1] += sSpeeds[i].y + Math.sin(t + sSpeeds[i].p) * 0.0016;
      if (sp[i*3]   >  11) sp[i*3]   = -11;
      if (sp[i*3]   < -11) sp[i*3]   =  11;
      if (sp[i*3+1] >  7)  sp[i*3+1] = -7;
      if (sp[i*3+1] < -7)  sp[i*3+1] =  7;
    }
    sGeo.attributes.position.needsUpdate = true;

    // drift large orbs
    const lp = lGeo.attributes.position.array;
    for (let i = 0; i < LARGE; i++) {
      lp[i*3]   += lSpeeds[i].x;
      lp[i*3+1] += lSpeeds[i].y + Math.sin(t * 0.7 + lSpeeds[i].p) * 0.001;
      if (lp[i*3]   >  9)  lp[i*3]   = -9;
      if (lp[i*3]   < -9)  lp[i*3]   =  9;
      if (lp[i*3+1] >  5)  lp[i*3+1] = -5;
      if (lp[i*3+1] < -5)  lp[i*3+1] =  5;
    }
    lGeo.attributes.position.needsUpdate = true;

    // animate water plane vertices
    const wp = wGeo.attributes.position;
    for (let i = 0; i < wp.count; i++) {
      const x = wp.getX(i);
      const z = wp.getZ(i);
      wp.setZ(i, Math.sin(x * 0.4 + t) * 0.18 + Math.sin(z * 0.7 + t * 1.3) * 0.12);
    }
    wp.needsUpdate = true;

    // camera follows mouse gently
    camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.022;
    camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.022;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  })();
})();

/* ═══════════════════════════════════════════════════════════
   GSAP + SCROLLTRIGGER
   ═══════════════════════════════════════════════════════════ */
(function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── HERO LOGO ENTRANCE ── */
  const heroTL = gsap.timeline({ delay: 0.3 });
  heroTL
    .from('#heroLogo',      { opacity: 0, scale: 0.85, duration: 1.4, ease: 'power3.out' }, 0)
    .from('.ring',          { opacity: 0, scale: 0.6,  duration: 1.2, ease: 'power2.out', stagger: 0.2 }, 0.2)
    .from('.water-surface', { opacity: 0, y: 10,       duration: 0.9, ease: 'power2.out' }, 0.8)
    .from('.amb-glow-1',    { opacity: 0, scale: 0.7,  duration: 1.5, ease: 'power2.out' }, 0.1)
    .from('#scrollDiscover',{ opacity: 0, y: 10,       duration: 0.8, ease: 'power2.out' }, 1.2);

  /* ── NAV: reveal after scroll passes hero ── */
  ScrollTrigger.create({
    trigger: '.content-screen',
    start: 'top 80%',
    onEnter: () => {
      document.getElementById('nav').classList.remove('nav-hidden');
      document.getElementById('nav').classList.add('nav-visible');
    },
    onLeaveBack: () => {
      document.getElementById('nav').classList.add('nav-hidden');
      document.getElementById('nav').classList.remove('nav-visible');
    },
  });

  /* ── CONTENT SCREEN STAGGER ── */
  const contentTL = gsap.timeline({
    scrollTrigger: { trigger: '.content-screen', start: 'top 70%' }
  });
  contentTL
    .from('#badge',        { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' })
    .from('#contentTitle', { opacity: 0, y: 48, duration: 0.9, ease: 'power2.out' }, '-=0.4')
    .from('#contentSub',   { opacity: 0, y: 28, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .from('#contentCtas',  { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    .from('#trustBar',     { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.3');

  /* ── TRUST COUNTERS ── */
  document.querySelectorAll('.trust-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '+';
    gsap.fromTo(el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2, ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate() { el.textContent = Math.round(+el.innerHTML) + suffix; },
      }
    );
  });

  /* ── METRICS STRIP ── */
  gsap.from('.metric-item', {
    opacity: 0, y: 36, duration: 0.75, ease: 'power2.out', stagger: 0.1,
    scrollTrigger: { trigger: '.metrics-grid', start: 'top 80%' },
  });

  /* ── SERVICE CARDS ── */
  gsap.from('.svc-card', {
    opacity: 0, y: 50, duration: 0.8, ease: 'power2.out', stagger: 0.1,
    scrollTrigger: { trigger: '.svc-grid', start: 'top 80%' },
  });

  /* ── READY SECTION ── */
  gsap.from('.ready-text, .ready-btn', {
    opacity: 0, y: 24, duration: 0.7, ease: 'power2.out', stagger: 0.12,
    scrollTrigger: { trigger: '.ready-section', start: 'top 80%' },
  });

  /* ── CTA SECTION ── */
  gsap.from('.cta-copy > *', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power2.out', stagger: 0.1,
    scrollTrigger: { trigger: '.cta-screen', start: 'top 75%' },
  });
  gsap.from('.quote-form', {
    opacity: 0, y: 40, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.quote-form', start: 'top 85%' },
  });

  /* ── FOOTER ── */
  gsap.from('.footer-brand, .footer-col', {
    opacity: 0, y: 24, duration: 0.7, ease: 'power2.out', stagger: 0.08,
    scrollTrigger: { trigger: '.footer', start: 'top 85%' },
  });
})();

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    mobileMenu.classList.add('hidden');
    burger.classList.remove('open');
  } else {
    mobileMenu.classList.remove('hidden');
    burger.classList.add('open');
  }
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    burger.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════════════════════
   QUOTE FORM — Web3Forms integration
   ═══════════════════════════════════════════════════════════ */
(function initForm() {
  const form       = document.getElementById('quoteForm');
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnArrow   = document.getElementById('btnArrow');
  const globalErr  = document.getElementById('fErr');
  const successBox = document.getElementById('formSuccess');

  /* ── helpers ── */
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isPhone(v) { return /^[\d\s\+\-\(\)\.]{7,20}$/.test(v); }

  function showFieldErr(errId, msg) {
    const span = document.getElementById(errId);
    if (!span) return;
    span.textContent = msg;
    span.style.display = msg ? 'block' : 'none';
    const ff = span.closest('.ff');
    if (ff) ff.classList.toggle('has-error', !!msg);
  }

  function clearAll() {
    ['errName','errPhone','errEmail','errAddress','errService'].forEach(id => showFieldErr(id, ''));
    globalErr.classList.add('hidden');
    globalErr.textContent = '';
  }

  /* ── live clear errors on input ── */
  const fieldMap = { fName:'errName', fPhone:'errPhone', fEmail:'errEmail', fAddress:'errAddress', fService:'errService' };
  Object.entries(fieldMap).forEach(([inputId, errId]) => {
    const el = document.getElementById(inputId);
    if (el) {
      el.addEventListener('input',  () => showFieldErr(errId, ''));
      el.addEventListener('change', () => showFieldErr(errId, ''));
    }
  });

  /* ── submit ── */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearAll();

    /* values */
    const name    = document.getElementById('fName').value.trim();
    const phone   = document.getElementById('fPhone').value.trim();
    const email   = document.getElementById('fEmail').value.trim();
    const address = document.getElementById('fAddress').value.trim();
    const service = document.getElementById('fService').value;

    /* honeypot check */
    const bot = form.querySelector('[name="botcheck"]');
    if (bot && bot.checked) return;

    /* validate */
    let errors = 0;
    if (!name || name.length < 2)  { showFieldErr('errName',    'Please enter your full name.');          errors++; }
    if (!phone || !isPhone(phone))  { showFieldErr('errPhone',   'Please enter a valid phone number.');    errors++; }
    if (!email || !isEmail(email))  { showFieldErr('errEmail',   'Please enter a valid email address.');   errors++; }
    if (!address)                   { showFieldErr('errAddress', 'Please enter your property address.');   errors++; }
    if (!service)                   { showFieldErr('errService', 'Please select a service.');              errors++; }
    if (errors) return;

    /* loading state */
    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    btnSpinner.classList.remove('hidden');
    btnArrow.classList.add('hidden');

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();

      if (data.success) {
        form.reset();
        form.classList.add('hidden');
        successBox.classList.remove('hidden');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof gsap !== 'undefined') {
          gsap.from(successBox, { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' });
        }
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      globalErr.innerHTML = '⚠ Something went wrong. Please call us directly: <a href="tel:+13054988610" style="color:var(--blue-l);text-decoration:underline">(305) 498-8610</a>';
      globalErr.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Get My Free Quote';
      btnSpinner.classList.add('hidden');
      btnArrow.classList.remove('hidden');
    }
  });
})();

/* ═══════════════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = 72;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: id === '#hero' ? 0 : top, behavior: 'smooth' });
  });
});
