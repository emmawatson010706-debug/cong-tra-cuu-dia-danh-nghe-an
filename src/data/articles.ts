export type ArticleSection = { title: string; body: string };

// Đợt 1: TP Vinh, thị xã Cửa Lò, Hoàng Mai, Thái Hòa, huyện Nam Đàn, Hưng Nguyên.
// Chỉ nêu các địa danh đã được xác nhận rộng rãi; phần còn lại viết khái quát.
export const ARTICLES: Record<string, ArticleSection[]> = {
  "thanh-vinh": [
    { title: "Lịch sử", body: "Thành Vinh nằm ở lõi trung tâm thành phố Vinh, vùng đất gắn với Thành cổ Vinh do vua Gia Long cho xây dựng từ đầu thế kỷ 19 và tên gọi Vinh được dùng từ thời Nguyễn. Qua chiến tranh, khu vực này bị tàn phá nặng và được xây dựng lại thành một đô thị hiện đại." },
    { title: "Danh lam và du lịch", body: "Quảng trường Hồ Chí Minh với tượng đài Bác Hồ là điểm nhấn của thành phố, cạnh đó là Công viên Trung tâm. Chợ Vinh, khu phố đi bộ và ga Vinh làm nên diện mạo sầm uất của đô thị. Du khách thường dừng chân ở đây để thưởng thức các món đặc sản như cháo lươn, súp lươn, cam Vinh." },
    { title: "Kinh tế", body: "Đây là khu vực thương mại, dịch vụ, tài chính, y tế và giáo dục tập trung nhất Nghệ An. Phường gần như không còn đất nông nghiệp, mật độ dân số rất cao nên hạ tầng giao thông và đô thị được ưu tiên đầu tư." },
  ],
  "truong-vinh": [
    { title: "Lịch sử", body: "Phường gồm Bến Thủy, Trường Thi, Trung Đô, Hưng Dũng, Hưng Phúc, Vinh Tân và xã Hưng Hòa. Bến Thủy là cảng sông và khu công nghiệp sớm nhất của xứ Nghệ, nơi có Nhà máy Diêm và Nhà máy Cưa. Công nhân Bến Thủy tham gia phong trào Xô viết Nghệ Tĩnh 1930-1931." },
    { title: "Danh lam và di tích", body: "Núi Dũng Quyết và Đền Quang Trung ở khu vực Trung Đô gắn với Phượng Hoàng Trung Đô, kinh đô dự định của vua Quang Trung. Cầu Bến Thủy bắc qua sông Lam nối Nghệ An với Hà Tĩnh. Trường Đại học Vinh ở khu vực Trường Thi là trung tâm đào tạo lớn của Bắc Trung Bộ." },
    { title: "Kinh tế", body: "Phường có dân số 141.477 người, lớn nhất tỉnh. Cảng Bến Thủy, các cơ sở công nghiệp, giáo dục và thương mại giữ vai trò chủ lực." },
  ],
  "vinh-hung": [
    { title: "Vị trí và hình thành", body: "Vinh Hưng gồm các phường Hưng Đông, Quán Bàu và các xã Nghi Kim, Nghi Liên, nằm ở phía bắc và đông bắc thành phố Vinh, trải trên 25,47 km2." },
    { title: "Hạ tầng và giao thông", body: "Khu vực Nghi Liên có Cảng hàng không Vinh, sân bay của cả vùng Bắc Trung Bộ. Quốc lộ 1 và các trục lớn đi qua giúp nơi đây trở thành cửa ngõ phía bắc của đô thị." },
    { title: "Kinh tế", body: "Phường phát triển dịch vụ vận tải, công nghiệp nhỏ và nhà ở mới, bên cạnh vùng sản xuất nông nghiệp ven đô. Dân số 60.159 người, tăng nhanh nhờ quá trình đô thị hóa." },
  ],
  "vinh-phu": [
    { title: "Vị trí và hình thành", body: "Vinh Phú hình thành từ phường Hà Huy Tập, Nghi Đức, Nghi Phú và xã Nghi Ân, nằm ở phía đông bắc thành phố Vinh, diện tích 23,04 km2." },
    { title: "Con người và truyền thống", body: "Tên phường Hà Huy Tập gợi nhớ Tổng Bí thư Hà Huy Tập, một lãnh tụ của Đảng Cộng sản Việt Nam. Khu vực này là vành đai đô thị, nơi nhiều khu dân cư mới được hình thành." },
    { title: "Kinh tế", body: "Dân số 74.473 người, sinh kế chủ yếu từ dịch vụ, thương mại, làm việc trong thành phố và một phần sản xuất nông nghiệp ngoại thành." },
  ],
  "vinh-loc": [
    { title: "Vị trí và hình thành", body: "Vinh Lộc gồm phường Hưng Lộc và các xã Nghi Phong, Nghi Thái, Nghi Xuân, Phúc Thọ, nằm ở phía đông nam thành phố Vinh, diện tích 38,86 km2." },
    { title: "Địa lý", body: "Địa hình đồng bằng ven sông Lam, giáp các địa phương của huyện Nghi Lộc cũ, thuận lợi cho trồng lúa, rau màu và nuôi trồng thủy sản." },
    { title: "Kinh tế", body: "Dân số 68.086 người. Địa bàn kết hợp nông nghiệp ngoại thành với các cụm dân cư và công nghiệp nhỏ đang mở rộng cùng quá trình đô thị hóa." },
  ],
  "cua-lo": [
    { title: "Lịch sử", body: "Cửa Lò từng là thị xã du lịch biển nổi tiếng của Nghệ An. Phường Cửa Lò hiện tại được sáp nhập từ 7 phường cũ gồm Nghi Hải, Nghi Hòa, Nghi Hương, Nghi Tân, Nghi Thu, Nghi Thủy và Thu Thủy." },
    { title: "Du lịch", body: "Bãi biển Cửa Lò dài, cát mịn, là điểm nghỉ mát được nhiều du khách miền Bắc lựa chọn mỗi mùa hè. Đảo Lan Châu (Hòn Ngư) gần bờ là điểm tham quan đặc trưng, cùng các khu nghỉ dưỡng, quảng trường biển và hải sản tươi." },
    { title: "Cảng và công nghiệp", body: "Cảng Cửa Lò ở khu vực Nghi Thủy là một trong những cảng biển quan trọng của Bắc Trung Bộ, nằm trong không gian Khu kinh tế Đông Nam. Phường có diện tích 29,09 km2 và dân số 64.760 người." },
  ],
  "hoang-mai": [
    { title: "Hình thành", body: "Phường Hoàng Mai được sáp nhập từ phường Quỳnh Thiện, các xã Quỳnh Trang và Quỳnh Vinh, là trung tâm của thị xã Hoàng Mai, thị xã cực bắc của Nghệ An." },
    { title: "Kinh tế và công nghiệp", body: "Hoàng Mai nổi tiếng với ngành công nghiệp vật liệu xây dựng, trong đó có xi măng Hoàng Mai, cùng các khu công nghiệp thuộc Khu kinh tế Đông Nam Nghệ An. Đây là nơi tập trung hạ tầng hành chính và dịch vụ của cả thị xã." },
    { title: "Nhân khẩu", body: "Phường có diện tích 79,67 km2, dân số 44.474 người." },
  ],
  "quynh-mai": [
    { title: "Hình thành", body: "Quỳnh Mai gồm các phường Mai Hùng, Quỳnh Phương, Quỳnh Xuân và xã Quỳnh Liên, nằm ở phía đông của thị xã Hoàng Mai, giáp biển." },
    { title: "Du lịch biển", body: "Bãi biển Quỳnh Phương và Quỳnh Xuân với các làng chài là điểm tham quan, tắm biển, thưởng thức hải sản. Nghề đánh bắt và chế biến hải sản (cá, mực, nước mắm) gắn bó lâu đời với cư dân." },
    { title: "Nhân khẩu", body: "Diện tích 40,5 km2, dân số 57.988 người, mật độ khoảng 1.432 người/km2." },
  ],
  "tan-mai": [
    { title: "Hình thành", body: "Tân Mai gồm phường Quỳnh Dị, xã Quỳnh Lập và xã Quỳnh Lộc, nằm ở phía tây thị xã Hoàng Mai." },
    { title: "Địa lý và kinh tế", body: "Địa bàn có nhiều đồi, đất nông nghiệp, kết hợp phát triển công nghiệp vệ tinh và dịch vụ cho trung tâm thị xã. Diện tích 51,61 km2, dân số 33.894 người." },
  ],
  "thai-hoa": [
    { title: "Hình thành", body: "Thái Hòa được sáp nhập từ các phường Hòa Hiếu, Long Sơn, Quang Phong, là trung tâm của thị xã Thái Hòa, thị xã nằm ở vùng Tây Bắc Nghệ An." },
    { title: "Vị trí và kinh tế", body: "Nằm trên trục đường Hồ Chí Minh và quốc lộ 48, Thái Hòa là đầu mối giao thông, thương mại và dịch vụ của cả vùng miền Tây Nghệ An. Vùng lân cận có thế mạnh về cây công nghiệp như mía, cao su, cà phê và chăn nuôi bò sữa." },
    { title: "Nhân khẩu", body: "Diện tích 27,09 km2, dân số 26.916 người." },
  ],
  "tay-hieu": [
    { title: "Hình thành", body: "Tây Hiếu gồm phường Quang Tiến, các xã Nghĩa Tiến và Tây Hiếu, trải rộng ở phía tây thị xã Thái Hòa." },
    { title: "Kinh tế", body: "Địa bàn đồi núi, nông nghiệp và cây công nghiệp là sinh kế chính, đồng thời hưởng lợi từ vị trí gần trung tâm Thái Hòa và quốc lộ 48." },
  ],
  "nam-dan": [
    { title: "Hình thành", body: "Nam Đàn là xã mới hợp nhất từ xã Nghĩa Thái, Nam Hưng và Nam Thanh. Huyện Nam Đàn nổi tiếng là vùng đất địa linh nhân kiệt của xứ Nghệ." },
    { title: "Văn hóa", body: "Nam Đàn là quê hương của Chủ tịch Hồ Chí Minh và nhà yêu nước Phan Bội Châu, đồng thời là vùng văn hóa có truyền thống hiếu học và lễ hội dân gian." },
  ],
  "kim-lien": [
    { title: "Hình thành", body: "Kim Liên được hợp nhất từ các xã Hùng Tiến, Nam Cát, Nam Giang, Xuân Hồng và Kim Liên." },
    { title: "Di tích", body: "Khu di tích Kim Liên là nơi lưu giữ quê nội và quê ngoại của Chủ tịch Hồ Chí Minh, gồm Làng Sen (Kim Liên) và Làng Hoàng Trù. Khu vực này còn có Núi Chung với ngôi đền Chung, và được xếp hạng di tích quốc gia đặc biệt. Hằng năm, đây là điểm đến của hàng triệu lượt du khách trong và ngoài nước, đông nhất vào dịp sinh nhật Bác 19/5." },
    { title: "Du lịch", body: "Du khách có thể kết hợp tham quan khu lưu niệm, Làng Sen, Núi Chung và các làng nghề, ẩm thực địa phương như nhút Thanh Chương, tương Nam Đàn." },
  ],
  "van-an": [
    { title: "Hình thành", body: "Vạn An gồm thị trấn Nam Đàn, xã Thượng Tân Lộc và xã Xuân Hòa, là trung tâm hành chính của khu vực Nam Đàn trước đây." },
    { title: "Kinh tế", body: "Địa bàn tập trung thương mại, dịch vụ, giáo dục và hành chính của vùng, cùng với sản xuất nông nghiệp ven sông Lam." },
  ],
  "dai-hue": [
    { title: "Hình thành", body: "Đại Huệ gồm các xã Nam Anh, Nam Lĩnh và Nam Xuân, ở phía bắc của vùng Nam Đàn." },
    { title: "Địa lý và kinh tế", body: "Khu vực có đồi núi thấp xen đồng ruộng, phát triển lúa, cây ăn quả và chăn nuôi. Tên xã gợi nhắc dãy núi Đại Huệ trong địa danh xứ Nghệ." },
  ],
  "thien-nhan": [
    { title: "Hình thành", body: "Thiên Nhẫn gồm các xã Khánh Sơn, Nam Kim và Trung Phúc Cường, nằm ở phía tây của Nam Đàn, nơi có núi Thiên Nhẫn." },
    { title: "Địa lý và kinh tế", body: "Địa hình đồi núi, đất đai thích hợp cho trồng rừng, cây công nghiệp và chăn nuôi, kết hợp tiềm năng du lịch sinh thái và văn hóa." },
  ],
  "hung-nguyen": [
    { title: "Hình thành", body: "Hưng Nguyên được hợp nhất từ thị trấn Hưng Nguyên và các xã Hưng Đạo, Hưng Tây, Thịnh Mỹ, là trung tâm hành chính của huyện Hưng Nguyên." },
    { title: "Địa lý và kinh tế", body: "Hưng Nguyên là vùng đồng bằng trù phú nằm bên sông Lam, phía nam thành phố Vinh, thế mạnh về lúa, rau màu và dịch vụ phục vụ đô thị." },
  ],
  "hung-nguyen-nam": [
    { title: "Hình thành", body: "Hưng Nguyên Nam gồm các xã Hưng Lĩnh, Long Xá, Thông Tân và Xuân Lam, ở phía nam huyện Hưng Nguyên." },
    { title: "Kinh tế", body: "Địa bàn chủ yếu là nông nghiệp lúa nước, chăn nuôi, kết hợp phát triển tiểu thủ công nghiệp và việc làm ở thành phố Vinh lân cận." },
  ],
  "lam-thanh": [
    { title: "Hình thành", body: "Lam Thành gồm các xã Châu Nhân, Hưng Nghĩa, Hưng Thành và Phúc Lợi. Tên Lam Thành gợi hình ảnh vùng đất bên dòng sông Lam." },
    { title: "Kinh tế", body: "Đất đai phù sa thuận lợi cho trồng lúa, màu và chăn nuôi, là vùng nông nghiệp quan trọng của huyện Hưng Nguyên." },
  ],
  "yen-trung": [
    { title: "Hình thành", body: "Yên Trung gồm các xã Hưng Yên Bắc, Hưng Yên Nam và Hưng Trung, ở phía đông bắc Hưng Nguyên, giáp thành phố Vinh." },
    { title: "Kinh tế", body: "Vị trí gần đô thị giúp địa phương phát triển nông nghiệp hàng hóa, dịch vụ và công nghiệp nhỏ." },
  ],
};
