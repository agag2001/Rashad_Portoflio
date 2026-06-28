const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    menuBtn.querySelector('iconify-icon').setAttribute('icon', sidebar.classList.contains('open') ? 'lucide:x' : 'lucide:menu');
}

menuBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    if (window.innerWidth <= 1024) toggleSidebar();
}));

const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = (window.scrollY / h * 100) + '%';
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 100) cur = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === cur));
}
window.addEventListener('scroll', updateActiveNav);

const animEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
function handleReveal() {
    animEls.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('active');
    });
}
window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

let barsDone = false;
function animateBars() {
    if (barsDone) return;
    const s = document.getElementById('skills');
    if (s && s.getBoundingClientRect().top < window.innerHeight - 100) {
        barsDone = true;
        document.querySelectorAll('.skill-bar-fill').forEach((b, i) => {
            setTimeout(() => { b.style.width = b.dataset.width + '%'; }, i * 150);
        });
    }
}
window.addEventListener('scroll', animateBars);

const typedText = document.getElementById('typed-text');
const phrases = ['Senior Graphic Designer', 'Brand Identity Expert', 'Print & Digital Designer', 'UI/UX Enthusiast', 'Visual Storyteller'];
let pi = 0, ci = 0, del = false, ts = 80;
function typeEffect() {
    const p = phrases[pi];
    if (del) { ci--; ts = 40; } else { ci++; ts = 80; }
    typedText.textContent = p.substring(0, ci);

    if (!del && ci === p.length) { ts = 2000; del = true; }
    else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; ts = 500; }

    setTimeout(typeEffect, ts);
}
typeEffect();

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const msg = document.getElementById('formSuccess');

    btn.innerHTML = '<iconify-icon icon="lucide:loader-2" width="16" style="animation:spin 1s linear infinite"></iconify-icon> Sending...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        btn.innerHTML = '<iconify-icon icon="lucide:check" width="16"></iconify-icon> Sent!';
        btn.style.background = '#2563eb';
        msg.style.display = 'block';
        this.reset();

        setTimeout(() => {
            btn.innerHTML = '<iconify-icon icon="lucide:send" width="16"></iconify-icon> Send Message';
            btn.style.background = '';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            msg.style.display = 'none';
        }, 3000);
    }, 1500);
});

const st = document.createElement('style');
st.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
document.head.appendChild(st);
