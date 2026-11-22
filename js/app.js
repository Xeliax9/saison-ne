/* Saison NE · Démarrage du site et animations au défilement */
'use strict';

/* ---------------------------------------------------------------
   Navigation : section en cours dans la barre du haut
   --------------------------------------------------------------- */
function animerAuPassage() {
  if (!('IntersectionObserver' in window)) { calVu = carteVue = true; return; }
  const obs = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    obs.unobserve(en.target);
    if (en.target.id === 'cal') { calVu = true; pousserBarres(false); }
    if (en.target.id === 'map') { carteVue = true; tomberEpingles(); }
    if (en.target.classList.contains('block-head')) en.target.classList.add('vu');
  }), { threshold: 0.2 });
  obs.observe($('#cal')); obs.observe($('#map'));
  document.querySelectorAll('.block-head').forEach(b => obs.observe(b));
}

function suivreProgression() {
  const barre = $('#progress');
  const maj = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    barre.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
  };
  addEventListener('scroll', maj, { passive: true }); addEventListener('resize', maj); maj();
}

function suivreSections() {
  if (!('IntersectionObserver' in window)) return;
  const liens = [...document.querySelectorAll('.nav a')];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      liens.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(sec => obs.observe(sec));
}

/* ---------------------------------------------------------------
   Démarrage
   --------------------------------------------------------------- */
function brancherBoutonAnim() {
  const b = document.getElementById('anim-toggle'); if (!b) return;
  const maj = () => b.setAttribute('aria-pressed', String(!REDUCE));
  maj();
  b.addEventListener('click', () => {
    REDUCE = !REDUCE;
    try { localStorage.setItem('saison-anim', REDUCE ? 'off' : 'on'); } catch (e) {}
    document.documentElement.classList.toggle('anim', !REDUCE);
    document.documentElement.classList.toggle('calme', REDUCE);
    maj();
  });
}

function demarrer() {
  document.documentElement.classList.toggle('anim', !REDUCE);
  document.documentElement.classList.toggle('calme', REDUCE);
  brancherBoutonAnim();
  animerTitre(MOIS[state.mois - 1], true);
  renderSemaine(); renderChipsCategories(); renderAccroche(); renderPlanche(true); renderVedettes(true); renderRail();
  renderRecette(); renderChipsCalendrier(); renderCalendrier();
  renderChipsLieux(); renderCarte(); renderListeLieux();
  brancherDialogs(); brancherCommune(); suivreSections(); animerAuPassage(); suivreProgression();
  requestAnimationFrame(() => placerPastille(false));
  addEventListener('resize', () => placerPastille(false));

  let redim;
  window.addEventListener('resize', () => { clearTimeout(redim); redim = setTimeout(ajusterTitre, 100); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajusterTitre);
  $('#prev-month').addEventListener('click', () => setMois(state.mois === 1 ? 12 : state.mois - 1));
  $('#next-month').addEventListener('click', () => setMois(state.mois === 12 ? 1 : state.mois + 1));
  let attente;
  $('#cal-search').addEventListener('input', ev => {
    clearTimeout(attente);
    attente = setTimeout(() => { state.calRecherche = ev.target.value; renderCalendrier(); }, 120);
  });

}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
else demarrer();
