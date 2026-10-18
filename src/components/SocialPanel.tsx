import { MessageCircle, Music2, Gamepad2, Users } from 'lucide-react';
import type { SocialItem } from '../types/social';
import { appConfig, isLinkConfigured } from '../config';

function buildItems(): SocialItem[] {
  return [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'Chat & order langsung',
      url: isLinkConfigured(appConfig.whatsappNumber)
        ? `https://wa.me/${appConfig.whatsappNumber.trim()}`
        : '',
      icon: MessageCircle,
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      description: 'Konten & update terbaru',
      url: appConfig.social.tiktok,
      icon: Music2,
    },
    {
      id: 'discord',
      label: 'Discord',
      description: 'Komunitas ShinJoki',
      url: appConfig.social.discord,
      icon: Gamepad2,
    },
    {
      id: 'socialBuzz',
      label: 'Social Buzz',
      description: 'Review & bukti pengerjaan',
      url: appConfig.social.socialBuzz,
      icon: Users,
    },
  ];
}

export default function SocialPanel() {
  const items = buildItems().filter((item) => isLinkConfigured(item.url));

  if (items.length === 0) return null;

  return (
    <section className="social" id="kontak" aria-label="Media sosial ShinJoki">
      <div className="container">
        <div className="social__panel">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social__item"
              >
                <span className="social__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className="social__text">
                  <span className="social__label">{item.label}</span>
                  <span className="social__description">{item.description}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}