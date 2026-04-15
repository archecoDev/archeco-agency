"use client";

import React, { useState, useEffect } from "react";

interface ProjectHeroProps {
  title: string;
  image: string;
  tags?: string[];
  isLight?: boolean;
}

export default function ProjectHero({ title, image, tags, isLight = false }: ProjectHeroProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const glassBands = [
    { w: "25%", bx: -45, by: -20, b: "25px" },
    { w: "25%", bx: -22, by: 10, b: "35px" },
    { w: "25%", bx: 8, by: -10, b: "15px" },
    { w: "25%", bx: 45, by: 5, b: "20px" },
  ];

  return (
    <section className="proj-hero">
      <div className="proj-hero-bg" style={{ zIndex: 0 }}>
        <img src={image} alt="" />
      </div>

      <div className="glass-surface" style={{ zIndex: 1, overflow: 'hidden' }}>
        {glassBands.map((band, i) => (
          <div 
            key={i} 
            className="glass-band" 
            style={{ 
              width: band.w, 
              "--bx": `${band.bx}%`, 
              "--by": `${band.by}%`, 
              "--b": band.b 
            } as any}
          >
            <div 
              className={`glass-inner ${isActive ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${image})`,
                transform: `translate(${band.bx}%, ${band.by}%) scale(1.35)`,
                transition: "opacity 1.2s var(--ease)",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="proj-hero-body" style={{ zIndex: 2, opacity: isActive ? 1 : 0, transition: "opacity 1s var(--ease) 0.3s" }}>
        {tags && tags.length > 0 && (
          <div className="proj-hero-tag">
            {tags.map((tag, i) => (
              <span key={i} className="pd-tag">{tag}</span>
            ))}
          </div>
        )}
        <h1 className="proj-hero-h1">{title}</h1>
      </div>
    </section>
  );
}
