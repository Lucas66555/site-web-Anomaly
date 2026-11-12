(function () {
  'use strict';

  var cfg = window.ANOMALY_CONFIG || {};
  var url = (cfg.downloadUrl || '').trim();
  var disponible = url.length > 0;

  document.documentElement.classList.add('js');

  // --- Boutons de téléchargement ---
  document.querySelectorAll('[data-download]').forEach(function (bouton) {
    var label = bouton.querySelector('.label');
    if (disponible) {
      bouton.setAttribute('href', url);
      bouton.setAttribute('rel', 'noopener');
    } else {
      bouton.classList.add('indisponible');
      bouton.setAttribute('aria-disabled', 'true');
      bouton.setAttribute('href', '#installation');
      if (label) label.textContent = 'Bientôt disponible';
    }
  });

  // --- Informations de version ---
  document.querySelectorAll('[data-version]').forEach(function (el) {
    el.textContent = cfg.version || '—';
  });
  function afficherInfo(cle, valeur) {
    if (!valeur) return;
    var wrap = document.querySelector('[data-' + cle + '-wrap]');
    var cible = document.querySelector('[data-' + cle + ']');
    if (wrap && cible) { cible.textContent = valeur; wrap.hidden = false; }
  }
  afficherInfo('size', cfg.taille);
  afficherInfo('date', cfg.dateSortie);

  // --- Empreinte SHA-256 ---
  var sha = (cfg.sha256 || '').trim();
  if (sha) {
    var bloc = document.getElementById('verification');
    var valeur = document.getElementById('sha-valeur');
    var copier = document.getElementById('sha-copier');
    if (bloc && valeur) {
      valeur.textContent = sha;
      bloc.hidden = false;
    }
    if (copier && navigator.clipboard) {
      copier.addEventListener('click', function () {
        navigator.clipboard.writeText(sha).then(function () {
          copier.textContent = 'Copié ✓';
          setTimeout(function () { copier.textContent = 'Copier'; }, 1800);
        }).catch(function () {
          copier.textContent = 'Copie impossible';
        });
      });
    } else if (copier) {
      copier.hidden = true;
    }
  }

  // --- Avertissement si le visiteur n'est pas sous Windows ---
  var note = document.getElementById('note-os');
  if (note && !/Windows/i.test(navigator.userAgent)) note.hidden = false;

  // --- Année du pied de page ---
  var annee = document.getElementById('annee');
  if (annee) annee.textContent = String(new Date().getFullYear());

  // --- Apparition douce des cartes au défilement ---
  var cartes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); observateur.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    cartes.forEach(function (c) { observateur.observe(c); });
  } else {
    cartes.forEach(function (c) { c.classList.add('visible'); });
  }
})();
