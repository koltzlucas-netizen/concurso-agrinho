/* ============================================================
   AgroVerde — Sustentabilidade no Agronegócio
   Scripts principais
   ============================================================ */

/* ----------------------------------------------------------
   NAVEGAÇÃO ENTRE SEÇÕES
   ---------------------------------------------------------- */
function showSection(id) {
  // Esconde a home e todas as seções de conteúdo
  document.getElementById('home').style.display = 'none';
  document.querySelectorAll('.content-section').forEach(s => {
    s.classList.remove('active');
  });

  if (id === 'home') {
    document.getElementById('home').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const sec = document.getElementById(id);
    if (sec) {
      sec.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Dispara animações de fade-in dos cards da seção
      setTimeout(() => triggerFadeIn(sec), 100);
    }
  }
  return false;
}

/* ----------------------------------------------------------
   MENU MOBILE (HAMBÚRGUER)
   ---------------------------------------------------------- */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const ham  = document.getElementById('hamburger');
  menu.classList.toggle('open');
  ham.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ----------------------------------------------------------
   ANIMAÇÕES DE ENTRADA (FADE-IN)
   ---------------------------------------------------------- */

// Aplica fade-in com atraso escalonado nos filhos de um container
function triggerFadeIn(container) {
  const els = container.querySelectorAll('.fade-in');
  els.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 80);
  });
}

// Observer para elementos da home que entram na viewport
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ----------------------------------------------------------
   CONTADOR ANIMADO NAS ESTATÍSTICAS
   ---------------------------------------------------------- */
function animateCount(el) {
  const target   = parseInt(el.getAttribute('data-target'));
  const duration = 1500; // ms
  const step     = target / (duration / 16);
  let current    = 0;

  // Adiciona símbolo "%" quando o rótulo menciona porcentagem
  const label    = el.closest('.stat-item').querySelector('.stat-label');
  const suffix   = label && label.textContent.includes('%') ? '%' : '';

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Dispara os contadores ao rolar até a barra de stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCount);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

/* ----------------------------------------------------------
   INICIALIZAÇÃO
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Garante que apenas a home apareça ao carregar
  document.getElementById('home').style.display = 'block';
});
