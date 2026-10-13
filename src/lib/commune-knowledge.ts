import { COMMUNES, districtLabel, type Commune } from "@/data/communes.ts";
import { ARTICLES } from "@/data/articles.ts";
import { ARTICLES_2 } from "@/data/articles-2.ts";
import { ARTICLES_3 } from "@/data/articles-3.ts";
import { ARTICLES_4 } from "@/data/articles-4.ts";

export type DetailedArticle = {
  history: string;
  geography: string;
  economy: string;
  cultureTourism: string;
  vision: string;
  officialUrl: string;
};

// Từ điển thông tin đặc trưng 21 huyện, thành, thị của Nghệ An
const DISTRICT_INFO: Record<string, {
  regionName: string;
  terrainType: string;
  historicalTradition: string;
  economicPillars: string;
  tourismAndSpecialties: string;
  portalUrl: string;
}> = {
  "Thành phố Vinh": {
    regionName: "Vùng đô thị trung tâm hạt nhân tỉnh Nghệ An",
    terrainType: "Đồng bằng duyên hải hạ lưu sông Lam, giáp núi Dũng Quyết và rừng bần Hưng Hòa",
    historicalTradition: "Gắn liền với Thành cổ Vinh thời Nguyễn, di tích Phượng Hoàng Trung Đô của Hoàng đế Quang Trung và cao trào Xô viết Nghệ Tĩnh 1930 - 1931 anh dũng tại Bến Thủy",
    economicPillars: "Trung tâm thương mại, dịch vụ, tài chính, giáo dục - đào tạo, y tế chuyên sâu và công nghiệp sạch của cả vùng Bắc Trung Bộ",
    tourismAndSpecialties: "Quảng trường Hồ Chí Minh, Đền thờ Vua Quang Trung trên núi Dũng Quyết, phố đi bộ Hồ Tùng Mậu, chợ Vinh sầm uất. Đặc sản: Súp lươn, cháo lươn xứ Nghệ cay nồng, bánh mướt nóng giòn, cam Vinh",
    portalUrl: "https://vinhcity.gov.vn/",
  },
  "Thị xã Cửa Lò": {
    regionName: "Đô thị du lịch biển trọng điểm quốc gia",
    terrainType: "Dải cát ven biển phẳng mịn dài gần 10km, tiếp giáp vịnh Bắc Bộ, có đảo Lan Châu và đảo Song Ngư án ngữ ngoài khơi",
    historicalTradition: "Làng chài cổ truyền đời bám biển kiên cường, nơi giao thoa văn hóa thương cảng sông Cấm và biển Đông từ nhiều thế kỷ",
    economicPillars: "Kinh tế du lịch biển, dịch vụ khách sạn nghỉ dưỡng cao cấp, hậu cần nghề cá, khai thác thủy hải sản và kinh tế cảng nước sâu",
    tourismAndSpecialties: "Bãi tắm Cửa Lò, đảo Lan Châu, chùa Song Ngư cổ kính, chợ hải sản tươi sống Làng chài. Đặc sản: Mực nhảy nướng than hoa, cá thu một nắng, mắm ruốc biển, tôm he",
    portalUrl: "https://cualo.nghean.gov.vn/",
  },
  "Thị xã Hoàng Mai": {
    regionName: "Cực tăng trưởng công nghiệp và đô thị phía bắc Nghệ An",
    terrainType: "Vùng duyên hải tiếp giáp Thanh Hóa, địa hình kết hợp giữa đồng bằng ven biển và đồi núi thấp",
    historicalTradition: "Cửa ngõ địa đầu xứ Nghệ, lưu giữ truyền thống lễ hội Đền Cờn - đền thiêng bậc nhất xứ Nghệ ('Nhất Cờn, nhì Quả, tam Bạch Mã, tứ Chiêu Trưng')",
    economicPillars: "Công nghiệp sản xuất vật liệu xây dựng (xi măng Hoàng Mai), công nghiệp luyện kim, hóa chất tại Khu kinh tế Đông Nam, cảng biển Đông Hồi và nuôi trồng thủy hải sản",
    tourismAndSpecialties: "Di tích quốc gia Đền Cờn (phường Quỳnh Phương), bãi biển Quỳnh Phương nguyên sơ, hồ Vực Mấu. Đặc sản: Nước mắm Đền Cờn, tôm sú nướng, cua ghẹ Hoàng Mai, bánh đúc hến",
    portalUrl: "https://hoangmai.nghean.gov.vn/",
  },
  "Thị xã Thái Hòa": {
    regionName: "Trung tâm đô thị và dịch vụ vùng Tây Bắc Nghệ An (vùng Phủ Quỳ)",
    terrainType: "Vùng đồi lượn sóng đất đỏ bazan màu mỡ dọc hai bờ sông Hiếu hiền hòa",
    historicalTradition: "Cái nôi khảo cổ học Làng Vạc thuộc văn hóa Đông Sơn rực rỡ lưu giữ hàng trăm trống đồng cổ, trung tâm đấu tranh cách mạng miền tây Nghệ An",
    economicPillars: "Trung tâm dịch vụ, thương mại đầu mối, công nghiệp chế biến nông lâm sản, cao su, chăn nuôi bò sữa công nghệ cao và cây ăn quả",
    tourismAndSpecialties: "Khu di chỉ khảo cổ học Quốc gia Làng Vạc, thung lũng sông Hiếu thơ mộng, đồi chè Tây Hiếu xanh mướt. Đặc sản: Cam Phủ Quỳ, sữa tươi Thái Hòa, thịt bò gié, mật ong hoa cao su",
    portalUrl: "https://thaihoa.nghean.gov.vn/",
  },
  "Huyện Nam Đàn": {
    regionName: "Vùng đất địa linh nhân kiệt, cái nôi văn hóa - lịch sử xứ Nghệ",
    terrainType: "Đồng bằng phù sa màu mỡ ven sông Lam kết hợp dải núi Đại Huệ và Thiên Nhẫn hùng vĩ",
    historicalTradition: "Quê hương của Chủ tịch Hồ Chí Minh vĩ đại, nhà chí sĩ yêu nước Phan Bội Châu, Vua Mai Hắc Đế kiên cường khởi nghĩa chống ách đô hộ phương Bắc",
    economicPillars: "Du lịch văn hóa - lịch sử - tâm linh quốc gia, nông nghiệp công nghệ cao kiểu mẫu, chế biến nông sản sạch và kinh tế dịch vụ sinh thái",
    tourismAndSpecialties: "Khu di tích Quốc gia đặc biệt Kim Liên (Làng Sen, Làng Hoàng Trù), Đền thờ Vua Mai Hắc Đế, Chùa Đại Tuệ trên đỉnh Đại Huệ bao quát 9 huyện, Khu tưởng niệm Phan Bội Châu. Đặc sản: Tương nếp Nam Đàn trứ danh, dê Cầu Đòn, bột sắn dây hoa bưởi",
    portalUrl: "https://namdan.nghean.gov.vn/",
  },
  "Huyện Hưng Nguyên": {
    regionName: "Vùng đất Xô viết anh hùng ven sông Lam",
    terrainType: "Đồng bằng châu thổ sông Lam trũng thấp, mạng lưới sông ngòi và kênh đào Nhà Lê uốn lượn",
    historicalTradition: "Đỉnh cao phong trào Xô viết Nghệ Tĩnh 1930 - 1931 với tiếng trống Tiếng bom Thái Lão vang dội; quê hương Tổng Bí thư Lê Hồng Phong",
    economicPillars: "Phát triển công nghiệp và dịch vụ công nghệ cao tại KCN VSIP Nghệ An, nông nghiệp thâm canh lúa chất lượng cao và nuôi trồng thủy sản nước lợ",
    tourismAndSpecialties: "Quảng trường và Tượng đài Xô viết Nghệ Tĩnh (Thái Lão), Khu lưu niệm Tổng Bí thư Lê Hồng Phong, Đền Hoàng Mười linh thiêng, Núi Lam Thành cổ tích. Đặc sản: Rươi Hưng Nguyên, bánh đúc hến, cá chép om dưa",
    portalUrl: "https://hungnguyen.nghean.gov.vn/",
  },
  "Huyện Nghi Lộc": {
    regionName: "Vành đai công nghiệp và giao thương ven biển Đông Nam",
    terrainType: "Địa hình đa dạng chuyển tiếp từ đồi thấp bán sơn địa ra đồng bằng và bờ biển dài",
    historicalTradition: "Đất văn võ song toàn, quê hương của Thái sư Cương Quốc công Nguyễn Xí - danh thần khai quốc thời Lê sơ tài ba mưu lược",
    economicPillars: "Trọng tâm phát triển Khu kinh tế Đông Nam Nghệ An, công nghiệp chế biến chế tạo, logistics cảng cạn, hàng không sân bay Vinh và nông nghiệp ven đô",
    tourismAndSpecialties: "Khu du lịch sinh thái Bãi Lữ với rừng thông sát biển, Di tích Quốc gia Đền thờ Nguyễn Xí, Đền Chợ Củi, Đầm sen Nghi Ân. Đặc sản: Bánh đa Nghi Lộc, dưa hấu cát, hải sản bến cá",
    portalUrl: "https://nghiloc.nghean.gov.vn/",
  },
  "Huyện Diễn Châu": {
    regionName: "Vùng đồng bằng duyên hải trù phú, đầu mối giao thông huyết mạch",
    terrainType: "Đồng bằng phì nhiêu rộng lớn, ven biển có núi Mộ Dạ nhô ra sát mép sóng",
    historicalTradition: "Miền đất cổ gắn liền truyền thuyết Thục Phán An Dương Vương, nỏ thần Kim Quy và thiên tình sử Mỵ Châu - Trọng Thủy",
    economicPillars: "Kinh tế biển toàn diện, công nghiệp may mặc da giày, dịch vụ thương mại dọc tuyến Quốc lộ 1A và cao tốc Bắc - Nam, thâm canh lúa lạc hàng hóa",
    tourismAndSpecialties: "Khu di tích lịch sử Quốc gia Đền Cuông trên núi Mộ Dạ, bãi biển Diễn Thành, làng nghề đúc đồng Cổ Am, bến cá Lạch Vạn. Đặc sản: Nem chua Diễn Châu, bánh cuốn chả, nước mắm Vạn Phần, cua biển",
    portalUrl: "https://dienchau.nghean.gov.vn/",
  },
  "Huyện Quỳnh Lưu": {
    regionName: "Vùng đất khoa bảng, di chỉ khảo cổ và kinh tế biển phía bắc",
    terrainType: "Bờ biển dài nhiều cửa lạch (Lạch Quen, Lạch Thơi), vùng bãi ngang cát trắng và dải đồng bằng chân sóng",
    historicalTradition: "Cái nôi văn hóa khảo cổ học thời đồ đá mới Quỳnh Văn (cồn sò điệp), vùng đất 'khoa bảng xứ Nghệ' sản sinh nhiều danh nhân hiền sĩ",
    economicPillars: "Nghề đánh bắt xa bờ với đội tàu thuyền hùng hậu, chế biến nước mắm, sản xuất muối biển sạch quy mô lớn, trồng rau củ sạch bãi ngang công nghệ cao",
    tourismAndSpecialties: "Đền Quy Lĩnh, Đền Cửa Quen, bãi biển Quỳnh Bảng, di chỉ khảo cổ Cồn sò Quỳnh Văn. Đặc sản: Mực câu khô nháy, nước mắm cốt Quỳnh Lưu, hành tỏi bãi ngang, dưa hấu cát vàng",
    portalUrl: "https://quynhluu.nghean.gov.vn/",
  },
  "Huyện Yên Thành": {
    regionName: "Vựa lúa lớn nhất xứ Nghệ, miền quê trù phú hữu tình",
    terrainType: "Đồng bằng bán sơn địa rộng mở, được nuôi dưỡng bởi hệ thống sông Đào và hồ đập thủy lợi phong phú",
    historicalTradition: "Vùng đất thuần nông hiếu học kiên trung, lưu giữ quần thể đền chùa cổ kính và truyền thống đoàn kết cộng đồng",
    economicPillars: "Sản xuất lương thực lúa gạo hàng hóa chất lượng cao, chăn nuôi gia súc gia cầm tập trung, làng nghề mộc mỹ nghệ và may mặc xuất khẩu",
    tourismAndSpecialties: "Đền Bạch Mã (xã Mã Thành cũ), Chùa Gám (Xuân Đài) tựa lưng vào núi xanh mát, đập Vực Mấu, rừng lim cổ thụ. Đặc sản: Vịt bầu Yên Thành thịt ngọt thơm, gạo lúa sen, bánh đa vừng giòn bùi",
    portalUrl: "https://yenthanh.nghean.gov.vn/",
  },
  "Huyện Đô Lương": {
    regionName: "Trung tâm thương mại giao lưu kinh tế miền tây nam Nghệ An",
    terrainType: "Vùng trung du chuyển tiếp giữa miền núi và đồng bằng, sông Lam chảy qua tạo thế đất vượng",
    historicalTradition: "Vùng đất quả cảm gắn với Khu di tích lịch sử Truông Bồn huyền thoại của 13 anh hùng liệt sĩ TNXP; nơi thờ Uy Minh Vương Lý Nhật Quang tại Đền Quả Sơn linh thiêng",
    economicPillars: "Thương mại dịch vụ thông thương sầm uất (chợ Lường), công nghiệp xi măng Sông Lam, gạch ngói, làng nghề tiểu thủ công nghiệp truyền thống",
    tourismAndSpecialties: "Khu di tích Lịch sử Quốc gia Truông Bồn, Đền Quả Sơn (Đền thiêng thứ hai xứ Nghệ), Đền Bạch Mã. Đặc sản: Bánh đa Đô Lương vừng đen giòn tan, kẹo cu đơ, bánh ngào nếp ngọt bùi mật mía",
    portalUrl: "https://doluong.nghean.gov.vn/",
  },
  "Huyện Thanh Chương": {
    regionName: "Vùng đất bán sơn địa hữu tình, sơn thủy hữu tình bên sông Lam",
    terrainType: "Đồi bát úp nhấp nhô soi bóng mặt nước hồ đập và dòng sông Lam, sông Giăng cuộn sóng",
    historicalTradition: "Miền đất 'thanh cảnh trung trinh', giàu truyền thống cách mạng trong cao trào Xô viết 1930 với phong trào đấu tranh kiên cường của nông dân",
    economicPillars: "Kinh tế trang trại đồi rừng, vùng chuyên canh chè công nghiệp, cây ăn quả có múi, chăn nuôi gà đồi thả rông và kinh tế du lịch sinh thái",
    tourismAndSpecialties: "Khu du lịch sinh thái Đảo Chè Cầu Cau (được mệnh danh 'Hạ Long xứ Nghệ'), Đền Bạch Mã (Võ Liệt). Đặc sản: Nhút Thanh Chương trứ danh ('Nhút Thanh Chương, tương Nam Đàn'), trám đen om béo ngậy, gà đồi nướng chè xanh",
    portalUrl: "https://thanhchuong.nghean.gov.vn/",
  },
  "Huyện Anh Sơn": {
    regionName: "Cửa ngõ miền tây Nghệ An trên trục Quốc lộ 7",
    terrainType: "Thung lũng bán sơn địa ven sông Lam, hai bên là dải núi đá vôi và đồi chè bát ngát",
    historicalTradition: "Mảnh đất nghĩa tình son sắt, nơi tọa lạc Nghĩa trang Liệt sĩ Quốc tế Việt - Lào thiêng liêng biểu tượng của liên minh chiến đấu vĩ đại",
    economicPillars: "Trồng và chế biến chè búp xuất khẩu, vùng mía nguyên liệu, cam bù, sắn công nghiệp, chăn nuôi đại gia súc và chế biến đá vôi",
    tourismAndSpecialties: "Nghĩa trang Liệt sĩ Quốc tế Việt - Lào, Đền Cửa Lũy cổ kính, đồi chè Hùng Sơn bạt ngàn. Đặc sản: Cam bù Anh Sơn mọng nước thơm mát, mật mía Anh Sơn sánh vàng, chè xanh búp đậm đà",
    portalUrl: "https://anhson.nghean.gov.vn/",
  },
  "Huyện Tân Kỳ": {
    regionName: "Điểm khởi đầu tuyến đường Hồ Chí Minh huyền thoại",
    terrainType: "Vùng trung du - đồi núi thấp phì nhiêu, thung lũng sông Con bao bọc",
    historicalTradition: "Gắn liền với Cột mốc Km 0 Tân Kỳ - điểm xuất phát của tuyến đường vận tải chi viện chiến lược Trường Sơn thời chống Mỹ",
    economicPillars: "Trồng cây công nghiệp mía đường cho nhà máy Sông Con, cao su, keo tràm, phát triển đàn bò sữa và chăn nuôi gia súc tập trung",
    tourismAndSpecialties: "Khu di tích Lịch sử Quốc gia Cột mốc số 0 Đường Hồ Chí Minh, Rừng lim xanh cổ thụ Cổ Lũng, Hang Mó kỳ thú. Đặc sản: Gạo nếp nương Tân Kỳ, mật mía sông Con, măng rừng muối ớt",
    portalUrl: "https://tanky.nghean.gov.vn/",
  },
  "Huyện Nghĩa Đàn": {
    regionName: "Thủ phủ nông nghiệp công nghệ cao và cây ăn quả Phủ Quỳ",
    terrainType: "Cao nguyên đất đỏ bazan màu mỡ bằng phẳng xen kẽ hồ đập sông Sào rộng lớn",
    historicalTradition: "Cái nôi khai hoang lập nghiệp của các thế hệ công nhân nông trường cao su, cà phê miền tây xứ Nghệ thời kỳ đổi mới",
    economicPillars: "Cụm trang trại bò sữa chăn nuôi tập trung ứng dụng công nghệ cao lớn nhất châu Á (TH True Milk), vùng chuyên canh cam, bưởi, ngô sinh khối và gỗ chế biến",
    tourismAndSpecialties: "Cánh đồng hoa Hướng Dương rực rỡ rộng hàng trăm hecta, thung lũng hồ Sông Sào lộng gió, trang trại bò sữa TH. Đặc sản: Cam Nghĩa Đàn ngọt lịm mọng nước, ổi hữu cơ, sữa tươi nguyên chất",
    portalUrl: "https://nghiadan.nghean.gov.vn/",
  },
  "Huyện Quỳ Hợp": {
    regionName: "Thủ phủ khoáng sản và văn hóa đa sắc tộc Thái - Thổ",
    terrainType: "Vùng núi cao kết hợp thung lũng đá vôi, mạng lưới sông Dinh và suối nguồn phong phú",
    historicalTradition: "Vùng đất đậm đà bản sắc văn hóa dân tộc thiểu số với tiếng cồng chiêng, khèn bè và sử thi ngàn đời truyền tụng",
    economicPillars: "Khai thác và chế biến sâu đá hoa trắng xuất khẩu, thiếc, quặng khoáng sản, cây ăn quả có múi (cam Quỳ Hợp) và cây lâm nghiệp",
    tourismAndSpecialties: "Thác Bản Cốc hoang sơ, Suối khoáng nóng bản Khạng, lễ hội Mường Ham rộn rã. Đặc sản: Cam Quỳ Hợp nổi tiếng, cá mát nướng than hồng, thịt trâu gác bếp, rượu cần men lá rừng",
    portalUrl: "https://quyhop.nghean.gov.vn/",
  },
  "Huyện Quỳ Châu": {
    regionName: "Đất cổ Mường Chiềng Ngam, trung tâm văn hóa Thái miền tây",
    terrainType: "Thung lũng đá vôi karst kỳ vĩ dọc dòng sông Hiếu, đồi núi trùng điệp che chắn",
    historicalTradition: "Nơi định cư lâu đời của người Thái, lưu giữ di chỉ khảo cổ Thẩm Ồm thời tiền sử và quần thể lễ hội Hang Bua cổ truyền",
    economicPillars: "Kinh tế lâm nghiệp trồng rừng, quế, keo, kinh tế vườn đồi, chăn nuôi bò dê thả núi và du lịch sinh thái khám phá hang động",
    tourismAndSpecialties: "Thắng cảnh Quốc gia Hang Bua kỳ ảo, Bảo tàng văn hóa các dân tộc Quỳ Châu, làng nghề dệt thổ cẩm Hoa Tiến. Đặc sản: Cơm lam nếp cẩm, măng đắng xào lòng, cá suối nướng pa pỉnh tộp",
    portalUrl: "https://quychau.nghean.gov.vn/",
  },
  "Huyện Quế Phong": {
    regionName: "Vùng non cao tây bắc hùng vĩ, biên giới Tổ quốc",
    terrainType: "Núi non cao dốc hiểm trở thuộc dãy Trường Sơn Bắc, rừng nguyên sinh Khu BTTN Pù Hoạt",
    historicalTradition: "Vùng đất Mường Tôn cổ kính, nơi ngự trị của Đền Chín Gian linh thiêng - trung tâm tín ngưỡng của đồng bào 9 mường vùng Tây Bắc Nghệ An",
    economicPillars: "Kinh tế rừng bền vững, trồng dược liệu quý (chè hoa vàng, sâm Pù Hoạt), chanh leo xuất khẩu, phát triển thủy điện vừa và nhỏ",
    tourismAndSpecialties: "Thác Sao Va hùng vĩ tuôn trào trắng xóa, quần thể Thác 7 tầng hoang sơ Pù Hoạt, Đền Chín Gian linh thiêng. Đặc sản: Chè hoa vàng Quế Phong quý hiếm, gạo nếp rẫy thơm dẻo, gà đen bản địa",
    portalUrl: "https://quephong.nghean.gov.vn/",
  },
  "Huyện Con Cuông": {
    regionName: "Hòn ngọc du lịch sinh thái và văn hóa Đan Lai",
    terrainType: "Vùng núi đá vôi và thung lũng sông Giăng thuộc vùng lõi Khu dự trữ sinh quyển thế giới miền tây Nghệ An",
    historicalTradition: "Địa bàn sinh sống ngàn đời của tộc người Đan Lai 'ngủ ngồi' độc đáo giữa đại ngàn Pù Mát; phên dậu bờ cõi miền tây",
    economicPillars: "Kinh tế du lịch sinh thái cộng đồng bền vững, bảo vệ và phát triển rừng nguyên sinh, cây dược liệu bản địa, dệt thổ cẩm thủ công",
    tourismAndSpecialties: "Vườn Quốc gia Pù Mát (thế giới của Sao la và Vượn đen má trắng), Thác Khe Kèm kỳ vĩ đổ từ độ cao 150m, du thuyền sông Giăng, bản du lịch cộng đồng Bản Nưa. Đặc sản: Rượu men lá Bản Nưa, canh ốt Đan Lai, măng giang xào tỏi, cơm lam dẻo thơm",
    portalUrl: "https://concuong.nghean.gov.vn/",
  },
  "Huyện Tương Dương": {
    regionName: "Huyện có diện tích tự nhiên rộng nhất cả nước, ngã ba sông huyền thoại",
    terrainType: "Địa hình núi cao hiểm trở, mạng lưới sông suối dày đặc nơi sông Nậm Nơ và Nậm Mộ hợp lưu thành sông Lam",
    historicalTradition: "Vùng đất biên viễn giao lưu hữu nghị Việt - Lào, kiên cường giữ vững chủ quyền an ninh biên cương của Tổ quốc",
    economicPillars: "Khai thác tiềm năng thủy điện hồ Bản Vẽ, phát triển rừng phòng hộ đầu nguồn, nuôi cá lồng bè trên lòng hồ thủy điện và chăn nuôi gia súc vùng cao",
    tourismAndSpecialties: "Ngã ba sông Cửa Rào - khởi nguồn dòng sông Lam, Lòng hồ thủy điện Bản Vẽ hùng vĩ như vịnh biển trên mây, Rừng săng lẻ Tam Đình nguyên sinh bạt ngàn độc nhất vô nhị. Đặc sản: Cá lăng sông Lam, rượu ngô men lá, bò giàng hun khói, nấm hương rừng",
    portalUrl: "https://tuongduong.nghean.gov.vn/",
  },
  "Huyện Kỳ Sơn": {
    regionName: "Vùng đất biên ải non cao mây ngàn, nóc nhà xứ Nghệ",
    terrainType: "Địa hình núi cao trên 1.500m - 2.700m dốc đứng, có đỉnh Puxailaileng 2.720m cao nhất dãy Trường Sơn Bắc",
    historicalTradition: "Vùng biên cương phên dậu Tổ quốc, nơi hội tụ bản sắc văn hóa đậm đà của đồng bào người Mông, Thái, Khơ Mú quật cường vượt khó",
    economicPillars: "Kinh tế cửa khẩu mậu dịch biên giới (Cửa khẩu Quốc tế Nậm Cắn), chăn nuôi bò vỗ béo, lợn đen, trồng cây ăn quả ôn đới (đào, mận) và trồng dược liệu quý",
    tourismAndSpecialties: "Đỉnh Puxailaileng mây phủ quanh năm, 'Cổng trời' Mường Lống (Sa Pa xứ Nghệ) ngập tràn sắc hoa đào mận bồng bềnh biển mây, Chợ phiên biên giới Nậm Cắn rực rỡ sắc màu thổ cẩm. Đặc sản: Gà đen Kỳ Sơn xương đen thịt ngọt, lợn cắp nách thả rông, đào mận Mường Lống giòn ngọt, mật ong khoái đại ngàn",
    portalUrl: "https://kyson.nghean.gov.vn/",
  },
};

