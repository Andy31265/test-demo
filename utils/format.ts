export const formatCurrency = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)} tỷ`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)} triệu`;
  }
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

export const formatPricePerM2 = (price: number, area: number) => {
  const perM2 = price / area;
  return `${(perM2 / 1000000).toFixed(1)} tr/m²`;
};

export const formatArea = (value: number) => {
  return `${value} m²`;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};