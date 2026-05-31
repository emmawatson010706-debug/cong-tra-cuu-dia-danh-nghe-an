import React from "react";
import { getAdministrativeTimeline } from "../data/adminHistory2024";
import placesStats from "../data/places.json";

const SOURCE_2024 = "Nghị quyết 1243/NQ-UBTVQH15";
const SOURCE_2025 = "Nghị quyết 1678/NQ-UBTVQH15";

function normalizeName(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/^(xa|phuong|thi tran)\s+/i, "")
    .replace(/[\s-]+/g, " ")
    .trim();
}

function normalizeSlug(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/^(xa-|phuong-|thi-tran-)/i, "")
    .replace(/\s+/g, "-")
    .trim();
}

function compactSource(source = "") {
  const text = String(source || "");
  if (text.includes("1243")) return SOURCE_2024;
  if (text.includes("1678")) return SOURCE_2025;
  return text || SOURCE_2025;
}

function findStatsPlace(place = {}) {
  const placeSlug = normalizeSlug(place?.slug || "");
  const placeName = normalizeName(place?.name || place?.title || "");

  return placesStats.find((item) => {
    const itemSlug = normalizeSlug(item?.slug || "");
    const itemName = normalizeName(item?.name || "");

    return (
      (placeSlug && itemSlug && placeSlug === itemSlug) ||
      (placeName && itemName && placeName === itemName)
    );
  });
}

function getUnits2025(place = {}) {
  const statsPlace = findStatsPlace(place);
  const candidates = [
    place.oldUnits,
    place.formerUnits,
    place.mergedFrom,
    place.sourceUnits,
    place.previousUnits,
    statsPlace?.oldUnits,
    statsPlace?.formerUnits,
    statsPlace?.mergedFrom,
    statsPlace?.sourceUnits,
    statsPlace?.previousUnits
  ];

  for (const item of candidates) {
    if (Array.isArray(item) && item.length > 0) {
      return item.filter(Boolean);
    }
  }

  return [];
}

function isSameUnit(place = {}, units = []) {
  if (units.length !== 1) return false;
  return normalizeName(units[0]) === normalizeName(place.name || place.title || "");
}

function joinVietnameseList(items = []) {
  const list = items.filter(Boolean);
  if (list.length <= 1) return list[0] || "";
  return `${list.slice(0, -1).join(", ")} và ${list[list.length - 1]}`;
}

function build2024FallbackDescription(currentName) {
  return `Đối chiếu Nghị quyết số 1243/NQ-UBTVQH15, chưa ghi nhận đơn vị cũ cấu thành ${currentName} thuộc danh mục sắp xếp giai đoạn 2023–2025. Nội dung năm 2024 chỉ hiển thị khi có căn cứ trực tiếp trong Nghị quyết 1243/NQ-UBTVQH15.`;
}

function build2025Description(place = {}, units = []) {
  const currentName = place?.name || place?.title || "Địa phương này";

  if (!units.length) {
    return `Thông tin các đơn vị hành chính cũ hình thành nên ${currentName} đang được đối chiếu theo Nghị quyết 1678/NQ-UBTVQH15.`;
  }

  if (isSameUnit(place, units)) {
    return `Theo Nghị quyết 1678/NQ-UBTVQH15, ${currentName} là đơn vị hành chính không thực hiện sắp xếp trong đợt năm 2025.`;
  }

  return `${currentName} được thành lập trên cơ sở sắp xếp toàn bộ diện tích tự nhiên, quy mô dân số của ${joinVietnameseList(units)}.`;
}

export function AdministrativeTimeline({ place }) {
  const currentName = place?.name || place?.title || "địa phương này";
  const stages2024 = getAdministrativeTimeline(place);
  const units2025 = getUnits2025(place);
  const description2025 = build2025Description(place, units2025);

  return (
    <section className="admin-history-card" aria-label="Quá trình sắp xếp hành chính">
      <div className="admin-history-card__head">
        <div>
          <p className="admin-history-card__eyebrow">Hồ sơ hình thành địa danh</p>
          <h2>Quá trình sắp xếp hành chính</h2>
        </div>
        <span className="admin-history-card__badge">2024-2025</span>
      </div>

      <div className="admin-history-timeline">
        {stages2024.length > 0 ? (
          stages2024.map((stage, index) => (
            <article className="admin-history-step" key={`${stage.year}-${stage.relatedUnit || index}`}>
              <div className="admin-history-step__year">{stage.year}</div>
              <div className="admin-history-step__body">
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <small>Nguồn đối chiếu: {compactSource(stage.source)}</small>
              </div>
            </article>
          ))
        ) : (
          <article className="admin-history-step admin-history-step--muted">
            <div className="admin-history-step__year">2024</div>
            <div className="admin-history-step__body">
              <h3>Không phát sinh sắp xếp theo Nghị quyết 1243/NQ-UBTVQH15</h3>
              <p>{build2024FallbackDescription(currentName)}</p>
              <small>Nguồn đối chiếu: {SOURCE_2024}</small>
            </div>
          </article>
        )}

        <article className="admin-history-step admin-history-step--current">
          <div className="admin-history-step__year">2025</div>
          <div className="admin-history-step__body">
            <h3>Sắp xếp theo {SOURCE_2025}</h3>
            <p>{description2025}</p>
            <small>Nguồn đối chiếu: {SOURCE_2025}</small>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AdministrativeTimeline;
