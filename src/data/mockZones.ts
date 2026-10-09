import type { Zone } from "../types/zone.types";

// TODO: bỏ file này khi có API (GET zones theo project_id, kèm số Properties theo zone_id)
const img = (id: string) => `https://images.unsplash.com/${id}?w=1400&q=80`;

export const MOCK_ZONES: Zone[] = [
  {
    id: 1,
    projectId: 1,
    name: "Phân khu Vịnh Tiên",
    description: "Khu căn hộ trung tâm của dự án, mở ra tầm nhìn trọn vẹn về công viên ven sông và các tiện ích nội khu.",
    status: "Đang mở bán",
    imageUrl: img("photo-1486406146926-c627a92ad1ab"),
    propertyCount: 426,
  },
  {
    id: 2,
    projectId: 1,
    name: "Phân khu Vịnh Ngọc",
    description: "Không gian sống riêng tư hơn với mật độ xây dựng thấp, kết nối trực tiếp với dải cảnh quan xanh.",
    status: "Sắp ra mắt",
    imageUrl: img("photo-1512917774080-9991f1c4c750"),
    propertyCount: null,
  },
  {
    id: 3,
    projectId: 1,
    name: "Phân khu Ánh Dương",
    description: "Những căn hộ đón nắng thuận hướng, gần khu thương mại và trường học trong nội khu.",
    status: "Còn ít căn",
    imageUrl: img("photo-1600585154340-be6161a56a0c"),
    propertyCount: 284,
  },
  {
    id: 4,
    projectId: 1,
    name: "Phân khu Lâm Viên",
    description: "Khu thấp tầng hòa vào cây xanh, phù hợp với gia đình cần không gian sống yên tĩnh.",
    status: "Đang mở bán",
    imageUrl: null,
    propertyCount: null,
  },
  {
    id: 5,
    projectId: 2,
    name: "Phân khu Bến Thuyền",
    description: "Dải căn hộ nhìn ra mặt nước, nối liền với quảng trường và bến du thuyền của dự án.",
    status: "Đang mở bán",
    imageUrl: img("photo-1600607687939-ce8a6c25118c"),
    propertyCount: 188,
  },
];
