"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import siteData from "@/site_data.json";
import Link from "next/link";
import Card from "@/components/Card";

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  img: string;
  img_alt?: string;
  date: string;
  cats: string;
  content: string;
  status: string;
  hidden?: boolean;
}

const ALL_PROJECTS: Project[] = Object.entries(siteData.projects)
  .map(([slug, proj]) => ({ ...(proj as Project), slug: (proj as any).slug || slug }))
  .filter(p => p.content && p.content.trim().length > 0 && !p.hidden);

const HERO_IMAGES = ALL_PROJECTS.slice(0, 10).map(p => p.img || "/media/projects/placeholder.jpg");

const FILTERS = [
  { key: "all",            label: "All" },
  { key: "ux-ui",         label: "UX / UI" },
  { key: "app",           label: "App" },
  { key: "strategy",      label: "Strategy" },
  { key: "service-design", label: "Service Design" },
  { key: "venture",       label: "Venture" },
];

export default function ProjectsPage() {
  const [filter, setFilter]       = useState("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [search, setSearch]       = useState("");
  const [showFixedNav, setShowFixedNav] = useState(false);
  const pillsRef     = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const [curHero, setCurHero]             = useState(0);
  const [nextHero, setNextHero]           = useState(1);
  const [isSliding, setIsSliding]         = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  /* drag-scroll pills */
  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const onUp   = () => { isDown = false; };
    const onMove = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => { el.removeEventListener("mousedown", onDown); document.removeEventListener("mouseup", onUp); el.removeEventListener("mousemove", onMove); };
  }, []);

  /* hero carousel */
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSliding) return;
      setIsSliding(true);
      const start = performance.now();
      function animate(t: number) {
        const p  = Math.min((t - start) / 1200, 1);
        const ep = p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2,3)/2;
        setSlideProgress(ep);
        if (p < 1) { requestAnimationFrame(animate); }
        else { setCurHero(nextHero); setNextHero(n => (n + 1) % HERO_IMAGES.length); setIsSliding(false); setSlideProgress(0); }
      }
      requestAnimationFrame(animate);
    }, 5000);
    return () => clearInterval(interval);
  }, [isSliding, nextHero]);

  /* floating filter nav visibility */
  useEffect(() => {
    const el = filterBarRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setShowFixedNav(!e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { projectsOfficial, projectsConcepts } = (() => {
    const sorted = ALL_PROJECTS.slice().sort((a, b) => {
      const da = a.date || "0", db = b.date || "0";
      return sortOrder === "desc" ? db.localeCompare(da) : da.localeCompare(db);
    });
    const filtered = sorted.filter(p => {
      const matchesCat    = filter === "all" || (p.cats || "").toLowerCase().split(/\s+/).includes(filter);
      const searchText    = `${p.title} ${p.description} ${(p.tags || []).join(" ")}`.toLowerCase();
      const matchesSearch = search === "" || searchText.includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
    return {
      projectsOfficial: filtered.filter(p => p.status === "client_work"),
      projectsConcepts: filtered.filter(p => p.status !== "client_work"),
    };
  })();

  const delayClass = (i: number) => ["","d1","d2","d3"][i % 4];

  return (
    <div style={{ background: "var(--bg)", color: "var(--black)", minHeight: "100vh" }}>
      <Nav onLight={true} />

      {/* ── HERO ── */}
      <section className="pj-hero" id="hero">
        <div className="glass-surface">
          {[0,1,2,3].map(i => {
            const dir = i % 2 === 0 ? -1 : 1;
            return (
              <div key={i} className="glass-band" style={{ flex:1, position:"relative", overflow:"hidden" }}>
                <div className="glass-inner" style={{ backgroundImage:`url(${HERO_IMAGES[curHero]})`, "--b":"40px", left:`-${i*25}%`, width:"400%", transform:`translateY(${isSliding?slideProgress*100*dir:0}%) scale(1.15)`, opacity:isSliding?1-slideProgress:1, transition:isSliding?"none":"opacity 1.2s var(--ease)" } as React.CSSProperties} />
                <div className="glass-inner" style={{ backgroundImage:`url(${HERO_IMAGES[nextHero]})`, "--b":"40px", left:`-${i*25}%`, width:"400%", transform:`translateY(${isSliding?-100*dir*(1-slideProgress):0}%) scale(1.15)`, opacity:isSliding?slideProgress:0, transition:isSliding?"none":"opacity 1.2s var(--ease)" } as React.CSSProperties} />
              </div>
            );
          })}
        </div>
        <div className="page-hero-body" style={{ position:"relative", zIndex:2 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
            <div className="page-hero-kicker"><span className="pill-d pill">Portfolio</span></div>
            <h1 className="pj-hero-h1">Works.</h1>
            <p className="t4 t4-w" style={{ maxWidth:520, opacity:0.7 }}>A cinematic view of our ability to design impactful platforms, intelligent services and high-scale systems worldwide.</p>
            <span className="t5" style={{ opacity:0.5 }}>{ALL_PROJECTS.length} Selected works</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pj-hero { background:var(--dark); padding:clamp(120px,16vw,180px) var(--gutter) clamp(56px,8vw,100px); display:grid; grid-template-columns:1fr auto; align-items:end; gap:clamp(32px,5vw,80px); position:relative; overflow:hidden; }
        .pj-hero::after { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 50% 60% at 92% 110%,rgba(155,111,58,.13),transparent 60%); }
        .pj-hero-h1 { font-family:var(--fd); font-weight:200; font-size:clamp(5rem,13vw,18rem); line-height:.84; letter-spacing:-.04em; color:#fff; animation:fuA .9s .05s var(--ease) both; position:relative; z-index:1; }
        @media(max-width:900px) { .pj-hero { grid-template-columns:1fr; gap:40px; } }
      `}</style>

      {/* ── FILTER BAR : type + search + sort ── */}
      <div className="filter-bar-wrap" ref={filterBarRef} style={{ background:"var(--bg)", borderColor:"var(--line)" }}>
        <div className="filter-pills" ref={pillsRef}>
          <button className={`filter-btn${filter === "all" ? " active" : ""}`} onClick={() => setFilter("all")}>All</button>
          {FILTERS.slice(1).map(({ key, label }) => (
            <button
              key={key}
              className={`filter-btn${filter === key ? " active" : ""}`}
              onClick={() => setFilter(filter === key ? "all" : key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filter-controls">
          <input
            aria-label="Search projects"
            placeholder="Search…"
            className="search-input"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="sort-btn" onClick={() => setSortOrder(o => o === "desc" ? "asc" : "desc")}>
            {sortOrder === "desc" ? "Newest ↓" : "Oldest ↑"}
          </button>
        </div>
      </div>

      {/* ── GRIDS ── */}
      {projectsOfficial.length > 0 && (
        <div id="section-projects">
          <div style={{ padding:"0 var(--gutter)", marginTop:"clamp(40px,6vw,80px)", marginBottom:"20px" }}>
            <h2 className="t2 rv">Projects</h2>
          </div>
          <section className="mosaic" style={{ paddingTop:0 }}>
            {projectsOfficial.map((p, i) => (
              <Card key={p.slug} slug={p.slug} type="projects" title={p.title} description={p.description} tags={p.tags||[]} img={p.img} date={p.date} delayClass={delayClass(i)} status={p.status} gridSpan={3} onLight={true} />
            ))}
          </section>
        </div>
      )}

      {projectsConcepts.length > 0 && (
        <div id="section-concepts">
          <div style={{ padding:"0 var(--gutter)", marginTop:"clamp(32px,5vw,60px)", marginBottom:"20px" }}>
            <h2 className="t2 rv">Concepts</h2>
          </div>
          <section className="mosaic" style={{ paddingTop:0 }}>
            {projectsConcepts.map((p, i) => (
              <Card key={p.slug} slug={p.slug} type="projects" title={p.title} description={p.description} tags={p.tags||[]} img={p.img} date={p.date} delayClass={delayClass(i)} status={p.status} gridSpan={3} onLight={true} />
            ))}
          </section>
        </div>
      )}

      {/* ── CTA ── */}
      <section className="s7" style={{ borderTop:"1px solid var(--line)" }}>
        <div>
          <p className="t5 rv" style={{ marginBottom:18 }}>Work with us</p>
          <h2 className="s7-h rv d1" style={{ color:"var(--black)" }}>Have a project in mind?</h2>
        </div>
        <div className="s7-r">
          <p className="t4 rv d1">We partner with organisations to design the next generation of digital products and services.</p>
          <div className="rv d2" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Link className="btn btn-blk" href="/contact">Start a project <span className="arr">↗</span></Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── FLOATING FILTER NAV ── */}
      <div className={`fixed-nav-wrap${showFixedNav ? " visible" : ""}`}>
        <div className="fixed-nav-pill">
          <button className="fixed-nav-btn" onClick={() => document.getElementById("section-projects")?.scrollIntoView({ behavior:"smooth" })}>Projects</button>
          <div className="fixed-nav-sep" />
          <button className="fixed-nav-btn" onClick={() => document.getElementById("section-concepts")?.scrollIntoView({ behavior:"smooth" })}>Concepts</button>
          <div className="fixed-nav-sep" />
          <div className="fixed-nav-group scroll-x">
            <button className={`fixed-nav-btn${filter === "all" ? " active" : ""}`} onClick={() => setFilter("all")}>All</button>
            {FILTERS.slice(1).map(f => (
              <button key={f.key} className={`fixed-nav-btn${filter === f.key ? " active" : ""}`} onClick={() => setFilter(f.key)}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .fixed-nav-wrap { position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(20px); z-index:2000; opacity:0; visibility:hidden; transition:all 0.5s var(--ease); }
        .fixed-nav-wrap.visible { opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }
        .fixed-nav-pill { background:rgba(242,241,239,0.92); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(10,10,9,.1); border-radius:999px; display:flex; align-items:center; padding:6px; box-shadow:0 20px 40px rgba(0,0,0,.12); max-width:90vw; }
        .fixed-nav-group { display:flex; align-items:center; gap:2px; }
        .fixed-nav-group.scroll-x { overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; white-space:nowrap; mask-image:linear-gradient(to right,transparent,black 20px,black calc(100% - 20px),transparent); -webkit-mask-image:linear-gradient(to right,transparent,black 20px,black calc(100% - 20px),transparent); }
        .fixed-nav-group.scroll-x::-webkit-scrollbar { display:none; }
        .fixed-nav-btn { background:transparent; border:none; color:rgba(10,10,9,.4); font-family:var(--fc); font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:10px 16px; cursor:pointer; transition:all .3s var(--ease); border-radius:999px; white-space:nowrap; }
        .fixed-nav-btn:hover, .fixed-nav-btn.active { background:var(--black); color:#fff; }
        .fixed-nav-sep { width:1px; height:16px; background:rgba(10,10,9,.12); margin:0 8px; flex-shrink:0; }
        @media(max-width:900px) { .fixed-nav-wrap { bottom:20px; } .fixed-nav-btn { padding:8px 14px; font-size:.6rem; } }
      `}</style>
    </div>
  );
}
