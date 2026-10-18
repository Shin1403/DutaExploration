import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import type { Service } from '../types/service';
import { formatPrice } from '../utils/price';

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: (serviceId: string) => void;
}

export default function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  const available = service.status === 'available';

  return (
    <article
      className={`service-card${selected ? ' service-card--selected' : ''}${available ? '' : ' service-card--disabled'}`}
    >
      <div className="service-card__header">
        <h3 className="service-card__name">{service.name}</h3>
        {service.badge && <span className="badge">{service.badge}</span>}
      </div>

      {service.region && <p className="service-card__region">{service.region}</p>}
      <p className="service-card__description">{service.description}</p>

      {service.details && service.details.length > 0 && (
        <ul className="service-card__details">
          {service.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}

      <div className="service-card__meta">
        <span
          className={`service-card__price${
            service.price.type === 'unconfigured' ? ' service-card__price--pending' : ''
          }`}
        >
          {formatPrice(service.price)}
        </span>
        {service.duration && (
          <span className="service-card__duration">
            <Clock size={14} aria-hidden="true" />
            {service.duration}
          </span>
        )}
      </div>

      <div className="service-card__footer">
        {available ? (
          <button
            type="button"
            className={`btn btn--small${selected ? ' btn--primary' : ' btn--outline'}`}
            aria-pressed={selected}
            onClick={() => onSelect(service.id)}
          >
            {selected ? (
              <>
                <CheckCircle2 size={16} aria-hidden="true" />
                Dipilih
              </>
            ) : (
              'Pilih Layanan'
            )}
          </button>
        ) : (
          <span className="service-card__unavailable">
            <XCircle size={16} aria-hidden="true" />
            Tidak tersedia
          </span>
        )}
      </div>
    </article>
  );
}