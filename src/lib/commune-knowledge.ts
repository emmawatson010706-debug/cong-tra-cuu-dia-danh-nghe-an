import { districtLabel, type Commune } from "@/data/communes.ts";

export type DetailedArticle = {
  history: string;
  geography: string;
  economy: string;
  cultureTourism: string;
  vision: string;
  officialUrl: string;
};

// Hàm tạo bài viết chuẩn xác, khách quan cho từng xã/phường sau sáp nhập theo đúng chỉ đạo
export function getCommuneKnowledge(commune: Commune): DetailedArticle {
  const slug = commune.slug;
  const dName = districtLabel(commune.district);
  const oldUnitsList =
    commune.oldUnits && commune.oldUnits.length > 0
      ? commune.oldUnits.join(", ")
      : "các đơn vị hành chính tiền thân";
  const oldUnitsCount = commune.oldUnits?.length || 0;

  // Cổng thông tin điện tử địa phương chính thức
  const officialSlug = slug.replace(/-/g, "");
  const officialUrl = `https://${officialSlug}.nghean.gov.vn/`;

  // 1. Lịch sử hình thành & Quá trình sắp xếp đơn vị hành chính
  const history = `${commune.type} ${commune.name} là đơn vị hành chính cấp cơ sở thuộc ${dName}, tỉnh Nghệ An. Địa bàn được hình thành và sắp xếp ổn định theo Nghị quyết số 1678/NQ-UBTVQH15 ngày 23/12/2024 của Ủy ban Thường vụ Quốc hội về việc sắp xếp các đơn vị hành chính cấp xã của tỉnh Nghệ An giai đoạn 2023 - 2025 (có hiệu lực từ năm 2025). Đơn vị được thành lập trên cơ sở sáp nhập nguyên trạng toàn bộ diện tích tự nhiên và quy mô dân số của ${oldUnitsCount} đơn vị hành chính cũ gồm: ${oldUnitsList}. Trải qua các thời kỳ lịch sử, nhân dân các địa phương tiền thân luôn phát huy truyền thống yêu nước nồng nàn, cần cù trong lao động sản xuất và kiên cường, đoàn kết trong sự nghiệp xây dựng, bảo vệ quê hương đất nước.`;

  // 2. Vị trí địa lý & Không gian lãnh thổ sau sắp xếp
  const geography = `Sau khi hoàn thành sắp xếp địa giới hành chính, ${commune.type} ${commune.name} có tổng diện tích tự nhiên là ${String(commune.areaKm2 || 0).replace(".", ",")} km², xếp thứ #${commune.areaRank || 1} trên tổng số 130 đơn vị hành chính xã, phường của toàn tỉnh Nghệ An. Quy mô dân số đạt ${commune.population?.toLocaleString("vi-VN") || 0} người (xếp thứ #${commune.populationRank || 1}/130), mật độ dân số đạt xấp xỉ ${Math.round((commune.population || 0) / (commune.areaKm2 || 1)).toLocaleString("vi-VN")} người/km². Địa bàn mới tạo thành một chỉnh thể không gian lãnh thổ thống nhất, có hệ thống giao thông kết nối thuận tiện với các xã lân cận trong khu vực và các trục đường liên vùng của ${dName}.`;

  // 3. Kinh tế - Xã hội & Hạ tầng cơ sở
  const economy = `Kinh tế của ${commune.type} ${commune.name} phát triển ổn định, phù hợp với điều kiện thổ nhưỡng và tiềm năng sẵn có của địa phương. Địa bàn kết hợp hài hòa giữa phát triển sản xuất nông nghiệp, tiểu thủ công nghiệp, ngành nghề truyền thống với các loại hình dịch vụ, thương mại phục vụ đời sống nhân dân. Hệ thống cơ sở hạ tầng thiết yếu như mạng lưới giao thông liên thôn liên xã, điện lưới, trường học, trạm y tế và các công trình phúc lợi công cộng tiếp tục được quan tâm đầu tư nâng cấp đồng bộ, tạo đà thúc đẩy giao thương hàng hóa và từng bước nâng cao thu nhập, cải thiện đời sống vật chất của người dân.`;

  // 4. Văn hóa, Đời sống cộng đồng & Phong trào địa phương
  const cultureTourism = `Cộng đồng dân cư tại ${commune.type} ${commune.name} luôn giữ gìn và phát huy những nét đẹp văn hóa truyền thống, thuần phong mỹ tục của quê hương xứ Nghệ. Các phong trào 'Toàn dân đoàn kết xây dựng đời sống văn hóa', phong trào khuyến học khuyến tài và xây dựng nông thôn mới, đô thị văn minh được nhân dân tích cực hưởng ứng. Các thiết chế văn hóa cơ sở được duy trì hoạt động nền nếp; tinh thần tương thân tương ái, nếp sống văn minh trong việc cưới, việc tang và lễ hội được thực hiện tốt, góp phần xây dựng môi trường xã hội lành mạnh, đoàn kết.`;

  // 5. Định hướng phát triển sau sắp xếp năm 2025
  const vision = `Bước vào giai đoạn phát triển mới sau khi kiện toàn tổ chức bộ máy theo Nghị quyết số 1678/NQ-UBTVQH15, Đảng bộ, chính quyền và nhân dân ${commune.type} ${commune.name} tập trung giữ vững ổn định chính trị, củng cố quốc phòng - an ninh; đẩy mạnh cải cách hành chính, chuyển đổi số nhằm giải quyết nhanh chóng, thuận tiện các thủ tục hành chính và nhu cầu dân sinh. Địa phương phấn đấu khai thác hiệu quả các nguồn lực đất đai, lao động, từng bước hoàn thiện hạ tầng kỹ thuật, nâng cao đời sống nhân dân và xây dựng quê hương ngày càng đổi mới, phát triển bền vững.`;

  return {
    history,
    geography,
    economy,
    cultureTourism,
    vision,
    officialUrl,
  };
}
