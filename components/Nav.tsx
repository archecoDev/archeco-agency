"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav({ onLight = false }: { onLight?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const links = [
    { href: "/studio", label: "Studio" },
    { href: "/expertise", label: "Expertise" },
    { href: "/projects", label: "Projects" },
    { href: "/lab", label: "Lab" },
    { href: "/insights", label: "Insights" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`nav ${onLight ? 'on-light' : ''}`} id="nav" role="banner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>ARCHECO</Link>
        <ul className="nav-links" role="list">
          {links.map(link => (
            <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
          ))}
        </ul>

        <button 
          className="nav-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`nav-mobile ${isOpen ? 'open' : ''}`}>
        <button className="nav-mobile-x" onClick={closeMenu}>Close —</button>
        <ul className="nav-mobile-links">
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href} onClick={closeMenu}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