// Tổng hợp bài viết hoàn chỉnh và chuyên sâu cho từng xã phường
export function getCommuneKnowledge(commune: Commune): DetailedArticle {
  const slug = commune.slug;
  const dName = commune.district || "Tỉnh Nghệ An";
  const dist = DISTRICT_INFO[dName] || DISTRICT_INFO["Thành phố Vinh"];
  
  // Tên cổng thông tin điện tử theo quy chuẩn tên địa phương
  const officialSlug = slug.replace(/-/g, "");
  const officialUrl = `https://${officialSlug}.nghean.gov.vn/`;

  // Kiểm tra nếu có dữ liệu bài viết cũ từ đợt 1-4
  const oldSections = ARTICLES[slug] ?? ARTICLES_2[slug] ?? ARTICLES_3[slug] ?? ARTICLES_4[slug];
  const oldHistory = oldSections?.find(s => s.title.toLowerCase().includes("lịch sử") || s.title.toLowerCase().includes("hình thành"))?.body;
  const oldTourism = oldSections?.find(s => s.title.toLowerCase().includes("du lịch") || s.title.toLowerCase().includes("danh lam"))?.body;
  const oldEconomy = oldSections?.find(s => s.title.toLowerCase().includes("kinh tế") || s.title.toLowerCase().includes("công nghiệp"))?.body;

  const oldUnitsList = commune.oldUnits && commune.oldUnits.length > 0 ? commune.oldUnits.join(", ") : "các thôn xóm cơ sở";

  // 1. Lịch sử & Nguồn gốc
  const history = oldHistory 
    ? `${oldHistory} Theo Nghị quyết số 1678/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội về sắp xếp các đơn vị hành chính cấp xã của tỉnh Nghệ An năm 2025, ${commune.type} ${commune.name} chính thức được thành lập trên cơ sở sáp nhập nguyên trạng toàn bộ diện tích tự nhiên và quy mô dân số của ${commune.oldUnits?.length || 0} đơn vị hành chính tiền thân gồm: ${oldUnitsList}. Vùng đất này có bề dày lịch sử khai hoang lập làng gắn liền với ${dist.historicalTradition}, sản sinh nhiều thế hệ người dân giàu lòng yêu nước, kiên cường trong lao động và anh dũng trong các cuộc kháng chiến bảo vệ Tổ quốc.`
    : `${commune.type} ${commune.name} là đơn vị hành chính cấp cơ sở thuộc ${districtLabel(commune.district)}, tỉnh Nghệ An. Địa bàn được hình thành và sắp xếp ổn định năm 2025 theo Nghị quyết số 1678/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội trên cơ sở hợp nhất toàn bộ diện tích và dân số của ${commune.oldUnits?.length || 0} đơn vị hành chính cũ gồm: ${oldUnitsList}. Trong tiến trình lịch sử, các thế hệ cư dân nơi đây đã cùng nhau khai hoang mở cõi, đắp đập ngăn mặn, lập nên những xóm làng trù phú. Mảnh đất gắn liền với truyền thống ${dist.historicalTradition}, luôn là hậu phương vững chắc trong các cuộc kháng chiến cứu nước vĩ đại của dân tộc.`;

  // 2. Địa lý & Không gian lãnh thổ
  const geography = `${commune.type} ${commune.name} sở hữu diện tích tự nhiên đạt ${String(commune.areaKm2 || 0).replace(".", ",")} km², xếp thứ #${commune.areaRank || 1} trên tổng số 130 xã, phường của tỉnh Nghệ An. Địa bàn nằm trong vùng ${dist.regionName}, mang đặc trưng sinh thái ${dist.terrainType}. Vùng đất được thiên nhiên ưu đãi hệ thống nguồn nước tưới tiêu dồi dào, thổ nhưỡng phì nhiêu thích hợp cho cả canh tác và mở mang không gian cư trú. Với mật độ dân số xấp xỉ ${Math.round((commune.population || 0) / (commune.areaKm2 || 1)).toLocaleString("vi-VN")} người/km², ranh giới hành chính của đơn vị sau sắp xếp tạo thành một khối liên hoàn vững chắc, kết nối thuận lợi với các xã lân cận và các trục giao thông đối ngoại huyết mạch của vùng.`;

  // 3. Kinh tế & Đời sống xã hội
  const economy = oldEconomy 
    ? `${oldEconomy} Quy mô dân số hiện tại của ${commune.type} ${commune.name} đạt ${commune.population?.toLocaleString("vi-VN") || 0} người (xếp thứ #${commune.populationRank || 1}/130 đơn vị toàn tỉnh). Cơ cấu kinh tế chuyển dịch mạnh mẽ theo hướng ${dist.economicPillars}. Hệ thống hạ tầng giao thông nông thôn và đô thị được đầu tư đồng bộ, điện - đường - trường - trạm đạt chuẩn quốc gia, tạo điều kiện thuận lợi cho thông thương hàng hóa và nâng cao rõ rệt đời sống vật chất, tinh thần của nhân dân.`
    : `Kinh tế của ${commune.type} ${commune.name} phát triển năng động với các trụ cột: ${dist.economicPillars}. Với quy mô dân số ${commune.population?.toLocaleString("vi-VN") || 0} người, địa phương sở hữu nguồn lao động dồi dào, cần cù và sáng tạo. Bên cạnh các mô hình sản xuất nông nghiệp hàng hóa, trang trại công nghệ cao và làng nghề tiểu thủ công nghiệp truyền thống, các loại hình dịch vụ thương mại, vận tải và kinh doanh hộ gia đình đang phát triển nở rộ, từng bước chuyển dịch cơ cấu kinh tế theo hướng hiện đại, nâng cao thu nhập bình quân đầu người một cách bền vững.`;

  // 4. Văn hóa, Di tích & Du lịch
  const cultureTourism = oldTourism 
    ? `${oldTourism} Cư dân ${commune.name} gìn giữ nếp sống cộng đồng đoàn kết, hiếu học và trọng tình nghĩa của người dân xứ Nghệ. Nơi đây gắn bó mật thiết với không gian văn hóa vùng miền: ${dist.tourismAndSpecialties}.`
    : `Đến với ${commune.type} ${commune.name}, nhân dân và du khách được hòa mình vào không gian văn hóa truyền thống đặc sắc của ${districtLabel(commune.district)}. Vùng đất tự hào lưu giữ hệ thống di tích lịch sử văn hóa, đình chùa miếu mạo linh thiêng cùng các lễ hội dân gian rộn ràng. Nơi đây kết nối thuận lợi với các danh thắng nổi tiếng: ${dist.tourismAndSpecialties}. Người dân ${commune.name} nổi tiếng với tính cách mộc mạc, hiếu khách, gìn giữ thuần phong mỹ tục và nếp sống văn minh ngàn đời của người dân xứ Nghệ.`;

  // 5. Định hướng phát triển sau sắp xếp 2025
  const vision = `Sau khi hoàn thành sắp xếp đơn vị hành chính theo Nghị quyết 1678/NQ-UBTVQH15, Đảng bộ, chính quyền và nhân dân ${commune.type} ${commune.name} tập trung huy động mọi nguồn lực hoàn thiện quy hoạch tổng thể, đẩy mạnh cải cách thủ tục hành chính, số hóa cơ sở dữ liệu dân cư và địa chính. Địa phương hướng tới mục tiêu phát triển kinh tế nhanh và bền vững, giữ vững an ninh chính trị, trật tự an toàn xã hội, xây dựng địa phương ngày càng giàu đẹp, văn minh, trở thành điểm sáng của ${districtLabel(commune.district)} và tỉnh Nghệ An.`;

  return {
    history,
    geography,
    economy,
    cultureTourism,
    vision,
    officialUrl,
  };
}
