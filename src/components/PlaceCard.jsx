import { Link } from 'react-router-dom';
import { MapPin, Building2, ArrowUpRight } from 'lucide-react';

export default function PlaceCard({ place }) {
  const Icon = place.type === 'phường' ? Building2 : MapPin;
  return (
    <Link to={`/dia-danh/${place.slug}`} className="place-card portal-place-card">
      <span className="place-icon"><Icon size={20} /></span>
      <span className="place-copy">
        <strong>{place.name}</strong>
        <small>Từ {place.oldDistrict} cũ</small>
      </span>
      <span className="place-arrow"><ArrowUpRight size={16} /></span>
    </Link>
  );
}
