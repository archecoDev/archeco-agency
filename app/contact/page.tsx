import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScriptRunner from "@/components/ScriptRunner";

export const metadata = {
  title: "Contact - ARCHECO",
  description: "Contact ARCHECO - Design, Technology & AI studio with offices in Tokyo and Malta. Start a project, partnership or conversation.",
};

const pageContent = `<style>
/* CONTACT */
.ct-hero { padding: clamp(140px,18vw,200px) var(--gutter) clamp(48px,7vw,80px); border-bottom: 1px solid var(--line); }
.ct-hero-kicker { margin-bottom: 20px; opacity: 0; animation: fuA .7s .05s var(--ease) both; }
.ct-h1 { font-family: var(--fd); font-weight: 200; font-size: clamp(4.5rem,12vw,16rem); line-height: .84; letter-spacing: -.04em; color: var(--black); opacity: 0; animation: fuA .9s .1s var(--ease) both; }
.ct-hero-sub { font-family: var(--fb); font-weight: 300; font-size: clamp(.9rem,1.2vw,1.05rem); color: var(--mid); line-height: 1.85; max-width: 480px; margin-top: 28px; opacity: 0; animation: fuA .8s .2s var(--ease) both; }
.ct-body { display: grid; grid-template-columns: 1fr 1.6fr; border-bottom: 1px solid var(--line); }
.ct-sidebar { padding: clamp(56px,8vw,100px) var(--gutter); border-right: 1px solid var(--line); display: flex; flex-direction: column; gap: clamp(40px,5vw,64px); }
.ct-form-wrap { padding: clamp(56px,8vw,100px) var(--gutter); }
.ct-office { display: flex; flex-direction: column; gap: 6px; }
.ct-email-link { font-family: var(--fb); font-weight: 300; font-size: clamp(.85rem,1.1vw,1rem); color: var(--black); text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; transition: text-decoration-color .2s, color .2s; }
.ct-email-link:hover { color: var(--bronze); text-decoration-color: var(--bronze); }
.ct-address { font-family: var(--fb); font-size: .8125rem; font-weight: 300; color: var(--mid); line-height: 1.75; margin-top: 6px; }
.ct-soc-row { display: flex; flex-direction: column; gap: 10px; }
.ct-soc-link { font-family: var(--fc); font-size: .6875rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: 8px; transition: color .2s; }
.ct-soc-link:hover { color: var(--black); }
.ct-soc-link::before { content: ''; width: 18px; height: 1px; background: currentColor; flex-shrink: 0; transition: width .25s var(--ease); }
.ct-soc-link:hover::before { width: 28px; }
.ct-form { display: flex; flex-direction: column; gap: 24px; }
.ct-field { display: flex; flex-direction: column; gap: 8px; }
.ct-label { font-family: var(--fc); font-size: .625rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); }
.ct-input { font-family: var(--fb); font-weight: 300; font-size: .9375rem; color: var(--black); background: transparent; border: none; border-bottom: 1px solid var(--line); padding: 10px 0; outline: none; width: 100%; transition: border-color .25s; }
.ct-input:focus { border-color: var(--black); }
.ct-input::placeholder { color: rgba(10,10,9,.2); }
.ct-textarea { min-height: 120px; resize: vertical; }
.ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.ct-services { display: flex; flex-wrap: wrap; gap: 8px; }
.ct-svc { font-family: var(--fc); font-size: .625rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; padding: 7px 14px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); cursor: pointer; transition: all .22s var(--ease); user-select: none; }
.ct-svc:hover { border-color: rgba(10,10,9,.3); color: var(--black); }
.ct-svc.sel { background: var(--black); color: var(--white); border-color: var(--black); }
.ct-strip { display: grid; grid-template-columns: 1fr 1fr 1fr; border-top: 1px solid var(--line); }
.ct-strip-cell { padding: clamp(36px,5vw,60px) var(--gutter); border-right: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px; }
.ct-strip-cell:last-child { border-right: none; }
.ct-strip-h { font-family: var(--fd); font-weight: 300; font-size: clamp(1.1rem,1.8vw,1.6rem); letter-spacing: -.02em; color: var(--black); }

@media (max-width: 900px) {
  .ct-body { grid-template-columns: 1fr; }
  .ct-sidebar { border-right: none; border-bottom: 1px solid var(--line); }
  .ct-strip { grid-template-columns: 1fr; }
  .ct-strip-cell { border-right: none; border-bottom: 1px solid var(--line); }
  .ct-strip-cell:last-child { border-bottom: none; }
}
@media (max-width: 600px) {
  .ct-h1 { font-size: clamp(3.5rem, 15vw, 6rem); }
}
</style>
<script>
(function(){
  const init = () => {
    document.querySelectorAll('.ct-svc').forEach(function(el){
      el.addEventListener('click', function(){ 
        el.classList.toggle('sel'); 
      });
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
async function handleCtSubmit(e){
  e.preventDefault();
  var btn = document.getElementById('ct-submit');
  var confirm = document.getElementById('ct-confirm');
  var name = document.getElementById('ct-name').value;
  var email = document.getElementById('ct-email').value;
  var msg = document.getElementById('ct-msg').value;
  var services = Array.from(document.querySelectorAll('.ct-svc.sel')).map(function(el){ return el.textContent; }).join(', ');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  try {
    var res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, message: msg, services: services })
    });
    if (res.ok) {
      btn.style.display = 'none';
      confirm.style.display = 'inline';
    } else {
      btn.disabled = false;
      btn.textContent = 'Send message ↗';
      alert('Error sending message. Please try again or contact us directly at contact@archeco.co.jp');
    }
  } catch(err) {
    btn.disabled = false;
    btn.textContent = 'Send message ↗';
    alert('Error sending message. Please contact us directly at contact@archeco.co.jp');
  }
}
</script>




<section class="ct-hero" id="hero">
<div class="ct-hero-kicker"><span class="pill">Contact</span></div>
<h1 class="ct-h1">Let's talk.</h1>
<p class="ct-hero-sub">Let’s design the next generation of products and intelligent services together. We invite companies, startups and innovation teams to collaborate. We read every message and reply within two working days.</p>
</section>
<div class="ct-body">
<aside class="ct-sidebar">
<div class="rv">
<p class="t5" style="margin-bottom:14px">Tokyo</p>
<div class="ct-office">
<a class="ct-email-link" href="mailto:contact@archeco.co.jp">contact@archeco.co.jp</a>
<a class="ct-email-link" href="tel:03-6433-5306" style="margin-top:2px">03-6433-5306</a>
<p class="ct-address">3F Barbizon76, 1-15-4 Jingumae<br/>Shibuya, Tokyo 150-0001</p>
</div>
</div>
<div class="rv d1">
<p class="t5" style="margin-bottom:14px">Malta</p>
<div class="ct-office">
<a class="ct-email-link" href="mailto:contact-yzgum@archeco.co.jp">contact-yzgum@archeco.co.jp</a>
<a class="ct-email-link" href="tel:+35722268458" style="margin-top:2px">+357 22268458</a>
<p class="ct-address">ASSIKURA BUILDING<br/>Level 1, Old Railway Track,<br/>St. Venera, SVR 9017</p>
</div>
</div>
<div class="rv d2">
<p class="t5" style="margin-bottom:18px">Follow</p>
<div class="ct-soc-row">
<a class="ct-soc-link" href="https://www.linkedin.com/company/archeco-inc" rel="noopener" target="_blank">LinkedIn</a>
<a class="ct-soc-link" href="https://www.instagram.com/archeco_inc/" rel="noopener" target="_blank">Instagram</a>
<a class="ct-soc-link" href="https://www.youtube.com/@ARCchannel-x8" rel="noopener" target="_blank">YouTube</a>
<a class="ct-soc-link" href="https://www.facebook.com/ARCHECO.inc" rel="noopener" target="_blank">Facebook</a>
<a class="ct-soc-link" href="https://linktr.ee/archeco.jp" rel="noopener" target="_blank">Linktree</a>
<a class="ct-soc-link" href="https://x.com/archeco_uxui" rel="noopener" target="_blank">X (Twitter)</a>
</div>
</div>
</aside>
<div class="ct-form-wrap">
<p class="t5 rv" style="margin-bottom:28px">Send a message</p>
<form class="ct-form rv d1" onsubmit="handleCtSubmit(event)">
<div class="ct-row">
<div class="ct-field">
<label class="ct-label" for="ct-name">Name</label>
<input class="ct-input" id="ct-name" placeholder="Your name" required="" type="text"/>
</div>
<div class="ct-field">
<label class="ct-label" for="ct-company">Company</label>
<input class="ct-input" id="ct-company" placeholder="Optional" type="text"/>
</div>
</div>
<div class="ct-field">
<label class="ct-label" for="ct-email">Email</label>
<input class="ct-input" id="ct-email" placeholder="your@email.com" required="" type="email"/>
</div>
<div class="ct-field">
<label class="ct-label">What can we help with?</label>
<div class="ct-services">
<span class="ct-svc">UX Design</span>
<span class="ct-svc">Strategy</span>
<span class="ct-svc">Service Design</span>
<span class="ct-svc">AI Systems</span>
<span class="ct-svc">MVP Dev</span>
<span class="ct-svc">Motion</span>
<span class="ct-svc">Other</span>
</div>
</div>
<div class="ct-field">
<label class="ct-label" for="ct-msg">Message</label>
<textarea class="ct-input ct-textarea" id="ct-msg" placeholder="Tell us about your project, timeline or idea…" required=""></textarea>
</div>
<div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
<button class="btn btn-blk" id="ct-submit" type="submit">Send message <span class="arr">↗</span></button>
<span class="t5" id="ct-confirm" style="display:none;color:var(--bronze)">✓ Message sent - we'll be in touch soon.</span>
</div>
</form>
</div>
</div>
<div class="ct-strip">
<div class="ct-strip-cell rv">
<p class="t5" style="margin-bottom:8px">New projects</p>
<p class="ct-strip-h">Start a conversation</p>
<a class="t5" href="mailto:hello@archeco.co.jp" style="color:var(--bronze);margin-top:4px">hello@archeco.co.jp</a>
</div>
<div class="ct-strip-cell rv d1">
<p class="t5" style="margin-bottom:8px">Press &amp; media</p>
<p class="ct-strip-h">Press enquiries</p>
<a class="t5" href="mailto:press@archeco.co.jp" style="color:var(--bronze);margin-top:4px">press@archeco.co.jp</a>
</div>
<div class="ct-strip-cell rv d2">
<p class="t5" style="margin-bottom:8px">Careers</p>
<p class="ct-strip-h">Join the studio</p>
<a class="t5" href="/careers" style="color:var(--bronze);margin-top:4px">See open roles ↗</a>
</div>
</div>`;

export default function Page() {
  return (
    <div>
      <Nav />
      <ScriptRunner html={pageContent} />
      <Footer />
    </div>
  );
}
