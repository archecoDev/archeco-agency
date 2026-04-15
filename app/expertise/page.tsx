import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScriptRunner from "@/components/ScriptRunner";

export const metadata = {
  title: "Expertise - ARCHECO",
  description: "Six disciplines. Research, Service Design, Interface, Build, Strategy, AI Systems.",
};

const pageContent = `<style>
/* DISCIPLINES */
.disc-list { border-bottom: 1px solid var(--line); }
.disc-item { display: grid; grid-template-columns: clamp(36px,4vw,56px) 1fr auto; align-items: start; gap: 0 clamp(16px,3vw,48px); padding: clamp(20px,3vw,36px) var(--gutter); border-top: 1px solid var(--line); cursor: none; position: relative; overflow: hidden; }
.disc-item::before { content: ''; position: absolute; inset: 0; background: var(--white); transform: scaleY(0); transform-origin: bottom; transition: transform .45s var(--ease); z-index: 0; }
.disc-item:hover::before { transform: scaleY(1); }
.disc-item > * { position: relative; z-index: 1; }
.disc-num { font-family: var(--fc); font-size: .625rem; font-weight: 700; letter-spacing: .2em; color: var(--muted); padding-top: 8px; }
.disc-name { font-family: var(--fd); font-weight: 200; font-size: clamp(1.5rem,3vw,4rem); line-height: 1; letter-spacing: -.03em; transition: letter-spacing .4s var(--ease); }
.disc-item:hover .disc-name { letter-spacing: -.01em; }
.disc-body { max-height: 0; overflow: hidden; transition: max-height .5s var(--ease), opacity .35s; opacity: 0; }
.disc-item:hover .disc-body { max-height: 120px; opacity: 1; }
.disc-desc { font-family: var(--fb); font-size: .9rem; color: var(--mid); line-height: 1.8; max-width: 560px; padding-top: 10px; }
.disc-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; padding-top: 8px; }
.disc-cat { font-family: var(--fc); font-size: .625rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
.disc-arr { font-size: 1rem; color: var(--muted); transition: transform .35s var(--ease), color .25s; }
.disc-item:hover .disc-arr { transform: translate(4px,-4px); color: var(--black); }

/* PROCESS & CAPABILITIES */
.s3, .s4 { display: block; padding: clamp(80px,11vw,160px) var(--gutter); border-bottom: 1px solid var(--line); }

/* CTA */
.s5 { padding: clamp(80px,11vw,160px) var(--gutter); display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px,6vw,100px); align-items: end; border-bottom: 1px solid var(--line); }
.s5-r { display: flex; flex-direction: column; gap: 24px; }

@media (max-width: 900px) {
  .disc-item { grid-template-columns: 1fr; gap: 16px; padding-bottom: 40px; }
  .disc-meta { align-items: flex-start; flex-direction: row; justify-content: space-between; padding-top: 16px; }
  .disc-body { max-height: none; opacity: 1; }
  .s5, .step-grid, .cap-grid { grid-template-columns: 1fr !important; }
}
</style>
<script>
(function(){
  var sio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');sio.unobserve(e.target);} });
  },{threshold:.25});
  document.querySelectorAll('.step').forEach(function(el){sio.observe(el);});
})();
</script>



<section class="page-hero" id="hero">
<div class="page-hero-body">
<div class="page-hero-kicker"><span class="pill-d pill">What we do</span></div>
<h1 class="page-hero-h1">Expertise.</h1>
<div class="page-hero-row">
<p class="page-hero-sub">Seven disciplines. One integrated studio.<br/>We help organisations design, build and evolve digital products, services and intelligent systems.</p>
<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
<a class="btn btn-w" href="/contact">Start a project <span class="arr">↗</span></a>
<a class="btn btn-ow" href="/projects">See our work</a>
</div>
</div>
</div>
</section>

<section aria-label="Disciplines" class="disc-list">
<div class="disc-item rv"><span class="disc-num">01</span><div class="disc-main"><div class="disc-name">UX Design</div><div class="disc-body"><p class="disc-desc">We study user behaviours, analyse journeys and design intuitive product experiences that connect user needs with business objectives.</p></div></div><div class="disc-meta"><span class="disc-cat">Design</span><span class="disc-arr">↗</span></div></div>
<div class="disc-item rv d1"><span class="disc-num">02</span><div class="disc-main"><div class="disc-name">Service Design</div><div class="disc-body"><p class="disc-desc">We design service ecosystems where platforms, processes and interactions work together seamlessly.</p></div></div><div class="disc-meta"><span class="disc-cat">Strategy</span><span class="disc-arr">↗</span></div></div>
<div class="disc-item rv"><span class="disc-num">03</span><div class="disc-main"><div class="disc-name">UI Systems</div><div class="disc-body"><p class="disc-desc">We craft scalable interface systems that bring structure, premium aesthetics, and consistency to digital applications, enhancing overall usability.</p></div></div><div class="disc-meta"><span class="disc-cat">Design</span><span class="disc-arr">↗</span></div></div>
<div class="disc-item rv d1"><span class="disc-num">04</span><div class="disc-main"><div class="disc-name">Product Prototyping</div><div class="disc-body"><p class="disc-desc">We transform ideas into tangible, interactive prototypes, allowing companies to quickly validate core concepts and technical feasibility before full-scale engineering.</p></div></div><div class="disc-meta"><span class="disc-cat">Build</span><span class="disc-arr">↗</span></div></div>
<div class="disc-item rv"><span class="disc-num">05</span><div class="disc-main"><div class="disc-name">User Testing</div><div class="disc-body"><p class="disc-desc">We conduct rigorous usability testing to observe real user interactions, validate design decisions autonomously, and continuously improve digital products.</p></div></div><div class="disc-meta"><span class="disc-cat">Research</span><span class="disc-arr">↗</span></div></div>
<div class="disc-item rv d1"><span class="disc-num">06</span><div class="disc-main"><div class="disc-name">AI Systems</div><div class="disc-body"><p class="disc-desc">We help organisations integrate artificial intelligence into their products and services to enhance capabilities, automation and decision making.</p></div></div><div class="disc-meta"><span class="disc-cat">Technology</span><span class="disc-arr">↗</span></div></div>
<div class="disc-item rv"><span class="disc-num">07</span><div class="disc-main"><div class="disc-name">AI Agents</div><div class="disc-body"><p class="disc-desc">We develop intelligent agents capable of assisting teams, analysing information and automating complex workflows.</p></div></div><div class="disc-meta"><span class="disc-cat">Technology</span><span class="disc-arr">↗</span></div></div>
</section>

<section class="s3">
<div class="sec-head">
<div>
<p class="t5 rv" style="margin-bottom:18px">Our approach</p>
<h2 class="t1 rv d1">How we work.</h2>
</div>
<p class="t4 rv d2">Every engagement follows a clear arc - from understanding to impact. Our process combines research, design, technology and strategy to transform ideas into working products.</p>
</div>
<div class="step-grid">
<div class="step"><span class="step-n">Step 01</span><div class="step-name">Discovery &amp; Framing</div><div class="cap-items"><span class="cap-item">User behaviour analysis</span><span class="cap-item">Problem definition</span><span class="cap-item">Competitive mapping</span></div></div>
<div class="step"><span class="step-n">Step 02</span><div class="step-name">Strategy &amp; Definition</div><div class="cap-items"><span class="cap-item">Design principles</span><span class="cap-item">Success metrics</span><span class="cap-item">Product roadmap</span></div></div>
<div class="step"><span class="step-n">Step 03</span><div class="step-name">Design &amp; Iterate</div><div class="cap-items"><span class="cap-item">Rapid prototyping</span><span class="cap-item">User validation</span><span class="cap-item">Iterative refinement</span></div></div>
<div class="step"><span class="step-n">Step 04</span><div class="step-name">Deliver &amp; Scale</div><div class="cap-items"><span class="cap-item">Implementation support</span><span class="cap-item">Growth loops</span><span class="cap-item">Impact evaluation</span></div></div>
</div>
</section>

<section class="s4">
<div class="sec-head">
<div>
<p class="t5 rv" style="margin-bottom:18px">Stack</p>
<h2 class="t1 rv d1">Tools &amp; technologies.</h2>
</div>
<p class="t4 rv d2">Our studio uses a modern ecosystem of design, development and AI tools. Driven by product thinking, we leverage these technologies to prototype, validate, and build the next generation of scalable digital platforms.</p>
</div>
<div class="cap-grid">
<div class="cap-card rv"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px"><span class="cap-lbl">Research</span><span class="cap-num">01</span></div><div class="cap-name">Insights &amp; Testing</div><div class="cap-items"><span class="cap-item">User behaviour analysis</span><span class="cap-item">Usability testing</span><span class="cap-item">Research synthesis</span></div></div>
<div class="cap-card rv d1"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px"><span class="cap-lbl">Design</span><span class="cap-num">02</span></div><div class="cap-name">Visual &amp; Experience</div><div class="cap-items"><span class="cap-item">Interface design</span><span class="cap-item">Motion systems</span><span class="cap-item">Visual exploration</span></div></div>
<div class="cap-card rv"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px"><span class="cap-lbl">Build</span><span class="cap-num">03</span></div><div class="cap-name">Prototype &amp; Dev</div><div class="cap-items"><span class="cap-item">Prototyping</span><span class="cap-item">Front-end development</span><span class="cap-item">Interactive systems</span></div></div>
<div class="cap-card rv d1"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px"><span class="cap-lbl">Strategy</span><span class="cap-num">04</span></div><div class="cap-name">Facilitation &amp; Planning</div><div class="cap-items"><span class="cap-item">Workshops</span><span class="cap-item">Product thinking</span><span class="cap-item">Strategic planning</span></div></div>
</div>
</section>

<section class="s7 sec-dark">
<div>
<p class="t5-w rv" style="margin-bottom:18px">Work with us</p>
<h2 class="s7-h rv d1">Have a project in mind?</h2>
</div>
<div class="s7-r">
<p class="t4 t4-w rv d1">Whether you are an international tech company or a startup exploring artificial intelligence, we partner with innovation teams to design the next generation of digital products, platforms and intelligent services.</p>
<div class="rv d2" style="display:flex;gap:12px;flex-wrap:wrap">
<a class="btn btn-w" href="/contact">Get in touch <span class="arr">↗</span></a>
<a class="btn btn-ow" href="/projects">See our work</a>
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
