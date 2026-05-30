import React from "react";
import { getAdministrativeTimeline } from "../data/adminHistory2024";

function normalizeName(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, " ")
    .trim();
}

function getUnits2025(place = {}) {
  const candidates = [
    place.oldUnits,
    place.formerUnits,
    place.mergedFrom,
    place.sourceUnits,
    place.previousUnits
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

  const clean = (value = "") =>
    normalizeName(value)
      .replace(/^xa\s+/, "")
      .replace(/^phuong\s+/, "")
      .replace(/^thi tran\s+/, "")
      .trim();

  return clean(units[0]) === clean(place.name || place.title || "");
}

function build2025Description(place = {}, units = []) {
  const currentName = place?.name || place?.title || "Địa phương này";

  if (!units.length) {
    return `Thông tin các đơn vị hành chính cũ hình thành nên ${currentName} đang được đối chiếu theo Nghị quyết 1678/NQ-UBTVQH15.`;
  }

  if (isSameUnit(place, units)) {
    return `${currentName} là đơn vị hành chính tiếp tục được sử dụng trong hệ thống đơn vị hành chính cấp xã của tỉnh Nghệ An theo Nghị quyết 1678/NQ-UBTVQH15.`;
  }

  return `${currentName} được hình thành trên cơ sở sắp xếp toàn bộ diện tích tự nhiên, quy mô dân số của các đơn vị hành chính cũ gồm: ${units.join(", ")}.`;
}

export function AdministrativeTimeline({ place }) {
  const stages2024 = getAdministrativeTimeline(place);
  const units2025 = getUnits2025(place);

  const legalSource = place?.legalSource || "Nghị quyết 1678/NQ-UBTVQH15";
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
                <small>Nguồn đối chiếu: {stage.source}</small>
              </div>
            </article>
          ))
        ) : (
          <article className="admin-history-step admin-history-step--muted">
            <div className="admin-history-step__year">2024</div>
            <div className="admin-history-step__body">
              <h3>Đang đối chiếu lớp sắp xếp trung gian</h3>
              <p>
                Chưa ghi nhận thông tin sắp xếp trung gian giai đoạn 2023-2025
                trong dữ liệu hiện có của địa phương này. Nội dung sẽ tiếp tục
                được rà soát, đối chiếu trước khi công bố.
              </p>
            </div>
          </article>
        )}

        <article className="admin-history-step admin-history-step--current">
          <div className="admin-history-step__year">2025</div>
          <div className="admin-history-step__body">
            <h3>Sắp xếp theo {legalSource}</h3>
            <p>{description2025}</p>
            <small>Nguồn đối chiếu: {legalSource}</small>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AdministrativeTimeline;