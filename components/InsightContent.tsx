"use client";

import React from "react";
import ScriptRunner from "@/components/ScriptRunner";
import ProjectHero from "@/components/ProjectHero";
import Link from "next/link";

interface InsightContentProps {
  insight: any;
  nextSlug: string;
  nextInsight: any;
}

export default function InsightContent({ insight, nextSlug, nextInsight }: InsightContentProps) {
  // Strip legacy hero from content if present
  const contentWithoutHero = insight.content.replace(/<section class="pd-hero">[\s\S]*?<\/section>/, "");

  return (
    <>
      <ProjectHero 
        title={insight.title} 
        image={insight.img} 
        tags={insight.tags || ["Insight"]} 
      />
      
      <main className="insight-content">
        <ScriptRunner html={contentWithoutHero} />
      </main>

      {/* Next Insight Navigation */}
      {nextSlug && nextInsight && (
        <section className="pd-next sec-dark">
          <Link href={`/insights/${nextSlug}`} className="pd-next-link">
            <div className="pd-next-img">
              <img src={nextInsight.img || "/media/insights/placeholder.jpg"} alt="" />
            </div>
            <div className="pd-next-info">
              <span className="pd-next-label">Next Insight</span>
              <div className="pd-next-title">{nextInsight.title}</div>
            </div>
          </Link>
        </section>
      )}


      <style jsx>{`
        .insight-content {
          padding: 80px 0;
          background: #000;
          position: relative;
          z-index: 10;
        }

        /* pd-flow architecture */
        :global(.pd-flow) {
          padding: 80px 0;
          background: #000;
        }
        :global(.pd-flow-grid) {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 var(--gutter);
        }
        :global(.pd-flow-item) {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 20px 60px;
          margin-bottom: 80px;
        }
        :global(.pd-flow-item:last-child) {
          margin-bottom: 0;
        }
        :global(.pd-flow-step) {
          font-family: var(--fd);
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.4);
          padding-top: 5px; /* Align with title cap-height */
        }
        :global(.pd-flow-content) {
          display: flex;
          flex-direction: column;
        }
        :global(.pd-flow-title) {
          font-family: var(--fd);
          font-weight: 200;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          line-height: 1.1;
          color: #fff;
          margin-bottom: 2rem;
        }
        :global(.pd-flow-desc) {
          font-family: var(--fs);
          font-weight: 300;
          font-size: 1.1rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.7);
        }
        
        /* Fix contrast for quotes/em in description */
        :global(.pd-flow-desc em) {
          color: #fff !important;
          font-style: italic !important;
          opacity: 0.95 !important;
        }

        /* Full Grid Width Images (960px) */
        :global(.pd-flow-item.pd-image-full) {
          display: block !important;
          grid-template-columns: none !important;
          margin: 60px 0;
          width: 100%;
        }
        :global(.pd-flow-item.pd-image-full .pd-flow-content) {
          width: 100%;
        }
        :global(.pd-image-full img) {
          width: 100%;
          max-width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 8px;
          opacity: 1 !important;
          display: block;
        }

        /* Pair Layout (2 on a line) */
        :global(.pd-flow-item.pd-image-pair) {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 20px !important;
          margin: 60px 0;
          width: 100%;
        }
        :global(.pd-flow-item.pd-image-pair .pd-flow-content) {
          display: contents;
        }
        :global(.pd-flow-item.pd-image-pair img) {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 8px;
          opacity: 1 !important;
        }

        @media (max-width: 768px) {
          :global(.pd-flow-item.pd-image-pair) {
            grid-template-columns: 1fr !important;
          }
        }

        /* Force opacity 1 for all article images (jsx-80240c9d97a92df9 equivalent) */
        :global(.insight-content img) {
          opacity: 1 !important;
        }

        /* pd-next architecture (Split-Screen Footer) */
        .pd-next {
          padding: 0;
          height: 60vh;
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .pd-next-link {
          display: flex;
          width: 100%;
          height: 100%;
          text-decoration: none;
          align-items: center;
        }
        .pd-next-img {
          flex: 0 0 50%;
          height: 100%;
          overflow: hidden;
        }
        .pd-next-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
          transition: transform 1.2s var(--ease), opacity 0.8s var(--ease);
        }
        .pd-next-link:hover .pd-next-img img {
          transform: scale(1.05);
          opacity: 0.6;
        }
        .pd-next-info {
          flex: 1;
          padding: 0 10%;
          color: #fff;
        }
        .pd-next-label {
          display: block;
          font-family: var(--fs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
        }
        .pd-next-title {
          font-family: var(--fd);
          font-style: italic;
          font-weight: 200;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        /* Bespoke Insight Widgets */
        :global(.pd-widget-compare) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 60px 0;
        }
        :global(.pd-compare-box) {
          padding: 30px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        :global(.pd-compare-label) {
          font-family: var(--fs);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.4);
        }
        :global(.pd-compare-title) {
          font-family: var(--fd);
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: #fff;
        }
        :global(.pd-compare-desc) {
          font-family: var(--fs);
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.5);
        }

        :global(.pd-widget-gallery) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin: 40px 0;
        }
        :global(.pd-gallery-item) {
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #111;
        }
        :global(.pd-gallery-item img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s var(--ease);
        }
        :global(.pd-gallery-item:hover img) {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          :global(.pd-flow-item) {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          :global(.pd-widget-compare),
          :global(.pd-widget-gallery) {
            grid-template-columns: 1fr;
          }
          .pd-next {
            height: 80vh;
          }
          .pd-next-link {
            flex-direction: column-reverse;
          }
          .pd-next-img {
            flex: 0 0 40%;
            width: 100%;
          }
          .pd-next-info {
            padding: 40px var(--gutter);
          }
        }
      `}</style>
    </>
  );
}
