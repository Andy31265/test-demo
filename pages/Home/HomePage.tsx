import React from 'react';
import { Typography, Input, Select, Button, Row, Col, Card, Tag } from 'antd';
import { SearchOutlined, CheckCircleOutlined, RightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { projectService } from '../../services/projectService';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Loading } from '../../components/ui/Loading';
import { PATHS, LOCATIONS } from '../../constants';

const { Title, Text } = Typography;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: featuredProps, isLoading: loadingProps } = useQuery({
    queryKey: ['featuredProperties'],
    queryFn: propertyService.getFeaturedProperties
  });

  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: projectService.getFeaturedProjects
  });

  const onSearch = (value: string) => {
    navigate(`${PATHS.PROPERTIES}?q=${value}`);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden ">
        <img
          src="https://picsum.photos/1920/1080?blur=2"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Bao Loc Landscape"
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Title className="!text-white text-3xl md:text-5xl md:leading-tight mb-6 drop-shadow-lg">
            Khám Phá Bất Động Sản<br /> <span className="text-emerald-400">Tiềm Năng Tại Bảo Lộc</span>
          </Title>
          <Text className="text-gray-200 text-lg md:text-xl block mb-10 max-w-2xl mx-auto drop-shadow-md">
            Hơn 1000+ lô đất nền, biệt thự nghỉ dưỡng và dự án đầu tư sinh lời cao đang chờ đón bạn.
          </Text>

          <div className="bg-white p-4 rounded-xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <Input
              size="large"
              placeholder="Tìm kiếm theo tên đường, khu vực..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="flex-grow"
            />
            <Select
              size="large"
              placeholder="Chọn khu vực"
              className="w-full md:w-48"
              options={LOCATIONS}
            />
            <Button
              type="primary"
              size="large"
              className="bg-emerald-600 hover:bg-emerald-500 w-full md:w-auto px-8"
              onClick={() => navigate(PATHS.PROPERTIES)}
            >
              Tìm Kiếm
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <Title level={2} className="mb-2">Bất Động Sản Nổi Bật</Title>
              <Text className="text-gray-500">Những lô đất đẹp, pháp lý rõ ràng được tuyển chọn</Text>
            </div>
            <Button type="link" onClick={() => navigate(PATHS.PROPERTIES)} className="flex items-center text-emerald-600">
              Xem tất cả <RightOutlined />
            </Button>
          </div>

          {loadingProps ? <Loading /> : (
            <Row gutter={[24, 24]}>
              {featuredProps?.map(prop => (
                <Col key={prop.id} xs={24} sm={12} lg={6}>
                  <PropertyCard property={prop} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Title level={2} className="mb-12">Tại Sao Chọn Datnenbaoloc.vn?</Title>
          <Row gutter={[32, 32]}>
            {[
              { title: 'Pháp Lý Minh Bạch', desc: '100% sản phẩm có sổ đỏ/sổ hồng riêng, công chứng ngay' },
              { title: 'Thông Tin Chính Xác', desc: 'Hình ảnh thực tế, giá bán niêm yết trực tiếp từ chủ' },
              { title: 'Hỗ Trợ Tận Tâm', desc: 'Đưa đón tham quan miễn phí, tư vấn pháp lý 24/7' },
              { title: 'Giá Tốt Nhất', desc: 'Cam kết giá gốc từ chủ đầu tư và chính chủ gửi bán' }
            ].map((item, idx) => (
              <Col key={idx} xs={24} sm={12} md={6}>
                <div className="bg-white p-6 rounded-xl shadow-sm h-full hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 text-xl">
                    <CheckCircleOutlined />
                  </div>
                  <Title level={4} className="mb-2 text-lg">{item.title}</Title>
                  <Text className="text-gray-500">{item.desc}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <Title level={2} className="mb-2">Dự Án Tiêu Biểu</Title>
              <Text className="text-gray-500">Các khu nghỉ dưỡng và đất nền dự án quy mô lớn</Text>
            </div>
            <Button type="link" onClick={() => navigate(PATHS.PROJECTS)} className="flex items-center text-emerald-600">
              Xem tất cả <RightOutlined />
            </Button>
          </div>

          {loadingProjects ? <Loading /> : (
            <Row gutter={[24, 24]}>
              {projects?.slice(0, 2).map(project => (
                <Col key={project.id} xs={24} md={12}>
                  <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[300px]" onClick={() => navigate(`${PATHS.PROJECTS}`)}>
                    <img
                      src={project.masterPlan}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Tag className="bg-emerald-600 text-white border-none mb-2">{project.category === 'nghi-duong' ? 'Nghỉ dưỡng' : 'Đất nền'}</Tag>
                        <Title level={3} className="!text-white mb-1">{project.name}</Title>
                        <Text className="text-gray-300 flex items-center gap-2 mb-2">
                          <EnvironmentOutlined /> {project.location.ward}, {project.location.district}
                        </Text>
                        <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Text className="text-white">Quy mô: {project.totalArea} ha • {project.availablePlots} nền đang mở bán</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>
    </div>
  );
};