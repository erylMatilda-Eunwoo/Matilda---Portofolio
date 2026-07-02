/* ================================================
   PORTFOLIO SCRIPT — Ria Matilda Sihite
   ================================================ */

// ========================
// LOADER
// ========================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1900);
});


// ========================
// PARTICLE CANVAS
// ========================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['rgba(204,0,0,', 'rgba(212,160,23,', 'rgba(255,255,255,'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.alpha = Math.random() * 0.4 + 0.05;
      this.speed = Math.random() * 0.4 + 0.1;
      this.dir = Math.random() * Math.PI * 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += Math.cos(this.dir) * this.speed;
      this.y += Math.sin(this.dir) * this.speed;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(204,0,0,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();


// ========================
// DARK / LIGHT MODE
// ========================
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    document.body.classList.remove('light-mode');
    themeIcon.className = 'fa-solid fa-moon';
  }
}

applyTheme(localStorage.getItem('theme') || 'dark');

themeBtn.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-mode');
  const next = isLight ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});


// ========================
// HAMBURGER (MOBILE)
// ========================
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.addEventListener('click', e => {
  if (!sidebar.contains(e.target) && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});


// ========================
// FOOTER YEAR
// ========================
document.getElementById('year').textContent = new Date().getFullYear();


// ========================
// TYPING EFFECT
// ========================
const line1 = "Mahasiswi Aktif Universitas Satya Terra Bhinneka";
const line2 = "Program Studi Informatika  ·  Angkatan 2025";

let typingIndex = 0;
let isTyping = true;

function dualTyping() {
  if (!isTyping) return;

  document.getElementById('typing1').textContent = line1.substring(0, typingIndex);
  document.getElementById('typing2').textContent = line2.substring(0, typingIndex);

  typingIndex++;

  if (typingIndex > Math.max(line1.length, line2.length)) {
    isTyping = false;
    setTimeout(() => {
      typingIndex = 0;
      document.getElementById('typing1').textContent = '';
      document.getElementById('typing2').textContent = '';
      isTyping = true;
    }, 5000);
  }
}

setInterval(dualTyping, 75);


// ========================
// SMOOTH SCROLL + ACTIVE NAV
// ========================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      sidebar.classList.remove('open');
    }
  });
});

function updateActiveNav() {
  let current = 'home';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 250) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

updateActiveNav();
window.addEventListener('scroll', updateActiveNav, { passive: true });


// ========================
// SKILL ANIMATION
// ========================
const skillSection = document.querySelector('#skills');
let skillDone = false;

function animateSkills() {
  if (skillDone) return;
  skillDone = true;

  const bars = document.querySelectorAll('.progress-bar');
  const counters = document.querySelectorAll('.counter');

  // Reset
  bars.forEach(b => { b.style.transition = 'none'; b.style.width = '0'; });
  counters.forEach(c => { c.textContent = '0%'; });

  requestAnimationFrame(() => {
    setTimeout(() => {
      bars.forEach(bar => {
        bar.style.transition = '2.5s ease';
        bar.style.width = bar.dataset.width + '%';
      });
      counters.forEach(counter => {
        let cur = 0;
        const target = Number(counter.dataset.target);
        const step = 2500 / target;
        const timer = setInterval(() => {
          cur++;
          counter.textContent = cur + '%';
          if (cur >= target) clearInterval(timer);
        }, step);
      });
    }, 100);
  });

  setTimeout(() => { skillDone = false; }, 3500);
}

new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) animateSkills(); });
}, { threshold: 0.3 }).observe(skillSection);


// ========================
// SCROLL REVEAL
// ========================
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// ========================
// CONTACT FORM
// ========================
document.getElementById("contactForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const nama =
    document.getElementById("nama").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const pesan =
    document.getElementById("pesan").value.trim();

    const domainValid =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|students\.satyaterrabhinneka\.ac\.id|satyaterrabhinneka\.ac\.id)$/;

    if(!domainValid.test(email)){
        alert(
            "Gunakan email Gmail (@gmail.com) atau email ST Bhinneka (@students.satyaterrabhinneka.ac.id atau @satyaterrabhinneka.ac.id)"
        );
        return;
    }

    const subject =
    encodeURIComponent(
        "Masukan Website Portofolio matilda"
    );

    const body =
    encodeURIComponent(
`Nama : ${nama}

Email : ${email}

Masukan :

${pesan}`
    );

    window.location.href =
    `mailto:2503311909@students.satyaterrabhinneka.ac.id?subject=${subject}&body=${body}`;

  // Visual feedback
  const btn = this.querySelector('.btn-send span');
  btn.textContent = 'Terkirim!';
  setTimeout(() => { btn.textContent = 'Kirim Pesan'; }, 3000);
});


// ========================
// MOUSE PARALLAX (subtle)
// ========================
document.addEventListener('mousemove', e => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 10;
  const my = (e.clientY / window.innerHeight - 0.5) * 10;
  const heroSlash = document.querySelector('.hero-slash');
  const heroBg = document.querySelector('.hero-bg-text');
  if (heroSlash) heroSlash.style.transform = `translateX(${mx * 0.5}px)`;
  if (heroBg) heroBg.style.transform = `translateY(calc(-50% + ${my * 1.5}px))`;
});