import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { appConfig } from '../config';

const NAV_LINKS = [
  { href: '#layanan', label: 'Layanan' },
  { href: '#cara-pesan', label: 'Cara Pesan' },
  { href: '#kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <a href="#beranda" className="navbar__brand" aria-label="dutaexploration - kembali ke atas">
          <span className="navbar__logo" aria-hidden="true">
            {appConfig.brand.initials}
          </span>
          <span className="navbar__name">{appConfig.brand.name}</span>
        </a>

        <nav className="navbar__links" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="navbar__mobile" aria-label="Navigasi mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}