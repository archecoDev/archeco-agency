"use client";
import React, { useEffect, useRef, useState } from 'react';

/**
 * ScriptRunner: a wrapper for dangerouslySetInnerHTML that manually
 * finds and executes any <script> tags within the HTML content.
 * This ensures that legacy/inline JS from source HTML works in Next.js.
 */
export default function ScriptRunner({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Find all script tags in the injected HTML
    const scripts = containerRef.current.querySelectorAll('script');
    
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });

      if (oldScript.innerHTML) {
        // Wrap inline scripts to handle case where they listen for DOMContentLoaded
        // which has already fired.
        const code = `
          (function() {
            const originalAddEventListener = document.addEventListener;
            document.addEventListener = function(type, listener, options) {
              if (type === 'DOMContentLoaded') {
                setTimeout(listener, 1);
              } else {
                originalAddEventListener.call(document, type, listener, options);
              }
            };
            try {
              ${oldScript.innerHTML}
            } finally {
              document.addEventListener = originalAddEventListener;
            }
          })();
        `;
        newScript.appendChild(document.createTextNode(code));
      }

      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // 2. Add Lightbox Event Listener
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'img') {
        // Ignore images inside anchor tags (e.g., Next Project links)
        if (target.closest('a')) return;
        // Ignore cover images
        if (target.closest('.pd-cover')) return;
        
        const img = target as HTMLImageElement;
        setLightboxSrc(img.src);
      }
    };

    const container = containerRef.current;
    container.addEventListener('click', handleImageClick);
    
    // Add CSS rule globally so images suggest they can be zoomed
    const style = document.createElement('style');
    style.innerHTML = `
      .${className || 'page-dark'} img:not(a img):not(.pd-cover img) { cursor: zoom-in; }
      .pd-next-img img { opacity: 1 !important; }
    `;
    document.head.appendChild(style);

    return () => {
      container.removeEventListener('click', handleImageClick);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [html, className]);

  return (
    <>
      <div 
        ref={containerRef} 
        className={className}
        dangerouslySetInnerHTML={{ __html: html }} 
      />
      {lightboxSrc && (
        <div 
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <img 
            src={lightboxSrc} 
            alt="Enlarged view" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          />
          <button
            onClick={() => setLightboxSrc(null)}
            style={{
              position: 'absolute',
              top: '32px',
              right: '40px',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '3rem',
              fontWeight: 200,
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
