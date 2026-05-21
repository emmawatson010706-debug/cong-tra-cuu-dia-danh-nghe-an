import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin } from 'lucide-react';

const regionByDistrict = {
  'TP Vinh': 'Trung tâm tỉnh',
  'Cửa Lò': 'Phía Đông / ven biển',
  'Nghi Lộc': 'Phía Đông / ven biển',
  'Diễn Châu': 'Phía Đông / ven biển',
  'Quỳnh Lưu': 'Phía Đông / ven biển',
  'Hoàng Mai': 'Phía Đông / ven biển',
  'Yên Thành': 'Phía Bắc',
  'Nghĩa Đàn': 'Phía Bắc',
  'Thái Hòa': 'Phía Bắc',
  'Hưng Nguyên': 'Phía Nam / Tây Nam',
  'Nam Đàn': 'Phía Nam / Tây Nam',
  'Thanh Chương': 'Phía Nam / Tây Nam',
  'Đô Lương': 'Phía Nam / Tây Nam',
  'Anh Sơn': 'Phía Tây miền núi',
  'Con Cuông': 'Phía Tây miền núi',
  'Kỳ Sơn': 'Phía Tây miền núi',
  'Tương Dương': 'Phía Tây miền núi',
  'Quế Phong': 'Phía Tây miền núi',
  'Quỳ Châu': 'Phía Tây miền núi',
  'Quỳ Hợp': 'Phía Tây miền núi',
  'Tân Kỳ': 'Phía Tây miền núi'
};

export function getRegionLabel(place) {
  return regionByDistrict[place?.oldDistrict] || 'Đang phân vùng';
}

export default function PlaceCard({ place }) {
  const Icon = place.type === 'phường' ? Building2 : MapPin;
  const region = getRegionLabel(place);
  return (
    <Link to={`/dia-danh/${place.slug}`} className="place-card">
      <span className="place-icon"><Icon size={22}/></span>
      <span className="place-card-text">
        <strong>{place.name}</strong>
        <small>{place.oldDistrict} cũ · {region}</small>
      </span>
      <span className="place-arrow"><ArrowRight size={18}/></span>
    </Link>
  );
}
