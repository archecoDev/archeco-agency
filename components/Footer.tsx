export default function Footer() {
  return (
    <footer className="footer">
      <div className="ft-grid">
        <div>
          <div className="ft-logo">ARCHECO</div>
          <p className="ft-desc">
            Design · Technology · AI<br />
            Tokyo &amp; Malta - Est. 2012<br /><br />
            <a href="mailto:contact@archeco.co.jp" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>contact@archeco.co.jp</a><br />
            <a href="tel:+81364335306" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>+81 3-6433-5306</a>
          </p>
        </div>
        <div>
          <div className="ft-lbl">Pages</div>
          <div className="ft-col">
            <a href="/studio">Studio</a><a href="/expertise">Expertise</a><a href="/projects">Projects</a>
            <a href="/lab">Lab</a><a href="/insights">Insights</a><a href="/careers">Careers</a><a href="/contact">Contact</a>
          </div>
        </div>
        <div>
          <div className="ft-lbl">Expertise</div>
          <div className="ft-col">
            <a href="/expertise">UX / UI Design</a><a href="/expertise">AI Agents</a>
            <a href="/expertise">Motion Design</a><a href="/expertise">Strategy</a><a href="/expertise">MVP Dev</a>
          </div>
        </div>
        <div>
          <div className="ft-lbl">Ecosystem</div>
          <div className="ft-col">
            <a href="https://fam-athletefood-frozen.com/" target="_blank" rel="noopener">FAM Athlete Food</a>
            <a href="https://www.youtube.com/@ARCchannel-x8" target="_blank" rel="noopener">ARC Channel</a>
          </div>
        </div>
      </div>
      <div className="ft-bot">
        <span className="ft-copy">&copy; 2025 ARCHECO Inc.</span>
        <div className="ft-soc">
          <a href="https://www.linkedin.com/company/archeco-inc" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.instagram.com/archeco_inc/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.facebook.com/ARCHECO.inc" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://linktr.ee/archeco.jp" target="_blank" rel="noopener" aria-label="Linktree">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.953 15.066c-.08.163-.08.324-.08.486C7.873 17.482 9.49 19 11.39 19h.13c1.903-.08 3.437-1.598 3.437-3.46 0-.162-.08-.323-.08-.486h3.114l-4.31-4.37 4.31-4.37h-4.39c.08-.162.08-.324.08-.486C13.597 4.517 11.98 3 10.08 3h-.13C8.048 3.08 6.514 4.598 6.514 6.46c0 .162.08.323.08.486H2.164l4.31 4.37-4.31 4.37h3.79z"/></svg>
          </a>
          <a href="https://x.com/archeco_uxui" target="_blank" rel="noopener" aria-label="X">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.youtube.com/@ARCchannel-x8" target="_blank" rel="noopener" aria-label="YouTube">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--black)"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
