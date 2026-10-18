import type { LucideIcon } from 'lucide-react';

export interface SocialItem {
  id: 'whatsapp' | 'tiktok' | 'discord' | 'socialBuzz';
  label: string;
  description: string;
  url: string;
  icon: LucideIcon;
}