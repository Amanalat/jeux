/* =====================================================================
   i18n.js — helper de traduction partagé (FR / EN) pour la collection.
   Modelé sur le mécanisme de FakeMètre.

   Utilisation dans un jeu :
     <script src="i18n.js"></script>        (ou "../i18n.js" en sous-dossier)
     <script>
       I18N.register({
         fr: { titre: "Bonjour", sous: "Clique pour jouer" },
         en: { titre: "Hello",   sous: "Click to play"   }
       });
     </script>

   Puis, dans le HTML, sur chaque texte à traduire :
     data-i18n="titre"            -> remplace textContent
     data-i18n-html="sous"        -> remplace innerHTML (permet <br>, <b>…)
     data-i18n-title="…"          -> attribut title
     data-i18n-placeholder="…"    -> attribut placeholder
     data-i18n-aria-label="…"     -> attribut aria-label

   Langue : ?lang=en dans l'URL (défaut = fr), mémorisée en localStorage
   pour rester cohérente d'une page à l'autre. Un bouton 🇬🇧/🇫🇷 fixe est
   injecté automatiquement (coin haut-droit) — rien à ajouter au HTML.
   ===================================================================== */
(function () {
  'use strict';

  var params = new URLSearchParams(location.search);
  var stored = null;
  try { stored = localStorage.getItem('jeux_lang'); } catch (e) {}
  var lang = params.get('lang') || stored || 'fr';
  if (lang !== 'en' && lang !== 'fr') lang = 'fr';
  try { localStorage.setItem('jeux_lang', lang); } catch (e) {}

  var DICT = { fr: {}, en: {} };

  function t(key) {
    var d = DICT[lang] || {};
    if (key in d) return d[key];
    return (DICT.fr[key] != null) ? DICT.fr[key] : key; // repli FR puis clé brute
  }

  function each(root, sel, fn) {
    (root || document).querySelectorAll(sel).forEach(fn);
  }

  function apply(root) {
    each(root, '[data-i18n]', function (el) {
      var v = t(el.getAttribute('data-i18n')); if (v != null) el.textContent = v;
    });
    each(root, '[data-i18n-html]', function (el) {
      var v = t(el.getAttribute('data-i18n-html')); if (v != null) el.innerHTML = v;
    });
    each(root, '[data-i18n-title]', function (el) {
      var v = t(el.getAttribute('data-i18n-title')); if (v != null) el.title = v;
    });
    each(root, '[data-i18n-placeholder]', function (el) {
      var v = t(el.getAttribute('data-i18n-placeholder')); if (v != null) el.setAttribute('placeholder', v);
    });
    each(root, '[data-i18n-aria-label]', function (el) {
      var v = t(el.getAttribute('data-i18n-aria-label')); if (v != null) el.setAttribute('aria-label', v);
    });
    document.documentElement.lang = lang;
  }

  function buildToggle() {
    if (document.querySelector('.i18n-toggle')) return;
    var b = document.createElement('button');
    b.className = 'i18n-toggle';
    b.type = 'button';
    b.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    b.textContent = lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
    b.style.cssText =
      'position:fixed;top:12px;right:12px;z-index:99999;' +
      "font:700 .8rem/1 'Nunito',system-ui,sans-serif;" +
      'display:inline-flex;align-items:center;gap:5px;padding:8px 14px;border-radius:50px;cursor:pointer;' +
      'background:rgba(15,20,30,.72);color:#fff;border:1px solid rgba(255,255,255,.28);' +
      'backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);transition:transform .15s;';
    b.addEventListener('mouseenter', function () { b.style.transform = 'scale(1.06)'; });
    b.addEventListener('mouseleave', function () { b.style.transform = 'none'; });
    b.addEventListener('click', function () {
      var next = lang === 'fr' ? 'en' : 'fr';
      try { localStorage.setItem('jeux_lang', next); } catch (e) {}
      var p = new URLSearchParams(location.search);
      p.set('lang', next);
      location.search = p.toString();
    });
    document.body.appendChild(b);
  }

  window.I18N = {
    get lang() { return lang; },
    t: t,
    apply: apply,
    register: function (dict) {
      if (dict && dict.fr) DICT.fr = dict.fr;
      if (dict && dict.en) DICT.en = dict.en;
      if (document.readyState !== 'loading') apply();
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    apply();
    buildToggle();
  });
})();
