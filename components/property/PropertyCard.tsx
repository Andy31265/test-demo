import React from 'react';
import { Card, Tag, Button, Tooltip } from 'antd';
import { EnvironmentOutlined, AreaChartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Property } from '../../types';
import { formatCurrency, formatArea, formatPricePerM2 } from '../../utils/format';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants';
import { useAppStore } from '../../store/useAppStore';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, addFavorite, removeFavorite } = useAppStore();
  const liked = isFavorite(property.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (liked) removeFavorite(property.id);
    else addFavorite(property.id);
  };

  return (
    <Link to={PATHS.PROPERTY_DETAIL.replace(':id', property.id)}>
      <Card
        hoverable
        cover={
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              alt={property.title} 
              src={property.images[0]} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute top-2 left-2">
              <Tag color="green" className="font-semibold">{property.listingType === 'sale' ? 'Đang bán' : 'Cho thuê'}</Tag>
              {property.featured && <Tag color="gold">Nổi bật</Tag>}
            </div>
            <div className="absolute top-2 right-2">
               <Button 
                shape="circle" 
                icon={liked ? <HeartFilled className="text-red-500" /> : <HeartOutlined />} 
                onClick={toggleLike}
                className="bg-white/80 border-none backdrop-blur-sm"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
              <div className="text-xl font-bold">{formatCurrency(property.price)}</div>
              <div className="text-sm opacity-90">{formatPricePerM2(property.price, property.area)}</div>
            </div>
          </div>
        }
        className="h-full border-gray-200 overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300"
        bodyStyle={{ padding: '16px' }}
      >
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2 mb-2 h-12" title={property.title}>
          {property.title}
        </h3>
        
        <div className="flex items-start gap-2 mb-3 text-gray-500 text-sm h-10">
          <EnvironmentOutlined className="mt-1 flex-shrink-0" />
          <span className="line-clamp-2">{property.location.address}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-600 font-medium">
            <AreaChartOutlined />
            {formatArea(property.area)}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(property.postedDate).toLocaleDateString()}
          </div>
        </div>
      </Card>
    </Link>
  );
};