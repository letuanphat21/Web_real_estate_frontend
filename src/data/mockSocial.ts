const avatar = (n: number) => `https://i.pravatar.cc/100?img=${n}`;
const photo = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80`;

const PHOTOS = [
  photo("photo-1545324418-cc1a3fa10c00"),
  photo("photo-1560518883-ce09059eeffa"),
  photo("photo-1512917774080-9991f1c4c750"),
  photo("photo-1500382017468-9049fed747ef"),
  photo("photo-1486406146926-c627a92ad1ab"),
];

export const MOCK_SOCIAL_CURRENT_USER = {
  id: 99,
  fullName: "Lê Tuấn Phát",
  avatarUrl: avatar(33),
};

export const MOCK_SOCIAL_CONTACTS = [
  { id: 1, fullName: "Nguyễn Minh Anh", avatarUrl: avatar(47) },
  { id: 2, fullName: "Trần Quốc Huy", avatarUrl: avatar(12) },
  { id: 3, fullName: "Phạm Thu Hà", avatarUrl: avatar(5) },
  { id: 4, fullName: "NovaLand Hub", avatarUrl: avatar(68) },
];

const [U1, U2, U3, U4] = MOCK_SOCIAL_CONTACTS;

export const MOCK_SOCIAL_MENU = [
  { id: "feed", label: "Bảng tin" },
  { id: "friends", label: "người theo dõi" },
  { id: "events", label: "Sự kiện" },
  {id: "news", label: "Tin tức"}
];

export const MOCK_SOCIAL_POSTS = [
  {
    id: 1,
    user: U1,
    content:
      "Vừa đi xem căn hộ 2PN ở Thủ Đức, view sông rất đẹp, giá khoảng 3.2 tỷ. Mọi người thấy mức giá này ổn không?",
    imageUrls: [...PHOTOS, ...PHOTOS].slice(0, 8),
    likeCount: 128,
    shareCount: 12,
    createdAt: "2026-10-06T09:30:00",
    comments: [
      {
        id: 1,
        user: U2,
        content: "Khu đó đang tăng giá khá nhanh, bạn nên chốt sớm.",
        createdAt: "2026-10-06T10:00:00",
      },
      {
        id: 2,
        user: U3,
        content: "Nhớ kiểm tra pháp lý và tiến độ bàn giao nhé!",
        createdAt: "2026-10-06T11:15:00",
      },
    ],
  },
  {
    id: 2,
    user: U3,
    content:
      "Chia sẻ kinh nghiệm vay mua nhà: nên so sánh lãi suất ưu đãi và lãi suất thả nổi của ít nhất 3 ngân hàng trước khi quyết định.\n\nNgoài lãi suất, bạn cũng nên hỏi rõ về phí trả nợ trước hạn, thời gian ân hạn gốc, cách tính lãi khi hết ưu đãi và các khoản bảo hiểm đi kèm khoản vay. Nhiều ngân hàng quảng cáo lãi suất thấp nhưng phí ẩn lại khá cao, nên hãy yêu cầu bảng tính chi tiết bằng văn bản trước khi ký hợp đồng.\n\nCuối cùng, đừng vay quá 50% thu nhập hàng tháng của gia đình để vẫn còn khoản dự phòng khi có biến cố.",
    imageUrls: [] as string[],
    likeCount: 76,
    shareCount: 30,
    createdAt: "2026-10-05T20:10:00",
    comments: [
      {
        id: 3,
        user: U1,
        content: "Cảm ơn bạn, bài viết rất hữu ích!",
        createdAt: "2026-10-05T21:00:00",
      },
    ],
  },
  {
    id: 3,
    user: U4,
    content:
      "Sự kiện Real Estate Summit 2026 sắp diễn ra. Đăng ký sớm để nhận ưu đãi nhé!",
    imageUrls: [...PHOTOS, ...PHOTOS].slice(0, 6),
    likeCount: 210,
    shareCount: 45,
    createdAt: "2026-10-04T08:00:00",
    comments: [],
  },
  {
    id: 4,
    user: U2,
    content:
      "Đất nền vùng ven Sài Gòn đang có dấu hiệu sôi động trở lại sau thông tin hạ tầng mới. Anh em nào đang theo dõi khu Long Thành không?",
    imageUrls: [...PHOTOS, ...PHOTOS].slice(0, 6),
    likeCount: 94,
    shareCount: 18,
    createdAt: "2026-10-03T19:20:00",
    comments: [
      { id: 101, user: U1, content: "Mình đang quan tâm, nhưng giá hơi cao rồi.", createdAt: "2026-10-03T20:00:00" },
    ],
  },
  {
    id: 5,
    user: U1,
    content:
      "Checklist trước khi cọc mua căn hộ: pháp lý dự án, tiến độ thanh toán, phí quản lý, tiện ích thực tế. Mọi người bổ sung thêm nhé!",
    imageUrls: [] as string[],
    likeCount: 152,
    shareCount: 64,
    createdAt: "2026-10-03T08:45:00",
    comments: [
      { id: 102, user: U3, content: "Thêm mục kiểm tra chủ đầu tư từng làm dự án nào nữa.", createdAt: "2026-10-03T09:30:00" },
      { id: 103, user: U2, content: "Nên xem cả hợp đồng mẫu trước khi cọc.", createdAt: "2026-10-03T10:10:00" },
    ],
  },
  {
    id: 6,
    user: U4,
    content:
      "Mở bán đợt 1 The Horizon Riverside: chiết khấu đến 8%, hỗ trợ vay 70%. Liên hệ để nhận bảng giá chi tiết.",
    imageUrls: [...PHOTOS].reverse(),
    likeCount: 88,
    shareCount: 9,
    createdAt: "2026-10-02T15:00:00",
    comments: [],
  },
  {
    id: 7,
    user: U3,
    content:
      "Mình vừa bàn giao căn hộ sau 2 năm chờ. Chất lượng hoàn thiện khá ổn, chỉ có vài lỗi nhỏ cần bảo hành. Ai từng nhận nhà chia sẻ kinh nghiệm nghiệm thu giúp mình với.",
    imageUrls: PHOTOS.slice(0, 2),
    likeCount: 67,
    shareCount: 5,
    createdAt: "2026-10-02T10:30:00",
    comments: [
      { id: 104, user: U1, content: "Chụp ảnh lỗi và lập biên bản ngay lúc nghiệm thu nhé.", createdAt: "2026-10-02T11:00:00" },
    ],
  },
  {
    id: 8,
    user: U2,
    content:
      "Lãi suất thả nổi sau ưu đãi là cái bẫy nhiều người bỏ qua. Tính kỹ khoản trả hàng tháng khi lãi suất tăng thêm 2-3% nhé.",
    imageUrls: [] as string[],
    likeCount: 143,
    shareCount: 52,
    createdAt: "2026-10-01T21:15:00",
    comments: [
      { id: 105, user: U3, content: "Đúng luôn, mình từng suýt dính.", createdAt: "2026-10-01T21:45:00" },
    ],
  },
  {
    id: 9,
    user: U1,
    content:
      "Cuối tuần này mình đi xem nhà phố khu Bình Chánh, có ai ở khu đó cho mình xin review về giao thông và ngập nước không?",
    imageUrls: [] as string[],
    likeCount: 41,
    shareCount: 2,
    createdAt: "2026-10-01T14:00:00",
    comments: [
      { id: 106, user: U2, content: "Mùa mưa vài tuyến vẫn ngập, bạn nên đi xem lúc mưa.", createdAt: "2026-10-01T15:20:00" },
      { id: 107, user: U3, content: "Khu gần quốc lộ thì đỡ hơn nhiều.", createdAt: "2026-10-01T16:05:00" },
    ],
  },
  {
    id: 10,
    user: U4,
    content:
      "Workshop miễn phí: Đầu tư bất động sản cho người mới bắt đầu. Diễn ra 20/10, số lượng chỗ có hạn.",
    imageUrls: [photo("photo-1560518883-ce09059eeffa")],
    likeCount: 119,
    shareCount: 33,
    createdAt: "2026-09-30T09:00:00",
    comments: [],
  },
  {
    id: 11,
    user: U3,
    content:
      "So sánh nhanh căn hộ chung cư và nhà phố cho gia đình trẻ: chung cư tiện ích tốt, nhà phố linh hoạt cải tạo và giữ giá tốt hơn.",
    imageUrls: [] as string[],
    likeCount: 85,
    shareCount: 21,
    createdAt: "2026-09-30T07:30:00",
    comments: [
      { id: 108, user: U1, content: "Tuỳ ngân sách, nhưng mình nghiêng về chung cư cho tiện.", createdAt: "2026-09-30T08:10:00" },
    ],
  },
  {
    id: 12,
    user: U2,
    content:
      "Vừa chốt được lô đất 100m² giá 1.9 tỷ, sổ riêng. Cảm ơn mọi người đã tư vấn mấy hôm nay!",
    imageUrls: [...PHOTOS, ...PHOTOS].slice(0, 7),
    likeCount: 230,
    shareCount: 14,
    createdAt: "2026-09-29T18:40:00",
    comments: [
      { id: 109, user: U1, content: "Chúc mừng bạn!", createdAt: "2026-09-29T19:00:00" },
      { id: 110, user: U3, content: "Giá này khá tốt đó.", createdAt: "2026-09-29T19:20:00" },
    ],
  },
  {
    id: 13,
    user: U1,
    content:
      "Mọi người có biết cách kiểm tra quy hoạch của một thửa đất nhanh nhất không? Mình đang tìm hiểu lô ở Đồng Nai.",
    imageUrls: [] as string[],
    likeCount: 58,
    shareCount: 7,
    createdAt: "2026-09-29T11:00:00",
    comments: [
      { id: 111, user: U2, content: "Lên phòng quản lý đô thị hoặc tra cứu cổng thông tin quy hoạch của tỉnh.", createdAt: "2026-09-29T12:00:00" },
    ],
  },
  {
    id: 14,
    user: U4,
    content:
      "Cập nhật tiến độ dự án Vinhomes Grand Park: hoàn thiện 70% hạ tầng nội khu, dự kiến bàn giao đợt đầu vào Q1 năm sau.",
    imageUrls: [photo("photo-1512917774080-9991f1c4c750")],
    likeCount: 97,
    shareCount: 26,
    createdAt: "2026-09-28T16:00:00",
    comments: [],
  },
  {
    id: 15,
    user: U3,
    content:
      "Thị trường cho thuê căn hộ quý này khá ổn, tỷ suất khoảng 5-6%/năm ở khu vực trung tâm. Ai đang đầu tư cho thuê thấy sao?",
    imageUrls: [] as string[],
    likeCount: 72,
    shareCount: 11,
    createdAt: "2026-09-28T09:20:00",
    comments: [
      { id: 112, user: U2, content: "Khu gần trường đại học cho thuê dễ hơn hẳn.", createdAt: "2026-09-28T10:00:00" },
    ],
  },
  {
    id: 16,
    user: U2,
    content:
      "Lưu ý khi mua nhà qua môi giới: luôn xác minh giấy tờ trực tiếp với chủ nhà và công chứng tại văn phòng uy tín.",
    imageUrls: [] as string[],
    likeCount: 176,
    shareCount: 80,
    createdAt: "2026-09-27T20:00:00",
    comments: [
      { id: 113, user: U1, content: "Bài này nên ghim lên đầu nhóm.", createdAt: "2026-09-27T20:30:00" },
      { id: 114, user: U3, content: "Đồng ý, nhiều người bị lừa vì bỏ qua bước này.", createdAt: "2026-09-27T21:00:00" },
    ],
  },
  {
    id: 17,
    user: U1,
    content:
      "Ảnh view từ ban công căn hộ tầng 25 mình vừa xem. Đẹp quá nhưng giá cũng không rẻ chút nào 😅",
    imageUrls: PHOTOS.slice(1, 5),
    likeCount: 203,
    shareCount: 8,
    createdAt: "2026-09-27T17:10:00",
    comments: [
      { id: 115, user: U4, content: "Liên hệ bên mình để được tư vấn thêm nhé!", createdAt: "2026-09-27T18:00:00" },
    ],
  },
  {
    id: 18,
    user: U4,
    content:
      "Tổng hợp 5 khu vực có tiềm năng tăng giá cuối năm: Thủ Đức, Nhà Bè, Bình Dương, Long Thành, Biên Hòa. Đọc chi tiết ở phần tin tức.",
    imageUrls: [] as string[],
    likeCount: 134,
    shareCount: 47,
    createdAt: "2026-09-26T08:00:00",
    comments: [],
  },
  {
    id: 19,
    user: U3,
    content:
      "Hỏi nhanh: có nên chờ giá giảm rồi mới mua không hay xuống tiền sớm? Mình có sẵn khoảng 1 tỷ và vay thêm.",
    imageUrls: [] as string[],
    likeCount: 62,
    shareCount: 3,
    createdAt: "2026-09-25T22:00:00",
    comments: [
      { id: 116, user: U2, content: "Khó đoán đáy, quan trọng là khả năng trả nợ của bạn.", createdAt: "2026-09-25T22:30:00" },
      { id: 117, user: U1, content: "Mua để ở thì cứ mua khi thấy phù hợp.", createdAt: "2026-09-25T23:00:00" },
    ],
  },
  {
    id: 20,
    user: U2,
    content:
      "Cảm ơn cộng đồng đã đồng hành cùng mình trong hành trình tìm nhà. Hẹn mọi người ở sự kiện sắp tới nhé!",
    imageUrls: [photo("photo-1560518883-ce09059eeffa")],
    likeCount: 189,
    shareCount: 16,
    createdAt: "2026-09-25T10:00:00",
    comments: [
      { id: 118, user: U3, content: "Hẹn gặp bạn!", createdAt: "2026-09-25T10:30:00" },
    ],
  },
];

export const MOCK_SOCIAL_ADS = [
  {
    id: 1,
    title: "Vinhomes Grand Park",
    description: "Căn hộ từ 1.8 tỷ, hỗ trợ vay 70%.",
    imageUrl: photo("photo-1512917774080-9991f1c4c750"),
    link: "#",
  },
  {
    id: 2,
    title: "Đất nền Long An",
    description: "Sổ hồng riêng, pháp lý rõ ràng.",
    imageUrl: photo("photo-1500382017468-9049fed747ef"),
    link: "#",
  },
];

export const MOCK_SOCIAL_TRENDING = [
  { id: 1, tag: "#canhoThuDuc", postCount: 1240 },
  { id: 2, tag: "#laisuatvay", postCount: 890 },
  { id: 3, tag: "#datnenvenSaiGon", postCount: 640 },
];

export const MOCK_SOCIAL_SUGGESTIONS = [
  { id: 11, fullName: "Lê Hoàng Nam", role: "Môi giới BĐS", avatarUrl: avatar(15) },
  { id: 12, fullName: "Võ Thanh Trúc", role: "Chuyên gia tài chính", avatarUrl: avatar(9) },
  { id: 13, fullName: "Đặng Gia Bảo", role: "Nhà đầu tư", avatarUrl: avatar(52) },
];

export const MOCK_SOCIAL_NEWS = [
  { id: 1, title: "Giá căn hộ TP.HCM tiếp tục tăng trong quý 3", time: "2 giờ trước" },
  { id: 2, title: "Lãi suất vay mua nhà giảm nhẹ tại nhiều ngân hàng", time: "5 giờ trước" },
  { id: 3, title: "Hạ tầng phía Đông thúc đẩy thị trường đất nền", time: "1 ngày trước" },
  { id: 4, title: "Luật Đất đai sửa đổi: điểm cần lưu ý khi mua bán", time: "2 ngày trước" },
  { id: 5, title: "Nhiều dự án căn hộ mới chuẩn bị mở bán cuối năm", time: "3 ngày trước" },
];

export const MOCK_SOCIAL_PROJECT_AD = {
  id: 1,
  name: "The Horizon Riverside",
  tagline: "Căn hộ ven sông chuẩn resort",
  imageUrl: photo("photo-1486406146926-c627a92ad1ab"),
  priceFrom: "Từ 2.9 tỷ",
  highlights: ["View sông trực diện", "Hỗ trợ vay 70%, ân hạn gốc 24 tháng", "Bàn giao Q4/2027"],
  link: "#",
};
