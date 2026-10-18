import { MessageCircle, Music2, Gamepad2 } from 'lucide-react';
import { appConfig, isLinkConfigured } from '../config';

export default function Footer() {
  const year = new Date().getFullYear();
  const waUrl = isLinkConfigured(appConfig.whatsappNumber)
    ? `https://wa.me/${appConfig.whatsappNumber.trim()}`
    : '';

  const socialLinks = [
    { id: 'whatsapp', label: 'WhatsApp', url: waUrl, icon: MessageCircle },
    { id: 'tiktok', label: 'TikTok', url: appConfig.social.tiktok, icon: Music2 },
    { id: 'discord', label: 'Discord', url: appConfig.social.discord, icon: Gamepad2 },
  ].filter((link) => isLinkConfigured(link.url));

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo" aria-hidden="true">
            {appConfig.brand.initials}
          </span>
          <div className="footer__brand-text">
            <span className="footer__name">{appConfig.brand.name}</span>
            <span className="footer__tagline">{appConfig.brand.tagline}</span>
          </div>
        </div>

        {socialLinks.length > 0 && (
          <nav className="footer__links" aria-label="Tautan sosial media">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  <Icon size={16} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}

        <p className="footer__copy">
          © {year} {appConfig.brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}