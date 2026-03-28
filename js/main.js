/* Main JS – i18n (DE/EN), Smooth Scroll, Mobile Menu, Active-Links, GitHub Repos, Form-Validierung + mailto */
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ── Übersetzungen ── */
  const translations = {
    de: {
      'page-title': 'Louis Malinowski \u2013 IT-Praktikum ab August 2026',
      'skip-link': 'Zum Inhalt springen',
      'nav-start': 'Start',
      'nav-about': '\u00dcber mich',
      'nav-skills': 'Kenntnisse & Projekte',
      'nav-cv': 'Lebenslauf',
      'nav-contact': 'Kontakt',
      'hero-title': 'Hi, ich bin Louis\u00a0Malinowski.',
      'hero-subtitle': 'Ich bin ein motivierter und technikbegeisterter Mensch mit grossem Interesse an moderner Softwareentwicklung. Durch meine Ausbildung an der WISS Z\u00fcrich und mein selbstst\u00e4ndiges Lernen in Programmiersprachen und IT-Grundlagen vertiefe ich mein Fachwissen stetig. Mein Ziel ist es, meine F\u00e4higkeiten in einem praxisnahen IT-Umfeld einzusetzen und dabei zur Entwicklung moderner L\u00f6sungen beizutragen.',
      'hero-github': 'GitHub ansehen',
      'about-heading': '\u00dcber mich',
      'about-age-label': 'Alter',
      'about-location-label': 'Wohnort',
      'about-education-label': 'Schulbildung',
      'about-education-value': 'Quereinsteiger in Ausbildung \u2013 Applikationsentwicklung EFZ (WISS)',
      'about-interests-heading': 'Interessen',
      'about-interest-1': 'Programmierung',
      'about-interest-2': 'Webentwicklung',
      'about-interest-3': 'Datenbanken',
      'about-softskills-heading': 'Soft Skills',
      'about-skill-1': 'Teamf\u00e4higkeit',
      'about-skill-2': 'Lernbereitschaft',
      'about-skill-3': 'Analytisches Denken',
      'skills-heading': 'Kenntnisse & Projekte',
      'featured-heading': 'Ausgew\u00e4hlte Projekte',
      'featured-skilltracker-desc': 'Web-App zum Erfassen und Visualisieren von Kompetenzen \u2013 zeigt Fortschritt, Zeitaufwand und Priorit\u00e4ten.',
      'featured-asteroids-desc': 'Klon des Arcade-Klassikers Asteroids \u2013 gebaut mit Pygame und objektorientierten Konzepten.',
      'featured-bookbot-desc': 'Python-Programm zur Textanalyse von Romanen \u2013 erstellt statistische Berichte \u00fcber Wort- und Zeichenverwendung.',
      'featured-btn-demo': 'Live-Demo',
      'featured-btn-code': 'Code ansehen',
      'skills-open-tracker': 'SkillTracker \u00f6ffnen',
      'skills-repos-intro': 'Meine \u00f6ffentlichen Repositories:',
      'skills-repos-fallback': 'Repositories konnten nicht geladen werden. Bitte sp\u00e4ter erneut versuchen. Profil auf GitHub:',
      'tl-restaurant-title': 'Restaurantfachmann EFZ',
      'tl-restaurant-org': 'Allgemeine Berufsschule Z\u00fcrich',
      'tl-restaurant-desc': 'Abschluss der Berufsausbildung \u2013 mit langj\u00e4hriger F\u00fchrungserfahrung als Chef de Service und Chef de Rang.',
      'tl-travel-date': 'Mai 2023 \u2013 Feb 2024',
      'tl-travel-title': 'Weltreise',
      'tl-travel-org': 'S\u00fcdamerika & S\u00fcdostasien',
      'tl-travel-desc': 'Neun Monate auf Reisen \u2013 Entscheidung zur Neuorientierung in die IT-Branche.',
      'tl-certs-title': 'Zertifikate & Selbststudium',
      'tl-certs-desc': 'Python, OOP in Python, Linux und Git \u2013 vier Zertifikate im Selbststudium abgeschlossen.',
      'tl-wiss-date': 'Aug 2025 \u2013 heute',
      'tl-wiss-title': 'Ausbildung \u2013 Applikationsentwicklung EFZ',
      'tl-wiss-desc': 'Quereinsteiger in der Informatikausbildung mit Fokus auf Softwareentwicklung, Webentwicklung und Datenbanken.',
      'tl-goal-date': 'Aug 2026',
      'tl-goal-title': 'IT-Praktikum',
      'tl-goal-desc': 'Auf der Suche nach einem praxisnahen IT-Praktikum, um meine Kenntnisse im Berufsalltag einzusetzen.',
      'cv-heading': 'Lebenslauf',
      'cv-text': 'Mein aktueller Lebenslauf steht als PDF zum Download bereit.',
      'cv-download': 'Lebenslauf als PDF herunterladen',
      'contact-heading': 'Kontakt',
      'contact-label-name': 'Name*',
      'contact-label-email': 'E-Mail*',
      'contact-label-message': 'Nachricht*',
      'contact-placeholder-name': 'Ihr Name',
      'contact-placeholder-email': 'ihre@email.ch',
      'contact-placeholder-message': 'Ihre Nachricht an mich...',
      'contact-submit': 'Nachricht senden',
      'contact-privacy-html': '<strong>Datenschutzhinweis:</strong> Das Formular erzeugt eine <code>mailto:</code>-Nachricht in Ihrem E-Mail-Programm. Ihre Angaben werden nicht auf dem Server gespeichert und nur zur Bearbeitung Ihrer Anfrage verwendet.',
      'contact-status-success': 'Danke! Ihre E-Mail wurde vorbereitet. Bitte pr\u00fcfen Sie Ihr E-Mail-Programm.',
      'privacy-heading': 'Datenschutzerkl\u00e4rung (Kurzfassung)',
      'privacy-text': 'Diese Website setzt keine Cookies, keine Tracker und keine externen Skripte ausser Google Fonts ein. Personenbezogene Daten werden nur verarbeitet, wenn Sie eine E-Mail an mich senden. Rechtsgrundlage: berechtigtes Interesse (Kontaktaufnahme).',
      'footer-privacy-link': 'Zur Datenschutzerkl\u00e4rung',
      'err-name': 'Bitte einen g\u00fcltigen Namen angeben (min. 2 Zeichen).',
      'err-email': 'Bitte eine g\u00fcltige E-Mail angeben.',
      'err-message': 'Bitte eine Nachricht mit mind. 10 Zeichen schreiben.',
      'mailto-subject': 'Bewerbung IT-Praktikum \u2013 Nachricht von ',
      'lang-toggle-aria': 'Switch to English',
    },
    en: {
      'page-title': 'Louis Malinowski \u2013 IT Internship from August 2026',
      'skip-link': 'Skip to content',
      'nav-start': 'Home',
      'nav-about': 'About',
      'nav-skills': 'Skills & Projects',
      'nav-cv': 'CV',
      'nav-contact': 'Contact',
      'hero-title': 'Hi, I\u2019m Louis\u00a0Malinowski.',
      'hero-subtitle': 'I\u2019m a motivated and tech-enthusiastic person with a strong interest in modern software development. Through my studies at WISS Z\u00fcrich and self-directed learning in programming languages and IT fundamentals, I continuously deepen my expertise. My goal is to apply my skills in a hands-on IT environment and contribute to the development of modern solutions.',
      'hero-github': 'View GitHub',
      'about-heading': 'About Me',
      'about-age-label': 'Age',
      'about-location-label': 'Location',
      'about-education-label': 'Education',
      'about-education-value': 'Career changer in training \u2013 Application Development EFZ (WISS)',
      'about-interests-heading': 'Interests',
      'about-interest-1': 'Programming',
      'about-interest-2': 'Web Development',
      'about-interest-3': 'Databases',
      'about-softskills-heading': 'Soft Skills',
      'about-skill-1': 'Teamwork',
      'about-skill-2': 'Eagerness to learn',
      'about-skill-3': 'Analytical thinking',
      'skills-heading': 'Skills & Projects',
      'featured-heading': 'Featured Projects',
      'featured-skilltracker-desc': 'Web app for tracking and visualizing competencies \u2013 displays progress, time investment, and priority levels.',
      'featured-asteroids-desc': 'Clone of the classic Asteroids arcade game \u2013 built with Pygame and object-oriented concepts.',
      'featured-bookbot-desc': 'Python program for analyzing novels \u2013 generates statistical reports on word and character usage.',
      'featured-btn-demo': 'Live Demo',
      'featured-btn-code': 'View Code',
      'skills-open-tracker': 'Open SkillTracker',
      'skills-repos-intro': 'My public repositories:',
      'skills-repos-fallback': 'Repositories could not be loaded. Please try again later. Profile on GitHub:',
      'tl-restaurant-title': 'Restaurateur EFZ',
      'tl-restaurant-org': 'Allgemeine Berufsschule Z\u00fcrich',
      'tl-restaurant-desc': 'Completed vocational qualification \u2013 with years of leadership experience as Chef de Service and Chef de Rang.',
      'tl-travel-date': 'May 2023 \u2013 Feb 2024',
      'tl-travel-title': 'World Trip',
      'tl-travel-org': 'South America & South-East Asia',
      'tl-travel-desc': 'Nine months travelling \u2013 decision to make a career change into IT.',
      'tl-certs-title': 'Certificates & Self-study',
      'tl-certs-desc': 'Python, OOP in Python, Linux and Git \u2013 four certificates completed through self-directed learning.',
      'tl-wiss-date': 'Aug 2025 \u2013 present',
      'tl-wiss-title': 'Apprenticeship \u2013 Application Development EFZ',
      'tl-wiss-desc': 'Career changer in IT training with a focus on software development, web development and databases.',
      'tl-goal-date': 'Aug 2026',
      'tl-goal-title': 'IT Internship',
      'tl-goal-desc': 'Looking for a hands-on IT internship to apply my skills in a professional environment.',
      'cv-heading': 'CV',
      'cv-text': 'My current CV is available as a PDF download.',
      'cv-download': 'Download CV as PDF',
      'contact-heading': 'Contact',
      'contact-label-name': 'Name*',
      'contact-label-email': 'E-Mail*',
      'contact-label-message': 'Message*',
      'contact-placeholder-name': 'Your name',
      'contact-placeholder-email': 'your@email.com',
      'contact-placeholder-message': 'Your message to me...',
      'contact-submit': 'Send message',
      'contact-privacy-html': '<strong>Privacy notice:</strong> This form generates a <code>mailto:</code> message in your email client. Your data is not stored on the server and is only used to respond to your inquiry.',
      'contact-status-success': 'Thank you! Your email has been prepared. Please check your email client.',
      'privacy-heading': 'Privacy Policy (Summary)',
      'privacy-text': 'This website does not use cookies, trackers, or external scripts other than Google Fonts. Personal data is only processed when you send me an email. Legal basis: legitimate interest (contact).',
      'footer-privacy-link': 'Privacy Policy',
      'err-name': 'Please enter a valid name (min. 2 characters).',
      'err-email': 'Please enter a valid email address.',
      'err-message': 'Please write a message with at least 10 characters.',
      'mailto-subject': 'IT Internship Application \u2013 Message from ',
      'lang-toggle-aria': 'Auf Deutsch wechseln',
    }
  };

  let currentLang = localStorage.getItem('lang') || 'de';

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key] !== undefined)
      ? translations[currentLang][key]
      : (translations['de'][key] || key);
  }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'de' ? 'de-CH' : 'en';
    document.title = t('page-title');

    // textContent updates
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = translations[lang] && translations[lang][key];
      if (val !== undefined) el.textContent = val;
    });

    // innerHTML updates (e.g. privacy hint with <strong> / <code>)
    $$('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = translations[lang] && translations[lang][key];
      if (val !== undefined) el.innerHTML = val;
    });

    // placeholder updates
    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = translations[lang] && translations[lang][key];
      if (val !== undefined) el.placeholder = val;
    });

    // lang toggle button: show target language label + update aria-label
    const langBtn = $('#lang-toggle');
    const langLabel = $('#lang-toggle-label');
    if (langLabel) langLabel.textContent = lang === 'de' ? 'EN' : 'DE';
    if (langBtn) langBtn.setAttribute('aria-label', t('lang-toggle-aria'));
  }

  // Apply saved or default language on load
  applyLang(currentLang);

  // Lang toggle click – event delegation so it works regardless of DOM timing
  document.addEventListener('click', (e) => {
    if (e.target.closest('#lang-toggle')) {
      applyLang(currentLang === 'de' ? 'en' : 'de');
    }
  });

  /* ── Footer-Jahr ── */
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ── Smooth-Scroll (Nav + CTA) ── */
  $$('a[href^="#"], [data-scroll]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = $(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
      }
    });
  });

  /* ── Mobile-Menü ── */
  const nav = $("#site-nav");
  const toggle = $(".nav__toggle");
  function openMenu() { nav.classList.add("is-open"); toggle.classList.add("is-open"); toggle.setAttribute("aria-expanded", "true"); toggle.setAttribute("aria-label", "Menü schliessen"); }
  function closeMenu() { nav.classList.remove("is-open"); toggle.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Menü öffnen"); }
  toggle.addEventListener("click", () => (toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu()));
  document.addEventListener("click", (e) => { if (toggle.getAttribute("aria-expanded") === "true" && !nav.contains(e.target) && !toggle.contains(e.target) && !e.target.closest('#lang-toggle')) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ── Active-Link beim Scrollen ── */
  const sections = $$("#start, #ueber-mich, #projekte, #lebenslauf, #kontakt");
  const navLinks = $$(".nav__link");
  const byId = id => navLinks.find(a => a.getAttribute('href') === `#${id}`);
  function updateActiveLink() {
    let current = sections[0];
    const atBottom = (window.innerHeight + Math.ceil(window.scrollY)) >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      current = sections[sections.length - 1];
    } else {
      const cutoff = window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= cutoff) { current = sections[i]; break; }
      }
    }
    navLinks.forEach(a => a.classList.remove("is-active"));
    const l = byId(current.id); if (l) l.classList.add("is-active");
  }
  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(() => { updateActiveLink(); scrollTicking = false; }); }
  }, { passive: true });
  updateActiveLink();

  /* ── Formular-Validierung + mailto ── */
  const form = $("#contact-form");
  const status = $("#form-status");

  function isEmail(value) {
    const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
    return re.test(value);
  }

  function recipient() {
    const codes = [108, 111, 117, 105, 115, 109, 97, 108, 105, 110, 111, 119, 115, 107, 105, 49, 57, 57, 51, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
    return String.fromCharCode(...codes);
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form) return;
    status.textContent = "";

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    let ok = true;
    const setErr = (id, msg) => { const el = $("#error-" + id); el.textContent = msg || ""; if (msg) ok = false; };

    setErr("name", name.length >= 2 ? "" : t('err-name'));
    setErr("email", isEmail(email) ? "" : t('err-email'));
    setErr("message", message.length >= 10 ? "" : t('err-message'));

    if (!ok) return;

    const subject = encodeURIComponent(`${t('mailto-subject')}${name}`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`);

    const to = recipient();
    const url = `mailto:${to}?subject=${subject}&body=${body}`;

    const a = document.createElement("a");
    a.href = url; a.style.display = "none"; document.body.appendChild(a); a.click(); a.remove();

    form.reset();
    status.textContent = t('contact-status-success');
  });
})();
