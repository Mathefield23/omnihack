import { X } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  link_url?: string;
}

interface AnnouncementBannerProps {
  announcement: Announcement;
}

export function AnnouncementBanner({ announcement }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleClick = () => {
    if (announcement.link_url) {
      window.open(announcement.link_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xl shadow-sm ring-1 ring-zinc-950/5',
        announcement.image_url ? 'bg-cover bg-center' : 'bg-gradient-to-br from-omnihack-primary to-omnihack-secondary'
      )}
      style={announcement.image_url ? { backgroundImage: `url(${announcement.image_url})` } : undefined}
    >
      {announcement.image_url && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      )}
      <div className="relative p-6">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
        <div className={announcement.link_url ? 'cursor-pointer' : ''} onClick={handleClick}>
          <h3 className="text-xl font-bold text-white mb-2">{announcement.title}</h3>
          <p className="text-white/90 leading-relaxed">{announcement.description}</p>
          {announcement.link_url && (
            <span className="inline-block mt-3 text-sm font-semibold text-white underline">
              Saiba mais →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
