import React from "react";
import { getAdministrativeTimeline } from "../data/adminHistory2024";

export function AdministrativeTimeline({ place }) {
  const stages2024 = getAdministrativeTimeline(place);

  const formerUnits = Array.isArray(place?.formerUnits)
    ? place.formerUnits
    : Array.isArray(place?.oldUnits)
      ? place.oldUnits
      : Array.isArray(place?.mergedFrom)
        ? place.mergedFrom
        : [];

  const currentName = place?.name || place?.title || "Địa phương này";
  const legalSource = place?.legalSource || "Nghị quyết 1678/NQ-UBTVQH15";

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
            <article className="admin-history-step" key={`${stage.year}-${index}`}>
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
            {formerUnits.length > 0 ? (
              <p>
                {currentName} được hình thành trên cơ sở sắp xếp từ các đơn vị hành chính cũ gồm:{" "}
                <strong>{formerUnits.join(", ")}</strong>.
              </p>
            ) : (
              <p>
                Thông tin các đơn vị hành chính cũ hình thành nên {currentName}
                đang được đối chiếu theo {legalSource}.
              </p>
            )}
            <small>Nguồn đối chiếu: {legalSource}</small>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AdministrativeTimeline;
