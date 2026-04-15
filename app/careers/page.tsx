import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScriptRunner from "@/components/ScriptRunner";

export const metadata = {
  title: "Careers - ARCHECO",
  description: "Careers at ARCHECO - Join a senior design, technology and AI studio. Open roles in Tokyo and Malta.",
};

const pageContent = `<style>
/* S2 WHY */
.s2 { display: block; padding: clamp(80px,11vw,160px) var(--gutter); border-bottom: 1px solid var(--line); }
.s2-head { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px,6vw,100px); align-items: end; margin-bottom: clamp(56px,8vw,112px); }

/* S3 JOBS */
.s3 { display: block; padding: clamp(80px,11vw,160px) var(--gutter); border-bottom: 1px solid var(--line); }
.s3-head { display: flex; flex-direction: column; align-items: flex-start; gap: 24px; margin-bottom: clamp(32px,5vw,56px); }
.job-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.jobs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.job-card { background: var(--bg2); padding: clamp(24px,3vw,40px); border-radius: var(--r); display: flex; flex-direction: column; gap: 24px; transition: background .3s, transform .3s; text-decoration: none; border: 1px solid var(--line); position: relative; overflow: hidden; }
.job-card:hover { background: #fff; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.05); }
.job-card[data-hidden="1"] { display: none; }
.job-card-top { display: flex; flex-direction: column; gap: 8px; }
.job-title { font-family: var(--fd); font-weight: 300; font-size: clamp(1.2rem,2vw,1.6rem); letter-spacing: -.02em; line-height: 1.1; color: var(--black); }
.job-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.job-tag { font-family: var(--fc); font-size: .5625rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); }
.job-tag.loc { border-color: rgba(155,111,58,.3); color: var(--bronze); }
.job-card-bot { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--line); }
.job-type { font-family: var(--fc); font-size: .6875rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
.job-arr { font-size: 1.1rem; color: var(--muted); transition: transform .3s var(--ease); }
.job-card:hover .job-arr { transform: translate(3px,-3px); color: var(--black); }

/* S4 CULTURE */
.s4 { display: block; padding: clamp(80px,11vw,160px) var(--gutter); border-bottom: 1px solid var(--line); }
.culture-grid { display: grid; grid-template-columns: repeat(12,1fr); gap: 10px; margin-top: clamp(48px,7vw,96px); }
.culture-img { border-radius: var(--r); overflow: hidden; background: var(--bg2); }
.culture-img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.8); transition: filter .5s, transform .8s var(--ease); }
.culture-img:hover img { filter: saturate(1); transform: scale(1.03); }
.ci-a { grid-column: span 6; aspect-ratio: 16/10; }
.ci-b { grid-column: span 6; aspect-ratio: 16/10; }
.ci-c { grid-column: span 4; aspect-ratio: 1/1; }
.ci-d { grid-column: span 4; aspect-ratio: 1/1; }
.ci-e { grid-column: span 4; aspect-ratio: 1/1; }

/* S5 FORM */
.s5 { display: block; background: var(--dark); padding: clamp(80px,11vw,160px) var(--gutter); }
.s5-inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(56px,8vw,120px); align-items: start; }
.form-fields { display: flex; flex-direction: column; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 8px; }
.field label { font-family: var(--fc); font-size: .6875rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.45); }
.field input, .field select, .field textarea { font-family: var(--fb); font-size: .9rem; font-weight: 300; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: var(--r); color: rgba(255,255,255,.85); padding: 13px 18px; outline: none; cursor: text; transition: background .2s, border-color .2s; -webkit-appearance: none; appearance: none; }
.field input::placeholder, .field textarea::placeholder { color: rgba(255,255,255,.2); }
.field input:focus, .field select:focus, .field textarea:focus { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.28); }
.field select { cursor: pointer; }
.field textarea { resize: vertical; min-height: 140px; }
.form-note { font-family: var(--fb); font-size: .8125rem; color: rgba(255,255,255,.22); line-height: 1.6; }

@media (max-width: 900px) {
  .s2-head, .s3-head, .culture-grid, .s5-inner, .sec > div, .step-grid, .jobs-grid { grid-template-columns: 1fr !important; gap: 32px; }
  .s2-head p, .s4 p, .s5-inner p, .sec p { max-width: 100% !important; }
  .job { flex-direction: column; align-items: flex-start; gap: 12px; }
  .job-r { width: 100%; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.03); }
  .ci-a, .ci-b, .ci-c, .ci-d, .ci-e { grid-column: span 12 !important; aspect-ratio: 16/10 !important; }
  .s3-head .job-filters { margin-top: 20px; }
}
</style>
<script>
(function(){
  var sio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');sio.unobserve(e.target);} });
  },{threshold:.25});
  document.querySelectorAll('.step').forEach(function(el){sio.observe(el);});

  var groups=document.querySelectorAll('[data-filter-group]');
  groups.forEach(function(group){
    var btns=group.querySelectorAll('[data-filter]');
    var scope=group.closest('section')||document;
    var items=scope.querySelectorAll('[data-cats]');
    btns.forEach(function(btn){
      btn.addEventListener('click',function(){
        var f=btn.dataset.filter;
        btns.forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        items.forEach(function(item){
          var cats=item.dataset.cats||'';
          item.dataset.hidden=(f==='all'||cats.indexOf(f)!==-1)?'':'1';
        });
      });
    });
  });
})();
</script>



<section class="page-hero" id="hero">
<div class="page-hero-body">
<div class="page-hero-kicker"><span class="pill-d pill">Join us</span></div>
<h1 class="page-hero-h1">Careers.</h1>
<div class="page-hero-row">
<p class="page-hero-sub">At Archeco, we believe great products are created by curious and multidisciplinary teams. We work at the intersection of design, technology and artificial intelligence to build meaningful digital products.</p>
<div style="text-align:right;flex-shrink:0">
<div style="font-family:var(--fd);font-weight:200;font-size:clamp(2.5rem,5vw,6rem);letter-spacing:-.05em;line-height:1;color:#fff"><span data-cnt="3" data-sf="">3</span></div>
<div style="font-family:var(--fc);font-size:.6875rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-top:4px">Open roles</div>
</div>
</div>
</div>
</section>

<section class="s2">
<div class="s2-head">
  <div>
    <p class="t5 rv is-reveal" style="margin-bottom:12px">Why Archeco</p>
    <h2 class="t1 rv d1 is-reveal">A studio worth working for.</h2>
  </div>
  <p class="t4 rv d2 is-reveal" style="max-width:520px;">We are always looking for talented designers, developers and thinkers who want to create the next generation of digital products and intelligent systems.</p>
</div>
<div class="step-grid">
<div class="step"><span class="step-n">01</span><div class="step-name">Multidisciplinary teams</div><p class="t4" style="margin-top:10px">At Archeco, we believe great products are created by curious and multidisciplinary teams working collaboratively.</p></div>
<div class="step"><span class="step-n">02</span><div class="step-name">International projects</div><p class="t4" style="margin-top:10px">Joining Archeco means contributing to international projects and collaborating with organisations worldwide.</p></div>
<div class="step"><span class="step-n">03</span><div class="step-name">Emerging technologies</div><p class="t4" style="margin-top:10px">We provide the opportunity to explore emerging technologies and shape the future of digital experiences.</p></div>
<div class="step"><span class="step-n">04</span><div class="step-name">Meaningful products</div><p class="t4" style="margin-top:10px">We work at the intersection of design, technology and AI to build impactful, scalable digital products.</p></div>
</div>
</section>

<section class="s3">
<div class="s3-head">
<div>
<p class="t5 rv" style="margin-bottom:14px">Open positions</p>
<h2 class="t1 rv d1">Current roles.</h2>
</div>
<div class="job-filters" data-filter-group="">
<button class="filter-btn active" data-filter="all">All</button>
<button class="filter-btn" data-filter="design">Design</button>
<button class="filter-btn" data-filter="build">Build</button>
<button class="filter-btn" data-filter="strategy">Strategy</button>
</div>
</div>
<div class="jobs-grid">
<a class="job-card rv" data-cats="design" href="/careers">
<div class="job-card-top">
<div class="job-title">Senior UX Designer</div>
<div class="job-meta"><span class="job-tag loc">Tokyo</span><span class="job-tag">Design</span><span class="job-tag">Full-time</span></div>
</div>
<div class="job-card-bot"><span class="job-type">Full-time</span><span class="job-arr">↗</span></div>
</a>
<a class="job-card rv d1" data-cats="build" href="/careers">
<div class="job-card-top">
<div class="job-title">Frontend Engineer</div>
<div class="job-meta"><span class="job-tag loc">Malta</span><span class="job-tag">Build</span><span class="job-tag">Full-time</span></div>
</div>
<div class="job-card-bot"><span class="job-type">Full-time</span><span class="job-arr">↗</span></div>
</a>
<a class="job-card rv d2" data-cats="strategy" href="/careers">
<div class="job-card-top">
<div class="job-title">Strategy Consultant</div>
<div class="job-meta"><span class="job-tag loc">Tokyo / Remote</span><span class="job-tag">Strategy</span><span class="job-tag">Contract</span></div>
</div>
<div class="job-card-bot"><span class="job-type">Contract</span><span class="job-arr">↗</span></div>
</a>
</div>
</section>

<section class="s4">
<div class="sec-head">
<div>
<p class="t5 rv" style="margin-bottom:14px">Life at Archeco</p>
<h2 class="t1 rv d1">Culture &amp; environment.</h2>
</div>
<p class="t4 rv d2" style="max-width:380px">We work in beautiful spaces, with interesting people, on problems that matter. Tokyo in the morning. Malta in the evening.</p>
</div>
<div class="culture-grid rv">
<div class="culture-img ci-a"><img alt="Workshop" loading="lazy" src="/media/careers/workshop.webp"/></div>
<div class="culture-img ci-b"><img alt="Studio workspace" loading="lazy" src="/media/careers/studio_workspace.webp"/></div>
<div class="culture-img ci-c"><img alt="Malta" loading="lazy" src="/media/careers/malta.webp"/></div>
<div class="culture-img ci-d"><img alt="Team" loading="lazy" src="/media/careers/team.webp"/></div>
<div class="culture-img ci-e"><img alt="Tokyo studio" loading="lazy" src="/media/careers/tokyo_studio.webp"/></div>
</div>
</section>

<section class="s5">
<div class="s5-inner">
<div>
<p class="t5-w rv" style="margin-bottom:18px">Apply</p>
<h2 class="t1 t1-w rv d1">Don't see the right role?</h2>
<p class="t4 t4-w rv d2" style="max-width:380px;margin-top:20px">We're always interested in exceptional people. Send us your work and tell us what you're looking for.</p>
</div>
<div class="rv d1">
<div class="form-fields">
<div class="field"><label for="f-name">Full name</label><input id="f-name" placeholder="Your full name" type="text"/></div>
<div class="field"><label for="f-email">Email</label><input id="f-email" placeholder="your@email.com" type="email"/></div>
<div class="field"><label for="f-role">Area of interest</label><select id="f-role"><option value="">Select a discipline</option><option>UX Design</option><option>UI Design</option><option>Research</option><option>Frontend Engineering</option><option>AI Engineering</option><option>Strategy</option><option>Motion Design</option><option>Other</option></select></div>
<div class="field"><label for="f-msg">Tell us about yourself</label><textarea id="f-msg" placeholder="Your background, what you're looking for, links to your work..."></textarea></div>
<p class="form-note">We read every application. We'll be in touch if there's a fit.</p>
<button class="btn btn-w" type="button">Send application <span class="arr">↗</span></button>
</div>
</div>
</div>
</section>
<section class="sec" style="border-bottom:none;background:var(--bg2)">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,100px);align-items:center">
<div>
<p class="t5 rv" style="margin-bottom:16px">Follow us</p>
<h2 class="t2 rv d1">Stay connected.</h2>
<p class="t4 rv d2" style="margin-top:16px;max-width:400px">See our work in progress, studio life and creative thinking - across our channels.</p>
</div>
<div class="rv d2" style="display:flex;gap:14px;flex-wrap:wrap">
<a class="btn btn-blk" href="https://www.linkedin.com/company/archeco-inc" rel="noopener" target="_blank">LinkedIn <span class="arr">↗</span></a>
<a class="btn btn-out" href="https://www.instagram.com/archeco_inc/" rel="noopener" target="_blank">Instagram <span class="arr">↗</span></a>
<a class="btn btn-out" href="https://www.youtube.com/@ARCchannel-x8" rel="noopener" target="_blank">YouTube <span class="arr">↗</span></a>
<a class="btn btn-out" href="https://www.facebook.com/ARCHECO.inc" rel="noopener" target="_blank">Facebook <span class="arr">↗</span></a>
<a class="btn btn-out" href="https://linktr.ee/archeco.jp" rel="noopener" target="_blank">Linktree <span class="arr">↗</span></a>
<a class="btn btn-out" href="https://x.com/archeco_uxui" rel="noopener" target="_blank">X <span class="arr">↗</span></a>
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
