import { districtLabel, type Commune } from "@/data/communes.ts";

export type DetailedArticle = {
  history: string;
  geography: string;
  economy: string;
  cultureTourism: string;
  vision: string;
  officialUrl: string;
};

export const COMMUNE_PROFILES: Record<string, {
  historyFeature: string;
  geographyFeature: string;
  economyFeature: string;
  cultureFeature: string;
  visionFeature: string;
}> = {
  "thanh-vinh": {
    "historyFeature": "vùng lõi trung tâm của đô thị Vinh, gắn liền với di tích Thành cổ Nghệ An được khởi dựng từ thời vua Gia Long (năm 1804). Nơi đây từng là thủ phủ trấn Nghệ An, ghi dấu nhiều phong trào yêu nước và cuộc tái thiết thần tốc sau chiến tranh",
    "geographyFeature": "nằm ở trung tâm thành phố Vinh với địa hình bằng phẳng hoàn toàn, mạng lưới giao thông ô bàn cờ hiện đại, kết nối trực tiếp với Quốc lộ 1A và các trục đại lộ xương sống của đô thị loại I",
    "economyFeature": "trung tâm thương mại, tài chính, ngân hàng, dịch vụ bán lẻ và kinh tế đêm sôi động nhất tỉnh. Các tuyến phố kinh doanh sầm uất, Chợ Vinh đầu mối và hệ thống khách sạn, nhà hàng cao cấp đóng vai trò chủ lực",
    "cultureFeature": "Quảng trường Hồ Chí Minh và Tượng đài Bác Hồ trang nghiêm, Công viên Trung tâm, Thành cổ Vinh với các cổng Tiền và cổng Tả rêu phong, Phố đi bộ Hồ Tùng Mậu. Ẩm thực nổi tiếng với súp lươn, cháo lươn Vinh, bánh mướt nóng",
    "visionFeature": "phát triển thành phường kiểu mẫu về đô thị thông minh, văn minh thương mại, kinh tế dịch vụ chất lượng cao và chuyển đổi số toàn diện các thủ tục hành chính phục vụ người dân, doanh nghiệp"
  },
  "truong-vinh": {
    "historyFeature": "vùng đất giàu truyền thống cách mạng, hội tụ địa danh Bến Thủy lịch sử - cái nôi của giai cấp công nhân xứ Nghệ với Nhà máy Diêm, Nhà máy Cưa và Làng Đỏ Hưng Dũng kiên cường trong cao trào Xô viết Nghệ Tĩnh 1930 - 1931",
    "geographyFeature": "nằm ở phía nam và đông nam thành phố Vinh, trải dài bên bờ bắc sông Lam thơ mộng, có núi Dũng Quyết sừng sững che chở và cầu Bến Thủy huyết mạch nối liền hai tỉnh Nghệ An - Hà Tĩnh",
    "economyFeature": "kinh tế dịch vụ giáo dục, y tế, thương mại và logistics cảng sông. Nơi đây tập trung Cảng Bến Thủy, cụm tiểu thủ công nghiệp và khu đô thị sinh thái ven sông Lam đang mở rộng",
    "cultureFeature": "Đền thờ Hoàng đế Quang Trung uy nghiêm trên đỉnh núi Dũng Quyết (nơi đặt dấu tích Phượng Hoàng Trung Đô xưa), Trường Đại học Vinh - trung tâm đào tạo lớn của miền Trung, quần thể di tích Bến Thủy anh hùng",
    "visionFeature": "xây dựng đô thị đại học, trung tâm giáo dục đào tạo, phát triển du lịch văn hóa tâm linh núi Dũng Quyết và hình thành dải đô thị ven sông Lam hiện đại, sinh thái"
  },
  "vinh-hung": {
    "historyFeature": "cửa ngõ phía bắc của thành phố Vinh, vùng đất giàu truyền thống cách mạng và hiếu học, là nơi hội tụ các cộng đồng dân cư nông nghiệp lâu đời gắn liền với quá trình mở mang đô thị",
    "geographyFeature": "địa bàn trải rộng ở phía bắc đô thị Vinh, đầu mối kết nối đa phương thức giao thông với Quốc lộ 1A, đường tránh thành phố Vinh và là nơi đặt Cảng hàng không quốc tế Vinh",
    "economyFeature": "phát triển mạnh các ngành logistics vận tải, trung tâm bảo dưỡng ôtô, kho bãi thương mại, vật liệu xây dựng và các khu đô thị mới. Nông nghiệp công nghệ cao ven đô vẫn duy trì ở một số khu vực",
    "cultureFeature": "truyền thống sinh hoạt cộng đồng làng xã kết hợp nếp sống đô thị mới, các thiết chế văn hóa thể thao được đầu tư hiện đại, phong trào khuyến học phát triển mạnh",
    "visionFeature": "trở thành trung tâm logistics và dịch vụ hậu cần sân bay hiện đại của vùng Bắc Trung Bộ, đẩy mạnh chỉnh trang hạ tầng và phát triển các khu dân cư kiểu mẫu"
  },
  "vinh-phu": {
    "historyFeature": "vùng đất hình thành từ sự kết hợp giữa các phường đô thị năng động và các xã nông nghiệp ven đô có truyền thống cần cù, đoàn kết trong khai hoang và bảo vệ quê hương",
    "geographyFeature": "nằm ở phía đông bắc thành phố Vinh, tiếp giáp Đại lộ Lê Nin và các tuyến đường liên vùng đi Cửa Lò, địa hình bằng phẳng và cảnh quan thông thoáng",
    "economyFeature": "trung tâm y tế kỹ thuật cao của cả vùng với Bệnh viện Hữu nghị Đa khoa Nghệ An, Bệnh viện Sản Nhi, Ung bướu; kết hợp với làng nghề trồng hoa cây cảnh Nghi Ân nức tiếng và dịch vụ thương mại",
    "cultureFeature": "Làng hoa cây cảnh Nghi Ân rực rỡ sắc màu, không gian sinh hoạt văn hóa làng xóm thanh bình bên cạnh các công trình y tế hiện đại bậc nhất tỉnh",
    "visionFeature": "hoàn thiện mạng lưới dịch vụ y tế chuyên sâu, phát triển thương mại dịch vụ chất lượng cao và quy hoạch làng hoa Nghi Ân thành điểm tham quan sinh thái đô thị"
  },
  "vinh-loc": {
    "historyFeature": "dải đất phía đông nam thành phố Vinh ôm lấy bờ bắc sông Lam, nơi cộng đồng cư dân có truyền thống canh tác lúa nước lâu đời và tinh thần yêu nước quật cường",
    "geographyFeature": "tiếp giáp huyện Nghi Lộc cũ và sông Lam, địa hình đồng bằng trũng màu mỡ với hệ thống kênh mương tưới tiêu thông suốt, kết nối nhanh với đường ven sông Lam",
    "economyFeature": "chuyển dịch từ nông nghiệp truyền thống sang nông nghiệp công nghệ cao, phát triển mạng lưới giáo dục đại học (cơ sở mới của ĐH Sư phạm Kỹ thuật, ĐH Y khoa), nhà vườn sinh thái và dịch vụ phụ trợ",
    "cultureFeature": "không gian văn hóa đồng quê hữu tình bên dòng Lam, các di tích đình đền làng cổ được bảo tồn, nét ẩm thực dân dã đồng quê xứ Nghệ mộc mạc",
    "visionFeature": "quy hoạch thành vành đai xanh sinh thái của thành phố Vinh, thu hút đầu tư các cơ sở giáo dục đại học và phát triển các khu nhà vườn sinh thái ven sông Lam"
  },
  "cua-lo": {
    "historyFeature": "thương cảng và vùng biển danh tiếng lịch sử xứ Nghệ, gắn với các danh tướng thủy quân thời Lê - Nguyễn và truyền thống kiên cường bám biển giữ vững chủ quyền biển đảo Tổ quốc",
    "geographyFeature": "dải bờ biển dài hơn 10km cát mịn thoai thoải, nước biển trong xanh không sóng ngầm, có đảo Lan Châu che chắn phía bắc và đảo Song Ngư án ngữ ngoài khơi",
    "economyFeature": "đô thị du lịch biển hàng đầu Bắc Trung Bộ với hệ thống hàng trăm khách sạn, khu nghỉ dưỡng, sân golf quốc tế; kết hợp dịch vụ cảng biển quốc tế Cửa Lò và đánh bắt, chế biến hải sản",
    "cultureFeature": "Lễ hội Sông nước Cửa Lò mở màn mùa du lịch hè náo nức, Đảo Lan Châu (Rú Cóc), Đảo Ngư với Chùa Ngư cổ kính, cáp treo vượt biển; ẩm thực mực nhảy, ghẹ hấp, nước mắm Nghi Thủy trứ danh",
    "visionFeature": "phát triển thành trung tâm đô thị du lịch biển cao cấp, hiện đại, hoạt động bốn mùa, gắn kết chặt chẽ với cực phát triển kinh tế biển của vùng kinh tế trọng điểm miền Trung"
  },
  "hoang-mai": {
    "historyFeature": "cửa ngõ cực bắc của tỉnh Nghệ An tiếp giáp Thanh Hóa, địa bàn chiến lược quân sự hiểm yếu thời xưa, ghi dấu nhiều dấu tích bảo vệ bờ cõi và công cuộc công nghiệp hóa đổi mới",
    "geographyFeature": "nằm trên tuyến giao thông huyết mạch Quốc lộ 1A, đường sắt Bắc Nam và đường cao tốc, có hồ thủy lợi Vực Mấu - hồ chứa nước nhân tạo lớn nhất tỉnh cung cấp nguồn nước ngọt dồi dào",
    "economyFeature": "trung tâm công nghiệp nặng và vật liệu xây dựng với Nhà máy Xi măng Hoàng Mai, các khu công nghiệp Hoàng Mai I và II thu hút nhiều tập đoàn sản xuất linh kiện điện tử FDI lớn",
    "cultureFeature": "hồ sinh thái Vực Mấu xanh mát, văn hóa giao thoa giữa xứ Nghệ và xứ Thanh, các lễ hội đền chùa truyền thống cầu quốc thái dân an",
    "visionFeature": "trở thành trung tâm công nghiệp công nghệ cao, đô thị động lực phía bắc của tỉnh Nghệ An gắn với liên kết vùng kinh tế Nam Thanh - Bắc Nghệ"
  },
  "quynh-mai": {
    "historyFeature": "vùng đất duyên hải cổ xưa, nơi cư dân gắn bó ngàn đời với biển khơi, sản sinh ra nhiều huyền tích linh thiêng về Tứ vị Thánh Nương bảo trợ ngư dân đi biển",
    "geographyFeature": "nằm dọc theo bờ biển thị xã Hoàng Mai với bãi tắm thoải, rừng phi lao chắn cát xanh ngắt và lạch biển tự nhiên cho thuyền bè neo đậu tránh trú bão",
    "economyFeature": "kinh tế biển toàn diện với nghề đánh bắt hải sản xa bờ, nuôi tôm công nghệ cao trên cát, chế biến thủy hải sản khô và sản xuất nước mắm truyền thống Quỳnh Phương",
    "cultureFeature": "Đền Cờn linh thiêng - đứng đầu 'Tứ đại linh từ' xứ Nghệ ('Nhất Cờn, nhì Quả, tam Bạch Mã, tứ Chiêu Trưng'), Lễ hội Đền Cờn đặc sắc với màn rước kiệu lội biển kỳ vĩ; ẩm thực mực nháy, gỏi cá trích",
    "visionFeature": "kết hợp hài hòa giữa du lịch tâm linh Đền Cờn với du lịch biển, hiện đại hóa nghề đánh bắt hải sản và xây dựng thương hiệu nước mắm sạch vươn ra thị trường quốc tế"
  },
  "tan-mai": {
    "historyFeature": "vùng bán sơn địa giáp biển có lịch sử lâu đời, người dân đoàn kết đắp đê ngăn mặn, kiên cường giữ biển trong thời kỳ kháng chiến bảo vệ Tổ quốc",
    "geographyFeature": "địa hình kết hợp giữa đồi núi thấp và vụng biển kín gió Lạch Cờn, có tuyến đường ven biển quốc gia chạy qua, thuận lợi cả đường bộ lẫn đường thủy",
    "economyFeature": "phát triển công nghiệp cơ khí đóng và sửa chữa tàu thuyền vỏ thép, dịch vụ cảng cá Lạch Cờn, chế biến hải sản, nuôi tôm thâm canh và vật liệu xây dựng",
    "cultureFeature": "làng chài truyền thống rộn rã lúc tàu cập bến, các phong tục tế thần sông thần biển mộc mạc, đậm chất văn hóa ngư dân miền Trung",
    "visionFeature": "nâng cấp cơ sở hạ tầng dịch vụ hậu cần nghề cá hiện đại, mở rộng vùng nuôi thủy sản công nghệ cao gắn với bảo vệ môi trường sinh thái biển"
  },
  "thai-hoa": {
    "historyFeature": "đô thị trung tâm vùng Phủ Quỳ lịch sử, gắn liền với di chỉ khảo cổ học Làng Vạc - cái nôi của nền văn minh Đông Sơn rực rỡ ở lưu vực sông Hiếu với hàng loạt trống đồng quý giá",
    "geographyFeature": "nằm ở ngã tư giao lộ chiến lược giữa Quốc lộ 48 và đường Hồ Chí Minh, bên dòng sông Hiếu hiền hòa, địa hình đồi lượn sóng và thung lũng màu mỡ",
    "economyFeature": "trung tâm dịch vụ thương mại, tài chính, giáo dục và đầu mối giao thương nông lâm sản của toàn bộ các huyện miền Tây Bắc Nghệ An",
    "cultureFeature": "Khu di chỉ khảo cổ học Làng Vạc huyền thoại, Lễ hội Làng Vạc rộn rã đầu xuân với tiếng trống đồng linh thiêng, ẩm thực thịt bò giằng, cam Phủ Quỳ thơm mát",
    "visionFeature": "phấn đấu phát triển thành đô thị loại III, trung tâm kinh tế - văn hóa đầu tàu của vùng Tây Bắc Nghệ An, đẩy mạnh thương mại điện tử và công nghiệp chế biến sâu"
  },
  "tay-hieu": {
    "historyFeature": "vùng đất đỏ bazan trù phú gắn với các đồn điền cao su, cà phê đầu thế kỷ 20, nơi công nhân và nông dân anh dũng đấu tranh trong phong trào giải phóng dân tộc",
    "geographyFeature": "địa hình bán sơn địa với tầng đất đỏ bazan dày và phì nhiêu, khí hậu ôn hòa thích hợp cho cây công nghiệp dài ngày và đồng cỏ chăn nuôi quy mô lớn",
    "economyFeature": "thế mạnh sản xuất cao su, cà phê, cây ăn quả có múi, chăn nuôi bò sữa tập trung và các cơ sở công nghiệp sơ chế mủ cao su, chế biến nông sản",
    "cultureFeature": "nếp sống công nhân nông trường đoàn kết, kỷ luật, kết hợp nét văn hóa bản địa mộc mạc; cảnh quan những cánh rừng cao su thẳng tắp mùa thay lá tuyệt đẹp",
    "visionFeature": "phát triển nông nghiệp hữu cơ ứng dụng công nghệ cao, liên kết chuỗi giá trị chế biến nông sản xuất khẩu và mở rộng các khu dân cư nông thôn mới kiểu mẫu"
  },
  "hung-nguyen": {
    "historyFeature": "trung tâm huyện lỵ Hưng Nguyên lịch sử, đỉnh cao của phong trào Xô viết Nghệ Tĩnh 1930 - 1931 với cuộc biểu tình lịch sử ngày 12/9/1930 của hàng vạn nông dân lao động tại Thái Lão",
    "geographyFeature": "nằm liền kề phía tây thành phố Vinh, hệ thống giao thông liên kết thuận tiện với Quốc lộ 46, đường tránh Vinh và tuyến đường sắt Bắc Nam",
    "economyFeature": "phát triển công nghiệp bứt phá nhờ liền kề Khu công nghiệp VSIP Nghệ An thu hút nhiều dự án FDI lớn; kết hợp dịch vụ thương mại đô thị và nông nghiệp sinh thái",
    "cultureFeature": "Quảng trường và Đài tưởng niệm các liệt sĩ Xô viết Nghệ Tĩnh 12/9 tại Thái Lão thiêng liêng, truyền thống hiếu học và lòng yêu nước nồng nàn truyền qua nhiều thế hệ",
    "visionFeature": "trở thành đô thị vệ tinh công nghiệp - dịch vụ hiện đại của thành phố Vinh, đẩy mạnh chuyển dịch cơ cấu lao động sang công nghiệp và dịch vụ chất lượng cao"
  },
  "lam-thanh": {
    "historyFeature": "vùng đất cổ bên chân núi Lam Thành kỳ vĩ, nơi vua tôi nhà Hậu Trần từng dựng thành chống giặc Minh và nghĩa quân Lam Sơn của Lê Lợi đặt đại bản doanh vây hãm thành Nghệ An",
    "geographyFeature": "nằm sát hữu ngạn sông Lam hiền hòa, có dải đất phù sa màu mỡ và dãy núi Lam Thành (núi Rú Thành) tạo nên bức tranh sơn thủy hữu tình",
    "economyFeature": "sản xuất nông nghiệp thâm canh lúa, ngô, dâu tằm trên bãi bồi ven sông Lam, nghề nuôi trồng thủy sản nước ngọt và phát triển dịch vụ du lịch trải nghiệm sông nước",
    "cultureFeature": "Di tích Thành cổ Lam Thành, Đền thờ vua Lê Lợi và các tướng lĩnh Lam Sơn, bến đò bến phà sông Lam gắn với câu hò Ví, Giặm tha thiết ân tình",
    "visionFeature": "bảo tồn và tôn tạo quần thể di tích lịch sử Lam Thành gắn với phát triển du lịch sinh thái văn hóa ven sông Lam, nâng cao thu nhập người dân từ nông nghiệp sạch"
  },
  "hung-nguyen-nam": {
    "historyFeature": "mảnh đất địa linh nhân kiệt, quê hương của cố Tổng Bí thư Lê Hồng Phong - người chiến sĩ cộng sản kiên trung, bất khuất của Đảng và cách mạng Việt Nam (xã Hưng Thông cũ)",
    "geographyFeature": "địa bàn đồng bằng bằng phẳng, mạng lưới kênh mương thủy lợi nội đồng hoàn chỉnh, kết nối giao thông thông suốt với các trục đường tỉnh lộ",
    "economyFeature": "đi đầu toàn tỉnh về xây dựng nông thôn mới kiểu mẫu (nổi bật tại Hưng Tân cũ), phát triển lúa chất lượng cao, trang trại nấm sạch, mộc dân dụng và tiểu thủ công nghiệp",
    "cultureFeature": "Khu lưu niệm và Nhà tưởng niệm Tổng Bí thư Lê Hồng Phong trang nghiêm đón nhiều đoàn khách hành hương, phong trào khuyến học dòng họ phát triển rực rỡ",
    "visionFeature": "xây dựng vùng nông thôn mới kiểu mẫu thông minh, giữ vững danh hiệu miền quê đáng sống, phát huy giá trị di tích cách mạng giáo dục truyền thống cho thế hệ trẻ"
  },
  "yen-trung": {
    "historyFeature": "vùng đất giàu truyền thống yêu nước và đoàn kết tôn giáo, nơi đồng bào lương và giáo cùng chung tay xây dựng xóm làng trù phú qua nhiều thế hệ",
    "geographyFeature": "địa hình bán sơn địa chuyển tiếp, có hồ nước ngọt Khe Ngang tạo nguồn nước dồi dào và điều hòa vi khí hậu mát mẻ quanh năm",
    "economyFeature": "kinh tế vườn đồi, trang trại chăn nuôi bò thịt, lợn sạch, trồng cây ăn quả có múi, keo nguyên liệu kết hợp trồng lúa nước vùng thung lũng",
    "cultureFeature": "cảnh quan thiên nhiên thơ mộng của hồ Khe Ngang thu hút giới trẻ cắm trại, tinh thần đoàn kết lương giáo bền chặt, các phong trào văn hóa thể thao thôn xóm sôi nổi",
    "visionFeature": "phát triển kinh tế trang trại sinh thái kết hợp du lịch dã ngoại hồ Khe Ngang, hoàn thiện hạ tầng giao thông kết nối liên vùng"
  },
  "kim-lien": {
    "historyFeature": "mảnh đất thiêng liêng - quê hương của Chủ tịch Hồ Chí Minh vĩ đại, Lãnh tụ thiên tài của Đảng và dân tộc Việt Nam, Danh nhân văn hóa kiệt xuất",
    "geographyFeature": "nằm ở trung tâm huyện Nam Đàn, tựa lưng vào dãy núi Chung và núi Động Tranh hùng vĩ, cảnh quan làng quê rợp bóng tre xanh và đầm sen ngát hương",
    "economyFeature": "kinh tế du lịch dịch vụ gắn với du khách tham quan khu di tích, sản xuất các sản phẩm OCOP từ sen (trà sen, hạt sen, tinh dầu sen), nông nghiệp hữu cơ kiểu mẫu",
    "cultureFeature": "Khu di tích Quốc gia đặc biệt Kim Liên với Làng Sen quê nội, Làng Hoàng Trù quê ngoại, Khu mộ bà Hoàng Thị Loan trên núi Động Tranh; những câu hò Ví, Giặm ngọt ngào sâu lắng",
    "visionFeature": "xây dựng Kim Liên trở thành xã nông thôn mới kiểu mẫu tiêu biểu của cả nước theo hướng 'Phát triển văn hóa gắn với du lịch', giữ gìn trọn vẹn hồn cốt làng quê Bác"
  },
  "nam-dan": {
    "historyFeature": "vùng đất địa linh nhân kiệt cổ xưa của xứ Vạn An, gắn liền với cuộc khởi nghĩa long trời lở đất của Vua Mai Hắc Đế (Mai Thúc Loan) chống lại quân đô hộ nhà Đường năm 722",
    "geographyFeature": "nằm bên dòng sông Lam thơ mộng, tựa lưng vào dãy Hùng Sơn (núi Đụn), là trung tâm huyện lỵ Nam Đàn cũ trên trục Quốc lộ 46",
    "economyFeature": "thương mại dịch vụ sầm uất, ẩm thực truyền thống, các cơ sở sản xuất tương Nam Đàn nức tiếng và chế biến nông sản sạch phục vụ du khách thập phương",
    "cultureFeature": "Đền thờ Vua Mai Hắc Đế trang nghiêm dưới chân núi Đụn, Lăng mộ Vua Mai, Lễ hội Đền Vua Mai rộn rã đầu xuân; ẩm thực đặc sắc tương Sa Nam, thịt me (bê) Nam Đàn",
    "visionFeature": "phát triển đô thị sinh thái lịch sử, mở rộng không gian thương mại dịch vụ du lịch và bảo tồn các giá trị di sản văn hóa phi vật thể của vùng đất Lam Hồng"
  },
  "van-an": {
    "historyFeature": "kinh đô Vạn An xưa của nghĩa quân Vua Mai Thúc Loan, nơi hội tụ khí thiêng sông núi và ý chí quật cường của nhân dân xứ Nghệ trong phong trào độc lập tự chủ",
    "geographyFeature": "địa hình chuyển tiếp từ đồng bằng lên chân dãy núi Đại Huệ, cảnh sắc thiên nhiên trong lành với những vườn cây trĩu quả",
    "economyFeature": "nổi tiếng với vùng chuyên canh cây hồng Nam Anh (hồng cậy, hồng trứng) cho giá trị kinh tế cao, kết hợp trồng hoa cây cảnh và chăn nuôi bò vàng",
    "cultureFeature": "Đền Mẫu Vạn An, thung lũng hồng Nam Anh rực rỡ sắc vàng mùa thu hút đông đảo du khách chụp ảnh check-in và trải nghiệm văn hóa miệt vườn",
    "visionFeature": "phát triển mô hình nông nghiệp du lịch sinh thái vườn hồng, bảo tồn giống hồng bản địa và nâng cao chuỗi giá trị sản phẩm OCOP"
  },
  "thien-nhan": {
    "historyFeature": "vùng đất tựa lưng vào dãy núi Thiên Nhẫn 'ngàn hộc ngàn đồi' hùng vĩ, nơi nghĩa quân Lam Sơn từng lập thành Lục Niên vây hãm giặc Minh bảo vệ bình yên đất nước",
    "geographyFeature": "địa bàn bán sơn địa uốn lượn ven bờ nam sông Lam, cảnh quan thiên nhiên trập trùng ngoạn mục với những triền đồi xanh ngút tầm mắt",
    "economyFeature": "sản xuất nông lâm nghiệp, đồi chè sạch, trang trại cam bù, chăn nuôi gia súc thả đồi và nghề nuôi ong lấy mật hoa rừng tự nhiên",
    "cultureFeature": "Di tích Thành Lục Niên của Lê Lợi và Nguyễn Trãi, những bài thơ vịnh cảnh Thiên Nhẫn của các bậc tiền nhân, nét sinh hoạt làng quê mộc mạc trọng đạo lý",
    "visionFeature": "phát triển kinh tế vườn rừng bền vững gắn với du lịch khám phá di tích lịch sử và cảnh quan non nước Thiên Nhẫn bên dòng sông Lam"
  },
  "dai-hue": {
    "historyFeature": "vùng đất gắn liền với dãy núi Đại Huệ linh thiêng, nơi lưu giữ nhiều huyền tích lịch sử của các triều đại Đinh, Tiền Lê, Lý, Trần và dấu chân tiền nhân khai phá",
    "geographyFeature": "nằm trên sườn dãy núi Đại Huệ cao lộng gió, thế đất 'rồng cuộn hổ ngồi' nhìn bao quát toàn bộ vùng đồng bằng Nam Đàn và dòng sông Lam",
    "economyFeature": "kinh tế vườn đồi, trồng chè công nghiệp, cây ăn quả đặc sản, mô hình nông nghiệp tuần hoàn và các dịch vụ phục vụ du khách hành hương tâm linh",
    "cultureFeature": "Chùa Đại Tuệ - ngôi chùa cổ tọa lạc trên đỉnh cao nhất dãy Đại Huệ sở hữu nhiều kỷ lục Phật giáo Việt Nam, không gian thiền tịnh linh thiêng giữa mây ngàn",
    "visionFeature": "trở thành điểm đến du lịch tâm linh và sinh thái trọng điểm của tỉnh, kết nối đồng bộ tuyến tham quan Kim Liên - Đại Huệ"
  },
  "dien-chau": {
    "historyFeature": "trung tâm của vùng đất Diễn Châu cổ kính có lịch sử ngàn năm, nơi gắn liền với truyền thuyết nỏ thần An Dương Vương và công cuộc bảo vệ bờ cõi phía nam nước Âu Lạc",
    "geographyFeature": "nằm trên tuyến Quốc lộ 1A, đường sắt Bắc Nam và đường cao tốc, có sông Bùng chảy qua và bãi biển Cửa Hiền thơ mộng",
    "economyFeature": "trung tâm dịch vụ thương mại, tài chính, giao thương nhộn nhịp của cả vùng; kết hợp phát triển du lịch biển, chế biến thủy hải sản và kinh tế biển",
    "cultureFeature": "Đền Cuông trên núi Mộ Dạ thờ Thục Phán An Dương Vương linh thiêng, bãi biển Cửa Hiền hoang sơ, Lễ hội Đền Cuông náo nức đầu xuân; đặc sản nước mắm Vạn Phần",
    "visionFeature": "xây dựng đô thị trung tâm hiện đại, phát triển dịch vụ logistics, thương mại và kết nối tour du lịch văn hóa tâm linh - nghỉ dưỡng biển"
  },
  "an-chau": {
    "historyFeature": "vùng đất ven chân núi Mộ Dạ và bờ biển Đông, người dân cần cù khai hoang lấn biển, kiên cường vượt qua phong ba bão táp để gây dựng cơ nghiệp",
    "geographyFeature": "địa hình đồng bằng ven biển kết hợp cồn cát chắn gió, có nguồn nước ngầm trong mát và đất cát pha phù hợp nhiều loại cây màu",
    "economyFeature": "thủ phủ trồng lạc (đậu phộng) Diễn Châu xuất khẩu nổi tiếng, dưa hấu, vừng đen; nuôi tôm công nghệ cao trên cát và đánh bắt hải sản ven bờ",
    "cultureFeature": "Làng nghề dầu lạc thủ công, các lễ hội cầu ngư truyền thống của ngư dân miền biển, tinh thần hiếu học vượt khó của con em địa phương",
    "visionFeature": "xây dựng vùng chuyên canh nông sản an toàn tiêu chuẩn VietGAP, mở rộng diện tích nuôi trồng thủy sản sạch và bảo vệ môi trường cồn cát ven biển"
  },
  "minh-chau": {
    "historyFeature": "vùng châu thổ phì nhiêu đôi bờ sông Bùng, nơi tụ cư lâu đời của các dòng họ khai hoang lập ấp, giàu truyền thống cách mạng trong các cuộc kháng chiến",
    "geographyFeature": "địa bàn đồng bằng bằng phẳng, mạng lưới kênh rạch nội đồng dày đặc, nguồn phù sa sông Bùng bồi đắp quanh năm",
    "economyFeature": "vựa lúa trọng điểm của Diễn Châu với các giống lúa thuần chất lượng cao, chăn nuôi vịt đàn ven sông, nuôi thả cá nước ngọt và nghề buôn chuyến nông thôn",
    "cultureFeature": "nhịp sống làng quê trù phú bên dòng sông Bùng, các ngôi đình làng cổ kính rêu phong, nếp sống tương thân tương ái đậm chất tình quê xứ Nghệ",
    "visionFeature": "quy hoạch cánh đồng lớn sản xuất lúa thương phẩm chất lượng cao, áp dụng cơ giới hóa đồng bộ và xây dựng chuỗi liên kết tiêu thụ nông sản"
  },
  "hung-chau": {
    "historyFeature": "vùng bán sơn địa phía tây Diễn Châu, nơi có lèn đá vôi cổ kỳ vĩ và những căn cứ du kích kháng chiến kiên cường trong thời kỳ chống ngoại xâm",
    "geographyFeature": "địa hình đa dạng gồm đồi núi thấp, thung lũng và hồ chứa nước nhân tạo, khí hậu trong lành và không gian sinh thái rộng mở",
    "economyFeature": "đột phá với ngành du lịch sinh thái quy mô lớn tại Khu sinh thái Mường Thanh Diễn Lâm (vườn thú Safari hoang dã lớn nhất miền Trung, công viên nước, khách sạn); kinh tế trang trại đồi rừng",
    "cultureFeature": "Di tích Lèn Hai hùng vĩ, quần thể du lịch Mường Thanh Diễn Lâm thu hút hàng triệu du khách mỗi năm, ẩm thực gà đồi, thịt lợn rừng thả rông",
    "visionFeature": "trở thành trung tâm du lịch sinh thái nghỉ dưỡng và vui chơi giải trí hàng đầu của tỉnh Nghệ An, tạo việc làm và chuyển đổi nghề cho lao động địa phương"
  },
  "tan-chau": {
    "historyFeature": "vùng đất giàu truyền thống hiếu học và cần cù, các thế hệ cư dân chung sức ngăn sông đắp đập xây dựng các hồ chứa nước lớn phục vụ đời sống",
    "geographyFeature": "địa hình đồi bát úp lượn sóng, có hồ sinh thái Xuân Dương mênh mông nước biếc và rừng thông bạt ngàn bao quanh",
    "economyFeature": "kinh tế vườn đồi, trồng rừng gỗ lớn (keo lai, thông lấy nhựa), trang trại chăn nuôi gia súc gia cầm và nuôi cá nước ngọt lòng hồ",
    "cultureFeature": "thắng cảnh hồ Xuân Dương trong xanh thanh bình được ví như 'Đà Lạt thu nhỏ' của Diễn Châu, các phong trào văn hóa thể thao thôn xóm sôi động",
    "visionFeature": "phát triển mô hình nông lâm kết hợp sinh thái, khai thác tiềm năng du lịch dã ngoại hồ Xuân Dương và bảo vệ tài nguyên nước"
  },
  "duc-chau": {
    "historyFeature": "nút giao thương buôn bán sầm uất bậc nhất của Diễn Châu trên đường thiên lý Bắc Nam, nơi người dân nổi tiếng tháo vát, năng động trong làm ăn kinh tế",
    "geographyFeature": "nằm quanh ngã ba Yên Lý và Chợ Si, giao cắt giữa Quốc lộ 1A và Quốc lộ 48 đi miền Tây Nghệ An, thuận lợi tối đa về giao thương vận tải",
    "economyFeature": "làng nghề thu gom, tái chế phế liệu và kinh doanh máy móc cơ khí Diễn Hồng nức tiếng cả nước giúp người dân làm giàu nhanh chóng; kết hợp dịch vụ thương mại Chợ Si nhộn nhịp",
    "cultureFeature": "tinh thần doanh nhân nhạy bén của người dân, những khu phố khang trang hiện đại mọc lên giữa làng quê, truyền thống khuyến học khuyến tài phát triển mạnh",
    "visionFeature": "quy hoạch cụm công nghiệp tái chế và dịch vụ thương mại quy củ, giải quyết triệt để vấn đề bảo vệ môi trường và xây dựng đô thị công nghiệp văn minh"
  },
  "hai-chau": {
    "historyFeature": "vùng cửa biển Lạch Vạn lịch sử, nơi ghi dấu bao chiến công bảo vệ vùng biển quê hương và truyền thống kiên cường của các thế hệ ngư dân bám biển",
    "geographyFeature": "nằm kề cửa biển Lạch Vạn và bờ biển Đông, luồng lạch sâu thuận lợi cho hàng trăm tàu thuyền công suất lớn ra vào cập cảng",
    "economyFeature": "thủ phủ đánh bắt hải sản xa bờ, nghề sản xuất muối biển sạch tại đồng muối Diễn Vạn, chế biến cá khô, mực khô và nghề làm nước mắm Vạn Phần truyền thống",
    "cultureFeature": "Lễ hội Cầu ngư Lạch Vạn đậm đà bản sắc sông nước miền Trung, các bến cá tấp nập lúc bình minh, hương vị đậm đà của nước mắm cá cơm truyền thống",
    "visionFeature": "hiện đại hóa đội tàu đánh bắt xa bờ, nâng cấp hạ tầng âu thuyền tránh trú bão và xây dựng chuỗi thương hiệu hải sản xuất khẩu"
  },
  "quang-chau": {
    "historyFeature": "vùng đồng bằng thuần nông trù phú phía bắc Diễn Châu, người dân có truyền thống hiếu học lâu đời với nhiều danh nhân khoa bảng thời phong kiến",
    "geographyFeature": "địa hình đồng bằng bằng phẳng, đất phù sa phì nhiêu, hệ thống mương máng thủy lợi Bara Đô Lương tưới tiêu tự chảy hoàn chỉnh",
    "economyFeature": "sản xuất lúa thâm canh năng suất cao, mô hình trồng dưa chuột, ngô ngọt bao tiêu sản phẩm, nghề làm bánh đa, bánh mướt và bánh gai truyền thống",
    "cultureFeature": "những ngôi đình làng cổ kính, giếng nước gốc đa thanh bình, tình làng nghĩa xóm gắn kết keo sơn và tinh thần hiếu học của con em xứ lúa",
    "visionFeature": "xây dựng mô hình nông nghiệp sinh thái tuần hoàn, nhân rộng các sản phẩm nông sản chế biến đạt chuẩn OCOP và giữ vững danh hiệu nông thôn mới nâng cao"
  },
  "quynh-anh": {
    "historyFeature": "cái nôi khoa bảng số một của xứ Nghệ, nơi có Làng Quỳnh Đôi nức tiếng cả nước với câu phương ngôn 'Bắc Hà Hành Thiện, Hoan Diễn Quỳnh Đôi'. Mảnh đất địa linh sinh thành nhiều tiến sĩ, cử nhân và danh nhân lẫy lừng",
    "geographyFeature": "nằm ở trung tâm đồng bằng Quỳnh Lưu, địa thế đất đẹp tựa rồng phục hổ chầu, tiếp giáp sông Hoàng Mai và đồng ruộng trù phú",
    "economyFeature": "phát triển kinh tế nông nghiệp chất lượng cao, các ngành nghề tiểu thủ công nghiệp tinh xảo, may mặc xuất khẩu và dịch vụ giáo dục, văn hóa",
    "cultureFeature": "Làng Quỳnh Đôi với Văn Thánh, Bia tưởng niệm các bậc đại khoa, Nhà thờ họ Hồ, quê hương Nữ sĩ Hồ Xuân Hương ('Bà Chúa thơ Nôm'), danh nhân Hoàng Văn Hoan; truyền thống coi việc học là gốc rễ cơ nghiệp",
    "visionFeature": "xây dựng Làng di sản văn hóa khoa bảng Quỳnh Đôi thành điểm du lịch học tập - trải nghiệm tiêu biểu của cả nước, phát huy truyền thống hiếu học trong thời đại số"
  },
  "quynh-luu": {
    "historyFeature": "trung tâm huyện lỵ Quỳnh Lưu lịch sử, thị trấn Cầu Giát cổ kính trên tuyến đường thiên lý, nơi giao lưu buôn bán và hội tụ các phong trào cách mạng của phủ Quỳnh Lưu xưa",
    "geographyFeature": "nằm dọc Quốc lộ 1A và đường sắt Bắc Nam, có Ga Cầu Giát và sông Bàu Giang chảy qua, kết nối nhanh với các huyện lân cận",
    "economyFeature": "trung tâm thương mại, dịch vụ, bán buôn bán lẻ sầm uất với Chợ Giát đầu mối; các cơ sở chế biến thực phẩm, may mặc và vận tải hàng hóa",
    "cultureFeature": "nhịp sống đô thị nhộn nhịp xen lẫn nét cổ kính của thị tứ Cầu Giát, các món ăn dân dã đặc sản bánh đúc Cầu Giát, mực khô nướng giòn ngọt",
    "visionFeature": "mở rộng không gian đô thị, nâng cấp hạ tầng thương mại và xây dựng đô thị dịch vụ văn minh, xanh - sạch - đẹp"
  },
  "quynh-phu": {
    "historyFeature": "vùng cửa biển Lạch Quèn danh tiếng ngàn đời, căn cứ thủy binh trọng yếu thời phong kiến và là nơi ngư dân kiên cường đánh giặc bảo vệ biển đảo",
    "geographyFeature": "ôm trọn cửa Lạch Quèn ăn sâu ra biển Đông, có âu thuyền tự nhiên rộng lớn che chắn gió bão cho hàng ngàn phương tiện tàu thuyền",
    "economyFeature": "trung tâm kinh tế biển mạnh nhất Quỳnh Lưu với đội tàu đánh bắt xa bờ hàng nghìn mã lực, chế biến hải sản đông lạnh xuất khẩu, sản xuất muối biển hạt to sạch và làm nước mắm",
    "cultureFeature": "Lễ hội Cầu ngư Lạch Quèn rộn rã trống chiêng, cảnh bến cá tấp nập đêm ngày phản chiếu sức sống mãnh liệt của cư dân miền biển",
    "visionFeature": "nâng cấp Cảng cá Lạch Quèn thành cảng cá loại I hiện đại của vùng, phát triển chuỗi chế biến hải sản sâu và dịch vụ hậu cần nghề cá khép kín"
  },
  "quynh-son": {
    "historyFeature": "vùng bán sơn địa khai hoang lập ấp từ nhiều thế kỷ trước, nơi cộng đồng cư dân đoàn kết chế ngự đồi núi, xây dựng những làng xóm trù phú xanh tươi",
    "geographyFeature": "địa hình đồi lượn sóng xen kẽ thung lũng, có hồ thủy lợi Khe Gỗ cung cấp nguồn nước ngọt mát lành cho sinh hoạt và tưới tiêu",
    "economyFeature": "kinh tế vườn đồi với các vùng chuyên canh cây dứa Cayen, chanh leo, cây có múi, trồng rừng keo nguyên liệu và trang trại chăn nuôi đại gia súc",
    "cultureFeature": "cảnh quan đồi dứa xanh ngút ngàn đẹp mắt, không khí trong lành của vùng bán sơn địa, tinh thần lao động cần mẫn chịu thương chịu khó",
    "visionFeature": "phát triển vùng cây ăn quả tập trung công nghệ cao, thu hút doanh nghiệp chế biến nước ép hoa quả và phát triển kinh tế lâm nghiệp bền vững"
  },
  "quynh-tam": {
    "historyFeature": "vùng đất đỏ bazan đồi thoải phía tây Quỳnh Lưu, gắn liền với các phong trào khai hoang lập kinh tế mới sau ngày hòa bình lập lại",
    "geographyFeature": "địa hình gò đồi thoai thoải với tầng đất bazan màu mỡ, khí hậu thuận lợi cho nhiều loại cây trồng công nghiệp và đồng cỏ",
    "economyFeature": "nông trường trồng dứa nguyên liệu, mía đường, đồi keo tràm bạt ngàn, chăn nuôi bò thịt tập trung và mô hình trang trại nông lâm kết hợp",
    "cultureFeature": "nếp sống đoàn kết của các hộ dân kinh tế mới từ nhiều vùng quê hội tụ, cảnh quan những đồi thông và nương dứa bạt ngàn",
    "visionFeature": "mở rộng diện tích cây trồng có giá trị kinh tế cao, liên kết với các nhà máy chế biến nông sản và nâng cấp đường giao thông liên thôn"
  },
  "quynh-thang": {
    "historyFeature": "vùng đất gắn liền với công trình thủy lợi hồ Vực Mấu lịch sử - biểu tượng của sức mạnh đoàn kết toàn dân Nghệ An những năm sau giải phóng",
    "geographyFeature": "nằm quanh lòng hồ thủy lợi Vực Mấu rộng lớn, bao bọc bởi những dãy đồi xanh mát, vi khí hậu mát mẻ và nguồn nước dồi dào",
    "economyFeature": "trồng rừng kinh tế gỗ lớn, cây cao su, cây ăn quả có múi, kết hợp nuôi cá lồng bè trên lòng hồ Vực Mấu và chăn nuôi dê, bò thả đồi",
    "cultureFeature": "phong cảnh sơn thủy hữu tình mênh mông của hồ Vực Mấu, không gian sinh thái hoang sơ thích hợp nghỉ dưỡng cuối tuần",
    "visionFeature": "bảo vệ nghiêm ngặt nguồn nước đầu nguồn hồ Vực Mấu, phát triển du lịch sinh thái dã ngoại ven hồ và kinh tế lâm nghiệp chứng chỉ FSC"
  },
  "quynh-van": {
    "historyFeature": "cái nôi khảo cổ học tiền sử nổi tiếng thế giới với Di chỉ Cồn Điệp (Văn hóa Quỳnh Văn thời kỳ Đồ đá mới cách đây 5.000 - 6.000 năm), minh chứng cho sự quần tụ liên tục của con người",
    "geographyFeature": "nằm ven Quốc lộ 1A và các dải núi đá vôi thấp, địa thế chuyển tiếp giữa đồng bằng và vùng đồi gò ven biển",
    "economyFeature": "phát triển công nghiệp vật liệu xây dựng (khai thác đá, sản xuất gạch ngói ngói, bê tông đúc sẵn), cơ khí sửa chữa và thương mại dịch vụ ven Quốc lộ 1A",
    "cultureFeature": "Di chỉ khảo cổ học Quỳnh Văn với tầng văn hóa vỏ điệp dày hàng mét thu hút các nhà nghiên cứu lịch sử trong và ngoài nước; truyền thống cần cù sáng tạo",
    "visionFeature": "bảo tồn và phát huy giá trị di chỉ khảo cổ học gắn với giáo dục lịch sử, quy hoạch lại hoạt động khai thác đá bền vững gắn với bảo vệ môi trường"
  },
  "yen-thanh": {
    "historyFeature": "trung tâm của 'vựa lúa gạo số một xứ Nghệ', vùng đất cổ giàu truyền thống khoa bảng và lòng yêu nước bất khuất, nơi khởi nguồn nhiều phong trào cách mạng vẻ vang",
    "geographyFeature": "nằm ở trung tâm thung lũng Yên Thành bằng phẳng, có sông Dinh uốn lượn và mạng lưới thủy lợi tưới tiêu tự chảy từ hệ thống Bara Đô Lương",
    "economyFeature": "trung tâm chính trị, thương mại, dịch vụ của huyện; sản xuất và chế biến lúa gạo đặc sản quy mô lớn, gia công may mặc và nghề mộc truyền thống",
    "cultureFeature": "Đền Bạch Mã linh thiêng (thờ danh tướng Phan Đà thời khởi nghĩa Lam Sơn - Đệ tam linh từ xứ Nghệ), Chùa Gám cổ kính; các món ăn đặc sản bánh đúc, thịt chuột đồng, lươn đồng Yên Thành",
    "visionFeature": "xây dựng đô thị sinh thái trung tâm, hiện đại hóa chuỗi giá trị lúa gạo chất lượng cao xuất khẩu và mở rộng các ngành dịch vụ đô thị"
  },
  "dong-thanh": {
    "historyFeature": "vùng đồng bằng trù phú phía đông Yên Thành, nơi người dân nhiều đời gìn giữ nếp sống thuần hậu, coi trọng lễ nghĩa và tình làng nghĩa xóm",
    "geographyFeature": "cánh đồng thẳng cánh cò bay, đất phù sa lắng đọng màu mỡ, có hồ sinh thái Bầu Nón điều hòa khí hậu quanh năm",
    "economyFeature": "thủ phủ sản xuất lúa chất lượng cao (lúa giống ST25, TBR225, nếp ngỗng), nghề đan lát mây tre xuất khẩu và nuôi trồng thủy sản nước ngọt",
    "cultureFeature": "cảnh sắc hồ Bầu Nón rợp bóng sen súng mỗi độ hè về, nhịp làm việc hăng say của các nghệ nhân mây tre đan, phong trào xây dựng làng văn hóa sôi nổi",
    "visionFeature": "mở rộng diện tích cánh đồng mẫu lớn liên kết doanh nghiệp bao tiêu sản phẩm, phát triển làng nghề mây tre đan theo hướng sản phẩm xanh xuất khẩu"
  },
  "quan-thanh": {
    "historyFeature": "vùng đất tâm linh và lịch sử lâu đời bên dãy Rú Gám, nơi dung hòa giữa vẻ đẹp thiên tạo kỳ vĩ và các công trình kiến trúc tín ngưỡng thiêng liêng",
    "geographyFeature": "tựa lưng vào Rú Gám (núi Gám) sừng sững, phía trước là dòng sông Dinh uốn lượn tưới mát xóm làng, cảnh quan non nước hữu tình",
    "economyFeature": "phát triển dịch vụ du lịch văn hóa tâm linh quanh quần thể Rú Gám; thâm canh lúa nước, trang trại cây ăn quả và phát triển chăn nuôi gia cầm",
    "cultureFeature": "Quần thể du lịch sinh thái tâm linh Rú Gám (Chùa Gám, Đền Bạch Mã cơ sở II), Lễ hội Rú Gám đầu xuân rộn rã lòng người; các ngôi nhà rường cổ kính",
    "visionFeature": "hoàn thiện hạ tầng khu du lịch tâm linh Rú Gám thành điểm đến quốc gia, bảo vệ nghiêm ngặt thảm thực vật rừng tự nhiên Rú Gám"
  },
  "quang-dong": {
    "historyFeature": "vùng đất nông nghiệp trù phú, người dân có tinh thần chịu thương chịu khó, tiên phong áp dụng tiến bộ khoa học kỹ thuật vào sản xuất đồng ruộng",
    "geographyFeature": "địa hình đồng bằng bằng phẳng, mạng lưới kênh thủy lợi bê tông hóa kiên cố đến từng chân ruộng, đồng đất phì nhiêu",
    "economyFeature": "sản xuất lúa thâm canh năng suất cao, cánh đồng hữu cơ tuần hoàn, các trang trại chăn nuôi bò sữa vệ tinh, lợn sạch công nghệ cao khép kín",
    "cultureFeature": "nhịp điệu thanh bình của làng quê nông thôn mới nâng cao, các câu lạc bộ dân ca Ví, Giặm hoạt động sôi nổi giữ gìn di sản cha ông",
    "visionFeature": "trở thành vùng sản xuất nông nghiệp công nghệ cao tiêu biểu của tỉnh, liên kết chặt chẽ với các doanh nghiệp chế biến sữa và thực phẩm sạch"
  },
  "van-tu": {
    "historyFeature": "vùng đất hiếu học truyền thống của huyện Yên Thành, nơi sản sinh nhiều thầy đồ, cử nhân và những người con đỗ đạt thành danh đóng góp cho quê hương",
    "geographyFeature": "địa hình đồng bằng xen đồi gò thấp, đất đai màu mỡ thích hợp cho cả cây lương thực ngắn ngày lẫn cây trồng vụ đông",
    "economyFeature": "canh tác lúa giống chất lượng cao, chuyên canh rau màu vụ đông (khoai tây, ngô ngọt, dưa leo), nghề mộc mỹ nghệ và dịch vụ cơ khí nông cụ",
    "cultureFeature": "những dòng họ hiếu học nhiều đời, đình làng cổ kính rợp bóng cây cổ thụ, tinh thần tương trợ xóm làng bền chặt",
    "visionFeature": "đẩy mạnh chuyển dịch cơ cấu cây trồng vụ ba, nhân rộng các mô hình kinh tế tuần hoàn và giữ vững tiêu chí nông thôn mới kiểu mẫu"
  },
  "van-du": {
    "historyFeature": "vùng bán sơn địa phía tây huyện, nơi những người nông dân bền bỉ vượt khó khai phá đồi hoang thành những đồi chè, vườn cây ăn quả trĩu ngọt",
    "geographyFeature": "địa hình đồi bát úp lượn sóng, có hồ thủy lợi Trại Xanh trữ nước ngọt lớn, không khí trong lành với những mảng xanh rừng trồng",
    "economyFeature": "kinh tế vườn đồi với cây cam bù Yên Thành mọng nước, đồi chè xanh mát, trồng rừng gỗ lớn và trang trại chăn nuôi bò vàng thả đồi",
    "cultureFeature": "cảnh quan xanh mướt của hồ Trại Xanh và những triền đồi bạt ngàn, nét chân chất mộc mạc của người dân quê lúa, ẩm thực gà đồi đượm vị",
    "visionFeature": "xây dựng thương hiệu cam bù hữu cơ Yên Thành, phát triển mô hình cắm trại dã ngoại hồ Trại Xanh và bảo vệ thảm rừng đầu nguồn"
  },
  "binh-minh": {
    "historyFeature": "mảnh đất trù phú với truyền thống thâm canh lúa nước lâu đời, người dân luôn đoàn kết xây dựng các công trình công cộng xóm làng",
    "geographyFeature": "địa bàn bằng phẳng, hệ thống giao thông nông thôn thảm nhựa rộng rãi kết nối thẳng với các tuyến đường tỉnh lộ",
    "economyFeature": "sản xuất lúa chất lượng cao kết hợp nuôi thả thủy sản nước ngọt (cá trắm, cá chép, lươn đồng), các xưởng gia công may mặc tạo việc làm cho lao động",
    "cultureFeature": "nếp làng văn minh, sạch đẹp, hệ thống loa truyền thanh cơ sở đều đặn đưa tin các phong trào thi đua yêu nước, xóm làng bình yên",
    "visionFeature": "nâng cao chất lượng các tiêu chí nông thôn mới nâng cao, mở rộng sản xuất lúa thương phẩm theo tiêu chuẩn VietGAP"
  },
  "giai-lac": {
    "historyFeature": "vùng đất nổi tiếng với bàn tay tài hoa của những người thợ xây, thợ nề, thợ mộc đã đi dựng xây công trình trên khắp mọi miền đất nước",
    "geographyFeature": "địa hình đồng bằng phì nhiêu, giao thông kết nối thuận tiện giữa vùng trung tâm Yên Thành với các xã lân cận",
    "economyFeature": "kinh tế kết hợp giữa sản xuất nông nghiệp lúa lai cao sản và nguồn thu lớn từ ngành xây dựng, dịch vụ vận tải vật liệu và thợ thủ công",
    "cultureFeature": "những ngôi nhà khang trang kiên cố mọc lên san sát chứng minh cho sự cần cù, tay nghề khéo léo của người thợ xây dựng quê hương",
    "visionFeature": "thành lập các hợp tác xã xây dựng và kiến trúc chuyên nghiệp, đẩy mạnh đào tạo nghề cho thanh niên và chỉnh trang cảnh quan nông thôn hiện đại"
  },
  "hop-minh": {
    "historyFeature": "cửa ngõ giao thương chiến lược nối Yên Thành với huyện Đô Lương và Diễn Châu, người dân nhạy bén trong nắm bắt thị trường buôn bán",
    "geographyFeature": "tiếp giáp các trục giao thông liên huyện, địa hình đồng bằng xen đồi gò thấp, nguồn nước tưới dồi dào",
    "economyFeature": "thương mại dịch vụ nhộn nhịp, đại lý bán buôn hàng hóa nông cụ, sơ chế nông sản và phát triển nghề làm bún, bánh phở tươi cung cấp cho các chợ",
    "cultureFeature": "nhịp sống năng động của vùng cửa ngõ huyện lúa, các phong trào văn nghệ quần chúng sôi nổi, tinh thần hiếu học truyền thống",
    "visionFeature": "phát triển thành trung tâm dịch vụ thương mại vệ tinh của huyện, đầu tư cụm tiểu thủ công nghiệp làng nghề tập trung"
  },
  "do-luong": {
    "historyFeature": "trung tâm thương mại lớn nhất vùng tả ngạn sông Lam, gắn với Đền Quả Sơn thờ Uy Minh Vương Lý Nhật Quang - người có công lớn khai mở và cai quản xứ Nghệ thời nhà Lý (Đệ nhị linh từ)",
    "geographyFeature": "nằm ở ngã tư giao lộ Quốc lộ 7 và Quốc lộ 15 huyết mạch, bên bờ bắc dòng sông Lam, có công trình đại thủy nông Bara Đô Lương kỳ vĩ",
    "economyFeature": "đầu mối bán buôn hàng hóa sầm uất với Chợ Sắt Đô Lương nức tiếng; các ngành dịch vụ thương mại, tài chính, giao thông vận tải và công nghiệp chế biến",
    "cultureFeature": "Đền Quả Sơn linh thiêng với Lễ hội Đền Quả Sơn rước thuyền rồng trên sông Lam hoành tráng, Công trình thủy nông Bara Đô Lương; đặc sản bánh đa Đô Lương giòn rụm",
    "visionFeature": "phát triển Đô Lương thành đô thị loại IV và thị xã tương lai, trung tâm kinh tế - thương mại - dịch vụ đầu mối của vùng miền Trung Nghệ An"
  },
  "bach-ha": {
    "historyFeature": "vùng đất có bề dày văn hóa dân gian độc đáo, nổi tiếng với Làng nghề gốm cổ Trù Sơn có lịch sử hàng trăm năm làm nồi đất thủ công nức tiếng khắp nước",
    "geographyFeature": "địa bàn đồi núi thấp xen kẽ đồng bằng, có nguồn đất sét nâu dẻo mịn tự nhiên vô cùng quý giá cho nghề làm gốm thủ công",
    "economyFeature": "sản xuất gốm đất nung Trù Sơn thủ công độc nhất vô nhị (nồi kho cá, ấm sắc thuốc bằng đất), kết hợp trồng lúa, chăn nuôi bò vàng và trồng rừng",
    "cultureFeature": "những lò gốm đỏ lửa đêm ngày, đôi bàn tay thoăn thoắt nặn nồi đất không dùng bàn xoay của các mẹ các chị, nét văn hóa mộc mạc nguyên sơ níu chân du khách",
    "visionFeature": "bảo tồn và phát triển Làng nghề gốm Trù Sơn thành điểm du lịch làng nghề trải nghiệm văn hóa độc đáo, nâng cao giá trị sản phẩm gốm thủ công"
  },
  "bach-ngoc": {
    "historyFeature": "mảnh đất anh hùng ven sông Lam, nơi có Khu di tích lịch sử quốc gia Truông Bồn trên cung đường 15A - biểu tượng bất tử của chủ nghĩa anh hùng cách mạng trong kháng chiến chống Mỹ",
    "geographyFeature": "địa bàn đồi núi uốn lượn ven sông Lam, có tuyến đường huyền thoại 15A chạy qua, cảnh quan non nước trùng điệp linh thiêng",
    "economyFeature": "phát triển du lịch lịch sử về nguồn kết hợp nông nghiệp lúa nước ven bãi bồi sông Lam, kinh tế vườn đồi trang trại và dịch vụ phục vụ du khách hành hương",
    "cultureFeature": "Khu di tích Quốc gia Truông Bồn tưởng niệm 13 liệt sĩ thanh niên xung phong anh dũng hy sinh; tiếng chuông Truông Bồn ngân vang giữa đại ngàn",
    "visionFeature": "xây dựng Truông Bồn thành địa chỉ đỏ giáo dục truyền thống cách mạng tiêu biểu của cả nước, phát triển hạ tầng du lịch sinh thái kết nối ven sông Lam"
  },
  "luong-son": {
    "historyFeature": "vùng đất làng nghề truyền thống nức tiếng, nơi người dân Tràng Sơn lưu giữ bí quyết làm bánh đa vừng đen Đô Lương nức tiếng gần xa",
    "geographyFeature": "địa hình đồng bằng bằng phẳng ven sông Lam, hệ thống giao thông liên xã trải nhựa phẳng phiu, giao thương thuận lợi",
    "economyFeature": "sản xuất bánh đa Đô Lương rắc vừng đen xuất khẩu đi khắp các tỉnh thành và nước ngoài, nghề làm kẹo lạc, kẹo cu đơ, mộc dân dụng và dịch vụ ăn uống",
    "cultureFeature": "hương thơm nồng nàn của vừng đen và tiêu tỏi tại các xưởng tráng bánh đa, nếp sống cần mẫn tháo vát của cư dân làng nghề",
    "visionFeature": "chuẩn hóa quy trình sản xuất bánh đa Đô Lương theo tiêu chuẩn OCOP chất lượng cao, mở rộng thị trường xuất khẩu và xây dựng cụm làng nghề xanh"
  },
  "thuan-trung": {
    "historyFeature": "dải đất phù sa màu mỡ đôi bờ kênh mương Bara, nơi người dân có truyền thống thâm canh lúa nước và nuôi tằm dệt lụa từ ngàn đời",
    "geographyFeature": "địa hình bằng phẳng phì nhiêu, nguồn nước tưới dồi dào quanh năm từ hệ thống kênh chính Bara Đô Lương",
    "economyFeature": "sản xuất lúa thâm canh năng suất cao, chăn nuôi trâu bò thịt vỗ béo, nuôi thả gia cầm thả vườn và các ngành nghề cơ khí nông nghiệp",
    "cultureFeature": "cảnh sắc đồng quê xanh mát yên bình, các phong trào đền ơn đáp nghĩa, tương thân tương ái luôn được phát huy mạnh mẽ",
    "visionFeature": "quy hoạch vùng chăn nuôi an toàn sinh học tập trung, đẩy mạnh cơ giới hóa nông nghiệp và xây dựng nông thôn mới nâng cao kiểu mẫu"
  },
  "van-hien": {
    "historyFeature": "vùng đất bán sơn địa giàu truyền thống cách mạng và hiếu học, người dân có ý chí vươn lên làm giàu mãnh liệt từ đất đồi quê hương",
    "geographyFeature": "địa hình bán sơn địa lượn sóng, nhiều đồi gò thoai thoải xen kẽ các thung lũng trồng lúa nước và hồ đập thủy lợi",
    "economyFeature": "kinh tế vườn đồi với các trang trại trồng cam, chè, bưởi da xanh; trồng rừng keo nguyên liệu và chăn nuôi bò lai Sind",
    "cultureFeature": "không khí trong lành của vùng đồi xanh, các ngôi nhà vườn khang trang, tinh thần hiếu học truyền thống của con em địa phương",
    "visionFeature": "phát triển kinh tế vườn trang trại tuần hoàn, áp dụng tiến bộ kỹ thuật ghép cây ăn trái và hoàn thiện hạ tầng đường bê tông nội đồng"
  },
  "dai-dong": {
    "historyFeature": "trung tâm huyện lỵ Thanh Chương bên bờ sông Lam, nơi khởi phát cuộc biểu tình 'Tiếng trống Tiền Duyên 1930' mở đầu cho cao trào Xô viết Nghệ Tĩnh anh hùng",
    "geographyFeature": "nằm bên dòng sông Lam thơ mộng, có Cầu Dùng huyết mạch nối liền đôi bờ tả hữu, ngã ba giao cắt các tuyến Quốc lộ 46 và đường tỉnh",
    "economyFeature": "trung tâm thương mại, dịch vụ, bán lẻ của cả huyện; chế biến nông sản đặc sản Nhút Thanh Chương, tương nếp, chè búp tươi và vận tải hàng hóa",
    "cultureFeature": "Di tích lịch sử Đền Bạch Mã Thanh Chương, ẩm thực độc đáo 'Nhút Thanh Chương - cá sông Giăng' nức tiếng khắp nước, truyền thống hiếu học 'đất học đất nhút'",
    "visionFeature": "xây dựng đô thị trung tâm văn minh hiện đại, nâng tầm các sản phẩm ẩm thực đặc sản thành thương hiệu quốc gia và phát triển kinh tế ven sông Lam"
  },
  "bich-hao": {
    "historyFeature": "vùng đất cổ Bích Hào danh tiếng có bề dày lịch sử và truyền thống khoa bảng lẫy lừng của xứ Nghệ, nơi sinh thành nhiều vị đại khoa và danh thần",
    "geographyFeature": "trải dài ven bờ sông Lam với dải đất bãi bồi trù phú và những triền đồi chè thoai thoải xanh ngát ngút ngàn",
    "economyFeature": "sản xuất nông nghiệp toàn diện với lúa chất lượng cao, ngô bãi bồi, trồng đồi chè công nghiệp, chăn nuôi trâu bò và nuôi thả cá nước ngọt",
    "cultureFeature": "các di tích nhà thờ dòng họ khoa bảng danh tiếng, nếp sống trọng đạo lý 'tôn sư trọng đạo', tiếng hò Ví, Giặm mộc mạc bên bến sông Lam",
    "visionFeature": "phát huy truyền thống hiếu học, mở rộng diện tích chè sạch VietGAP và xây dựng vùng nông thôn mới nâng cao giàu bản sắc văn hóa"
  },
  "cat-ngan": {
    "historyFeature": "vùng đất Cát Ngạn thơ mộng bên tả ngạn sông Lam, người dân có tinh thần kiên cường khai hoang mở đất và bề dày truyền thống yêu nước",
    "geographyFeature": "địa hình chuyển tiếp từ đồng bằng ven sông lên vùng đồi gò bán sơn địa, nguồn nước dồi dào và khí hậu trong lành",
    "economyFeature": "thế mạnh trồng cam bù Thanh Chương ngọt đậm đà, đồi chè xanh búp mập, trồng rừng keo lai và chăn nuôi bò vàng thả đồi",
    "cultureFeature": "vị ngọt thanh của giống cam bù Cát Ngạn nức tiếng, bát chè xanh om ấm nóng đậm tình quê tiếp đãi khách phương xa",
    "visionFeature": "phục tráng và mở rộng diện tích giống cam bù bản địa, xây dựng chỉ dẫn địa lý và liên kết chuỗi tiêu thụ hoa quả sạch"
  },
  "hanh-lam": {
    "historyFeature": "vùng đất giàu tiềm năng của Thanh Chương, nổi tiếng cả nước với thắng cảnh Đảo chè Cầu Cau - biểu tượng cảnh quan du lịch sinh thái độc đáo của tỉnh Nghệ An",
    "geographyFeature": "quần thể hồ nước ngọt nhân tạo Cầu Cau với hàng chục 'đảo chè' nhô lên giữa làn nước trong xanh biếc như ngọc bích, cảnh quan đẹp tựa tranh họa đồ",
    "economyFeature": "đột phá với du lịch sinh thái thuyền khám phá đảo chè thu hút đông đảo du khách; kết hợp sản xuất chè búp tươi quy mô lớn và kinh tế lâm nghiệp",
    "cultureFeature": "thắng cảnh Đảo chè Cầu Cau được mệnh danh là 'vịnh Hạ Long trên cạn xứ Nghệ', trải nghiệm đi thuyền giữa những ốc đảo chè bậc thang ngát hương",
    "visionFeature": "quy hoạch Khu du lịch sinh thái Đảo chè Cầu Cau thành điểm đến tầm cỡ quốc gia, phát triển các dịch vụ nghỉ dưỡng sinh thái cao cấp gắn với bảo vệ môi trường"
  },
  "hoa-quan": {
    "historyFeature": "vùng đất phù sa bãi bồi ven sông Lam, người dân cần cù lao động, kiên cường chống chọi với lũ lụt hàng năm để bám đất giữ làng",
    "geographyFeature": "dải bãi bồi màu mỡ được bồi đắp hàng năm bởi phù sa sông Lam, đất đai tơi xốp vô cùng thích hợp cho các loại cây màu ngắn ngày",
    "economyFeature": "chuyên canh ngô sinh khối, lạc, đậu, dâu tằm, rau màu thực phẩm chất lượng cao cung cấp cho các chợ đầu mối; chăn nuôi bò thịt vỗ béo",
    "cultureFeature": "nhịp điệu lao động tất bật trên những bãi bồi xanh mướt ngô khoai, tình làng nghĩa xóm gắn kết keo sơn trong mùa nước nổi",
    "visionFeature": "phát triển vùng chuyên canh rau củ an toàn ứng dụng công nghệ tưới tự động, mở rộng chăn nuôi bò thịt an toàn sinh học"
  },
  "kim-bang": {
    "historyFeature": "vùng đất giàu truyền thống hiếu học và cách mạng, nơi các thế hệ cư dân luôn nêu cao tinh thần tự lực tự cường vượt khó vươn lên",
    "geographyFeature": "địa bàn đồng bằng xen đồi gò thấp, hệ thống kênh thủy lợi nội đồng thông suốt, giao thông nông thôn hoàn chỉnh",
    "economyFeature": "canh tác lúa nước năng suất cao, nghề đan lát nón lá truyền thống, chăn nuôi gà đồi thả vườn và tiểu thủ công nghiệp cơ khí gia dụng",
    "cultureFeature": "làng nghề nón lá tinh xảo che mát ngày hè, những dòng họ hiếu học nhiều đời nuôi dạy con cháu đỗ đạt thành tài",
    "visionFeature": "bảo tồn và phát triển nghề làm nón lá truyền thống kết hợp du lịch trải nghiệm, hỗ trợ vốn phát triển kinh tế hộ gia đình"
  },
  "son-lam": {
    "historyFeature": "vùng đất đồi núi cao phía tây giáp biên giới Việt - Lào, nơi người dân kiên cường bám bản bám rừng giữ vững chủ quyền biên cương Tổ quốc",
    "geographyFeature": "địa hình đồi núi dốc, rừng tự nhiên bạt ngàn tiếp giáp vùng đệm Vườn quốc gia Pù Mát, nhiều khe suối trong lành",
    "economyFeature": "kinh tế lâm nghiệp bền vững với rừng gỗ lớn (keo, mỡ, xoan), trồng cây cao su tiểu điền, chăn nuôi trâu bò thả đồi và khai thác lâm sản phụ hợp pháp",
    "cultureFeature": "cảnh sắc đại ngàn hoang sơ hùng vĩ, đời sống thanh bình của đồng bào các dân tộc thiểu số và người Kinh đoàn kết, lễ hội cồng chiêng rộn rã",
    "visionFeature": "quản lý và bảo vệ rừng đầu nguồn nghiêm ngặt, phát triển vùng nguyên liệu gỗ rừng trồng gắn với cấp chứng chỉ rừng bền vững"
  },
  "tam-dong": {
    "historyFeature": "vùng bán sơn địa trù phú, nơi có đặc sản quả trám đen Thanh Chương thơm bùi tiến vua nổi tiếng ngàn đời",
    "geographyFeature": "địa hình bán sơn địa lượn sóng, đất đỏ vàng feralit thích hợp cho các loài cây thân gỗ lâu năm và cây ăn quả đặc sản",
    "economyFeature": "kinh tế vườn đồi với cây trám đen Thanh Chương cho giá trị kinh tế rất cao, bưởi hồng, đồi chè xanh và trang trại chăn nuôi bò vàng",
    "cultureFeature": "mùa thu hoạch trám đen rộn ràng khắp xóm làng, món trám đen kho thịt, xôi trám thơm béo đậm đà khó quên của ẩm thực xứ Nghệ",
    "visionFeature": "mở rộng diện tích trồng cây trám đen ghép lấy quả, xây dựng thương hiệu OCOP cho quả trám đen Thanh Chương và phát triển trang trại sinh thái"
  },
  "xuan-lam": {
    "historyFeature": "vùng đất tiếp giáp đường Hồ Chí Minh huyền thoại, người dân giàu lòng yêu nước, là hậu phương vững chắc chi viện cho chiến trường xưa",
    "geographyFeature": "nằm trên trục đường Hồ Chí Minh và dòng sông Giăng, địa thế thuận lợi giao thương hàng hóa giữa miền núi và đồng bằng",
    "economyFeature": "trồng rừng keo nguyên liệu quy mô lớn, các xưởng chế biến dăm gỗ xuất khẩu, trồng chè công nghiệp và trang trại nông lâm kết hợp",
    "cultureFeature": "cảnh sắc núi rừng xanh ngắt dọc đường Hồ Chí Minh, không khí trong lành, sự cởi mở mến khách của người dân miền đất đỏ",
    "visionFeature": "thu hút doanh nghiệp chế biến sâu gỗ rừng trồng, phát triển kinh tế trang trại theo chuỗi giá trị và hoàn thiện giao thông liên vùng"
  },
  "nghi-loc": {
    "historyFeature": "trung tâm huyện lỵ Nghi Lộc trên trục Quốc lộ 1A lịch sử, gắn với mảnh đất anh hùng và công cuộc công nghiệp hóa bứt phá mạnh mẽ",
    "geographyFeature": "nằm kề ngã tư giao lộ Quốc lộ 1A và đường sắt Bắc Nam, tiếp giáp trực tiếp Khu công nghiệp WHA Industrial Zone 1 hiện đại",
    "economyFeature": "trung tâm công nghiệp và đô thị năng động bậc nhất tỉnh; thu hút hàng loạt dự án công nghệ cao FDI (linh kiện điện tử, cơ khí, may mặc); thương mại dịch vụ sầm uất",
    "cultureFeature": "nhịp sống đô thị công nghiệp sôi động, các thiết chế văn hóa thể thao được đầu tư đồng bộ, truyền thống cần cù hiếu học của đất học Nghi Lộc",
    "visionFeature": "phát triển thành đô thị công nghiệp dịch vụ kiểu mẫu, trung tâm logistics hiện đại của Khu kinh tế Đông Nam Nghệ An"
  },
  "hai-loc": {
    "historyFeature": "vùng biển cảng nước sâu chiến lược của tỉnh, nơi ghi dấu các chiến công đánh trả máy bay, tàu chiến địch phong tỏa đường biển trong chiến tranh",
    "geographyFeature": "ôm trọn mũi đất nhô ra biển Đông với độ sâu luồng hàng hải lý tưởng, có Cảng biển quốc tế Vissai đón tàu tải trọng hàng vạn tấn",
    "economyFeature": "kinh tế cảng biển nước sâu, vận tải biển quốc tế, Tổng kho xăng dầu DKC lớn nhất Bắc Trung Bộ; du lịch biển hoang sơ tại bãi tắm Bãi Tiền",
    "cultureFeature": "hình ảnh những con tàu chở hàng quốc tế neo đậu uy nghi, cảnh bình minh rực rỡ trên biển Bãi Tiền, đời sống phóng khoáng của cư dân miền biển",
    "visionFeature": "trở thành trung tâm cảng biển nước sâu và dịch vụ logistics cảng biển lớn của miền Trung, phát triển du lịch biển sinh thái cao cấp"
  },
  "than-linh": {
    "historyFeature": "mảnh đất địa linh nhân kiệt nức tiếng, nơi có Đền thờ Thái sư Cương Quốc công Nguyễn Xí (di tích quốc gia đặc biệt) - danh tướng kiệt xuất của khởi nghĩa Lam Sơn",
    "geographyFeature": "nằm ở trung tâm đồng bằng ven biển Nghi Lộc, địa thế đất đẹp phong thủy hài hòa, giao thông kết nối thông suốt ra biển và lên quốc lộ",
    "economyFeature": "sản xuất nông nghiệp công nghệ cao, phát triển tiểu thủ công nghiệp phụ trợ KCN Nam Cấm và dịch vụ văn hóa tâm linh đón khách chiêm bái",
    "cultureFeature": "Đền thờ Nguyễn Xí với kiến trúc cổ kính tráng lệ hàng trăm năm tuổi, Lễ hội Đền Nguyễn Xí linh thiêng trang trọng thu hút đông đảo hậu duệ và du khách",
    "visionFeature": "bảo tồn và tôn tạo Di tích Quốc gia đặc biệt Đền Nguyễn Xí, phát triển du lịch lịch sử văn hóa và xây dựng vùng nông thôn mới kiểu mẫu"
  },
  "phuc-loc": {
    "historyFeature": "vùng đất đồng bằng trù phú với truyền thống thâm canh lúa lạc và các làng nghề ẩm thực truyền thống danh tiếng phục vụ đời sống nhân dân",
    "geographyFeature": "địa hình đồng bằng bằng phẳng, mạng lưới giao thông liên xã kết nối nhanh chóng với thành phố Vinh và thị xã Cửa Lò",
    "economyFeature": "chuyên canh lạc xuất khẩu, lúa giống chất lượng cao, các làng nghề làm giò chả, bánh chưng truyền thống cung cấp cho thị trường toàn tỉnh",
    "cultureFeature": "hương vị thơm ngon nức tiếng của giò chả, bánh chưng quê nhà trong các dịp lễ tết, tinh thần đoàn kết tình làng nghĩa xóm",
    "visionFeature": "xây dựng thương hiệu OCOP cho các sản phẩm giò chả bánh chưng truyền thống, phát triển nông nghiệp hàng hóa ứng dụng công nghệ tưới tiết kiệm"
  },
  "trung-loc": {
    "historyFeature": "vùng đất giàu truyền thống cách mạng nằm ở lõi trung tâm huyện, nơi cư dân luôn gương mẫu trong các phong trào thi đua yêu nước",
    "geographyFeature": "địa hình đồng bằng xen đồi gò thấp, nằm trong quy hoạch không gian mở rộng của Khu kinh tế Đông Nam Nghệ An",
    "economyFeature": "kinh tế kết hợp giữa nông nghiệp thâm canh và các cơ sở công nghiệp chế biến, kho bãi thương mại, giải quyết việc làm cho lao động trẻ",
    "cultureFeature": "nếp sống nông thôn văn minh đổi mới, các thiết chế nhà văn hóa thôn xóm khang trang, phong trào thể dục thể thao rèn luyện sức khỏe sôi nổi",
    "visionFeature": "đón đầu làn sóng đầu tư công nghiệp sạch của Khu kinh tế Đông Nam, đào tạo nghề chất lượng cao cho lao động nông thôn"
  },
  "van-kieu": {
    "historyFeature": "vùng bán sơn địa thơ mộng với những cánh rừng thông xanh ngắt và các hồ thủy lợi trữ nước ngọt nuôi dưỡng mùa màng",
    "geographyFeature": "địa hình đồi bát úp lượn sóng, có hồ chứa nước Khe Thưng và rừng thông reo vi vu tạo cảnh quan sinh thái thoáng mát",
    "economyFeature": "kinh tế vườn đồi trang trại với cây ăn quả có múi, đồi chè, trồng rừng keo nguyên liệu và chăn nuôi bò thịt an toàn sinh học",
    "cultureFeature": "không khí trong lành của hồ Khe Thưng thu hút các bạn trẻ dã ngoại cắm trại, vẻ đẹp thanh bình của làng quê miền đồi",
    "visionFeature": "phát triển mô hình trang trại sinh thái kết hợp du lịch trải nghiệm, bảo vệ cảnh quan rừng phòng hộ và nguồn nước hồ Khe Thưng"
  },
  "dong-loc": {
    "historyFeature": "cửa ngõ nối liền thành phố Vinh và đô thị du lịch Cửa Lò, nơi diễn ra tốc độ đô thị hóa nhanh chóng và mạnh mẽ nhất huyện",
    "geographyFeature": "nằm hai bên trục Đại lộ Vinh - Cửa Lò rộng lớn hiện đại bậc nhất tỉnh, vị trí vàng kết nối trung tâm tỉnh lỵ ra bờ biển",
    "economyFeature": "phát triển bùng nổ các dịch vụ thương mại, showroom, nhà hàng, kho bãi logistics và các dự án khu đô thị sinh thái mới",
    "cultureFeature": "sự hòa quyện giữa nếp sống làng quê truyền thống và nhịp sống đô thị hiện đại, các khu dân cư mới văn minh xanh sạch",
    "visionFeature": "trở thành dải đô thị dịch vụ thương mại hiện đại của thành phố Vinh mở rộng, hoàn thiện hạ tầng kỹ thuật đồng bộ"
  },
  "tan-ky": {
    "historyFeature": "trung tâm huyện Tân Kỳ bên bờ sông Con hiền hòa, nơi ghi dấu di tích lịch sử Quốc gia đặc biệt Cột mốc Km số 0 - Điểm khởi đầu của đường Hồ Chí Minh huyền thoại",
    "geographyFeature": "nằm bên dòng sông Con, giao lộ huyết mạch giữa Quốc lộ 48E và đường Hồ Chí Minh xuyên Việt, địa thế bằng phẳng giữa thung lũng",
    "economyFeature": "trung tâm thương mại, dịch vụ, bán lẻ của cả huyện; phát triển công nghiệp chế biến nông sản, mía đường, gạch ngói và vận tải hàng hóa",
    "cultureFeature": "Cột mốc Km số 0 Đường Hồ Chí Minh linh thiêng - biểu tượng ý chí 'Xẻ dọc Trường Sơn đi cứu nước'; Lễ hội kỷ niệm ngày mở đường Trường Sơn hào hùng",
    "visionFeature": "xây dựng đô thị trung tâm huyện Tân Kỳ văn minh hiện đại, phát triển du lịch lịch sử về nguồn Km số 0 và thương mại dịch vụ đường mòn Hồ Chí Minh"
  },
  "giai-xuan": {
    "historyFeature": "vùng đất có bề dày văn hóa dân tộc độc đáo, nơi đồng bào dân tộc Thổ sinh sống ngàn đời gìn giữ những phong tục tập quán cổ truyền quý báu",
    "geographyFeature": "địa hình núi đá vôi karst kỳ vĩ xen thung lũng, có Hang Mó huyền bí và mỏ suối nước khoáng nóng Tân Hợp quý giá",
    "economyFeature": "kinh tế vườn đồi, trồng mía nguyên liệu, sắn cao sản, khai thác tiềm năng suối nước khoáng nóng và du lịch sinh thái cộng đồng",
    "cultureFeature": "không gian văn hóa cồng chiêng, hát đu đu điểng điểng của đồng bào Thổ, Lễ hội Hang Mó đầu xuân, ẩm thực cơm lam, cá nướng thơm lừng",
    "visionFeature": "thu hút đầu tư phát triển Khu nghỉ dưỡng suối khoáng nóng Tân Hợp, bảo tồn không gian văn hóa cồng chiêng đồng bào Thổ"
  },
  "nghia-dong": {
    "historyFeature": "vùng đất đỏ bazan trù phú, nơi người dân có truyền thống thâm canh cây công nghiệp và tinh thần cần cù vượt khó vươn lên làm giàu",
    "geographyFeature": "địa hình đồi gò bát úp thoải với tầng đất đỏ bazan dày, hệ thống giao thông đường bê tông nội đồng kiên cố",
    "economyFeature": "thủ phủ trồng mía nguyên liệu cung cấp cho các nhà máy đường, sắn cao sản, đồi keo tràm và chăn nuôi bò thịt thương phẩm",
    "cultureFeature": "nhịp điệu lao động sôi động trong mùa thu hoạch mía đường, sự gắn bó keo sơn giữa đồng bào các dân tộc anh em trên địa bàn",
    "visionFeature": "chuyển đổi giống mía đường cao sản năng suất cao, áp dụng cơ giới hóa thu hoạch và nâng cao hiệu quả kinh tế vườn đồi"
  },
  "nghia-hanh": {
    "historyFeature": "vùng đất đồi rừng rộng lớn phía tây huyện, nơi lưu giữ những cánh rừng tự nhiên xanh ngắt và tinh thần bảo vệ rừng của người dân",
    "geographyFeature": "địa hình đồi núi dốc thoải, nhiều khe suối mát lành, thảm thực vật rừng phong phú che chở xóm làng",
    "economyFeature": "kinh tế lâm nghiệp bền vững với rừng keo lai gỗ lớn, các trang trại chăn nuôi lợn thịt tập trung quy mô lớn và trồng cây dược liệu",
    "cultureFeature": "cảnh sắc núi rừng thanh bình, không khí mát mẻ trong lành, nét văn hóa mộc mạc chân chất của đồng bào miền núi",
    "visionFeature": "mở rộng diện tích rừng trồng gỗ lớn có chứng chỉ FSC, kiểm soát chặt chẽ vệ sinh môi trường chăn nuôi trang trại"
  },
  "tan-an": {
    "historyFeature": "vùng đất có sự giao thoa văn hóa đặc sắc giữa người Kinh và đồng bào dân tộc Thổ, tạo nên nếp sống đoàn kết thương yêu đùm bọc lẫn nhau",
    "geographyFeature": "địa hình đồi núi thấp xen thung lũng lúa nước, nằm cạnh các trục đường liên xã thông thoáng đi trung tâm huyện",
    "economyFeature": "sản xuất mía nguyên liệu, lúa nước thung lũng, nghề dệt thổ cẩm truyền thống của phụ nữ dân tộc Thổ và chăn nuôi gia súc thả đồi",
    "cultureFeature": "những tấm vải thổ cẩm rực rỡ hoa văn tinh xảo, điệu múa cồng chiêng rộn rã trong các dịp lễ hội mừng lúa mới của bản làng",
    "visionFeature": "bảo tồn và phát triển nghề dệt thổ cẩm truyền thống thành sản phẩm du lịch OCOP, nâng cao thu nhập cho phụ nữ vùng cao"
  },
  "tan-phu": {
    "historyFeature": "vùng đất trù phú với phong trào cải tạo vườn tạp thành vườn cây ăn quả kiểu mẫu, người dân tiên phong đưa giống cây đặc sản về đồi quê",
    "geographyFeature": "địa hình bán sơn địa với đất đồi feralit màu mỡ, nguồn nước tưới từ các hồ thủy lợi nhỏ trên địa bàn dồi dào",
    "economyFeature": "thế mạnh vượt trội với cây bưởi Diễn Tân Kỳ trĩu quả ngọt thơm, cam bù, ổi lê và trang trại chăn nuôi gia cầm quy mô lớn",
    "cultureFeature": "vườn bưởi trĩu quả vàng óng mùa thu hoạch thu hút thương lái khắp nơi, nếp sống văn minh và các gia đình văn hóa tiêu biểu",
    "visionFeature": "xây dựng thương hiệu 'Bưởi Tân Phú' đạt chuẩn OCOP 4 sao, nhân rộng mô hình kinh tế vườn đồi nông nghiệp sạch"
  },
  "tien-dong": {
    "historyFeature": "vùng đất sơn thủy hữu tình nổi tiếng với thắng cảnh Thác Hồng Sơn hùng vĩ, nơi dòng nước trắng xóa đổ từ vách đá giữa rừng đại ngàn",
    "geographyFeature": "địa hình đồi núi cao xen kẽ thung lũng, có Thác Hồng Sơn và hồ thủy lợi Khe Thần tạo cảnh quan thiên nhiên tuyệt mỹ",
    "economyFeature": "kinh tế nông lâm kết hợp, trồng rừng gỗ lớn, chăn nuôi đại gia súc và tiềm năng phát triển du lịch sinh thái dã ngoại Thác Hồng Sơn",
    "cultureFeature": "thắng cảnh Thác Hồng Sơn hoang sơ kỳ vĩ đổ bọt trắng xóa giữa rừng cây, không khí mát lạnh xua tan nắng hè gay gắt",
    "visionFeature": "kêu gọi đầu tư phát triển Khu du lịch sinh thái Thác Hồng Sơn - Hồ Khe Thần, giữ gìn nguyên vẹn cảnh quan rừng tự nhiên"
  },
  "dong-hieu": {
    "historyFeature": "vùng đất tiếp giáp thị xã Thái Hòa, nơi có các nông trường cao su lâu đời gắn với nhiều thế hệ công nhân nông trường cần lao",
    "geographyFeature": "địa thế bằng phẳng trên cao nguyên đất đỏ, nằm trên tuyến giao thông huyết mạch kết nối Tân Kỳ với Thái Hòa",
    "economyFeature": "khai thác và sơ chế mủ cao su, trồng cây ăn quả có múi, kinh doanh vật liệu xây dựng và phát triển dịch vụ thương mại vệ tinh",
    "cultureFeature": "nếp sống công nghiệp nền nếp của công nhân cao su, những con đường rợp bóng cây cao su thay lá lãng mạn như tranh",
    "visionFeature": "phát triển thương mại dịch vụ ven trục giao thông chính, nâng cao năng suất vườn cây cao su và đa dạng hóa cây trồng"
  },
  "nghia-dan": {
    "historyFeature": "trung tâm cao nguyên đất đỏ Phủ Quỳ lịch sử, thủ phủ của các dự án chăn nuôi bò sữa công nghệ cao quy mô lớn bậc nhất châu Á",
    "geographyFeature": "tọa lạc trên vùng cao nguyên đất đỏ bazan màu mỡ, địa hình đồi lượn sóng thoai thoải, khí hậu ôn hòa mát mẻ",
    "economyFeature": "trung tâm của cụm trang trại bò sữa và chế biến sữa TH True Milk quy mô kỷ lục; Cánh đồng hoa hướng dương ngút ngàn thu hút hàng triệu du khách",
    "cultureFeature": "Lễ hội Hoa Hướng Dương rực rỡ sắc vàng mênh mông, thương hiệu sữa tươi sạch TH True Milk vươn tầm quốc tế, nếp sống đô thị hiện đại",
    "visionFeature": "phát triển thành trung tâm nông nghiệp công nghệ cao và du lịch sinh thái nông nghiệp tiêu biểu của cả nước"
  },
  "nghia-hung": {
    "historyFeature": "vùng đất đỏ bazan trù phú gắn với các nhà máy chế biến nông sản lớn, người dân hăng say lao động trên các cánh đồng mía đường",
    "geographyFeature": "địa hình đồi thoai thoải, đất đai phì nhiêu, giao thông kết nối trực tiếp với Nhà máy Đường NASU và đường Hồ Chí Minh",
    "economyFeature": "chuyên canh mía đường nguyên liệu cung cấp cho nhà máy đường NASU, trồng cam Phủ Quỳ lòng vàng, chăn nuôi bò sữa vệ tinh",
    "cultureFeature": "những chuyến xe chở mía đường tấp nập vào vụ ép, vị ngọt ngào của đường mía và hương cam chín nức lòng người",
    "visionFeature": "áp dụng giống mía mới chịu hạn năng suất cao, cơ giới hóa đồng bộ thu hoạch mía và mở rộng cây ăn trái VietGAP"
  },
  "nghia-khanh": {
    "historyFeature": "vùng đất trù phú bên hồ thủy lợi Sông Sào kỳ vĩ - công trình thủy lợi lớn thứ hai của tỉnh Nghệ An cung cấp nguồn nước ngọt mát lành",
    "geographyFeature": "ôm trọn lòng hồ Sông Sào mênh mông nước biếc, cảnh quan sơn thủy hữu tình với những hòn đảo nhỏ nhấp nhô giữa mặt hồ",
    "economyFeature": "canh tác lúa chất lượng cao, nuôi cá lồng bè trên hồ Sông Sào (cá lăng, cá trắm giòn), trồng cam sạch và phát triển du lịch sinh thái hồ",
    "cultureFeature": "phong cảnh thơ mộng hữu tình của hồ Sông Sào mỗi buổi hoàng hôn, đặc sản cá lòng hồ tươi ngon nức tiếng",
    "visionFeature": "phát triển du lịch sinh thái dã ngoại ngắm cảnh hồ Sông Sào, bảo vệ nguồn nước sạch và phát triển nghề nuôi cá lồng bè an toàn"
  },
  "nghia-lam": {
    "historyFeature": "vùng đất bán sơn địa đồi rừng rộng lớn, nơi cộng đồng các dân tộc cùng nhau khai hoang phủ xanh đất trống đồi núi trọc",
    "geographyFeature": "địa hình đồi lượn sóng, đất đỏ bazan xen đất feralit, không gian thoáng đãng thích hợp cho các trang trại chăn nuôi lớn",
    "economyFeature": "chăn nuôi bò sữa tập trung công nghệ cao, trang trại dê núi thả đồi, trồng cỏ voi VA06 và kinh tế rừng trồng keo nguyên liệu",
    "cultureFeature": "những đồng cỏ xanh mướt ngút tầm mắt cho đàn bò sữa gặm cỏ, không khí trong lành của vùng cao nguyên thanh bình",
    "visionFeature": "mở rộng diện tích đồng cỏ nguyên liệu phục vụ công nghiệp chế biến sữa, nâng cao hiệu quả kinh tế rừng trồng"
  },
  "nghia-loc": {
    "historyFeature": "vùng đất đỏ bazan màu mỡ với truyền thống trồng cây công nghiệp dài ngày cao su, cà phê từ thời các nông trường lịch sử",
    "geographyFeature": "cao nguyên đất bazan màu mỡ tầng dày, thoát nước tốt, thích hợp lý tưởng cho các loài cây ăn trái và cây công nghiệp",
    "economyFeature": "vùng chuyên canh bưởi da xanh Nghĩa Đàn, cam VietGAP lòng vàng ngọt đậm, mủ cao su và hồ tiêu sinh thái",
    "cultureFeature": "vườn cây trái sum suê trĩu quả quanh năm, sự mến khách nồng hậu của các chủ trang trại nhà vườn đất đỏ",
    "visionFeature": "xây dựng chuỗi liên kết thương hiệu bưởi da xanh và cam Nghĩa Lộc, phát triển mô hình du lịch trải nghiệm nhà vườn"
  },
  "nghia-mai": {
    "historyFeature": "vùng đất giáp ranh tỉnh Thanh Hóa, nơi giao thoa văn hóa giữa hai miền quê và tinh thần đoàn kết thắt chặt giữa các cộng đồng dân cư",
    "geographyFeature": "địa hình đồi núi thấp, nguồn tài nguyên đất đai rộng lớn, mạng lưới đường liên huyện kết nối nhanh sang huyện Như Xuân (Thanh Hóa)",
    "economyFeature": "trồng rừng keo gỗ lớn, mía đường nguyên liệu, chăn nuôi đại gia súc và các mô hình kinh tế trang trại tuần hoàn nông lâm kết hợp",
    "cultureFeature": "nếp sống mộc mạc chan hòa của đồng bào các dân tộc vùng giáp ranh, tinh thần tương trợ lẫn nhau trong sản xuất",
    "visionFeature": "bảo vệ và phát triển rừng sản xuất bền vững, thu hút đầu tư các xưởng sơ chế gỗ và hoàn thiện hạ tầng giao thông kết nối liên tỉnh"
  },
  "nghia-tho": {
    "historyFeature": "thủ phủ của giống cam Nghĩa Đàn nức tiếng (cam Xã Đoài lòng vàng, cam V2), nơi những người nông dân tài hoa tạo nên những mùa vàng bội thu",
    "geographyFeature": "địa hình đồi bát úp thoai thoải, khí hậu có sự chênh lệch nhiệt độ ngày đêm giúp quả cam tích tụ lượng đường ngọt đậm đà",
    "economyFeature": "chuyên canh cam chất lượng cao theo tiêu chuẩn VietGAP và hữu cơ, cung ứng cho hệ thống siêu thị lớn trên toàn quốc; trồng bưởi ngọt và ổi",
    "cultureFeature": "hương thơm ngào ngạt của hoa cam mùa xuân và sắc vàng rực rỡ của những đồi cam trĩu quả mùa thu hoạch, niềm tự hào nông sản quê hương",
    "visionFeature": "xây dựng vùng cam hữu cơ kiểu mẫu, đẩy mạnh chế biến sâu tinh dầu cam, rượu cam và đưa sản phẩm cam Nghĩa Đàn lên sàn thương mại điện tử"
  },
  "anh-son": {
    "historyFeature": "trung tâm huyện Anh Sơn bên bờ hữu ngạn sông Lam, nơi có Nghĩa trang Liệt sĩ Quốc tế Việt - Lào - nơi yên nghỉ của hơn 11.000 liệt sĩ quân tình nguyện và chuyên gia Việt Nam hy sinh trên chiến trường nước bạn Lào",
    "geographyFeature": "nằm bên dòng sông Lam thơ mộng, trên trục Quốc lộ 7 huyết mạch nối miền xuôi lên cửa khẩu Nậm Cắn, địa thế bằng phẳng trù phú",
    "economyFeature": "trung tâm chính trị, thương mại, dịch vụ của huyện; chế biến nông sản, chè gay, gỗ rừng trồng và các cơ sở kinh doanh phục vụ du khách hành hương",
    "cultureFeature": "Nghĩa trang Liệt sĩ Quốc tế Việt - Lào trang nghiêm thiêng liêng - biểu tượng của tình đoàn kết liên minh chiến đấu sắt son giữa hai dân tộc; đặc sản chè gay Anh Sơn",
    "visionFeature": "xây dựng đô thị thị trấn Anh Sơn văn minh sinh thái, nâng tầm Nghĩa trang Liệt sĩ Quốc tế Việt - Lào thành địa chỉ đỏ tri ân lịch sử quốc gia"
  },
  "anh-son-dong": {
    "historyFeature": "vùng đất bãi bồi phù sa trù phú đôi bờ sông Lam, người dân có truyền thống thâm canh cây màu và đồi chè bát ngát",
    "geographyFeature": "trải dài ven sông Lam hữu ngạn với dải đất bãi bồi màu mỡ, được bồi đắp lượng phù sa dồi dào hàng năm",
    "economyFeature": "chuyên canh ngô bãi bồi, lạc xuân, đồi chè gay xanh mướt cho vị chè chát ngọt đậm đà, chăn nuôi bò thịt vỗ béo",
    "cultureFeature": "ấm chè xanh om nghi ngút khói đậm vị chè gay đặc sản, tình làng nghĩa xóm gắn bó keo sơn bên dòng sông quê",
    "visionFeature": "xây dựng vùng sản xuất chè an toàn tiêu chuẩn OCOP, mở rộng diện tích ngô sinh khối phục vụ chăn nuôi bò sữa"
  },
  "nhan-hoa": {
    "historyFeature": "vùng đất đồi chè Phúc Thọ danh tiếng, nơi bàn tay cần cù của người nông dân đã biến những triền đồi đất bạc màu thành những đồi chè xanh mướt",
    "geographyFeature": "địa hình bán sơn địa lượn sóng, có hệ thống hồ đập thủy lợi nhỏ trữ nước ngọt tưới tiêu cho cây trồng",
    "economyFeature": "sản xuất và chế biến chè búp tươi chất lượng cao, trồng cây ăn quả có múi, kinh tế rừng keo lai và chăn nuôi gia cầm thả vườn",
    "cultureFeature": "cảnh sắc những đồi chè bát úp xanh mướt uốn lượn như dải lụa mềm, nếp làng nông thôn mới thanh bình kiểu mẫu",
    "visionFeature": "nâng cao chất lượng chế biến chè búp xuất khẩu, phát triển mô hình du lịch sinh thái nông nghiệp đồi chè"
  },
  "thanh-binh-tho": {
    "historyFeature": "vùng đất bán sơn địa ven sông Lam có nhiều hang động karst kỳ thú và làng cổ truyền thống bình yên",
    "geographyFeature": "địa hình kết hợp giữa dải đồng bằng ven sông và các dãy núi đá vôi thấp, cảnh quan sơn thủy hữu tình",
    "economyFeature": "thâm canh lúa nước, rau màu an toàn, trang trại chăn nuôi bò sữa tập trung và nghề khai thác chế biến đá xây dựng hợp pháp",
    "cultureFeature": "những hang động đá vôi tự nhiên gắn với truyền thuyết bản địa, nếp sống thuần hậu mộc mạc của cư dân nông thôn",
    "visionFeature": "phát triển nông nghiệp hữu cơ sạch, kiểm soát chặt chẽ khai thác khoáng sản gắn với bảo vệ cảnh quan môi trường"
  },
  "vinh-tuong": {
    "historyFeature": "vùng đất có di tích Đền Cửa Lũy linh thiêng trên sườn non, căn cứ phòng thủ hiểm yếu thời nghĩa quân Lam Sơn và phong trào Cần Vương",
    "geographyFeature": "địa thế bán sơn địa hiểm trở tựa lưng vào núi cao nhìn ra thung lũng, có các khe suối trong lành",
    "economyFeature": "kinh tế vườn đồi, trồng rừng keo nguyên liệu, trồng chè công nghiệp và trang trại chăn nuôi đại gia súc",
    "cultureFeature": "Đền Cửa Lũy cổ kính linh thiêng đón nhân dân cầu an, tinh thần kiên cường của người dân miền bán sơn địa",
    "visionFeature": "tôn tạo di tích lịch sử Đền Cửa Lũy, mở rộng diện tích rừng trồng gỗ lớn và hoàn thiện hạ tầng giao thông liên thôn"
  },
  "yen-xuan": {
    "historyFeature": "cửa ngõ phía đông huyện Anh Sơn nối liền với Thanh Chương qua Cầu Cây Chanh, trung tâm giao lưu buôn bán của vùng",
    "geographyFeature": "nằm trên trục Quốc lộ 7 kết nối đường Hồ Chí Minh, địa hình đồi núi thấp xen thung lũng lúa nước",
    "economyFeature": "buôn bán nông lâm sản, các xưởng chế biến gỗ xẻ, may mặc gia công và sản xuất nông nghiệp hàng hóa",
    "cultureFeature": "nhịp sống năng động của vùng giao thương ngã ba đường, tinh thần hiếu học và đoàn kết cộng đồng",
    "visionFeature": "phát triển cụm tiểu thủ công nghiệp dịch vụ Cây Chanh, thu hút doanh nghiệp chế biến nông lâm sản"
  },
  "con-cuong": {
    "historyFeature": "thị trấn Con Cuông bên bờ sông Lam, gắn với địa danh Trà Lân lịch sử trong Bình Ngô đại cáo của Nguyễn Trãi ('Miền Trà Lân trúc chẻ tro bay') đánh tan quân Minh xâm lược",
    "geographyFeature": "nằm ở trung tâm Khu dự trữ sinh quyển thế giới miền Tây Nghệ An, bên bờ sông Lam thơ mộng, trên trục Quốc lộ 7 huyết mạch",
    "economyFeature": "trung tâm du lịch sinh thái và văn hóa miền Tây Nghệ An; dịch vụ thương mại, khách sạn, nhà hàng và chế biến nông lâm sản",
    "cultureFeature": "Bia đá ma nhai khắc trên vách núi Thành Nam thời vua Trần Minh Tông; nét văn hóa giao thoa Kinh - Thái - Đan Lai, ẩm thực cá mát sông Giăng, canh bồi, cơm lam",
    "visionFeature": "xây dựng đô thị du lịch sinh thái rừng núi đặc sắc của Bắc Trung Bộ, cửa ngõ kết nối khám phá Vườn quốc gia Pù Mát"
  },
  "mon-son": {
    "historyFeature": "vùng lõi Vườn quốc gia Pù Mát, nơi có dòng sông Giăng xanh ngắt và là nơi cư trú duy nhất của tộc người 'ngủ ngồi' Đan Lai độc đáo nhất Việt Nam",
    "geographyFeature": "địa hình rừng nguyên sinh đại ngàn Pù Mát, có Thác Khe Kèm kỳ vĩ đổ từ độ cao 500m trắng xóa và dòng sông Giăng ngọc bích",
    "economyFeature": "đột phá với du lịch sinh thái cộng đồng bản Yên Thành, đi thuyền ngược dòng sông Giăng, khám phá Thác Kèm, đập Phà Lài; bảo vệ rừng nguyên sinh",
    "cultureFeature": "Thác Khe Kèm ngoạn mục giữa rừng già, tộc người Đan Lai với tục ngủ ngồi và tập quán gắn bó với rừng; điệu múa xòe, rượu cần bên bếp lửa nhà sàn",
    "visionFeature": "phát triển du lịch sinh thái cộng đồng bền vững gắn với bảo tồn văn hóa tộc người Đan Lai và bảo tồn đa dạng sinh học rừng Pù Mát"
  },
  "chau-khe": {
    "historyFeature": "vùng đất nổi tiếng với Rừng săng lẻ Tam Đình - khu rừng nguyên sinh cổ thụ bạt ngàn độc nhất vô nhị của Việt Nam chạy dọc hai bên Quốc lộ 7",
    "geographyFeature": "nằm dọc Quốc lộ 7 và dòng sông Giăng, có khu rừng săng lẻ hàng trăm năm tuổi thân trắng muốt vươn thẳng tắp lên nền trời xanh",
    "economyFeature": "dịch vụ du lịch dừng chân ngắm cảnh rừng săng lẻ, kinh tế nương rẫy, trồng chanh leo, nuôi trâu bò và nghề thủ công mây tre",
    "cultureFeature": "Rừng săng lẻ Tam Đình tuyệt đẹp như bức tranh cổ tích châu Âu, tiếng sáo khèn Thái du dương trong các bản làng ven suối",
    "visionFeature": "bảo vệ nghiêm ngặt quần thể di sản Rừng săng lẻ, phát triển điểm dừng chân du lịch sinh thái văn minh cho du khách Quốc lộ 7"
  },
  "cam-phuc": {
    "historyFeature": "bản làng người Thái cổ kính ven các con suối trong lành, nơi lưu giữ những nếp nhà sàn truyền thống và nghề dệt thổ cẩm tinh xảo",
    "geographyFeature": "địa hình thung lũng núi cao, có nhiều khe suối mát lành uốn lượn quanh các chân ruộng bậc thang",
    "economyFeature": "nông nghiệp lúa nước thung lũng, dệt thổ cẩm hoa văn cổ, chăn nuôi lợn đen bản địa, nuôi cá suối và phát triển du lịch homestay",
    "cultureFeature": "những khung cửi dệt thổ cẩm rộn rã trước hiên nhà sàn, điệu múa lăm vông uyển chuyển, ẩm thực cá nướng pa pỉnh tộp thơm lừng",
    "visionFeature": "xây dựng làng du lịch cộng đồng kiểu mẫu, đưa sản phẩm thổ cẩm Cam Phục ra thị trường quà lưu niệm du lịch"
  },
  "binh-chuan": {
    "historyFeature": "thung lũng biệt lập giữa đại ngàn Pù Mát, nơi đồng bào Thái sinh sống lâu đời trong sự hòa hợp tuyệt đối với thiên nhiên hoang dã",
    "geographyFeature": "địa hình lòng chảo thung lũng kín gió, bao bọc bởi những dãy núi cao sừng sững, không khí trong lành quanh năm",
    "economyFeature": "kinh tế nương rẫy truyền thống, trồng lúa nương, chăn nuôi gia súc thả rông, trồng cây dược liệu bản địa và khai thác mật ong rừng",
    "cultureFeature": "những nếp nhà sàn cổ bằng gỗ lợp ngói âm dương nguyên sơ, phong tục cúng vía mùa màng, đời sống chân thật mộc mạc",
    "visionFeature": "bảo tồn kiến trúc làng bản Thái cổ, hỗ trợ đồng bào chuyển đổi cơ cấu cây trồng có giá trị kinh tế và giữ rừng"
  },
  "mau-thach": {
    "historyFeature": "vùng bán sơn địa vùng đệm Pù Mát có di chỉ Suối Nước Mọc kỳ bí - dòng nước ngầm phun trào tự nhiên từ lòng đất quanh năm",
    "geographyFeature": "địa hình núi đá vôi karst xen đồi đất, có dòng suối Nước Mọc mát lạnh mùa hè và ấm áp mùa đông tạo cảnh quan độc đáo",
    "economyFeature": "phát triển dịch vụ du lịch dã ngoại Suối Nước Mọc, kinh tế vườn rừng cây ăn quả, trồng keo nguyên liệu và chăn nuôi bò vàng",
    "cultureFeature": "thắng cảnh Suối Nước Mọc thu hút đông đảo du khách tắm mát giải nhiệt, nét văn hóa ẩm thực cơm lam thịt nướng dân dã",
    "visionFeature": "quy hoạch khu du lịch dã ngoại Suối Nước Mọc bài bản, bảo vệ mạch nước ngầm tự nhiên và phát triển kinh tế đồi rừng"
  },
  "quy-hop": {
    "historyFeature": "trung tâm huyện Quỳ Hợp bên bờ hồ Thung Mây thơ mộng, thủ phủ khoáng sản đá hoa trắng và đá mỹ nghệ nức tiếng của tỉnh Nghệ An",
    "geographyFeature": "nằm ở trung tâm huyện, bên hồ nước nhân tạo Thung Mây, giao cắt các tuyến Quốc lộ 48 và tỉnh lộ nối miền Tây",
    "economyFeature": "trung tâm công nghiệp chế biến đá trắng siêu mịn xuất khẩu, chế tác đá mỹ nghệ; thương mại dịch vụ sầm uất và chế biến nông lâm sản",
    "cultureFeature": "cảnh sắc hồ Thung Mây phẳng lặng soi bóng đồi thông, sự hội tụ văn hóa đặc sắc của ba dân tộc Kinh - Thái - Thổ; ẩm thực măng đắng, thịt chua",
    "visionFeature": "phát triển đô thị xanh bên hồ Thung Mây, hiện đại hóa công nghệ chế biến đá trắng giảm thiểu ô nhiễm môi trường"
  },
  "chau-hong": {
    "historyFeature": "vùng thung lũng khoáng sản thiếc và đá quý lịch sử, nơi ghi dấu sự phát triển của ngành khai khoáng mỏ từ nhiều thập kỷ trước",
    "geographyFeature": "địa hình thung lũng núi cao hiểm trở ven dòng sông Nậm Huống, cảnh quan đại ngàn hùng vĩ",
    "economyFeature": "khai thác và chế biến quặng thiếc, kinh tế nương rẫy, trồng rừng phòng hộ và chăn nuôi đại gia súc vùng cao",
    "cultureFeature": "bản làng người Thái ven suối Nậm Huống, các phong tục tập quán truyền thống, điệu khèn bè và dân ca Thái ngọt ngào",
    "visionFeature": "hoàn nguyên môi trường các khu vực mỏ sau khai thác, chuyển đổi sinh kế bền vững cho người dân sang kinh tế đồi rừng"
  },
  "chau-loc": {
    "historyFeature": "thủ phủ mỏ đá trắng canxi cacbonat có chất lượng hàng đầu thế giới, nguồn tài nguyên thiên nhiên quý báu của tỉnh Nghệ An",
    "geographyFeature": "nằm trên các dải núi đá hoa trắng tinh khiết, thuận lợi khai thác quy mô công nghiệp lớn",
    "economyFeature": "công nghiệp khai thác và nghiền bột đá trắng siêu mịn xuất khẩu đi hàng chục quốc gia, giải quyết việc làm cho hàng nghìn lao động",
    "cultureFeature": "sự đổi thay kỳ diệu của các xóm bản nhờ công nghiệp phát triển, tinh thần lao động cần cù chịu khó của công nhân và người dân",
    "visionFeature": "áp dụng công nghệ khai thác mỏ tiên tiến không dùng thuốc nổ, chế biến sâu bột đá phục vụ ngành nhựa, sơn cao cấp toàn cầu"
  },
  "minh-hop": {
    "historyFeature": "vùng đất gắn liền với Nông trường quốc doanh Xuân Thành lịch sử, vựa cam Quỳ Hợp nức tiếng xa gần với những vườn cam trĩu quả",
    "geographyFeature": "địa hình bán sơn địa với tầng đất đỏ bazan dày và phì nhiêu, nguồn nước tưới dồi dào từ các hồ thủy lợi",
    "economyFeature": "thủ phủ cam Quỳ Hợp (cam Xã Đoài lòng vàng, cam bù ngọt mát), đồi chè xanh bạt ngàn, cao su và kinh tế trang trại tuần hoàn",
    "cultureFeature": "mùa cam chín vàng rực khắp các triền đồi ngào ngạt hương thơm, sự mến khách của các chủ trang trại nông trường",
    "visionFeature": "xây dựng thương hiệu 'Cam Quỳ Hợp' đạt chuẩn chất lượng cao, phát triển mô hình du lịch trải nghiệm nhà vườn mùa cam chín"
  },
  "muong-chong": {
    "historyFeature": "Mường Chọng cổ kính - một trong chín mường lớn trong sử thi dân tộc Thái xứ Nghệ, cội nguồn văn hóa và lễ hội truyền thống ngàn đời",
    "geographyFeature": "thung lũng lúa nước rộng lớn bằng phẳng giữa bốn bề núi cao bao bọc, có dòng suối mát lành tưới tiêu",
    "economyFeature": "thâm canh lúa nước thung lũng, nghề dệt váy xằng thổ cẩm, chăn nuôi trâu bò thịt và nuôi trồng thủy sản nước ngọt",
    "cultureFeature": "Lễ hội Xăng Khan của người Thái được công nhận di sản văn hóa phi vật thể quốc gia, những điệu xòe hoa, nhảy sạp rộn ràng",
    "visionFeature": "bảo tồn không gian văn hóa di sản Lễ hội Xăng Khan Mường Chọng, phát triển du lịch văn hóa cộng đồng gắn với nông nghiệp"
  },
  "muong-ham": {
    "historyFeature": "vùng thung lũng trù phú ven sông Nậm Huống, nổi tiếng với hệ thống cọn nước (guồng nước) bằng tre nứa đẹp như tranh vẽ",
    "geographyFeature": "dọc hai bờ sông Nậm Huống với những bãi bồi phù sa phì nhiêu và thung lũng lúa nước xanh ngắt",
    "economyFeature": "canh tác lúa nước hai vụ năng suất cao, nuôi thả cá lồng trên sông Nậm Huống, kinh tế vườn đồi trồng keo lai và cây ăn quả",
    "cultureFeature": "những chiếc cọn nước khổng lồ quay đều đưa nước vào ruộng - nét văn hóa độc đáo của người Thái miền Tây, cảnh sắc thanh bình",
    "visionFeature": "bảo tồn biểu tượng cọn nước Nậm Huống phục vụ du lịch sinh thái nông nghiệp, nâng cao năng suất cây trồng thung lũng"
  },
  "tam-hop": {
    "historyFeature": "vùng đất tiếp giáp huyện Quỳ Châu, nơi cư dân các dân tộc cùng nhau khai hoang lập bản, bảo vệ rừng tự nhiên",
    "geographyFeature": "địa hình đồi núi chuyển tiếp, diện tích rừng tự nhiên rộng lớn với độ che phủ cao, khí hậu mát mẻ",
    "economyFeature": "kinh tế lâm nghiệp bền vững, trồng rừng gỗ lớn, chăn nuôi gia súc thả đồi và các mô hình trồng cây dược liệu dưới tán rừng",
    "cultureFeature": "nếp nhà sàn thanh bình nép mình dưới bóng rừng, sự hòa thuận gắn kết giữa đồng bào các dân tộc thiểu số",
    "visionFeature": "quản lý bảo vệ rừng đầu nguồn nghiêm ngặt, nhân rộng các mô hình trồng dược liệu quý dưới tán rừng nâng cao thu nhập"
  },
  "quy-chau": {
    "historyFeature": "thị trấn Tân Lạc cổ kính bên dòng sông Hạt, thủ phủ văn hóa của đồng bào dân tộc Thái vùng mường Quỳ Châu lịch sử",
    "geographyFeature": "tọa lạc bên dòng sông Hạt, trên trục Quốc lộ 48, địa thế thung lũng thâm nghiêm bao quanh bởi các dãy núi đá vôi kỳ vĩ",
    "economyFeature": "trung tâm chính trị, thương mại, dịch vụ của huyện; phát triển du lịch văn hóa tâm linh di tích Hang Bua và dịch vụ ẩm thực vùng cao",
    "cultureFeature": "Bảo tàng Văn hóa các Dân tộc Quỳ Châu lưu giữ hàng nghìn hiện vật quý, Quần thể danh thắng Hang Bua với Lễ hội Hang Bua rộn rã đầu xuân cồng chiêng, khắc luống",
    "visionFeature": "xây dựng đô thị thị trấn đậm đà bản sắc văn hóa dân tộc Thái, nâng tầm Lễ hội Hang Bua thành điểm nhấn du lịch mùa xuân của tỉnh"
  },
  "chau-binh": {
    "historyFeature": "vùng đất nổi tiếng cả nước với Làng nghề dệt thổ cẩm Hoa Tiến - làng nghề thổ cẩm truyền thống của người Thái đạt chuẩn quốc tế",
    "geographyFeature": "thung lũng bản làng yên bình bên chân núi, có nguồn nước suối tự nhiên và các loài cây cỏ rừng dùng nhuộm màu tự nhiên",
    "economyFeature": "sản xuất thổ cẩm Hoa Tiến thủ công nhuộm màu thảo mộc xuất khẩu đi nhiều nước châu Âu, kết hợp thâm canh lúa nước và chăn nuôi",
    "cultureFeature": "những tấm khăn piêu, váy thổ cẩm dệt hoa văn cổ tinh xảo nhuộm từ vỏ cây rừng, nghệ nhân thổ cẩm truyền nghề cho thế hệ trẻ",
    "visionFeature": "xây dựng Làng thổ cẩm Hoa Tiến thành điểm du lịch làng nghề quốc tế, nâng cao chuỗi giá trị sản phẩm quà lưu niệm cao cấp"
  },
  "chau-tien": {
    "historyFeature": "cái nôi khảo cổ học tiền sử nhân loại với Di chỉ Hang Thẩm Ồm, nơi phát hiện răng và xương người vượn cổ Homo erectus sinh sống cách đây hơn 20 vạn năm",
    "geographyFeature": "địa hình núi đá vôi karst hiểm trở với hệ thống hang động tự nhiên kỳ vĩ và thảm rừng nguyên sinh Pù Huống",
    "economyFeature": "kinh tế đồi rừng, trồng quế Quỳ, keo nguyên liệu, chăn nuôi bò vàng vùng cao và tiềm năng du lịch khám phá hang động Thẩm Ồm",
    "cultureFeature": "Di chỉ khảo cổ học Thẩm Ồm - minh chứng cho dấu tích người nguyên thủy sớm nhất trên đất nước Việt Nam; huyền tích bản địa ly kỳ",
    "visionFeature": "bảo tồn di chỉ khảo cổ học Thẩm Ồm phục vụ nghiên cứu khoa học và phát triển tuyến du lịch mạo hiểm sinh thái"
  },
  "hung-chan": {
    "historyFeature": "vùng đất hoang sơ giữa đại ngàn Pù Huống, nơi đồng bào Thái, Thổ lưu giữ những phong tục sống chan hòa giữa thiên nhiên",
    "geographyFeature": "địa hình đồi núi cao dốc, rừng tự nhiên bạt ngàn với nhiều loài gỗ quý và động thực vật đa dạng sinh học cao",
    "economyFeature": "bảo vệ rừng phòng hộ, trồng quế, dổi lấy hạt, sa nhân và chăn nuôi lợn đen, gà đồi thả rông",
    "cultureFeature": "nét sinh hoạt mộc mạc nguyên sơ trong những nếp nhà sàn, hương quế thơm nồng nàn lan tỏa khắp các sườn non",
    "visionFeature": "bảo tồn tài nguyên rừng Pù Huống, mở rộng diện tích trồng cây dổi và quế bản địa tạo nguồn thu nhập bền vững"
  },
  "que-phong": {
    "historyFeature": "trung tâm huyện Quế Phong biên giới bên dòng sông Quàng thơ mộng, nơi hội tụ những danh thắng thác nước kỳ vĩ bậc nhất miền Tây",
    "geographyFeature": "nằm trên Quốc lộ 48 đoạn cuối nối lên Cửa khẩu Thông Thụ, địa thế thung lũng lòng chảo mát mẻ quanh năm",
    "economyFeature": "trung tâm thương mại, dịch vụ vùng cao; phát triển du lịch sinh thái khám phá Thác Sao Va, Thác Bảy Tầng (Thác Quỳ) và kinh tế lâm nghiệp",
    "cultureFeature": "Quần thể Thác Sao Va và Thác Bảy Tầng tuôn bọt trắng xóa giữa rừng Pù Hoạt; văn hóa dân ca lăm, nhuôn, suối cá tự nhiên mát lành",
    "visionFeature": "xây dựng đô thị du lịch sinh thái vùng cao, kết nối tour du lịch Thác Sao Va - Hủa Na - Thông Thụ"
  },
  "muong-quang": {
    "historyFeature": "thung lũng Mường Quàng trù phú ngàn đời, vựa lúa gạo rẫy thơm dẻo nức tiếng của đồng bào Thái vùng biên giới Quế Phong",
    "geographyFeature": "thung lũng bằng phẳng rộng lớn giữa đại ngàn Pù Hoạt, nguồn nước suối trong lành mát lạnh tưới tiêu tự chảy",
    "economyFeature": "canh tác giống lúa nếp rẫy Mường Quàng hạt tròn thơm dẻo đặc sản, nuôi vịt bầu suối, dệt thổ cẩm và chăn nuôi trâu bò",
    "cultureFeature": "hương xôi nếp Mường Quàng dẻo thơm nức mũi trong các dịp lễ mừng lúa mới, điệu khắp Thái say đắm lòng người bên chén rượu cần",
    "visionFeature": "xây dựng thương hiệu OCOP 'Gạo nếp Mường Quàng', duy trì nguồn gen lúa bản địa quý và phát triển du lịch nông nghiệp"
  },
  "tien-phong": {
    "historyFeature": "vùng đất gắn liền với công trình Thủy điện Hủa Na hùng vĩ, tạo nên mặt hồ nước mênh mông như vịnh Hạ Long trên núi",
    "geographyFeature": "lòng hồ Thủy điện Hủa Na rộng hàng ngàn hécta với hàng trăm hòn đảo nhỏ xanh biếc, cảnh quan sơn thủy ngoạn mục",
    "economyFeature": "nuôi cá lồng bè quy mô lớn trên lòng hồ (cá lăng, cá tầm, cá trắm giòn), du lịch thuyền máy ngắm cảnh hồ và sản xuất điện năng sạch",
    "cultureFeature": "cảnh sắc hồ Hủa Na bồng bềnh sương khói ban mai, bữa cơm cá nướng lòng hồ đậm đà hương vị sông nước miền Tây",
    "visionFeature": "phát triển cụm du lịch sinh thái lòng hồ Hủa Na thành điểm nghỉ dưỡng dã ngoại cao cấp, nhân rộng mô hình nuôi cá lồng an toàn"
  },
  "thong-thu": {
    "historyFeature": "xã biên cương địa đầu giáp nước bạn Lào, nơi có Cửa khẩu Thông Thụ - cầu nối giao thương mậu dịch biên giới quốc tế",
    "geographyFeature": "địa hình núi cao hiểm trở, có những đồi thông Pù Hoạt bạt ngàn không khí trong lành se lạnh như thành phố Đà Lạt",
    "economyFeature": "kinh tế mậu dịch cửa khẩu mậu dịch biên giới, kinh tế rừng thông lấy nhựa, trồng cây gỗ lớn và chăn nuôi gia súc vùng cao",
    "cultureFeature": "Chợ phiên biên giới Thông Thụ rực rỡ sắc màu trang phục các dân tộc Việt - Lào, tình hữu nghị thắm thiết giữa nhân dân hai bờ biên cương",
    "visionFeature": "nâng cấp hạ tầng thương mại Cửa khẩu Thông Thụ, đẩy mạnh thông quan hàng hóa và bảo vệ vững chắc an ninh biên giới"
  },
  "tri-le": {
    "historyFeature": "xã vùng cao biên giới quanh năm mây mù bao phủ, nơi sinh sống của đồng bào Mông, Thái cần cù chế ngự non cao",
    "geographyFeature": "độ cao trên 1.000m so với mực nước biển, khí hậu á nhiệt đới mát mẻ quanh năm, mùa đông có sương muối và băng giá",
    "economyFeature": "thủ phủ giống chanh leo Tri Lễ ruột vàng ngọt đậm nức tiếng, mận tam hoa giòn ngọt, trồng gừng và chăn nuôi bò vỗ béo",
    "cultureFeature": "Lễ hội Gầu Tào rộn rã tiếng khèn Mông đầu xuân, những đồi mận nở hoa trắng xóa mùa xuân như bức tranh thủy mặc",
    "visionFeature": "mở rộng diện tích chanh leo Tri Lễ xuất khẩu, phát triển du lịch khám phá mùa hoa mận và văn hóa vùng cao"
  },
  "tuong-duong": {
    "historyFeature": "thị trấn Thạch Giám bên ngã ba sông lịch sử Cửa Rào - nơi hợp lưu giữa hai dòng Nậm Nơn và Nậm Mộ thành dòng sông Lam vĩ đại; Đền Vạn - Cửa Rào thờ Đốc tướng Đoàn Nhữ Hài",
    "geographyFeature": "tọa lạc ngay điểm hợp lưu ngã ba sông Cửa Rào, tựa lưng vào núi đá hùng vĩ, trên tuyến Quốc lộ 7 huyết mạch",
    "economyFeature": "trung tâm chính trị, thương mại, dịch vụ của huyện có diện tích lớn nhất Việt Nam; kinh tế dịch vụ, du lịch tâm linh và vận tải",
    "cultureFeature": "Đền Vạn - Cửa Rào linh thiêng đón hàng vạn du khách mỗi năm, cảnh tượng kỳ thú hai dòng nước một trong một đục hợp lưu thành sông Cả",
    "visionFeature": "xây dựng đô thị ngã ba sông Cửa Rào văn minh sinh thái, nâng cấp quần thể di tích Đền Vạn thành điểm nhấn tâm linh của miền Tây"
  },
  "tam-quang": {
    "historyFeature": "cổng ngõ phía đông huyện Tương Dương trên Quốc lộ 7, nơi người dân nổi tiếng tháo vát và có làng nghề bánh gai truyền thống",
    "geographyFeature": "nằm dọc Quốc lộ 7 và dòng sông Lam, địa thế thuận lợi giao lưu buôn bán giữa miền núi và đồng bằng",
    "economyFeature": "sản xuất bánh gai Tương Dương thơm dẻo đặc sản, chăn nuôi bò thịt vỗ béo, trồng cỏ voi và dịch vụ thương mại ẩm thực ven đường",
    "cultureFeature": "vị thơm ngọt bùi của chiếc bánh gai lá chuối khô Tương Dương làm quà cho khách phương xa, sự mến khách của người dân vùng cửa ngõ",
    "visionFeature": "xây dựng thương hiệu OCOP Bánh gai Tam Quang, phát triển mô hình hợp tác xã chăn nuôi bò hàng hóa tập trung"
  },
  "tam-thai": {
    "historyFeature": "thung lũng lúa nước trù phú của người Thái, nơi lưu giữ những nét sinh hoạt cộng đồng mang đậm tính nhân văn sâu sắc",
    "geographyFeature": "địa hình thung lũng bằng phẳng ven sông, có nguồn nước suối tự nhiên tưới tiêu cho đồng ruộng",
    "economyFeature": "canh tác lúa nước hai vụ, nghề đan lát mây tre giang xuất khẩu, dệt thổ cẩm và chăn nuôi lợn đen bản địa",
    "cultureFeature": "những nếp nhà sàn thanh bình soi bóng dưới lũy tre, các làn điệu nhuôn lăm mượt mà trong các đêm trăng sáng bản làng",
    "visionFeature": "nhân rộng nghề đan lát thủ công truyền thống, tăng vụ đông trên đất lúa thung lũng và giữ gìn văn hóa bản địa"
  },
  "luong-minh": {
    "historyFeature": "vùng đất gắn với Thủy điện Bản Vẽ - nhà máy thủy điện lớn nhất miền Bắc Trung Bộ với công suất 320MW, biểu tượng năng lượng sạch quốc gia",
    "geographyFeature": "lòng hồ Thủy điện Bản Vẽ rộng mênh mông ôm trọn các dãy núi non trùng điệp, nguồn năng lượng và điều tiết lũ hạ du",
    "economyFeature": "sản xuất điện năng sạch quốc gia, nghề nuôi cá lồng bè trên lòng hồ (cá bỗng, cá lăng, cá trắm), dịch vụ thuyền vận tải lòng hồ",
    "cultureFeature": "cảnh quan kỳ vĩ của đập Thủy điện Bản Vẽ và lòng hồ bao la, đời sống kiên cường tái định cư của đồng bào vì dòng điện Tổ quốc",
    "visionFeature": "phát triển nuôi trồng thủy sản sạch lòng hồ Bản Vẽ, hỗ trợ sinh kế bền vững cho người dân vùng lòng hồ"
  },
  "yen-na": {
    "historyFeature": "vùng đất nằm ngay phía dưới chân đập Thủy điện Bản Vẽ, nơi dòng Nậm Nơn tuôn chảy tạo nên cảnh quan kỳ thú",
    "geographyFeature": "địa hình thung lũng ven sông Nậm Nơn, cảnh quan non nước hữu tình với không khí mát lành",
    "economyFeature": "chăn nuôi trâu bò thịt, bảo vệ rừng phòng hộ đầu nguồn, dịch vụ hậu cần và nuôi thả thủy sản nước ngọt",
    "cultureFeature": "nét sinh hoạt mộc mạc của đồng bào Thái, Khơ Mú; các điệu nhảy sạp và phong tục đón Tết cổ truyền đậm đà bản sắc",
    "visionFeature": "tăng cường bảo vệ rừng phòng hộ xung quanh hồ thủy điện, chuyển giao khoa học kỹ thuật trồng trọt cho bà con"
  },
  "yen-hoa": {
    "historyFeature": "vùng đệm Khu dự trữ sinh quyển thế giới miền Tây Nghệ An, nơi lưu giữ những cánh rừng săng lẻ bạt ngàn và đa dạng sinh học cao",
    "geographyFeature": "địa hình rừng núi trập trùng, độ che phủ rừng trên 80%, khí hậu mát mẻ và nguồn nước suối trong lành",
    "economyFeature": "kinh tế nương rẫy, trồng rừng gỗ lớn, chăn nuôi gia súc thả đồi và khai thác lâm sản phụ dưới tán rừng bền vững",
    "cultureFeature": "đời sống thanh bình của các bản làng người Thái và Khơ Mú sống chan hòa với đại ngàn, tiếng khèn bè rộn rã đầu xuân",
    "visionFeature": "bảo vệ nghiêm ngặt diện tích rừng tự nhiên, phát triển các mô hình trồng cây dược liệu bản địa dưới tán rừng"
  },
  "nga-my": {
    "historyFeature": "vùng đất đặc biệt nơi cư trú của đồng bào Ơ Đu - một trong những dân tộc thiểu số ít người nhất Việt Nam, lưu giữ những huyền tích cổ xưa",
    "geographyFeature": "địa hình núi cao hiểm trở, nằm sâu trong vùng đệm Vườn quốc gia Pù Mát, nhiều khe suối nguyên sơ",
    "economyFeature": "kinh tế nương rẫy truyền thống, trồng lúa, chăn nuôi gia súc, dệt vải chàm và bảo tồn các giá trị văn hóa độc nhất vô nhị",
    "cultureFeature": "Lễ hội Mừng tiếng sấm đầu năm (Chăm phtrong) của người Ơ Đu - di sản văn hóa phi vật thể quý báu của quốc gia; phong tục tập quán độc đáo",
    "visionFeature": "thực hiện tốt chính sách bảo tồn và phát triển dân tộc Ơ Đu, đầu tư hạ tầng giao thông và giữ gìn bản sắc văn hóa"
  },
  "nhon-mai": {
    "historyFeature": "xã vùng cao biên giới giáp nước bạn Lào, nơi non cao điệp trùng và sự kiên cường bám bản giữ đất của đồng bào vùng biên viễn",
    "geographyFeature": "địa hình núi cao hiểm trở, độ dốc lớn, giáp đường biên giới Việt - Lào, khí hậu mùa đông lạnh buốt",
    "economyFeature": "trồng cây sa nhân tím, thảo quả dưới tán rừng cho giá trị kinh tế cao; chăn nuôi bò vàng vùng cao và trồng lúa nương",
    "cultureFeature": "cảnh sắc núi non trùng điệp hùng vĩ, đời sống giản dị mộc mạc của đồng bào Thái, Mông, Khơ Mú; tình đoàn kết bảo vệ mốc giới",
    "visionFeature": "mở rộng diện tích cây sa nhân tím và dược liệu quý, hỗ trợ đồng bào ổn định cuộc sống và giữ vững chủ quyền biên cương"
  },
  "huu-khuong": {
    "historyFeature": "xã vùng lòng hồ Thủy điện Bản Vẽ, nơi phương tiện giao thông duy nhất kết nối với bên ngoài là thuyền máy vượt sóng nước mênh mông",
    "geographyFeature": "địa hình bán đảo nhấp nhô giữa lòng hồ Bản Vẽ bao la, cảnh sắc sơn thủy hữu tình mê hoặc lòng người với sương khói mờ ảo",
    "economyFeature": "kinh tế nghề cá lòng hồ, nuôi cá lồng bè, đánh bắt thủy sản tự nhiên và kinh tế vườn rừng ven hồ",
    "cultureFeature": "trải nghiệm đi thuyền máy giữa lòng hồ Bản Vẽ hùng vĩ như bức tranh thủy mặc, nhịp sống thanh tịnh tách biệt với ồn ào phố thị",
    "visionFeature": "nâng cấp hạ tầng bến thuyền an toàn, phát triển nghề nuôi cá lồng công nghệ sạch và du lịch trải nghiệm sông nước lòng hồ"
  },
  "muong-xen": {
    "historyFeature": "thị trấn Mường Xén bên dòng sông Nậm Mộ cuộn sóng, trung tâm kinh tế - chính trị huyện Kỳ Sơn - cực tây của dải đất xứ Nghệ anh hùng",
    "geographyFeature": "nằm kẹp giữa các dãy núi cao hùng vĩ bên bờ sông Nậm Mộ, trên trục Quốc lộ 7 dẫn thẳng lên Cửa khẩu Quốc tế Nậm Cắn",
    "economyFeature": "trung tâm thương mại, dịch vụ, bán lẻ và trung chuyển hàng hóa vùng biên giới; giao thương mậu dịch với nước bạn Lào",
    "cultureFeature": "sự hòa sắc trang phục rực rỡ của các dân tộc Mông, Thái, Khơ Mú tại Chợ Mường Xén; ẩm thực xôi ngũ sắc, gà đen, lợn cắp nách",
    "visionFeature": "xây dựng đô thị thị trấn biên cương vững chắc, hoàn thiện hệ thống kè chống sạt lở sông Nậm Mộ và phát triển dịch vụ thương mại"
  },
  "nam-can": {
    "historyFeature": "Cửa khẩu Quốc tế Nậm Cắn - cửa ngõ giao thương mậu dịch quốc tế quan trọng bậc nhất nối Nghệ An với tỉnh Xiêng Khoảng và toàn nước Lào",
    "geographyFeature": "nằm ở độ cao trên đỉnh đèo biên giới, nơi dòng sông Nậm Cắn chảy qua, sương mù bao phủ quanh năm",
    "economyFeature": "kinh tế thương mại cửa khẩu quốc tế, logistics thông quan hàng hóa xuất nhập khẩu, dịch vụ du lịch cửa khẩu và chợ phiên",
    "cultureFeature": "Chợ phiên biên giới Nậm Cắn rực rỡ sắc màu trang phục thổ cẩm các dân tộc hai nước Việt - Lào, tình hữu nghị thắm thiết anh em",
    "visionFeature": "nâng cấp hạ tầng Khu kinh tế Cửa khẩu Quốc tế Nậm Cắn hiện đại, đẩy mạnh kim ngạch xuất nhập khẩu và du lịch liên quốc gia"
  },
  "muong-long": {
    "historyFeature": "vùng đất được mệnh danh là 'Sa Pa của xứ Nghệ' hay 'Cổng trời Mường Lống' ở độ cao gần 1.500m quanh năm mát lạnh và bồng bềnh biển mây",
    "geographyFeature": "nằm trên cao nguyên núi đá vôi ở độ cao 1.485m, khí hậu ôn đới quanh năm mát mẻ, mùa đông có mây mù và băng giá",
    "economyFeature": "du lịch săn mây 'Cổng trời', nghỉ dưỡng homestay sinh thái; chuyên canh mận tam hoa, đào đá, trồng cây dược liệu quý và nuôi gà đen Kỳ Sơn",
    "cultureFeature": "biển mây bồng bềnh cuộn sóng dưới chân thung lũng, vườn hoa mận hoa đào rực rỡ sắc xuân, tiếng khèn Mông réo rắt đón khách",
    "visionFeature": "quy hoạch Mường Lống thành Khu du lịch sinh thái nghỉ dưỡng và săn mây trọng điểm của tỉnh Nghệ An, bảo tồn nguyên vẹn kiến trúc nhà người Mông"
  },
  "na-ngoi": {
    "historyFeature": "xã vùng biên dưới chân đỉnh Puxailaileng (2.720m) - đỉnh núi cao nhất dãy Trường Sơn Bắc, 'Nóc nhà của dãy Trường Sơn'",
    "geographyFeature": "tọa lạc trên sườn non Puxailaileng hùng vĩ, có những cánh rừng pơ mu cổ thụ ngàn năm tuổi và ruộng bậc thang vàng óng mùa lúa chín",
    "economyFeature": "trồng cây sâm Puxailaileng quý hiếm, chanh leo vùng cao, thảo quả, dong riềng và chăn nuôi bò vỗ béo, lợn đen thả rông",
    "cultureFeature": "rừng pơ mu đại ngàn ngút ngàn kỳ bí, ruộng bậc thang Na Ngoi đẹp mê hồn mùa lúa chín, sự kiên cường của người Mông giữ mốc biên cương",
    "visionFeature": "bảo tồn và phát triển giống sâm quý Puxailaileng thành cây kinh tế mũi nhọn, phát triển du lịch trekking khám phá đỉnh Puxailaileng"
  },
  "bac-ly": {
    "historyFeature": "xã vùng cao biên giới bên bờ sông Nậm Nơn, nơi người Khơ Mú định cư lâu đời bảo tồn trọn vẹn phong tục tập quán cổ truyền",
    "geographyFeature": "địa hình núi cao dốc đứng uốn lượn men theo dòng Nậm Nơn, cảnh quan thiên nhiên hoang sơ hùng vĩ",
    "economyFeature": "sản xuất nương rẫy, trồng lúa nương, chăn nuôi trâu bò và các mô hình bảo vệ rừng đầu nguồn kết hợp đánh bắt thủy sản suối",
    "cultureFeature": "những nếp nhà sàn vách nứa đơn sơ ấm áp khói bếp, điệu múa cào cào và tiếng trống chiêng rộn ràng trong lễ mừng lúa mới",
    "visionFeature": "hoàn thiện hệ thống đường giao thông đến các bản làng, nâng cao dân trí và hỗ trợ bà con phát triển chăn nuôi"
  },
  "chieu-luu": {
    "historyFeature": "bản làng trù phú của người Thái và Khơ Mú, nổi danh với nghề rèn đúc dao thủ công sắc bén và nghề đan lát mây tre giang",
    "geographyFeature": "thung lũng tương đối bằng phẳng nằm dọc Quốc lộ 7, đất đai màu mỡ thích hợp cho thâm canh cây màu",
    "economyFeature": "nghề rèn dao Mông thủ công chất lượng cao, đan lát gùi, mâm mây; trồng ngô lai, sắn cao sản và chăn nuôi gia súc",
    "cultureFeature": "tiếng búa đe rộn rã tại các lò rèn thủ công truyền thống, con dao Chiêu Lưu sắc ngọt nức tiếng khắp vùng rẻo cao",
    "visionFeature": "thành lập hợp tác xã làng nghề rèn đúc thủ công, quảng bá sản phẩm dao rèn Chiêu Lưu đạt chuẩn OCOP truyền thống"
  },
  "huoi-tu": {
    "historyFeature": "vùng đất độc đáo sản sinh ra giống chè Shan tuyết cổ thụ Huồi Tụ - búp to phủ lớp tuyết trắng mịn, nước chè vàng óng vị ngọt thanh",
    "geographyFeature": "độ cao trên 1.100m, quanh năm mây mù bao phủ và sương lạnh tạo điều kiện lý tưởng cho cây chè Shan tuyết sinh trưởng",
    "economyFeature": "chuyên canh và chế biến chè Shan tuyết cổ thụ hữu cơ giá trị kinh tế rất cao, trồng cây ăn quả ôn đới và chăn nuôi đại gia súc",
    "cultureFeature": "những cây chè Shan tuyết cổ thụ xù xì hàng trăm năm tuổi, văn hóa hái chè và sao chè thủ công tinh xảo của đồng bào Mông",
    "visionFeature": "xây dựng thương hiệu chè Shan tuyết Huồi Tụ thành sản phẩm quốc gia xuất khẩu, mở rộng du lịch trải nghiệm hái chè cổ thụ"
  },
  "huu-kiem": {
    "historyFeature": "vùng đất có Đền Pu Nhạ Thầu (Đền Mẫu Bà Chúa) tọa lạc trên đỉnh non thiêng, nơi sinh hoạt văn hóa tâm linh của đồng bào các dân tộc vùng cao",
    "geographyFeature": "nằm dọc Quốc lộ 7 bên dòng Nậm Mộ, địa thế núi non bao bọc, cảnh quan thiên nhiên trang nghiêm thanh tịnh",
    "economyFeature": "thương mại dịch vụ phục vụ du khách chiêm bái Đền Pu Nhạ Thầu; thâm canh lúa nước, trồng ngô lai và chăn nuôi gia cầm",
    "cultureFeature": "Lễ hội Đền Pu Nhạ Thầu đầu xuân rực rỡ sắc màu trang phục đón nhân dân và du khách thập phương dâng hương cầu an, hội ném còn sôi nổi",
    "visionFeature": "bảo tồn và tôn tạo di tích văn hóa tâm linh Đền Pu Nhạ Thầu, phát triển du lịch lễ hội đầu xuân gắn với bảo tồn văn hóa dân tộc"
  },
  "keng-du": {
    "historyFeature": "xã cực tây xa xôi nhất của huyện Kỳ Sơn và tỉnh Nghệ An, nơi ngọn nguồn của dòng Nậm Nơn bắt đầu chảy vào lòng đất mẹ Việt Nam",
    "geographyFeature": "địa hình núi non hiểm trở bậc nhất, tiếp giáp đường biên giới nước bạn Lào, rừng nguyên sinh bạt ngàn bao phủ",
    "economyFeature": "kinh tế tự cấp tự túc, nương rẫy, bảo vệ rừng tự nhiên và chăn nuôi gia súc thả đồi, trồng cây dược liệu bản địa",
    "cultureFeature": "nét văn hóa thuần khiết của người Thái và Khơ Mú nơi đầu nguồn dòng Nậm Nơn, tình quân dân thắm thiết với chiến sĩ đồn biên phòng",
    "visionFeature": "ưu tiên đầu tư hạ tầng điện, đường, trường, trạm cho vùng đặc biệt khó khăn, giữ vững chủ quyền an ninh biên cương Tổ quốc"
  },
  "my-ly": {
    "historyFeature": "thượng nguồn dòng Nậm Nơn, nơi lưu giữ di tích Tháp cổ Yên Hòa (tháp Mỹ Lý) bằng đất nung hàng trăm năm tuổi minh chứng cho sự giao thoa văn hóa Phật giáo",
    "geographyFeature": "uốn lượn theo dòng sông Nậm Nơn trong vắt, cảnh quan vách đá dựng đứng và những thác ghềnh kỳ vĩ",
    "economyFeature": "kinh tế nương rẫy, trồng ngô, nuôi cá lồng trên sông Nậm Nơn, kinh tế đồi rừng và chăn nuôi trâu bò",
    "cultureFeature": "Tháp cổ Mỹ Lý rêu phong huyền bí giữa núi rừng, những chuyến thuyền độc mộc lướt trên dòng Nậm Nơn xanh biếc",
    "visionFeature": "trùng tu và bảo vệ di tích Tháp cổ Mỹ Lý, bảo vệ cảnh quan thiên nhiên sông Nậm Nơn phục vụ du lịch khám phá"
  },
  "na-loi": {
    "historyFeature": "xã vùng biên giới đồi núi hiểm trở, nơi có giống gừng Kỳ Sơn cay nồng thơm lừng - đặc sản gia vị quý giá nổi tiếng cả nước",
    "geographyFeature": "địa hình đồi núi dốc, đất mùn pha đá vôi giàu khoáng chất, khí hậu lạnh thích hợp lý tưởng cho cây gừng tích tụ tinh dầu",
    "economyFeature": "thủ phủ trồng gừng Kỳ Sơn xuất khẩu (gừng dé, gừng củ to thơm cay), trồng ngô cao sản, sắn và chăn nuôi bò vàng",
    "cultureFeature": "mùi thơm cay nồng của những bao gừng tươi mùa thu hoạch rộn rã khắp sườn non, nếp sống kiên cường chịu khó của đồng bào",
    "visionFeature": "xây dựng chỉ dẫn địa lý và thương hiệu Gừng Kỳ Sơn đạt chuẩn OCOP xuất khẩu, liên kết doanh nghiệp chế biến tinh dầu gừng"
  },
  "muong-tip": {
    "historyFeature": "vùng đất biên viễn giáp Lào bên những con suối trong lành, nơi đồng bào các dân tộc gắn bó keo sơn bảo vệ từng tấc đất quê hương",
    "geographyFeature": "địa hình núi cao trùng điệp, thung lũng hẹp ven suối Nậm Mộ, không gian đại ngàn xanh ngắt quanh năm",
    "economyFeature": "trồng lúa nương, ngô lai, phát triển chăn nuôi gia súc có sừng, bảo vệ rừng phòng hộ biên giới và nghề thủ công mây tre",
    "cultureFeature": "đời sống văn hóa dân gian phong phú của người Thái và Khơ Mú, những nếp nhà sàn ấm cúng đón khách quý bằng tình cảm chân thành",
    "visionFeature": "xây dựng các bản làng văn hóa no ấm vùng biên, tăng cường củng cố thế trận quốc phòng toàn dân và an ninh nhân dân vững chắc"
  }
};

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

  const p = COMMUNE_PROFILES[slug];

  if (p) {
    // Bài viết chuyên khảo đặc thù độc bản, đầy đủ hàm lượng tri thức thực tế
    const history = `${commune.type} ${commune.name} là đơn vị hành chính cấp cơ sở thuộc ${dName}, tỉnh Nghệ An. Địa bàn được thành lập và sắp xếp năm 2025 theo Nghị quyết số 1678/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội trên cơ sở sáp nhập toàn bộ diện tích tự nhiên và quy mô dân số của ${oldUnitsCount} đơn vị hành chính cũ gồm: ${oldUnitsList}. Về mặt lịch sử, nơi đây là ${p.historyFeature}. Nhân dân địa phương qua các thời kỳ luôn phát huy tinh thần yêu nước nồng nàn, cần cù sáng tạo trong lao động và kiên cường bảo vệ từng tấc đất quê hương.`;

    const geography = `Sau khi sắp xếp, ${commune.type} ${commune.name} có tổng diện tích tự nhiên đạt ${String(commune.areaKm2 || 0).replace(".", ",")} km², xếp thứ #${commune.areaRank || 1} trên tổng số 130 xã, phường của tỉnh Nghệ An. Quy mô dân số đạt ${commune.population?.toLocaleString("vi-VN") || 0} người (xếp thứ #${commune.populationRank || 1}/130 toàn tỉnh), mật độ dân số trung bình đạt xấp xỉ ${Math.round((commune.population || 0) / (commune.areaKm2 || 1)).toLocaleString("vi-VN")} người/km². Về không gian lãnh thổ, địa bàn ${p.geographyFeature}. Ranh giới mới tạo nên một chỉnh thể thống nhất, mở rộng không gian phát triển toàn diện và liên kết chặt chẽ với các vùng kinh tế trọng điểm lân cận.`;

    const economy = `Cơ cấu kinh tế của ${commune.type} ${commune.name} phát triển năng động, khai thác tối đa tiềm năng và lợi thế so sánh của vùng đất. Thế mạnh nổi bật của địa phương là ${p.economyFeature}. Hệ thống hạ tầng giao thông liên thôn liên xã, điện lưới, trường học đạt chuẩn và trạm y tế được đầu tư nâng cấp khang trang, đáp ứng tốt nhu cầu sản xuất hàng hóa và nâng cao rõ rệt đời sống vật chất của nhân dân.`;

    const cultureTourism = `Đời sống văn hóa tinh thần tại ${commune.type} ${commune.name} mang đậm bản sắc văn hóa truyền thống xứ Nghệ với nhiều nét đặc trưng phong phú. Địa phương tự hào với ${p.cultureFeature}. Các phong trào xây dựng đời sống văn hóa ở khu dân cư, phong trào khuyến học khuyến tài và bảo tồn các giá trị di sản được cộng đồng tích cực gìn giữ, phát huy, tạo nên môi trường xã hội lành mạnh, đoàn kết và nhân văn.`;

    const vision = `Bước vào giai đoạn phát triển mới sau khi kiện toàn bộ máy hành chính theo Nghị quyết 1678/NQ-UBTVQH15, Đảng bộ và chính quyền ${commune.type} ${commune.name} đề ra mục tiêu: ${p.visionFeature}. Địa phương quyết tâm xây dựng quê hương ngày càng giàu đẹp, văn minh, phấn đấu hoàn thành xuất sắc các mục tiêu kinh tế - xã hội và trở thành điểm sáng phát triển của tỉnh Nghệ An.`;

    return {
      history,
      geography,
      economy,
      cultureTourism,
      vision,
      officialUrl,
    };
  }

  // Phương án dự phòng (fallback) nếu phát sinh slug ngoài danh mục
  return {
    history: `${commune.type} ${commune.name} là đơn vị hành chính thuộc ${dName}, tỉnh Nghệ An, thành lập theo Nghị quyết 1678/NQ-UBTVQH15 trên cơ sở sáp nhập các đơn vị: ${oldUnitsList}.`,
    geography: `Diện tích tự nhiên ${String(commune.areaKm2 || 0).replace(".", ",")} km², dân số ${commune.population?.toLocaleString("vi-VN") || 0} người.`,
    economy: `Kinh tế phát triển đa dạng các ngành nghề nông nghiệp, dịch vụ và tiểu thủ công nghiệp.`,
    cultureTourism: `Nhân dân gìn giữ truyền thống hiếu học, đoàn kết và bản sắc văn hóa tốt đẹp của xứ Nghệ.`,
    vision: `Tiếp tục đẩy mạnh cải cách hành chính, hoàn thiện hạ tầng kỹ thuật và nâng cao đời sống nhân dân.`,
    officialUrl,
  };
}
