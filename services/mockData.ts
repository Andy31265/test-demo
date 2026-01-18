import { Property, Project, SellerInfo } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const SELLERS: SellerInfo[] = [
  {
    id: 's1',
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    email: 'an.nguyen@example.com',
    type: 'agent',
    avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 's2',
    name: 'Trần Thị Bích',
    phone: '0909888777',
    email: 'bich.tran@example.com',
    type: 'owner',
    avatar: 'https://picsum.photos/100/100?random=2'
  }
];

export const MOCK_PROPERTIES: Property[] = Array.from({ length: 20 }).map((_, i) => ({
  id: generateId(),
  title: [
    'Đất nền view hồ Đambri cực đẹp, sổ sẵn',
    'Lô góc 2 mặt tiền Lộc Phát, ngay khu dân cư',
    'Đất nghỉ dưỡng săn mây Đại Lào 1000m2',
    'Bán gấp lô đất đường tránh Bảo Lộc',
    'Biệt thự đồi view trọn thành phố'
  ][i % 5] + ` - Mã ${i + 1}`,
  location: {
    ward: ['Đambri', 'Lộc Phát', 'Đại Lào', 'Lộc Sơn', 'Phường 2'][i % 5],
    district: 'Bảo Lộc',
    province: 'Lâm Đồng',
    address: `Đường số ${i + 1}, TP. Bảo Lộc`,
    coordinates: { lat: 11.5 + Math.random() * 0.1, lng: 107.8 + Math.random() * 0.1 }
  },
  area: 100 + Math.floor(Math.random() * 900),
  price: 500000000 + Math.floor(Math.random() * 5000000000),
  pricePerM2: 0, // Calculated later
  listingType: 'sale' as const,
  propertyType: (i % 4 === 0 ? 'villa' : 'land') as 'villa' | 'land',
  images: [
    `https://picsum.photos/800/600?random=${i * 3 + 1}`,
    `https://picsum.photos/800/600?random=${i * 3 + 2}`,
    `https://picsum.photos/800/600?random=${i * 3 + 3}`
  ],
  description: 'Đất đẹp, bằng phẳng, view thoáng mát. Thích hợp nghỉ dưỡng hoặc đầu tư sinh lời cao. Pháp lý rõ ràng, công chứng trong ngày.',
  legalStatus: 'so-do' as const,
  direction: 'dong-nam' as const,
  roadWidth: 6,
  seller: SELLERS[i % 2],
  postedDate: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  featured: i < 4,
  status: 'available' as const
})).map(p => ({ ...p, pricePerM2: Math.round(p.price / p.area) }));

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Sun Valley Bảo Lộc',
    slug: 'sun-valley-bao-loc',
    category: 'nghi-duong',
    location: {
      ward: 'Đambri',
      district: 'Bảo Lộc',
      province: 'Lâm Đồng',
      address: 'Tản Đà, Đambri',
      coordinates: { lat: 11.58, lng: 107.82 }
    },
    totalArea: 13.5,
    plotCount: 500,
    availablePlots: 120,
    priceRange: [8000000, 12000000],
    amenities: ['Hồ bơi', 'Công viên', 'Nhà hàng', 'Khu BBQ'],
    masterPlan: 'https://picsum.photos/1200/800?random=100',
    gallery: [
      'https://picsum.photos/800/600?random=101',
      'https://picsum.photos/800/600?random=102'
    ],
    legalStatus: '1/500',
    developer: 'Khải Hưng Corp',
    completionDate: '2024-12-31',
    featured: true,
    description: 'Khu nghỉ dưỡng đẳng cấp bậc nhất Bảo Lộc với view hồ ngọc bích.'
  },
  {
    id: 'p2',
    name: 'La Nature Bảo Lộc',
    slug: 'la-nature-bao-loc',
    category: 'dat-nen',
    location: {
      ward: 'Lộc Thành',
      district: 'Bảo Lâm',
      province: 'Lâm Đồng',
      address: 'Lý Thái Tổ nối dài',
      coordinates: { lat: 11.55, lng: 107.85 }
    },
    totalArea: 5,
    plotCount: 200,
    availablePlots: 45,
    priceRange: [5000000, 8000000],
    amenities: ['Đường dạo bộ', 'Suối tự nhiên', 'Camping'],
    masterPlan: 'https://picsum.photos/1200/800?random=103',
    gallery: [
      'https://picsum.photos/800/600?random=104',
      'https://picsum.photos/800/600?random=105'
    ],
    legalStatus: 'Sổ hồng riêng',
    developer: 'Tín Trường Thịnh',
    completionDate: '2023-06-30',
    featured: true,
    description: 'Hòa mình vào thiên nhiên với khí hậu mát mẻ quanh năm.'
  }
];