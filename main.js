const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 10 ? 'rgba(15,15,19,0.97)' : 'rgba(15,15,19,0.85)';
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.cssText = open ? 'display:none' : 'display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:rgba(15,15,19,0.98);padding:24px;gap:20px;border-bottom:1px solid rgba(255,255,255,0.08)';
});
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / 2000, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target).toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
let started = false;
new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting && !started) { started = true; document.querySelectorAll('.counter-num').forEach(animateCounter); } });
}, { threshold: 0.3 }).observe(document.getElementById('counters'));
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .counter-item').forEach(el => {
  el.style.cssText = 'opacity:0;transform:translateY(24px);transition:opacity 0.5s ease,transform 0.5s ease';
  new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
  }, { threshold: 0.1 }).observe(el);
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Enviado! Em breve entraremos em contato.';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = 'Enviar mensagem'; btn.style.background = ''; btn.disabled = false; this.reset(); }, 4000);
});