"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Card from "@/components/Card";

import siteData from "@/site_data.json";

const LAB_DATA = (siteData as any).lab || {};

const LAB_ITEMS = Object.keys(LAB_DATA).map(slug => ({
  slug,
  ...LAB_DATA[slug as keyof typeof LAB_DATA]
}));

export default function LabPage() {
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [search, setSearch] = useState("");
  const [showFixedNav, setShowFixedNav] = useState(false);
  const pillsRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const CATS = [
    { key: "venture", label: "Venture" },
    { key: "content", label: "Content" },
    { key: "food", label: "Food & Health" },
    { key: "tool", label: "Tool" },
    { key: "ai", label: "AI" },
  ];

  // Drag-to-scroll
  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown = (e: MouseEvent) => {
      isDown = true; el.classList.add("is-dragging");
      startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
    };
    const onUp = () => { isDown = false; el.classList.remove("is-dragging"); };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    };
    el.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Floating Nav Visibility
  useEffect(() => {
    const el = filterBarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowFixedNav(!entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayed = LAB_ITEMS
    .filter(item => {
      const cats = item.tags?.join(" ").toLowerCase() || "";
      const matchesCat = filter === "all" || cats.includes(filter);
      const searchText = `${item.title} ${item.description} ${cats}`.toLowerCase();
      const matchesSearch = search === "" || searchText.includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });

  const delayClass = (idx: number) => {
    const r = idx % 4;
    return r === 1 ? "d1" : r === 2 ? "d2" : r === 3 ? "d3" : "";
  };

  return (
    <div style={{ background: "var(--dark)", color: "#fff", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <section className="lab-hero" id="hero">
        <h1 className="lab-hero-h1">Lab.</h1>
        <div className="lab-hero-r">
          <span className="t5-w">{LAB_ITEMS.length} projects</span>
          <p className="t4 t4-w lab-hero-sub">
            Archeco Lab investigates how AI and emerging technologies shape the next generation of digital products and interactions.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="filter-bar-wrap" ref={filterBarRef}>
        <div className="filter-pills filters-dark" id="lab-pills" ref={pillsRef}>
          <button
            className={`filter-btn-d ${filter === 'all' ? "active" : ""}`}
            onClick={() => setFilter('all')}
            style={{ whiteSpace: "nowrap", flexShrink: 0 }}
          >
            All
          </button>
          {CATS.map(({ key, label }) => (
            <button
              key={key}
              className={`filter-btn-d ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(filter === key ? "all" : key)}
              style={{ whiteSpace: "nowrap", flexShrink: 0 }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filter-controls">
          <input
            aria-label="Search lab"
            id="lab-search"
            placeholder="Search lab..."
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
             id="lab-sort"
             className="sort-btn"
             onClick={() => setSortOrder(o => o === "desc" ? "asc" : "desc")}
          >
            {sortOrder === "desc" ? "Newest ↓" : "Oldest ↑"}
          </button>
        </div>
      </div>

      {/* Mosaic Grid */}
      <section className="mosaic sec-dark" id="lab-grid">
        {displayed.map((item, idx) => (
          <Card
            key={item.slug}
            slug={item.slug}
            type={(item.type as any) || "lab"}
            title={item.title}
            description={item.description}
            tags={item.tags || []}
            img={item.img}
            date={item.date}
            delayClass={delayClass(idx)}
            external={item.external}
            gridSpan={3}
          />
        ))}
      </section>

      {/* CTA */}
      <section className="s7 sec-dark">
        <div>
          <p className="t5-w rv" style={{ marginBottom: 18 }}>Work with us</p>
          <h2 className="s7-h rv d1">Interested in collaborating?</h2>
        </div>
        <div className="s7-r">
          <p className="t4 t4-w rv d1">The Lab allows Archeco to test new ideas and transform research into practical innovation for clients. We welcome strategic partners and innovation teams to collaborate.</p>
          <div className="rv d2" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btn-w" href="/contact">Get in touch <span className="arr">↗</span></a>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating Nav */}
      <div className={`fixed-nav-wrap ${showFixedNav ? 'visible' : ''}`}>
        <div className="fixed-nav-pill">
          <div className="fixed-nav-group">
            <button 
              className="fixed-nav-btn" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Top
            </button>
          </div>
          
          <div className="fixed-nav-sep" />
          
          <div className="fixed-nav-group scroll-x">
            {CATS.map(cat => (
              <button 
                key={cat.key}
                className={`fixed-nav-btn ${filter === cat.key ? 'active' : ''}`}
                onClick={() => {
                  setFilter(cat.key);
                  document.getElementById('lab-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {cat.label}
              </button>
            ))}
            <button 
              className={`fixed-nav-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => {
                setFilter('all');
                document.getElementById('lab-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fixed-nav-wrap {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.5s var(--ease);
        }
        .fixed-nav-wrap.visible {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .fixed-nav-pill {
          background: rgba(10,10,9,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          display: flex;
          align-items: center;
          padding: 6px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          max-width: 90vw;
        }
        .fixed-nav-group {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .fixed-nav-group.scroll-x {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          white-space: nowrap;
          mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
        }
        .fixed-nav-group.scroll-x::-webkit-scrollbar { display: none; }
        .fixed-nav-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          font-family: var(--fc);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 16px;
          cursor: pointer;
          transition: all 0.3s var(--ease);
          border-radius: 999px;
          white-space: nowrap;
        }
        .fixed-nav-btn:hover, .fixed-nav-btn.active {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .fixed-nav-sep {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.15);
          margin: 0 8px;
          flex-shrink: 0;
        }
        .lab-hero { background: var(--dark); padding: clamp(120px,16vw,180px) var(--gutter) clamp(56px,8vw,100px); display: grid; grid-template-columns: 1fr auto; align-items: end; gap: clamp(32px,5vw,80px); position: relative; overflow: hidden; }
        .lab-hero::after { content:''; position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 50% 60% at 92% 110%,rgba(155,111,58,.13),transparent 60%); }
        .lab-hero-h1 { font-family:var(--fd);font-weight:200;font-size:clamp(5rem,13vw,18rem);line-height:.84;letter-spacing:-.04em;color:#fff; animation:fuA .9s .05s var(--ease) both;position:relative;z-index:1; }
        .lab-hero-r { display:flex;flex-direction:column;align-items:flex-end;gap:12px;padding-bottom:8px; animation:fuA .8s .2s var(--ease) both;position:relative;z-index:1; }
        .lab-hero-sub { max-width: 320px; text-align: right; }
        @media(max-width: 900px) {
          .lab-hero { grid-template-columns: 1fr; gap: 40px; }
          .lab-hero-r { align-items: flex-start; }
          .lab-hero-sub { text-align: left; max-width: 100%; }
          .filter-bar-wrap { flex-direction: column; align-items: stretch !important; height: auto; }
          .filter-controls { border-left: none; border-top: 1px solid rgba(255,255,255,.07); padding: 14px var(--gutter); justify-content: space-between; }
          #lab-search { width: 100% !important; flex: 1; }
        }
      `}</style>
    </div>
  );
}
