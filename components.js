/* ════════════════════════════════════════════════════
   HOLDING VINICIUS — components.js
   Nav, WhatsApp FAB e Footer idênticos em todas as páginas
   ════════════════════════════════════════════════════ */

(function () {
  /* ─── WhatsApp SVG ─── */
  const WA_SVG = `<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  const ARROW_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ─── Detect current page ─── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const page = path.replace('.html', '') || 'index';

  /* ─── Nav links definition ─── */
  const NAV_LINKS = [
    { href: 'index.html',      label: 'Início',        id: 'index'   },
    { href: 'index.html#about', label: 'A Holding',    id: 'about'   },
    { href: 'index.html#portfolio', label: 'Empresas', id: 'portfolio' },
    { href: 'holding.html',    label: 'Como Funciona', id: 'holding' },
    { href: 'holding.html#faq', label: 'FAQ',          id: 'faq'     },
    { href: 'contato.html',    label: 'Contato',       id: 'contato', cta: true },
  ];

  /* ─── Build NAV HTML ─── */
  const navItems = NAV_LINKS.map(link => {
    const isActive = link.id === page || (page === 'index' && link.id === 'index');
    const cls = link.cta ? 'nav-cta' : (isActive ? 'nav-active' : '');
    return `<li><a href="${link.href}"${cls ? ` class="${cls}"` : ''}>${link.label}</a></li>`;
  }).join('\n      ');

  const NAV_HTML = `
<div class="loader" id="loader">
  <div class="loader-inner">
    <div class="loader-logo"><span class="loader-c">V</span><span class="loader-name">INICIUS</span></div>
    <div class="loader-bar"><div class="loader-bar-fill"></div></div>
    <p class="loader-sub">Holding Vinicius · Grupo Empresarial</p>
  </div>
</div>

<a href="https://wa.me/5577991347726" class="whatsapp-fab" target="_blank" title="Chamar no WhatsApp">${WA_SVG}</a>

<div class="drawer-close-btn" id="drawerClose" onclick="closeMenu()">✕</div>

<nav id="mainNav">
  <a href="index.html" class="nav-logo">
    <span class="nav-logo-main">VINICIUS</span>
    <span class="nav-logo-sub">VINICIUS</span>
  </a>
  <ul class="nav-links" id="navLinks">
      ${navItems}
  </ul>
  <div class="hamburger" id="hamburger" onclick="toggleMenu()">
    <span></span><span></span><span></span>
  </div>
</nav>`;

  /* ─── Build FOOTER HTML ─── */
  const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand-col">
        <div class="footer-brand-name">HOLDING</div>
        <div class="footer-brand-sub">Holding Vinicius · Grupo Empresarial</div>
        <p class="footer-brand-desc">Grupo empresarial com foco em organização, crescimento e gestão estratégica de negócios diversificados.</p>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Navegação</div>
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="index.html#about">A Holding</a></li>
          <li><a href="index.html#mvv">Missão &amp; Valores</a></li>
          <li><a href="index.html#portfolio">Empresas</a></li>
          <li><a href="holding.html">Como Funciona</a></li>
          <li><a href="holding.html#faq">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Empresas</div>
          <ul>
            <li><a href="empresa-tech.html">Vinicius Tech</a></li>
            <li><a href="empresa-alimentos.html">Vinicius Alimentos</a></li>
            <li><a href="empresa-construcao.html">Vinicius Construções</a></li>
            <li><a href="empresa-saude.html">Vinicius Saúde</a></li>
            <li><a href="empresa-educacao.html">Vinicius Educação</a></li>
            <li><a href="empresa-logistica.html">Vinicius Logística</a></li>
            <li><a href="empresa-agro.html">Vinicius Agro</a></li>
            <li><a href="empresa-marketing.html">Vinicius Marketing</a></li>
          </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Contato</div>
        <ul>
          <li><a href="https://wa.me/5577991347726">(77) 99134-7726</a></li>
          <li><a href="mailto:contato@holdingvinicius.com.br">contato@holdingvinicius.com.br</a></li>
          <li><a href="contato.html">Enviar mensagem</a></li>
          <li><a href="legal.html#privacidade">Política de Privacidade</a></li>
          <li><a href="legal.html#termos">Termos de Uso</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2025 Holding Vinicius. Todos os direitos reservados.</p>
      <div class="footer-legal">
        <a href="legal.html#privacidade">Privacidade</a>
        <a href="legal.html#termos">Termos</a>
      </div>
    </div>
  </div>
</footer>`;

  /* ─── Inject into page ─── */
  function inject() {
    // NAV — inject before body content (prepend to body)
    const navTarget = document.getElementById('nav-placeholder');
    if (navTarget) {
      navTarget.outerHTML = NAV_HTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
    }

    // FOOTER — inject at end of body
    const footerTarget = document.getElementById('footer-placeholder');
    if (footerTarget) {
      footerTarget.outerHTML = FOOTER_HTML;
    } else {
      // Replace any existing <footer> or append
      const existingFooter = document.querySelector('footer');
      if (existingFooter) {
        existingFooter.outerHTML = FOOTER_HTML;
      } else {
        document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
      }
    }

    // Remove old nav/loader/fab that might exist from static HTML
    document.querySelectorAll('[data-static]').forEach(el => el.remove());
  }

  /* ─── Run immediately if DOM ready, else wait ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
