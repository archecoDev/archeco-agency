import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScriptRunner from "@/components/ScriptRunner";

export const metadata = {
  title: "ARCHECO — Design, Technology & AI Studio | Tokyo & Malta",
  description: "ARCHECO is an independent design, technology and AI studio based in Tokyo and Malta. Senior team. Serious craft. We design the next generation of digital products, services and intelligent systems.",
};

const pageContent = `<style>
    /* ── HERO ────────────────────────────────────────── */
    .s1 {
      height: 100svh;
      min-height: 600px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .s1-img-wrap {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .s1-video {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 115%;
      object-fit: cover;
      object-position: center;
      filter: brightness(.32);
      will-change: transform;
    }

    .s1-grad {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(to top, rgba(0, 0, 0, .82) 0%, rgba(0, 0, 0, .18) 45%, transparent 70%), linear-gradient(to right, rgba(0, 0, 0, .18) 0%, transparent 55%);
    }

    .s1-grain {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.032'/%3E%3C/svg%3E");
      background-size: 260px;
    }

    .s1-body {
      position: relative;
      z-index: 3;
      padding: 0 var(--gutter);
    }

    .s1-kicker {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      opacity: 0;
      animation: fuA .7s .1s var(--ease) both;
    }

    .s1-h1 {
      font-family: var(--fd);
      font-weight: 200;
      font-size: clamp(4rem, 10.4vw, 14.4rem);
      line-height: .84;
      letter-spacing: -.04em;
      color: #fff;
    }

    .s1-h1 .ch {
      display: inline-block;
      opacity: 0;
      animation: chIn 1s var(--ease) forwards;
    }

    @keyframes chIn {
      from {
        opacity: 0;
        transform: translateY(16px);
        filter: blur(3px);
      }

      to {
        opacity: 1;
        transform: none;
        filter: blur(0);
      }
    }

    .s1-sub {
      font-family: var(--fb);
      font-weight: 300;
      font-size: clamp(.9rem, 1.2vw, 1.05rem);
      color: rgba(255, 255, 255, .45);
      line-height: 1.85;
      max-width: 50%;
      margin-top: 18px;
      opacity: 0;
      animation: fuA .9s .55s var(--ease) both;
    }

    .s1-foot {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 24px;
      opacity: 0;
      animation: fuA .8s .7s var(--ease) both;
    }

    .s1-sig {
      font-family: var(--fc);
      font-size: .625rem;
      font-weight: 300;
      letter-spacing: .12em;
      color: rgba(255, 255, 255, .22);
    }

    /* ── S2 ABOUT SPLIT ─────────────────────────────── */
    .s2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid var(--line);
    }

    .s2-l {
      padding: clamp(72px, 10vw, 140px) var(--gutter);
      border-right: 1px solid var(--line);
    }

    .s2-r {
      padding: clamp(72px, 10vw, 140px) var(--gutter);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 28px;
    }

    /* ── S3 SERVICES ────────────────────────────────── */
    .s3 {
      display: block;
      padding: clamp(72px, 10vw, 140px) var(--gutter);
      border-bottom: 1px solid var(--line);
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    .card {
      background: var(--bg2);
      border-radius: var(--r);
      padding: 28px 24px 32px;
      border: 1px solid var(--line);
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: none;
      position: relative;
      overflow: hidden;
      transition: transform .45s var(--ease), box-shadow .45s, background .3s;
    }

    .card::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--bronze), transparent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .45s var(--ease);
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(10, 10, 9, .06);
      background: var(--white);
    }

    .card:hover::before {
      transform: scaleX(1);
    }

    .card.feat {
      grid-column: span 2;
      background: var(--black);
      flex-direction: row;
      gap: 32px;
      align-items: center;
    }

    .card.feat:hover {
      background: #1a1a18;
    }

    .c-label {
      font-family: var(--fc);
      font-size: .625rem;
      font-weight: 700;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(--muted);
      padding: 4px 12px;
      border-radius: 999px;
      border: 1px solid var(--line);
      width: fit-content;
    }

    .card.feat .c-label {
      color: rgba(255, 255, 255, .3);
      border-color: rgba(255, 255, 255, .1);
    }

    .c-name {
      font-family: var(--fd);
      font-weight: 300;
      font-size: clamp(1.1rem, 1.6vw, 1.5rem);
      letter-spacing: -.02em;
      line-height: 1.1;
      color: var(--black);
    }

    .card.feat .c-name {
      color: #fff;
      font-size: clamp(1.4rem, 2.5vw, 2.6rem);
    }

    .c-desc {
      font-family: var(--fb);
      font-size: .875rem;
      color: var(--mid);
      line-height: 1.8;
      flex: 1;
    }

    .card.feat .c-desc {
      color: rgba(255, 255, 255, .4);
    }

    .c-num {
      font-family: var(--fd);
      font-weight: 200;
      font-size: clamp(2.5rem, 4vw, 5rem);
      letter-spacing: -.06em;
      line-height: 1;
      color: rgba(10, 10, 9, .06);
      margin-top: auto;
    }

    .card.feat .c-num {
      color: rgba(255, 255, 255, .05);
      font-size: clamp(5rem, 10vw, 12rem);
      align-self: flex-end;
    }

    /* ── S4 CLIENTS + STATS ─────────────────────────── */
    .s4 {
      border-bottom: 1px solid var(--line);
    }

    .s4-logos {
      padding: 0;
      border-bottom: 0;
    }

    .s4-logos .s5-head {
      padding: 0;
      margin-bottom: clamp(24px, 3vw, 40px);
    }

    .s4-logos .clients-grid {
      grid-template-columns: repeat(6, 1fr);
    }
    
    .s4-logos .client-cell:nth-child(n) {
      border-right: 1px solid var(--line);
    }
    
    .s4-logos .client-cell:nth-child(6n) {
      border-right: none;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    .s5 .slide {
      flex: 0 0 calc((100vw - 2 * var(--gutter) - 3 * clamp(16px, 2vw, 24px)) / 4);
    }

    .stat {
      padding: clamp(36px, 5vw, 64px) clamp(20px, 3vw, 44px);
      border-right: 1px solid var(--line);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat:last-child {
      border-right: none;
    }

    .stat-n {
      font-family: var(--fd);
      font-weight: 200;
      font-size: clamp(2.8rem, 5vw, 7rem);
      line-height: .82;
      letter-spacing: -.06em;
      color: var(--black);
    }

    .stat-l {
      font-family: var(--fc);
      font-size: .625rem;
      font-weight: 700;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .stat-d {
      font-family: var(--fb);
      font-size: .8125rem;
      font-weight: 300;
      color: var(--mid);
      line-height: 1.6;
    }

    /* ── S5 PROJECTS ────────────────────────────────── */
    .s5 {
      background: var(--dark);
      padding-top: clamp(64px, 9vw, 120px);
      padding-bottom: clamp(64px, 9vw, 120px);
    }

    .s5-head {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: clamp(32px, 5vw, 80px);
      padding: 0 var(--gutter) clamp(28px, 4vw, 48px);
    }

    /* ── S6 CTA ─────────────────────────────────────── */
    .s6 {
      background: var(--black);
      padding: clamp(100px, 14vw, 190px) var(--gutter);
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid var(--line);
      display: grid;
      grid-template-columns: 1fr; /* IMPORTANT */
      justify-items: center;      /* centre horizontal */
      align-items: center;        /* centre vertical */
    }

    .s6-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 60% 55% at 50% 100%, rgba(155, 111, 58, .22), transparent 70%);
      pointer-events: none;
    }

    .s6-body {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1000px;
      text-align: center;
    }

    .s6-p {
      font-family: var(--fb);
      font-weight: 300;
      font-size: clamp(.9rem, 1.1vw, 1rem);
      color: rgba(255, 255, 255, .32);
      line-height: 1.85;
      margin: 18px 0 44px;
    }

    .s6-btns {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 30px;
    }

    @media (max-width: 1024px) {
      .cards { grid-template-columns: repeat(2, 1fr); }
      .card.feat { grid-column: span 2; }
      .s4-logos .clients-grid { grid-template-columns: repeat(3, 1fr); }
      .s4-logos .client-cell:nth-child(n) { border-right: 1px solid var(--line); }
      .s4-logos .client-cell:nth-child(3n) { border-right: none; }
    }
    @media (max-width: 768px) {
      .s1-h1 { font-size: clamp(3.2rem, 12vw, 5rem); }
      .s1-sub { max-width: 100%; margin-top: 24px; }
      .s1-foot { flex-direction: column; align-items: flex-start; gap: 20px; }
      .s2 { grid-template-columns: 1fr; }
      .s2-l, .s2-r { padding: 60px var(--gutter); }
      .s2-l { border-right: none; border-bottom: 1px solid var(--line); }
      .cards { grid-template-columns: 1fr; }
      .card.feat { grid-column: span 1; flex-direction: column; align-items: flex-start; gap: 20px; }
      .card.feat .c-num { align-self: flex-start; font-size: 5rem; margin-top: 0; }
      .s4-logos .clients-grid { grid-template-columns: repeat(2, 1fr); }
      .s4-logos .client-cell:nth-child(3n) { border-right: 1px solid var(--line); }
      .s4-logos .client-cell:nth-child(2n) { border-right: none; }
      .stats { grid-template-columns: 1fr; }
      .s5 .slide { flex: 0 0 80%; }
      .s6 { padding: 80px var(--gutter); }
    }
  </style>
<script>
    (function () {
      var h1 = document.querySelector('.s1-h1');
      if (!h1) return;
      var text = (h1.dataset.text || h1.textContent).trim().replace(/\\s+/g, ' ');
      var words = text.split(' ');
      var html = '';
      var li = 0;
      words.forEach(function (w, wi) {
        var wh = '';
        for (var i = 0; i < w.length; i++) {
          var ch = w[i], safe = ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '&' ? '&amp;' : ch;
          wh += '<span class="ch" style="animation-delay:' + (li * 0.055).toFixed(3) + 's">' + safe + '</span>';
          li++;
        }
        html += '<span style="display:inline-block;white-space:nowrap">' + wh + '</span>';
        if (wi < words.length - 1) html += ' ';
      });
      h1.innerHTML = html;
      window.addEventListener('scroll', function () { document.getElementById('hero-vid').style.transform = 'translateY(' + (window.scrollY * .08) + 'px)'; }, { passive: true });
    })();
  </script>





<div aria-modal="true" id="lb" role="dialog"><button aria-label="Close" id="lb-x">Close ✕</button><img alt="ARCHECO" src=""/></div>

<section aria-labelledby="s1-h1" class="s1" id="hero">
<div class="s1-img-wrap">
<video autoplay="" class="s1-video" id="hero-vid" loop="" muted="" playsinline="">
<source src="/media/common/video-home-p.mp4" type="video/mp4"/>
</video>
</div>
<div aria-hidden="true" class="s1-grad"></div>
<div aria-hidden="true" class="s1-grain"></div>
<div class="s1-body">
<div class="s1-kicker">
<span class="pill-d pill">Archeco</span>
<span style="font-family:var(--fc);font-size:.625rem;letter-spacing:.1em;color:rgba(255,255,255,.28);">Independent
          studio - Tokyo &amp; Europe</span>
</div>
<h1 class="s1-h1 t1" data-text="Creating intelligent products and services to boost business." id="s1-h1">Creating
        intelligent products and services to boost business.</h1>
<p class="s1-sub">Archeco is an international design, technology and AI studio helping organisations design the
        next generation of digital products, services and intelligent systems.
      </p>
<div class="s1-foot">
<span class="s1-sig">Est. 2012 - Tokyo &amp; Malta.</span>
<div style="display:flex;gap:10px">
<a class="btn btn-w" href="/contact">Start a project <span class="arr">↗</span></a>
</div>
</div>
</div>
</section>

<div aria-label="Expertises" class="ticker">
<div class="tk-row">
<div class="tk-track">
<span class="tk-item"><span class="tk-pill">Design</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Technology</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Strategy</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">AI Systems</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Product Innovation</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Service Design</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Human-Centered AI</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Digital Transformation</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Design</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Technology</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Strategy</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">AI Systems</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Product Innovation</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Service Design</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Human-Centered AI</span><span class="tk-dot"></span></span>
<span class="tk-item"><span class="tk-pill">Digital Transformation</span><span class="tk-dot"></span></span>
</div>
</div>
</div>

<section aria-label="About Archeco" class="s2">
<div class="s2-l">
<p class="t5 rv" style="margin-bottom:20px">The Studio</p>
<h2 class="t1 rv d1">Design + Intelligence<br/>⥟ Systems</h2>
</div>
<div class="s2-r">
<p class="t4 rv d1" style="max-width:440px">Archeco is an independent studio combining Japanese precision with
        international collaboration. We partner with organisations worldwide to deliver product thinking, AI systems
        expertise, and innovation, designing digital products and AI agents that drive strategic growth.</p>
<div class="rv d2" style="display:flex;gap:12px;flex-wrap:wrap">
<a class="btn btn-blk" href="/contact">Start a project <span class="arr">↗</span></a>
<a class="btn btn-out" href="/projects">See our work</a>
</div>
</div>
</section>

<section aria-label="Services" class="s3">
<div class="sec-head">
<div>
<p class="t5 rv" style="margin-bottom:14px">Expertise</p>
<h2 class="t1 rv d1">What we do.</h2>
</div>
<a class="btn btn-out rv" href="/expertise" style="width:fit-content;align-self:flex-end">All services <span class="arr">↗</span></a>
</div>
<div class="cards">
<article class="card rv"><span class="c-label">Design</span>
<h3 class="c-name">UX Design</h3>
<p class="c-desc">We apply product thinking and deep research to design intuitive experiences, helping
          international teams create intelligent services that solve real problems.</p>
<div class="c-num">01</div>
</article>
<article class="card rv d1"><span class="c-label">Design</span>
<h3 class="c-name">Service Design</h3>
<p class="c-desc">We map and build comprehensive digital systems, connecting human interactions with AI-powered
          processes to deliver innovative and strategic services.</p>
<div class="c-num">02</div>
</article>
<article class="card rv d2"><span class="c-label">Design</span>
<h3 class="c-name">UI Systems</h3>
<p class="c-desc">With Japanese precision, we design scalable and refined interface systems that bring clarity,
          consistency, and a premium feel to complex platforms.</p>
<div class="c-num">03</div>
</article>
<article class="card rv d3"><span class="c-label">Build</span>
<h3 class="c-name">Product Prototyping</h3>
<p class="c-desc">We rapidly transform innovative ideas into tangible, high-quality digital products, validating
          strategic concepts before engaging in full-scale execution.</p>
<div class="c-num">04</div>
</article>
<article class="card rv"><span class="c-label">Research</span>
<h3 class="c-name">User Testing</h3>
<p class="c-desc">We carefully observe and analyse user interactions to refine product logic, ensuring digital
          platforms remain highly usable and globally relevant.</p>
<div class="c-num">05</div>
</article>
<article class="card rv d1"><span class="c-label">Technology</span>
<h3 class="c-name">AI Systems</h3>
<p class="c-desc">We design and integrate sophisticated artificial intelligence frameworks, enabling companies
          to build intelligent features that enhance daily operations.</p>
<div class="c-num">06</div>
</article>
<article class="card feat rv d2">
<div><span class="c-label">New</span>
<h3 class="c-name" style="margin-top:14px">AI Agents</h3>
<p class="c-desc" style="margin-top:10px">We develop autonomous and interactive AI agents that fundamentally
            change how users engage with technology. By combining our design expertise with advanced AI capabilities, we
            shape the next generation of intelligent product experiences.</p><a class="btn btn-w" href="/contact" style="margin-top:20px">Start a project <span class="arr">↗</span></a>
</div>
<div class="c-num" style="font-size:clamp(5rem,10vw,12rem);margin-top:0">07</div>
</article>
</div>
</section>

<section class="s4">
<div class="s5-head">
<div>
<p class="t5 rv" style="margin-bottom:14px">Selected clients</p>
<h2 class="t1 rv d1">Clients &amp;<br/>Collaborations</h2>
</div>
<p class="t4 rv d2" style="max-width:300px">Enterprise and government organisations across Japan, Europe and beyond.</p>
</div>
<div class="s4-logos">
<div class="clients-grid rv is-reveal in">
<div class="client-cell"><span class="client-name">HONDA</span></div>
<div class="client-cell"><span class="client-name">glamo</span></div>
<div class="client-cell"><span class="client-name">FUJITSU</span></div>
<div class="client-cell"><span class="client-name">TOSHIBA</span></div>
<div class="client-cell"><span class="client-name">SHISEIDO</span></div>
<div class="client-cell"><span class="client-name">SHARP</span></div>
<div class="client-cell"><span class="client-name">FUJI xerox</span></div>
<div class="client-cell"><span class="client-name">Panasonic</span></div>
<div class="client-cell"><span class="client-name">SPACE SHOWER MUSIC</span></div>
<div class="client-cell"><span class="client-name">CAC</span></div>
<div class="client-cell"><span class="client-name">SOCKETS</span></div>
<div class="client-cell"><span class="client-name">GLOBE-TROTTER</span></div>
<div class="client-cell"><span class="client-name">TerraSky</span></div>
<div class="client-cell"><span class="client-name">EMET Creation</span></div>
<div class="client-cell"><span class="client-name">Share</span></div>
<div class="client-cell"><span class="client-name">NTT Communications</span></div>
<div class="client-cell"><span class="client-name">Rakuten</span></div>
<div class="client-cell"><span class="client-name">KDDI</span></div>
<div class="client-cell"><span class="client-name">Isetan Mitsukoshi</span></div>
<div class="client-cell"><span class="client-name">Daimaru Matsuzakaya</span></div>
<div class="client-cell"><span class="client-name">JR East</span></div>
<div class="client-cell"><span class="client-name">SCSK</span></div>
<div class="client-cell"><span class="client-name">Hiroshima Bank</span></div>
<div class="client-cell"><span class="client-name">transcosmos</span></div>
<div class="client-cell"><span class="client-name">Recruit Communications</span></div>
<div class="client-cell"><span class="client-name">King Jim</span></div>
<div class="client-cell"><span class="client-name">USEN</span></div>
<div class="client-cell"><span class="client-name">WOWOW</span></div>
<div class="client-cell"><span class="client-name">NAKED</span></div>
<div class="client-cell"><span class="client-name">Agoop</span></div>
<div class="client-cell"><span class="client-name">mixi</span></div>
<div class="client-cell"><span class="client-name">Business Alliance</span></div>
<div class="client-cell"><span class="client-name">BSP Solutions</span></div>
</div>
</div>
<div class="stats">
<div class="stat rv">
<div class="stat-n"><span data-cnt="12" data-sf="+">12+</span></div>
<div class="stat-l">Years Experience</div>
<div class="stat-d">Over a decade designing digital products across multiple industries.</div>
</div>
<div class="stat rv d1">
<div class="stat-n"><span data-cnt="80" data-sf="+">80+</span></div>
<div class="stat-l">Projects Delivered</div>
<div class="stat-d">From early-stage startups to complex enterprise platforms.</div>
</div>
<div class="stat rv d2">
<div class="stat-n"><span data-cnt="2">2</span></div>
<div class="stat-l">Studios</div>
<div class="stat-d">Tokyo and Malta - connecting Japanese design culture with European innovation.</div>
</div>
<div class="stat rv d3">
<div class="stat-n"><span data-cnt="45" data-sf="+">45+</span></div>
<div class="stat-l">Clients</div>
<div class="stat-d">Long-term collaborations with organisations that value thoughtful design.</div>
</div>
</div>
</section>

<section aria-label="Selected projects" class="s5">
<div class="s5-head">
<div>
<p class="t5-w rv" style="margin-bottom:14px">Selected work.</p>
<h2 class="t1 t1-w rv d1">Projects.</h2>
</div>
<a class="btn btn-ow rv" href="/projects">View all <span class="arr">↗</span></a>
</div>
<div class="car-wrap">
<div class="car-ctrl">
<div class="car-prog-wrap">
<div class="car-prog-fill"></div>
</div>
<div class="car-nav">
<button aria-label="Previous" class="car-btn js-prev">←</button>
<button aria-label="Next" class="car-btn js-next">→</button>
</div>
</div>
<div class="carousel" id="car1">
  <div class="car-track">
    <div class="slide">
      <a class="pj" href="/projects/fam" data-cats="ux-ui strategy service-design venture">
        <div class="pj-img"><img alt="FAM, Athlete Food Performance Delivery" loading="lazy" src="/media/projects/fam/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">UX/UI</span><span class="pj-tag">Brand</span></div>
            <div class="pj-name">FAM, Athlete Food Performance Delivery</div>
            <div class="pj-sub">Premium Athlete Food Delivery service for professional performance.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2024</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
    <div class="slide">
      <a class="pj" href="/projects/ohbag" data-cats="ux-ui venture strategy service-design app">
        <div class="pj-img"><img alt="OHBAG, Innovative Luggage Delivery Service" loading="lazy" src="/media/projects/ohbag/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">App</span><span class="pj-tag">Sustainable</span></div>
            <div class="pj-name">OHBAG, Innovative Luggage Delivery</div>
            <div class="pj-sub">Relieving inbound luggage stress for seamless travel experiences.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2025</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
    <div class="slide">
      <a class="pj" href="/projects/llm-content-saas" data-cats="saas ai cx strategy">
        <div class="pj-img"><img alt="LLM Content Generation Platform" loading="lazy" src="/media/projects/llm-saas-content-generation/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">SaaS</span><span class="pj-tag">AI</span></div>
            <div class="pj-name">LLM SaaS — Content Generation</div>
            <div class="pj-sub">Strategic development of an AI-driven content generation platform for enterprise teams.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2024</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
    <div class="slide">
      <a class="pj" href="/projects/ai-service-research-saas" data-cats="ai strategy research development">
        <div class="pj-img"><img alt="AI Service Research Dashboard" loading="lazy" src="/media/projects/ai-research-saas-b2b-platform/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">AI</span><span class="pj-tag">Research</span></div>
            <div class="pj-name">AI Research — Knowledge System</div>
            <div class="pj-sub">Transforming fragmented research data into intelligent, actionable insights using LLMs.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2024</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
    <div class="slide">
      <a class="pj" href="/projects/tsutaya_app_redesigna" data-cats="app ux-ui strategy mobile">
        <div class="pj-img"><img alt="TSUTAYA App Redesign" loading="lazy" src="/media/projects/tsutaya_app_redesigna/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">App</span><span class="pj-tag">UX/UI</span></div>
            <div class="pj-name">TSUTAYA — Unified Experience</div>
            <div class="pj-sub">Complete UX/UI overhaul of one of Japan's leading retail platforms.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2024</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
    <div class="slide">
      <a class="pj" href="/projects/ur_app_redesigna" data-cats="app ux-ui strategy housing">
        <div class="pj-img"><img alt="UR Housing Resident App" loading="lazy" src="/media/projects/ur_app_redesigna/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">App</span><span class="pj-tag">UX/UI</span></div>
            <div class="pj-name">UR Housing — Resident App</div>
            <div class="pj-sub">Streamlining resident communication and building management through design.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2024</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
    <div class="slide">
      <a class="pj" href="/projects/walkcoin" data-cats="app health incentive mobile">
        <div class="pj-img"><img alt="Walkcoin Health Incentive App" loading="lazy" src="/media/projects/walkcoin/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">App</span><span class="pj-tag">Health</span></div>
            <div class="pj-name">Walkcoin — Health Incentive</div>
            <div class="pj-sub">Redesigning global health gamification experiences for millions of users.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2024</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
    <div class="slide">
      <a class="pj" href="/projects/carite" data-cats="app strategy ux-ui fashion">
        <div class="pj-img"><img alt="CARITE, Apparel Sharing Brand" loading="lazy" src="/media/projects/carite/COVER.webp"/></div>
        <div class="pj-body">
          <div class="pj-info">
            <div class="pj-tags"><span class="pj-tag">App</span><span class="pj-tag">Strategy</span></div>
            <div class="pj-name">CARITE, Apparel Sharing Brand</div>
            <div class="pj-sub">Apparel sharing package strategy and co-creation project.</div>
          </div>
          <div class="pj-meta"><span class="pj-yr">2023</span><span class="pj-arr">↗</span></div>
        </div>
      </a>
    </div>
  </div>
</div>
</div>
</section>

<section aria-label="Contact" class="s6">
<div aria-hidden="true" class="s6-glow"></div>
<div class="s6-body">
<p class="t5-w rv" style="margin-bottom:20px">Get in touch</p>
<h2 class="t1 t1-w rv d1">Let's build<br/>something great.</h2>
<p class="s6-p rv d2">Let’s design the next generation of products and intelligent services together. We invite
        companies, European startups and innovation teams to collaborate.</p>
<div class="s6-btns rv d3"><a class="btn btn-w" href="/contact">Start a project <span class="arr">↗</span></a>
</div>
</div>
</section>`;

export default function Page() {
  return (
    <div>
      <Nav />
      <ScriptRunner html={pageContent} />
      <Footer />
    </div>
  );
}
