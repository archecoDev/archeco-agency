"use client";

import { useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { TeamMember } from "@/lib/teamDB";

interface TeamMemberClientProps {
  slug: string;
  currentMember: TeamMember;
  teamMembers: TeamMember[];
}

export default function TeamMemberClient({ slug, currentMember, teamMembers }: TeamMemberClientProps) {
  const teamKeys = teamMembers.map(m => m.slug);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(slug);

  // Position slides on mount and when slug changes
  useEffect(() => {
    if (sliderRef.current && slug) {
      const targetSlide = sliderRef.current.querySelector(`[data-id="${slug}"]`) as HTMLElement;
      if (targetSlide) {
        sliderRef.current.scrollTo({ left: targetSlide.offsetLeft, behavior: "auto" });
      }
    }
  }, [slug]);

  // Reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const info = entry.target.querySelector(".tm-info") as HTMLElement;
        if (entry.isIntersecting) {
          if (info) {
            info.style.opacity = "1";
            info.style.transform = "translateY(0)";
          }
        } else {
          if (info) {
            info.style.opacity = "0";
            info.style.transform = "translateY(20px)";
          }
        }
      });
    }, { threshold: 0.1 });

    const slides = document.querySelectorAll(".tm-slide");
    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const index = Math.round(sliderRef.current.scrollLeft / sliderRef.current.offsetWidth);
    const newId = teamKeys[index];
    if (newId && newId !== activeId) {
      setActiveId(newId);
      window.history.replaceState({}, "", `/team/${newId}`);
      if (teamMembers[index]) {
        document.title = `${teamMembers[index].name} - Profile | ARCHECO`;
      }
    }
  };

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="page-dark">
      <Nav />

      <div className="tm-slider-wrap">
        <div className="tm-slider-bg"></div>
        <div className="tm-slider" id="tm-slider" ref={sliderRef} onScroll={handleScroll}>
          {teamMembers.map(person => (
            <div key={person.slug} className="tm-slide" data-id={person.slug}>
              <div className="tm-container">
                <div className="tm-img-wrap">
                  <img src={person.profile_image} alt={person.name} loading="lazy" />
                </div>
                <div className="tm-info" style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s var(--ease)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span className="tm-role">{person.role}</span>
                    <h1 className="tm-h1">{person.name}</h1>
                  </div>
                  <div className="tm-bio" dangerouslySetInnerHTML={{ __html: person.bio }} />
                  <div className="tm-links">
                    <a href="/contact" className="btn btn-w">Start a project <span className="arr">↗</span></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="tm-nav">
          <div className="tm-kicker">
            <Link className="t5 t5-w" href="/studio" style={{ opacity: 0.55, display: "flex", alignItems: "center", gap: 6, pointerEvents: "auto" }}>← Studio</Link>
            <span style={{ opacity: 0.55, color: "#fff" }}>·</span>
            <span className="pj-tag">Team Profiles</span>
          </div>
          <div className="tm-nav-btns">
            <button aria-label="Previous" className="tm-arrow" id="tm-prev" onClick={prev}>←</button>
            <button aria-label="Next" className="tm-arrow" id="tm-next" onClick={next}>→</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
