import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Row, Col, Typography, Card, Tag, Button, Carousel, Divider, Avatar, Descriptions, Breadcrumb } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, SafetyCertificateOutlined, CompassOutlined, CheckCircleFilled } from '@ant-design/icons';
import { propertyService } from '../../services/propertyService';
import { Loading } from '../../components/ui/Loading';
import { formatCurrency, formatArea, formatDate } from '../../utils/format';
import { PATHS } from '../../constants';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyService.getPropertyById(id!),
    enabled: !!id
  });

  if (isLoading) return <Loading />;
  if (!property) return <div className="p-12 text-center">Không tìm thấy bất động sản</div>;

  return (
    <div className="bg-white pb-12">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumb
            items={[
              { title: <Link to={PATHS.HOME}>Trang chủ</Link> },
              { title: <Link to={PATHS.PROPERTIES}>Mua bán đất</Link> },
              { title: property.title.substring(0, 30) + '...' }
            ]}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Row gutter={[32, 32]}>
          {/* Main Content */}
          <Col xs={24} lg={16}>
            {/* Gallery */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-8 bg-gray-100">
              <Carousel autoplay effect="fade">
                {property.images.map((img, idx) => (
                  <div key={idx} className="h-[400px] md:h-[500px]">
                    <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Header Info */}
            <div className="mb-6">
                <Tag color="blue" className="mb-2 uppercase">{property.propertyType === 'land' ? 'Đất nền' : 'Nhà ở'}</Tag>
                {property.status === 'sold' && <Tag color="red" className="mb-2 uppercase">Đã bán</Tag>}
                <Title level={2} className="!mb-2">{property.title}</Title>
                <div className="flex items-center gap-2 text-gray-500">
                  <EnvironmentOutlined /> 
                  <Text>{property.location.address}, {property.location.ward}, {property.location.district}</Text>
                </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-emerald-50 p-6 rounded-xl border border-emerald-100">
               <div>
                  <Text type="secondary" className="block text-xs uppercase mb-1">Mức giá</Text>
                  <Text className="text-xl font-bold text-emerald-600">{formatCurrency(property.price)}</Text>
               </div>
               <div>
                  <Text type="secondary" className="block text-xs uppercase mb-1">Diện tích</Text>
                  <Text className="text-xl font-bold">{formatArea(property.area)}</Text>
               </div>
               <div>
                  <Text type="secondary" className="block text-xs uppercase mb-1">Pháp lý</Text>
                  <Text className="font-medium">{property.legalStatus === 'so-do' ? 'Sổ đỏ riêng' : 'Đang chờ sổ'}</Text>
               </div>
               <div>
                  <Text type="secondary" className="block text-xs uppercase mb-1">Hướng</Text>
                  <Text className="font-medium capitalize">{property.direction.replace('-', ' ')}</Text>
               </div>
            </div>

            {/* Description */}
            <div className="mb-8">
               <Title level={4} className="border-l-4 border-emerald-500 pl-3 mb-4">Thông tin mô tả</Title>
               <Paragraph className="text-base leading-relaxed whitespace-pre-line text-gray-700">
                 {property.description}
               </Paragraph>
            </div>

            {/* Details Table */}
            <div className="mb-8">
               <Title level={4} className="border-l-4 border-emerald-500 pl-3 mb-4">Đặc điểm bất động sản</Title>
               <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                  <Descriptions.Item label="Mặt tiền đường">{property.roadWidth}m</Descriptions.Item>
                  <Descriptions.Item label="Ngày đăng">{formatDate(property.postedDate)}</Descriptions.Item>
                  <Descriptions.Item label="Mã tin">{property.id}</Descriptions.Item>
                  <Descriptions.Item label="Loại hình">{property.listingType === 'sale' ? 'Bán' : 'Cho thuê'}</Descriptions.Item>
               </Descriptions>
            </div>

            {/* Map (Placeholder) */}
            <div className="rounded-xl overflow-hidden h-[300px] bg-gray-200 relative mb-8 flex items-center justify-center">
                <div className="text-center">
                    <EnvironmentOutlined className="text-4xl text-gray-400 mb-2" />
                    <Text className="block text-gray-500">Bản đồ vị trí (Tích hợp Google Maps API)</Text>
                    <Text code className="text-xs">Lat: {property.location.coordinates.lat}, Lng: {property.location.coordinates.lng}</Text>
                </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <div className="sticky top-24 space-y-6">
               {/* Seller Card */}
               <Card className="border-emerald-100 shadow-md">
                  <div className="flex flex-col items-center text-center mb-6">
                     <Avatar size={80} src={property.seller.avatar} className="mb-3 border-2 border-emerald-500" />
                     <Title level={4} className="!mb-0">{property.seller.name}</Title>
                     <Text type="secondary">{property.seller.type === 'agent' ? 'Môi giới chuyên nghiệp' : 'Chính chủ'}</Text>
                  </div>
                  
                  <div className="space-y-3">
                     <Button type="primary" size="large" block icon={<PhoneOutlined />} className="bg-emerald-600 h-12 text-lg font-medium">
                        {property.seller.phone}
                     </Button>
                     <Button block size="large" className="h-12 border-blue-500 text-blue-600 font-medium">
                        Chat Zalo
                     </Button>
                     <Button block size="large">
                        Gửi Email
                     </Button>
                  </div>
               </Card>

               {/* Safety Tips */}
               <Card size="small" className="bg-yellow-50 border-yellow-100">
                  <div className="flex items-center gap-2 mb-2 text-yellow-700 font-semibold">
                     <SafetyCertificateOutlined /> Lưu ý an toàn
                  </div>
                  <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                     <li>KHÔNG đặt cọc khi chưa xác định rõ pháp lý</li>
                     <li>Kiểm tra quy hoạch tại cơ quan chức năng</li>
                     <li>Giao dịch tại phòng công chứng</li>
                  </ul>
               </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};