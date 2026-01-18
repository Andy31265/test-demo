export const PATHS = {
  HOME: '/',
  PROPERTIES: '/mua-ban-dat',
  PROPERTY_DETAIL: '/mua-ban-dat/:id',
  PROJECTS: '/du-an',
  PROJECT_DETAIL: '/du-an/:slug',
  NEWS: '/tin-tuc',
  SUBMIT_PROPERTY: '/dang-tin',
  CONTACT: '/lien-he',
  ABOUT: '/gioi-thieu'
} as const;

export const LOCATIONS = [
  { label: 'Phường 1', value: 'phuong-1' },
  { label: 'Phường 2', value: 'phuong-2' },
  { label: 'Phường Lộc Phát', value: 'loc-phat' },
  { label: 'Phường Lộc Sơn', value: 'loc-son' },
  { label: 'Xã Đambri', value: 'dambri' },
  { label: 'Xã Lộc Châu', value: 'loc-chau' },
  { label: 'Huyện Bảo Lâm', value: 'bao-lam' }
];

export const PROPERTY_TYPES = [
  { label: 'Đất nền thổ cư', value: 'land' },
  { label: 'Đất vườn/Nông nghiệp', value: 'farm' },
  { label: 'Nhà phố', value: 'house' },
  { label: 'Biệt thự nghỉ dưỡng', value: 'villa' }
];

export const DIRECTIONS = [
  { label: 'Đông', value: 'dong' },
  { label: 'Tây', value: 'tay' },
  { label: 'Nam', value: 'nam' },
  { label: 'Bắc', value: 'bac' },
  { label: 'Đông Nam', value: 'dong-nam' },
  { label: 'Đông Bắc', value: 'dong-bac' },
  { label: 'Tây Nam', value: 'tay-nam' },
  { label: 'Tây Bắc', value: 'tay-bac' }
];