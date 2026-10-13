import type { ArticleSection } from "./articles.ts";

// Đợt 3: Anh Sơn, Con Cuông, Kỳ Sơn, Tương Dương, Quế Phong, Quỳ Châu, Quỳ Hợp.
const G = "Địa lý và kinh tế";
const C = "Văn hóa và con người";

export const ARTICLES_3: Record<string, ArticleSection[]> = {
  "anh-son": [
    { title: "Hình thành", body: "Anh Sơn hợp nhất từ thị trấn Kim Nhan và các xã Đức Sơn, Phúc Sơn, là trung tâm huyện Anh Sơn cũ nằm bên sông Lam." },
    { title: G, body: "Vùng bán sơn địa với đất đồi bazan và phù sa ven sông Lam, thích hợp cây chè, cây ăn quả, mía và chăn nuôi. Quốc lộ 7 và đường Hồ Chí Minh đi qua giúp giao thương với miền Tây." },
  ],
  "anh-son-dong": [
    { title: G, body: "Gồm các xã Lạng Sơn, Tào Sơn, Vĩnh Sơn, vùng đồng bằng ven sông Lam với lúa, ngô, lạc và chăn nuôi là chính." },
  ],
  "nhan-hoa": [
    { title: G, body: "Gồm các xã Cẩm Sơn, Hùng Sơn, Tam Đỉnh, địa bàn đồi núi xen đồng ruộng, phát triển chè, cây ăn quả và trồng rừng." },
  ],
  "thanh-binh-tho": [
    { title: G, body: "Gồm các xã Bình Sơn, Thành Sơn, Thọ Sơn, nằm ven sông Lam, thế mạnh về lúa, màu, chăn nuôi và dịch vụ nông thôn." },
  ],
  "vinh-tuong": [
    { title: G, body: "Gồm các xã Hoa Sơn, Hội Sơn, Tường Sơn, vùng bán sơn địa với cây công nghiệp, lâm nghiệp và chăn nuôi." },
  ],
  "yen-xuan": [
    { title: G, body: "Gồm các xã Cao Sơn, Khai Sơn, Lĩnh Sơn, Long Sơn, địa bàn rộng, nhiều đồi núi, trồng rừng, chè và cây ăn quả." },
  ],
  "con-cuong": [
    { title: "Hình thành", body: "Con Cuông hợp nhất từ thị trấn Trà Lân, xã Chi Khê và Yên Khê, là trung tâm huyện Con Cuông cũ bên dòng sông Giăng." },
    { title: "Thiên nhiên", body: "Con Cuông nằm trong vùng Khu dự trữ sinh quyển thế giới miền Tây Nghệ An với Vườn quốc gia Pù Mát. Thác Khe Kèm, suối nước mọc và rừng nguyên sinh là các điểm du lịch sinh thái nổi tiếng." },
    { title: C, body: "Vùng cư trú của người Thái, Thổ, Đan Lai cùng nhiều nét văn hóa như dệt thổ cẩm, ẩm thực cá suối, lễ hội dân gian." },
  ],
  "binh-chuan": [
    { title: G, body: "Xã Bình Chuẩn nằm ở vùng núi phía tây, có các bản làng người Thái. Người dân làm nương rẫy, trồng lúa, chăn nuôi và khai thác lâm sản bền vững." },
  ],
  "cam-phuc": [
    { title: G, body: "Gồm các xã Cam Lâm và Đôn Phục, vùng núi có nhiều sông suối, phát triển nông lâm nghiệp và du lịch cộng đồng." },
  ],
  "chau-khe": [
    { title: G, body: "Gồm các xã Lạng Khê và Châu Khê, nằm ven sông Giăng, nông nghiệp, trồng rừng và nghề thủ công của người Thái." },
  ],
  "mau-thach": [
    { title: G, body: "Gồm các xã Mậu Đức và Thạch Ngàn, thuộc vùng đệm Vườn quốc gia Pù Mát, thích hợp du lịch sinh thái và bảo tồn rừng." },
  ],
  "mon-son": [
    { title: "Thiên nhiên", body: "Gồm các xã Lục Dạ và Môn Sơn, nằm ở vùng lõi Vườn quốc gia Pù Mát. Đây là địa bàn sinh sống của cộng đồng người Đan Lai, một tộc người có số dân ít và đời sống gắn với rừng." },
    { title: C, body: "Môn Sơn gắn với du lịch cộng đồng, trải nghiệm đi thuyền trên sông, ẩm thực và đời sống bản làng." },
  ],
  "muong-xen": [
    { title: "Hình thành", body: "Mường Xén hợp nhất từ thị trấn Mường Xén, xã Tà Cạ, xã Tây Sơn, là trung tâm huyện Kỳ Sơn cũ." },
    { title: G, body: "Mường Xén nằm trên quốc lộ 7, là cửa ngõ đi cửa khẩu Nậm Cắn sang Lào. Khí hậu mát mẻ, nơi sinh sống của người Mông, Thái, Khơ Mú, Kinh." },
  ],
  "nam-can": [
    { title: "Cửa khẩu", body: "Gồm các xã Phà Đánh và Nậm Cắn. Cửa khẩu quốc tế Nậm Cắn là cửa ngõ giao thương giữa Nghệ An và tỉnh Xiêng Khoảng của Lào." },
  ],
  "muong-long": [
    { title: G, body: "Xã Mường Lống ở vùng cao, nổi tiếng với cảnh quan mây núi, bản làng người Mông và cây ăn quả ôn đới. Đây là điểm đến săn mây và khám phá văn hóa vùng cao." },
  ],
  "muong-tip": [
    { title: G, body: "Gồm các xã Mường Ải và Mường Típ, vùng núi giáp Lào, nơi người Thái và Khơ Mú sinh sống, với nương rẫy, trồng rừng và nghề thủ công." },
  ],
  "bac-ly": [
    { title: G, body: "Xã Bắc Lý nằm sát biên giới Việt - Lào, địa hình núi cao, giao thông còn khó khăn. Người dân chủ yếu là dân tộc Mông, trồng lúa nương, ngô và chăn nuôi." },
  ],
  "chieu-luu": [
    { title: G, body: "Gồm các xã Bảo Thắng và Chiêu Lưu ở vùng núi Kỳ Sơn, nơi có nhiều bản người Mông và Thái." },
  ],
  "huoi-tu": [
    { title: G, body: "Xã Huồi Tụ thuộc vùng núi cao Kỳ Sơn, cư dân chủ yếu là người Thái, Mông, canh tác nương rẫy và chăn nuôi." },
  ],
  "huu-kiem": [
    { title: G, body: "Gồm các xã Bảo Nam, Hữu Lập, Hữu Kiệm, nằm ven biên giới, đời sống gắn với nông nghiệp vùng cao." },
  ],
  "keng-du": [
    { title: G, body: "Xã Keng Đu thuộc vùng núi sát biên giới, địa hình hiểm trở, cư dân chủ yếu là dân tộc thiểu số." },
  ],
  "my-ly": [
    { title: G, body: "Xã Mỹ Lý nằm ven biên giới Việt - Lào, địa hình núi cao, nhiều bản làng người Thái, Khơ Mú, sản xuất lúa nương và chăn nuôi." },
  ],
  "na-loi": [
    { title: G, body: "Gồm các xã Đoọc Mạy và Na Loi, vùng núi Kỳ Sơn với nhiều bản làng dân tộc thiểu số." },
  ],
  "na-ngoi": [
    { title: G, body: "Gồm các xã Nậm Càn và Na Ngoi, vùng biên giới có sông Nậm Mộ chảy qua, người dân canh tác nương rẫy và trồng rừng." },
  ],
  "tuong-duong": [
    { title: "Hình thành", body: "Tương Dương hợp nhất từ thị trấn Thạch Giám, xã Lưu Kiền và Xá Lượng, là trung tâm huyện Tương Dương cũ." },
    { title: G, body: "Tương Dương là huyện miền núi phía tây, có sông Nậm Mộ và sông Nặm Nơn. Cư dân chủ yếu là người Thái, Khơ Mú, Mông, Kinh." },
  ],
  "huu-khuong": [
    { title: G, body: "Xã Hữu Khuông nằm sát biên giới, địa hình núi, người dân sinh sống bằng nương rẫy, lâm nghiệp và chăn nuôi." },
  ],
  "luong-minh": [
    { title: G, body: "Xã Lượng Minh nằm ở vùng thượng nguồn sông Nặm Nơn, cư dân Thái và Khơ Mú canh tác nương rẫy và khai thác lâm sản." },
  ],
  "nga-my": [
    { title: G, body: "Gồm các xã Xiêng My và Nga My, vùng núi thuộc Tương Dương, đời sống chủ yếu từ nông lâm nghiệp." },
  ],
  "nhon-mai": [
    { title: G, body: "Gồm các xã Mai Sơn và Nhôn Mai, thuộc vùng lòng hồ thủy điện Bản Vẽ, kết hợp nông lâm nghiệp và thủy sản." },
  ],
  "tam-quang": [
    { title: G, body: "Gồm các xã Tam Đình và Tam Quang, vùng núi Tương Dương với cư dân Thái và Khơ Mú." },
  ],
  "tam-thai": [
    { title: G, body: "Gồm các xã Tam Hợp và Tam Thái, địa bàn đồi núi, canh tác lúa nương, ngô và chăn nuôi." },
  ],
  "yen-hoa": [
    { title: G, body: "Gồm các xã Yên Thắng và Yên Hòa, vùng núi nằm ven đường Hồ Chí Minh nhánh Tây, nông nghiệp, trồng rừng và lâm sản." },
  ],
  "yen-na": [
    { title: G, body: "Gồm các xã Yên Tĩnh và Yên Na, thuộc vùng hồ Bản Vẽ, kinh tế dựa vào nông lâm nghiệp và thủy sản." },
  ],
  "que-phong": [
    { title: "Hình thành", body: "Quế Phong hợp nhất từ thị trấn Kim Sơn, xã Châu Kim, Mường Nọc, Nậm Giải, là trung tâm huyện Quế Phong cũ, huyện ở cực tây bắc Nghệ An." },
    { title: "Thiên nhiên", body: "Quế Phong thuộc vùng Pù Hoạt với rừng núi trùng điệp và đầu nguồn sông Hiếu. Thác Sao Va là điểm du lịch sinh thái nổi tiếng." },
    { title: C, body: "Nơi cư trú của người Thái, Thổ, Mông, Khơ Mú. Địa phương có nghề dệt thổ cẩm, ẩm thực và lễ hội đậm bản sắc." },
  ],
  "muong-quang": [
    { title: G, body: "Gồm các xã Cắm Muộn, Châu Thôn, Quang Phong, địa bàn núi cao đầu nguồn sông Hiếu, người dân làm nông lâm nghiệp." },
  ],
  "thong-thu": [
    { title: G, body: "Gồm các xã Đồng Văn và Thông Thụ ở vùng biên giới Quế Phong, cư dân chủ yếu là người Thái, Mông." },
  ],
  "tien-phong": [
    { title: G, body: "Gồm các xã Hạnh Dịch và Tiền Phong, vùng núi ven sông Hiếu, phát triển nông nghiệp, trồng rừng và chăn nuôi." },
  ],
  "tri-le": [
    { title: G, body: "Gồm các xã Nậm Nhoóng và Tri Lễ, vùng núi giáp Lào với người Thái và Mông sinh sống." },
  ],
  "quy-chau": [
    { title: "Hình thành", body: "Quỳ Châu hợp nhất từ thị trấn Tân Lạc và các xã Châu Hạnh, Châu Hội, Châu Nga, là trung tâm huyện Quỳ Châu cũ." },
    { title: "Danh lam", body: "Hang Bua ở khu vực Châu Hạnh là hang động đẹp, nằm trong vùng đá vôi, thu hút du khách khám phá. Quỳ Châu còn nổi tiếng với dưa hấu, hoa quả và đặc sản vùng cao." },
  ],
  "chau-binh": [
    { title: G, body: "Xã Châu Bình ở vùng núi Quỳ Châu, người dân làm nông lâm nghiệp, trồng rừng và chăn nuôi." },
  ],
  "chau-tien": [
    { title: G, body: "Gồm các xã Châu Tiến, Châu Bính, Châu Thắng, Châu Thuận, vùng núi với nương rẫy, trồng rừng và chăn nuôi." },
  ],
  "hung-chan": [
    { title: G, body: "Gồm các xã Châu Hoàn, Châu Phong, Diên Lãm, nằm ở phía bắc Quỳ Châu, thế mạnh nông lâm nghiệp." },
  ],
  "quy-hop": [
    { title: "Hình thành", body: "Quỳ Hợp hợp nhất từ thị trấn Quỳ Hợp, xã Châu Đình, Châu Quang, Thọ Hợp, là trung tâm huyện Quỳ Hợp cũ." },
    { title: "Kinh tế", body: "Quỳ Hợp nổi tiếng với khai thác và chế biến đá trắng, thiếc và khoáng sản, cùng cây chè, cao su và cây ăn quả. Huyện có nhiều khu công nghiệp chế biến đá." },
  ],
  "chau-hong": [
    { title: G, body: "Gồm các xã Châu Tiến, Châu Thành, Châu Hồng, nằm ở phía tây Quỳ Hợp, phát triển nông lâm nghiệp và cây công nghiệp." },
  ],
  "chau-loc": [
    { title: G, body: "Gồm các xã Liên Hợp và Châu Lộc, vùng đồi núi với cây cao su, chè, cây ăn quả và khai thác khoáng sản." },
  ],
  "minh-hop": [
    { title: G, body: "Gồm các xã Hạ Sơn, Văn Lợi, Minh Hợp, địa bàn có hoạt động khai thác và chế biến đá, khoáng sản cùng nông nghiệp." },
  ],
  "muong-chong": [
    { title: G, body: "Gồm các xã Bắc Sơn, Nam Sơn, Châu Lý, vùng núi người Thái, Thổ, trồng rừng, nương rẫy và chăn nuôi." },
  ],
  "muong-ham": [
    { title: G, body: "Gồm các xã Châu Cường và Châu Thái, vùng núi Quỳ Hợp với nông lâm nghiệp là chủ đạo." },
  ],
  "tam-hop": [
    { title: G, body: "Gồm các xã Tam Hợp, Đồng Hợp, Nghĩa Xuân, Yên Hợp, vùng núi có cây công nghiệp, chăn nuôi và khai thác khoáng sản." },
  ],
};
