"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import data from "@/site_data.json";
import Link from "next/link";
import { getAllTeamMembers } from "@/lib/teamDB";

export default function StudioPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const studio = data.studio;
  const team = getAllTeamMembers();

  // Filter team members
  const filteredTeam = team.filter((m: any) => {
    const cats = m.cats?.split(" ") || [];
    const matchesFilter = filter === "all" || cats.includes(filter);
    const searchText = (
      (m.title || "") + " " +
      (m.description || "") + " " +
      (m.short_bio || m.bio || "")
    ).toLowerCase();
    const matchesSearch = search === "" || searchText.includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-reveal");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".rv").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredTeam]);

  return (
    <div>
      <Nav />

      {/* Hero */}
      <section className="page-hero" id="hero">
        <div className="page-hero-body">
          <div className="page-hero-kicker"><span className="pill-d pill">{studio.hero.kicker}</span></div>
          <h1 className="page-hero-h1">{studio.hero.title}</h1>
          <div className="page-hero-row" style={{ alignItems: "flex-end" }}>
            <p className="page-hero-sub">{studio.hero.subtitle}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn btn-w" href="/contact">Start a project <span className="arr">↗</span></a>
              <a className="btn btn-ow" href="/projects">See our work</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="sec rv">
        <div>
          <p className="t5" style={{ marginBottom: 24 }}>About Archeco</p>
          <h2 className="t2" style={{ lineHeight: 1.4 }}>{studio.about.text}</h2>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Studio stats" className="s2">
        {studio.stats.map((s, i) => (
          <div key={i} className={`stat rv ${i > 0 ? `d${i}` : ""}`}>
            <div className="stat-n">
              <span data-cnt={s.n} data-sf={s.sf}>{s.n}{s.sf}</span>
            </div>
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
        {/* Dynamic team member count — auto-updates when site_data.json changes */}
        <div className={`stat rv d${studio.stats.length}`}>
          <div className="stat-n">
            <span data-cnt={team.length}>{team.length}</span>
          </div>
          <div className="stat-l">Team Members - Senior designers, engineers and strategists.</div>
        </div>
      </section>

      {/* Vision & Approach */}
      <section className="sec rv" style={{ background: "var(--bg2)" }}>
        <div className="s-split">
          <div>
            <p className="t5" style={{ marginBottom: 20 }}>Vision</p>
            <h2 className="t2">{studio.vision.text}</h2>
          </div>
          <div>
            <p className="t5" style={{ marginBottom: 20 }}>Approach</p>
            <p className="t4">{studio.approach.text}</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="s4 sec-dark">
        <div className="rv" style={{ marginBottom: 40, maxWidth: 600 }}>
          <p className="t5-w" style={{ marginBottom: 12 }}>Team</p>
          <p className="t4-w">A multidisciplinary team across design, strategy and AI systems. We collaborate internationally, combining Japanese precision with European innovation.</p>
        </div>

        <div className="filter-bar-wrap" style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
          <div className="filter-pills rv d1" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}>
            <button
              className={`filter-btn-d ${filter === 'all' ? "active" : ""}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            {["strategy", "design", "build", "ai"].map(cat => (
              <button
                key={cat}
                className={`filter-btn-d ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(filter === cat ? "all" : cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="filter-controls rv d2">
            <input
              aria-label="Search team"
              placeholder="Search team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              type="text"
            />
          </div>
        </div>

        <div className="team-grid">
          {filteredTeam.map((m: any) => (
            <Link
              key={m.slug}
              href={`/team/${m.slug}`}
              className="team-card rv"
            >
              <div className="team-image">
                <img
                  alt={m.name}
                  src={m.card_image}
                  loading="lazy"
                />
              </div>
              <div className="team-overlay">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-bio">{m.short_bio}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="s5">
        <div className="s5-head">
          <div>
            <p className="t5 rv" style={{ marginBottom: 14 }}>{studio.client_intro}</p>
            <h2 className="t1 rv d1">Clients &amp;<br />Collaborations</h2>
          </div>
          <p className="t4 rv d2" style={{ maxWidth: 300 }}>Enterprise and government organisations across Japan, Europe and beyond.</p>
        </div>
        <div className="clients-grid rv is-reveal in">
          {studio.clients.map((client, i) => (
            <div key={i} className="client-cell">
              <span className="client-name">{client}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}

      <section className="s6">
        {studio.locations.map((loc, i) => (
          <div key={i} className="location">
            <span className="loc-tag rv">{loc.tag}</span>
            <div className="loc-city rv d1" style={{ color: "#fff" }}>{loc.city}</div>
            <p className="loc-desc rv d2">{loc.desc}</p>
            <div className="loc-detail rv d3">
              {loc.detail.map((d, j) => (
                <span key={j} className="loc-line">{d}</span>
              ))}
            </div>
            <div className="loc-map rv d4">
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.city + " " + loc.detail[0])}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="s7 sec-dark">
        <div>
          <p className="t5-w rv" style={{ marginBottom: 18 }}>Work with us</p>
          <h2 className="s7-h rv d1">{studio.cta.title}</h2>
        </div>
        <div className="s7-r">
          <p className="t4 t4-w rv d1">We take a small number of new projects each year. If you have a challenge worth solving - product, strategy or AI - we'd like to hear about it.</p>
          <div className="rv d2" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btn-w" href="/contact">Start a project <span className="arr">↗</span></a>
            <a className="btn btn-ow" href="/projects">See our work</a>
          </div>
        </div>
      </section>

      <section className="sec" style={{ borderBottom: "none", background: "var(--bg2)" }}>
        <div className="s-split" style={{ alignItems: "center" }}>
          <div>
            <p className="t5 rv" style={{ marginBottom: 16 }}>Follow us</p>
            <h2 className="t2 rv d1">Stay connected.</h2>
            <p className="t4 rv d2" style={{ marginTop: 16, maxWidth: 400 }}>See studio life, ongoing projects and creative thinking - across our channels.</p>
          </div>
          <div className="rv d2" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="btn btn-blk" href="https://www.linkedin.com/company/archeco-inc" rel="noopener" target="_blank">LinkedIn <span className="arr">↗</span></a>
            <a className="btn btn-out" href="https://www.instagram.com/archeco_inc/" rel="noopener" target="_blank">Instagram <span className="arr">↗</span></a>
            <a className="btn btn-out" href="https://www.youtube.com/@ARCchannel-x8" rel="noopener" target="_blank">YouTube <span className="arr">↗</span></a>
            <a className="btn btn-out" href="https://www.facebook.com/ARCHECO.inc" rel="noopener" target="_blank">Facebook <span className="arr">↗</span></a>
            <a className="btn btn-out" href="https://linktr.ee/archeco.jp" rel="noopener" target="_blank">Linktree <span className="arr">↗</span></a>
            <a className="btn btn-out" href="https://x.com/archeco_uxui" rel="noopener" target="_blank">X <span className="arr">↗</span></a>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
