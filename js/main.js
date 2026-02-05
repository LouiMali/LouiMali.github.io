/* Main JS – Smooth Scroll, Mobile Menu, Active-Links, GitHub Repos, Form-Validierung + mailto */
(() => {
  const $  = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  /* Footer-Jahr */
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* Smooth-Scroll (Nav + CTA) */
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

  /* Mobile-Menü */
  const nav = $("#site-nav");
  const toggle = $(".nav__toggle");
  function openMenu(){ nav.classList.add("is-open"); toggle.classList.add("is-open"); toggle.setAttribute("aria-expanded","true"); toggle.setAttribute("aria-label","Menü schliessen"); }
  function closeMenu(){ nav.classList.remove("is-open"); toggle.classList.remove("is-open"); toggle.setAttribute("aria-expanded","false"); toggle.setAttribute("aria-label","Menü öffnen"); }
  toggle.addEventListener("click", () => (toggle.getAttribute("aria-expanded")==="true"? closeMenu():openMenu()));
  document.addEventListener("click", (e) => { if (toggle.getAttribute("aria-expanded")==="true" && !nav.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* Active-Link beim Scrollen */
  const sections = $$("#start, #ueber-mich, #projekte, #lebenslauf, #kontakt");
  const navLinks = $$(".nav__link");
  const byId = id => navLinks.find(a => a.getAttribute('href') === `#${id}`);
  function updateActiveLink(){
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
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* GitHub-Repos laden (Forks ausblenden) */
  const reposEl = $("#repos");
  const fallback = $("#repo-fallback");
  const API = "https://api.github.com/users/LouiMali/repos?sort=updated&per_page=100";

  fetch(API, { headers: { "Accept":"application/vnd.github+json" } })
    .then(async res => {
      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try { const data = await res.json(); if (data && data.message) msg = data.message; } catch(_){}
        throw new Error(msg);
      }
      return res.json();
    })
    .then(list => {
      const repos = list.filter(r => !r.fork);
      if (!repos.length) throw new Error("Keine Repositories gefunden.");
      reposEl.innerHTML = "";
      reposEl.removeAttribute("aria-busy");

      repos.forEach(r => {
        const card = document.createElement("article");
        card.className = "card";
        card.setAttribute("role","listitem");
        card.innerHTML = `
          <h3 class="card__title"><a href="${r.html_url}" target="_blank" rel="noopener">${escapeHTML(r.name)}</a></h3>
          <p class="card__text">${escapeHTML(r.description || "Keine Beschreibung vorhanden")}</p>
          <div class="card__meta">
            ${r.language ? `<span class="lang-badge"><span class="lang-dot" style="background:${langColor(r.language)}"></span>${escapeHTML(r.language)}</span>` : ""}
            ${r.stargazers_count ? `<span class="star" aria-label="Sterne">★ ${r.stargazers_count}</span>` : ""}
          </div>
        `;
        reposEl.appendChild(card);
      });
    })
    .catch(err => {
      reposEl?.setAttribute("aria-busy","false");
      if (fallback) fallback.hidden = false;
      console.warn("GitHub API Fehler:", err?.message || err);
    });

  function langColor(lang){
    const map = {"JavaScript":"#f1e05a","TypeScript":"#3178c6","Python":"#3572A5","Java":"#b07219","C":"#555555","C++":"#f34b7d","Go":"#00ADD8","HTML":"#e34c26","CSS":"#563d7c","Shell":"#89e051","Rust":"#dea584","Kotlin":"#A97BFF","PHP":"#4F5D95"};
    return map[lang] || "#7aa2ff";
  }
  function escapeHTML(str){ return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[s])); }

  /* Formular-Validierung + mailto */
  const form = $("#contact-form");
  const status = $("#form-status");

  function isEmail(value){
    const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
    return re.test(value);
  }

  function recipient(){
    const codes = [108,111,117,105,115,109,97,108,105,110,111,119,115,107,105,49,57,57,51,64,103,109,97,105,108,46,99,111,109];
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
    const setErr = (id, msg) => { const el = $("#error-"+id); el.textContent = msg || ""; if (msg) ok = false; };

    setErr("name", name.length >= 2 ? "" : "Bitte einen gueltigen Namen angeben (min. 2 Zeichen).");
    setErr("email", isEmail(email) ? "" : "Bitte eine gueltige E-Mail angeben.");
    setErr("message", message.length >= 10 ? "" : "Bitte eine Nachricht mit mind. 10 Zeichen schreiben.");

    if (!ok) return;

    const subject = encodeURIComponent(`Bewerbung IT-Praktikum – Nachricht von ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`);

    const to = recipient();
    const url = `mailto:${to}?subject=${subject}&body=${body}`;

    const a = document.createElement("a");
    a.href = url; a.style.display = "none"; document.body.appendChild(a); a.click(); a.remove();

    form.reset();
    status.textContent = "Danke! Ihre E-Mail wurde vorbereitet. Bitte pruefen Sie Ihr E-Mail-Programm.";
  });
})();
