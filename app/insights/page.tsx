"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import siteData from "@/site_data.json";
import Link from "next/link";
import Card from "@/components/Card";

interface Insight {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  img: string;
  img_alt?: string;
  date: string;
  cats: string;
  content: string;
}

const ALL_INSIGHTS: Insight[] = Object.entries(siteData.insights).map(([slug, ins]) => ({
  ...(ins as Insight),
  slug: (ins as any).slug || slug,
  img: (ins as any).cover || (ins as any).img,
})).filter(ins => ins.content && ins.content.trim().length > 0 && ins.img);

const HERO_IMAGES = ALL_INSIGHTS.slice(0, 8).map(ins => ins.img);

// Cats dérivées des vraies valeurs normalisées dans site_data.json
const CATS = [
  { key: "ux-design",             label: "UX Design" },
  { key: "ui-design",             label: "UI Design" },
  { key: "digital-transformation",label: "Digital Transformation" },
  { key: "ai",                    label: "AI" },
  { key: "trend",                 label: "Trends" },
  { key: "redesign",              label: "Redesign" },
  { key: "poc",                   label: "PoC" },
  { key: "corporate",             label: "Corporate" },
  { key: "app",                   label: "App" },
];

export default function InsightsPage() {
  const [filter, setFilter]       = useState("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [search, setSearch]       = useState("");
  const [showFixedNav, setShowFixedNav] = useState(false);
  const pillsRef    = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const [curHero, setCurHero]           = useState(0);
  const [nextHero, setNextHero]         = useState(1);
  const [isSliding, setIsSliding]       = useState(false);
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
    }, 6000);
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

  const displayed = ALL_INSIGHTS
    .slice()
    .sort((a, b) => {
      const da = a.date || "0", db = b.date || "0";
      return sortOrder === "desc" ? db.localeCompare(da) : da.localeCompare(db);
    })
    .filter(ins => {
      const cats = (ins.cats || "").split(/\s+/);
      const matchesCat    = filter === "all" || cats.includes(filter);
      const searchText    = `${ins.title} ${ins.description} ${(ins.tags || []).join(" ")}`.toLowerCase();
      const matchesSearch = search === "" || searchText.includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });

  const delayClass = (i: number) => ["","d1","d2","d3"][i % 4];

  return (
    <div style={{ background: "var(--dark)", color: "#fff", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section className="lab-hero" id="hero">
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
            <h1 className="lab-hero-h1">Insights</h1>
            <p className="t4 t4-w" style={{ maxWidth:480, opacity:0.7 }}>Exploring UX strategies, design thinking, and future business trends.</p>
            <span className="t5-w" style={{ opacity:0.45 }}>{ALL_INSIGHTS.length} articles</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        .lab-hero { background:var(--dark); padding:clamp(120px,16vw,180px) var(--gutter) clamp(56px,8vw,100px); display:grid; grid-template-columns:1fr auto; align-items:end; gap:clamp(32px,5vw,80px); position:relative; overflow:hidden; }
        .lab-hero::after { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 50% 60% at 92% 110%,rgba(155,111,58,.13),transparent 60%); }
        .lab-hero-h1 { font-family:var(--fd); font-weight:200; font-size:clamp(5rem,13vw,18rem); line-height:.84; letter-spacing:-.04em; color:#fff; animation:fuA .9s .05s var(--ease) both; position:relative; z-index:1; }
        @media(max-width:900px) { .lab-hero { grid-template-columns:1fr; gap:40px; } }
      `}</style>

      {/* ── FILTER BAR : type + search + sort ── */}
      <div className="filter-bar-wrap" ref={filterBarRef}>
        <div className="filter-pills" id="insight-pills" ref={pillsRef}>
          <button className={`filter-btn-d${filter === "all" ? " active" : ""}`} onClick={() => setFilter("all")}>All</button>
          {CATS.map(({ key, label }) => (
            <button
              key={key}
              className={`filter-btn-d${filter === key ? " active" : ""}`}
              onClick={() => setFilter(filter === key ? "all" : key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filter-controls">
          <input
            aria-label="Search insights"
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

      {/* ── GRID ── */}
      <section className="mosaic sec-dark" id="insights-grid">
        {displayed.map((ins, i) => (
          <Card key={ins.slug} slug={ins.slug} type="insights" title={ins.title} description={ins.description} tags={ins.tags||[]} img={ins.img} date={ins.date} delayClass={delayClass(i)} gridSpan={3} />
        ))}
      </section>

      <section className="s7 sec-dark">
        <div>
          <p className="t5-w rv" style={{ marginBottom:18 }}>Work with us</p>
          <h2 className="s7-h rv d1">Have a project in mind?</h2>
        </div>
        <div className="s7-r">
          <p className="t4 t4-w rv d1">We partner with organisations to design the next generation of digital products and services.</p>
          <div className="rv d2" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Link className="btn btn-w" href="/contact">Start a project <span className="arr">↗</span></Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── FLOATING FILTER NAV (apparaît quand la filter bar est hors écran) ── */}
      <div className={`fixed-nav-wrap${showFixedNav ? " visible" : ""}`}>
        <div className="fixed-nav-pill">
          <button className="fixed-nav-btn" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>Top</button>
          <div className="fixed-nav-sep" />
          <div className="fixed-nav-group scroll-x">
            <button className={`fixed-nav-btn${filter === "all" ? " active" : ""}`} onClick={() => { setFilter("all"); document.getElementById("insights-grid")?.scrollIntoView({ behavior:"smooth" }); }}>All</button>
            {CATS.map(cat => (
              <button key={cat.key} className={`fixed-nav-btn${filter === cat.key ? " active" : ""}`} onClick={() => { setFilter(cat.key); document.getElementById("insights-grid")?.scrollIntoView({ behavior:"smooth" }); }}>{cat.label}</button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .fixed-nav-wrap { position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(20px); z-index:2000; opacity:0; visibility:hidden; transition:all 0.5s var(--ease); }
        .fixed-nav-wrap.visible { opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }
        .fixed-nav-pill { background:rgba(10,10,9,0.82); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.1); border-radius:999px; display:flex; align-items:center; padding:6px; box-shadow:0 20px 40px rgba(0,0,0,.4); max-width:90vw; }
        .fixed-nav-group { display:flex; align-items:center; gap:2px; }
        .fixed-nav-group.scroll-x { overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; white-space:nowrap; mask-image:linear-gradient(to right,transparent,black 20px,black calc(100% - 20px),transparent); -webkit-mask-image:linear-gradient(to right,transparent,black 20px,black calc(100% - 20px),transparent); }
        .fixed-nav-group.scroll-x::-webkit-scrollbar { display:none; }
        .fixed-nav-btn { background:transparent; border:none; color:rgba(255,255,255,.45); font-family:var(--fc); font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:10px 16px; cursor:pointer; transition:all .3s var(--ease); border-radius:999px; white-space:nowrap; }
        .fixed-nav-btn:hover, .fixed-nav-btn.active { background:rgba(255,255,255,.1); color:#fff; }
        .fixed-nav-sep { width:1px; height:16px; background:rgba(255,255,255,.15); margin:0 8px; flex-shrink:0; }
        @media(max-width:900px) { .fixed-nav-wrap { bottom:20px; } .fixed-nav-btn { padding:8px 14px; font-size:.6rem; } }
      `}</style>
    </div>
  );
}
