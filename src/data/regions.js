export const REGION_LABELS = {
  center: 'Trung tâm tỉnh',
  east: 'Phía Đông / ven biển',
  north: 'Phía Bắc',
  south: 'Phía Nam / Tây Nam',
  west: 'Phía Tây miền núi'
};

const center = new Set(['Trường Vinh','Thành Vinh','Vinh Hưng','Vinh Phú','Vinh Lộc']);
const east = new Set([
  'Cửa Lò','Nghi Lộc','Phúc Lộc','Đông Lộc','Trung Lộc','Thần Lĩnh','Hải Lộc','Văn Kiều',
  'Diễn Châu','Đức Châu','Quảng Châu','Hải Châu','Tân Châu','An Châu','Minh Châu','Hùng Châu',
  'Quỳnh Lưu','Quỳnh Văn','Quỳnh Anh','Quỳnh Tam','Quỳnh Phú','Quỳnh Sơn','Quỳnh Thắng',
  'Hoàng Mai','Quỳnh Mai','Tân Mai'
]);
const north = new Set([
  'Yên Thành','Quan Thành','Hợp Minh','Vân Tụ','Vân Du','Quang Đồng','Giai Lạc','Bình Minh','Đông Thành',
  'Nghĩa Đàn','Nghĩa Thọ','Nghĩa Lâm','Nghĩa Mai','Nghĩa Hưng','Nghĩa Khánh','Nghĩa Lộc','Thái Hòa','Tây Hiếu'
]);
const south = new Set([
  'Hưng Nguyên','Yên Trung','Hưng Nguyên Nam','Lam Thành','Kim Liên','Vạn An','Nam Đàn','Đại Huệ','Thiên Nhẫn',
  'Đô Lương','Bạch Ngọc','Văn Hiến','Bạch Hà','Thuần Trung','Lương Sơn','Bích Hào','Cát Ngạn','Đại Đồng','Hạnh Lâm','Hoa Quân','Kim Bảng','Sơn Lâm','Tam Đồng','Xuân Lâm'
]);
const west = new Set([
  'Anh Sơn','Yên Xuân','Nhân Hòa','Anh Sơn Đông','Vĩnh Tường','Thành Bình Thọ','Con Cuông','Môn Sơn','Mậu Thạch','Cam Phục','Châu Khê','Bình Chuẩn','Chiêu Lưu','Hữu Kiệm','Mường Típ','Mường Xén','Na Loi','Na Ngoi','Nậm Cắn','Mỹ Lý','Bắc Lý','Huồi Tụ','Mường Lống','Mường Quàng','Quế Phong','Thông Thụ','Tiền Phong','Tri Lễ','Keng Đu','Quỳ Châu','Châu Tiến','Hùng Chân','Châu Bình','Quỳ Hợp','Tam Hợp','Châu Lộc','Châu Hồng','Mường Ham','Mường Chọng','Minh Hợp','Tân Kỳ','Tân Phú','Tân An','Nghĩa Đồng','Giai Xuân','Nghĩa Hành','Tiên Đồng','Đông Hiếu','Nga My','Nhôn Mai','Tam Quang','Tam Thái','Tương Dương','Yên Hòa','Yên Na','Hữu Khuông','Lượng Minh'
]);

function cleanName(name = '') {
  return String(name).replace(/^(xã|phường)\s+/i, '').trim();
}

export function getRegion(place) {
  const n = cleanName(place?.name);
  if (center.has(n)) return 'center';
  if (east.has(n)) return 'east';
  if (north.has(n)) return 'north';
  if (south.has(n)) return 'south';
  if (west.has(n)) return 'west';
  return 'east';
}

export function getRegionLabel(place) {
  return REGION_LABELS[getRegion(place)] || 'Đang phân vùng';
}

export function getOldDistrictLabel(place) {
  const old = place?.oldDistrict || 'Đang cập nhật';
  if (/^TP\b|thành phố/i.test(old)) return `${old} cũ`;
  if (/^TX\b|thị xã/i.test(old)) return `${old} cũ`;
  if (/Vinh/i.test(old)) return 'TP Vinh cũ';
  if (/Cửa Lò|Hoàng Mai|Thái Hòa/i.test(old)) return `TX ${old} cũ`;
  return `Huyện ${old} cũ`;
}

export const REGION_FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'center', label: 'Trung tâm tỉnh' },
  { key: 'east', label: 'Phía Đông / ven biển' },
  { key: 'north', label: 'Phía Bắc' },
  { key: 'south', label: 'Phía Nam / Tây Nam' },
  { key: 'west', label: 'Phía Tây miền núi' }
];
