"use client";

import { useState } from "react";
import { IconMenu } from "./Icons";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journal", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <a href="#intro" className="nav__logo" aria-label="Sakar Baxi home">
        S/B
      </a>

      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav__link">
            {l.label}
          </a>
        ))}
        <button
          type="button"
          className="nav__menu"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <IconMenu />
        </button>
      </nav>

      {open && (
        <div className="nav__drawer" role="dialog" aria-label="Mobile menu">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav__drawer-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
