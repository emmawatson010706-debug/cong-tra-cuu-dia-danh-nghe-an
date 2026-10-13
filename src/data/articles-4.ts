import type { ArticleSection } from "./articles.ts";

// Đợt 4: Thanh Chương, Đô Lương, Tân Kỳ, Nghĩa Đàn.
const G = "Địa lý và kinh tế";

export const ARTICLES_4: Record<string, ArticleSection[]> = {
  "dai-dong": [
    { title: "Hình thành", body: "Đại Đồng hợp nhất từ thị trấn Dùng và các xã Đồng Văn, Thanh Ngọc, Thanh Phong, Đại Đồng, là trung tâm huyện Thanh Chương cũ." },
    { title: G, body: "Thanh Chương là huyện rộng nằm bên sông Lam, có đồng bằng xen đồi núi. Vùng này nổi tiếng với cây chè, cam, nhút Thanh Chương và truyền thống hiếu học." },
  ],
  "bich-hao": [{ title: G, body: "Gồm các xã Mai Giang, Thanh Lâm, Thanh Tùng, Thanh Xuân, địa bàn nông nghiệp với lúa, màu, chè và chăn nuôi." }],
  "cat-ngan": [{ title: G, body: "Gồm các xã Minh Sơn, Cát Văn, Phong Thịnh, vùng bán sơn địa phát triển chè, cây ăn quả và chăn nuôi." }],
  "hanh-lam": [{ title: G, body: "Gồm các xã Thanh Đức và Hạnh Lâm, địa bàn đồi núi phía tây Thanh Chương, trồng rừng, chè và chăn nuôi." }],
  "hoa-quan": [{ title: G, body: "Gồm các xã Thanh An, Thanh Hương, Thanh Quả, Thanh Thịnh, vùng đồng bằng ven sông Lam với lúa, màu và dịch vụ." }],
  "kim-bang": [{ title: G, body: "Gồm các xã Thanh Hà, Thanh Thủy, Kim Bảng, nông nghiệp lúa nước, rau màu và chăn nuôi." }],
  "son-lam": [{ title: G, body: "Gồm các xã Ngọc Lâm và Thanh Sơn, vùng đồi núi, trồng rừng, cây công nghiệp và chăn nuôi." }],
  "tam-dong": [{ title: G, body: "Gồm các xã Thanh Liên, Thanh Mỹ, Thanh Tiên, địa bàn nông nghiệp với cây chè, cây ăn quả và lúa." }],
  "xuan-lam": [{ title: G, body: "Gồm các xã Ngọc Sơn, Minh Tiến, Xuân Dương, vùng bán sơn địa trồng chè, mía và chăn nuôi." }],
  "do-luong": [
    { title: "Hình thành", body: "Đô Lương hợp nhất từ thị trấn Đô Lương và các xã Bắc Sơn, Nam Sơn, Đà Sơn, Đặng Sơn, Lưu Sơn, Thịnh Sơn, Văn Sơn, Yên Sơn, là trung tâm huyện Đô Lương cũ." },
    { title: G, body: "Đô Lương nằm trên quốc lộ 7, bên sông Lam, là đầu mối giao thông, thương mại của vùng giữa Nghệ An. Vùng đất có truyền thống hiếu học và nhiều di tích." },
  ],
  "bach-ha": [{ title: G, body: "Gồm các xã Đại Sơn, Hiến Sơn, Mỹ Sơn, Trù Sơn, nông nghiệp lúa, màu, chăn nuôi và tiểu thủ công nghiệp." }],
  "bach-ngoc": [{ title: G, body: "Gồm các xã Bồi Sơn, Giang Sơn Đông, Giang Sơn Tây, Bạch Ngọc, vùng ven sông Lam với lúa nước và dịch vụ." }],
  "luong-son": [{ title: G, body: "Gồm các xã Bài Sơn, Đông Sơn, Hồng Sơn, Tràng Sơn, nông nghiệp, chăn nuôi và nghề thủ công." }],
  "thuan-trung": [{ title: G, body: "Gồm các xã Minh Sơn, Lạc Sơn, Nhân Sơn, Thuận Sơn, Trung Sơn, Xuân Sơn, địa bàn rộng, phát triển nông nghiệp và chăn nuôi." }],
  "van-hien": [{ title: G, body: "Gồm các xã Tân Sơn, Hòa Sơn, Quang Sơn, Thái Sơn, Thượng Sơn, vùng đồng bằng xen đồi, nông nghiệp là chính." }],
  "tan-ky": [
    { title: "Hình thành", body: "Tân Kỳ hợp nhất từ thị trấn Tân Kỳ và các xã Nghĩa Dũng, Kỳ Tân, Kỳ Sơn, là trung tâm huyện Tân Kỳ cũ." },
    { title: G, body: "Tân Kỳ nằm trên đường Hồ Chí Minh, vùng đồi núi thấp thích hợp cây công nghiệp như mía, chè, cao su, cây ăn quả và chăn nuôi." },
  ],
  "dong-hieu": [{ title: G, body: "Gồm các xã Nghĩa Mỹ, Nghĩa Thuận, Đông Hiếu, địa bàn đồi núi, nông lâm nghiệp và cây công nghiệp." }],
  "giai-xuan": [{ title: G, body: "Gồm các xã Tân Hợp và Giai Xuân, vùng núi phía tây Tân Kỳ, trồng rừng, chăn nuôi và cây ăn quả." }],
  "nghia-dong": [{ title: G, body: "Gồm các xã Bình Hợp và Nghĩa Đồng, đồi núi thấp, phát triển mía, cây công nghiệp và chăn nuôi." }],
  "nghia-hanh": [{ title: G, body: "Gồm các xã Phú Sơn, Tân Hương, Nghĩa Hành, nông lâm nghiệp và chăn nuôi." }],
  "tan-an": [{ title: G, body: "Gồm các xã Hương Sơn, Nghĩa Phúc, Tân An, vùng đồi núi với cây công nghiệp và chăn nuôi." }],
  "tan-phu": [{ title: G, body: "Gồm các xã Nghĩa Thái, Hoàn Long, Tân Xuân, Tân Phú, nông nghiệp, chăn nuôi và trồng rừng." }],
  "tien-dong": [{ title: G, body: "Gồm các xã Đồng Văn và Tiên Kỳ, địa bàn đồi núi, cây công nghiệp và chăn nuôi." }],
  "nghia-dan": [
    { title: "Hình thành", body: "Nghĩa Đàn hợp nhất từ thị trấn Nghĩa Đàn và các xã Nghĩa Bình, Nghĩa Trung, là trung tâm huyện Nghĩa Đàn cũ." },
    { title: G, body: "Nghĩa Đàn là vùng đất đỏ bazan lớn của Nghệ An, thế mạnh cây cao su, cà phê, cam, mía và chăn nuôi bò sữa. Đường Hồ Chí Minh và quốc lộ 48 giúp giao thương thuận lợi." },
  ],
  "nghia-hung": [{ title: G, body: "Gồm các xã Nghĩa Thành và Nghĩa Hưng, đất bazan, trồng cây công nghiệp, cây ăn quả và chăn nuôi." }],
  "nghia-khanh": [{ title: G, body: "Gồm các xã Nghĩa An, Nghĩa Đức, Nghĩa Khánh, nông nghiệp, cây công nghiệp và chăn nuôi." }],
  "nghia-lam": [{ title: G, body: "Gồm các xã Nghĩa Lạc, Nghĩa Sơn, Nghĩa Yên, Nghĩa Lâm, địa bàn đồi núi, trồng rừng, cây công nghiệp và chăn nuôi." }],
  "nghia-loc": [{ title: G, body: "Gồm các xã Nghĩa Long và Nghĩa Lộc, vùng đất đỏ phù hợp cây công nghiệp và chăn nuôi." }],
  "nghia-mai": [{ title: G, body: "Gồm các xã Nghĩa Hồng, Nghĩa Minh, Nghĩa Mai, nông nghiệp, chăn nuôi và cây ăn quả." }],
  "nghia-tho": [{ title: G, body: "Gồm các xã Nghĩa Hội, Nghĩa Lợi, Nghĩa Thọ, vùng đất bazan với cam, cây công nghiệp và chăn nuôi." }],
};
