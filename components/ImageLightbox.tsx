"use client";
import { useEffect, useState } from "react";

export default function ImageLightbox() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Différer la collecte pour s'assurer que le HTML est rendu
    setTimeout(() => {
      const imgElements = Array.from(document.querySelectorAll('.pd-flow-content img')) as HTMLImageElement[];
      const srcs = imgElements.map(img => img.src);
      setImages(srcs);

      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLImageElement;
        if (target.tagName === 'IMG' && target.closest('.pd-flow-content')) {
          e.preventDefault();
          const index = srcs.indexOf(target.src);
          if (index !== -1) {
            setCurrentIndex(index);
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
          }
        }
      };

      const container = document.querySelector('.pd-flow');
      if (container) {
        container.addEventListener('click', handleClick as any);
        // Add cursor pointer to signify interactivity
        imgElements.forEach(img => {
            img.style.cursor = 'zoom-in';
        });
      }
    }, 100);

    return () => {
      // Cleanup logic is complex for delegated listeners when container unmounts,
      // but in Next App Router the page replacement handles most of it.
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const prev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex(i => (i - 1 + images.length) % images.length);
  };

  const next = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex(i => (i + 1) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  if (!isOpen || currentIndex === -1) return null;

  return (
    <div className="lightbox-overlay" onClick={close}>
      <button className="lightbox-btn lb-close" onClick={close}>×</button>
      {images.length > 1 && <button className="lightbox-btn lb-prev" onClick={prev}>‹</button>}
      
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          key={currentIndex} // triggers re-render/animation
        />
        {images.length > 1 && (
            <div className="lightbox-counter">
                {currentIndex + 1} / {images.length}
            </div>
        )}
      </div>

      {images.length > 1 && <button className="lightbox-btn lb-next" onClick={next}>›</button>}

      <style jsx>{`
        .lightbox-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(10, 10, 9, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .lightbox-content {
          max-width: 90vw; max-height: 85vh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .lightbox-content img {
          max-width: 100%; max-height: 85vh;
          object-fit: contain;
          user-select: none;
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .lightbox-counter {
            color: rgba(255, 255, 255, 0.6);
            font-family: var(--fc, sans-serif);
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            position: absolute;
            bottom: -30px;
        }
        .lightbox-btn {
          position: absolute; background: none; border: none;
          color: white; font-size: 3rem; font-weight: 300;
          cursor: pointer; opacity: 0.5; transition: all 0.2s var(--ease, ease);
          z-index: 10000; display: flex; align-items: center; justify-content: center;
        }
        .lightbox-btn:hover { opacity: 1; transform: scale(1.1); }
        .lightbox-btn:active { transform: scale(0.95); }
        .lb-close { top: 20px; right: 40px; font-size: 3rem; }
        .lb-prev { left: 3vw; height: 100%; top: 0; padding: 0 40px; }
        .lb-next { right: 3vw; height: 100%; top: 0; padding: 0 40px; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.97); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @media (max-width: 900px) {
            .lightbox-btn { font-size: 2.5rem; }
            .lb-prev { padding: 0 10px; left: 0; }
            .lb-next { padding: 0 10px; right: 0; }
            .lb-close { right: 20px; top: 10px; }
        }
      `}</style>
    </div>
  );
}
