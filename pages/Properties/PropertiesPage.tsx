import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Row, Col, Typography, Form, Input, Select, Slider, Card, Button, Pagination, Empty, Drawer } from 'antd';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { propertyService } from '../../services/propertyService';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Loading } from '../../components/ui/Loading';
import { LOCATIONS, PROPERTY_TYPES } from '../../constants';
import { PropertyFilters } from '../../types';

const { Title, Text } = Typography;
const { Option } = Select;

// Extract FilterForm to prevent re-rendering and focus loss
const FilterForm = ({ form, onValuesChange, onReset }: { form: any, onValuesChange: (vals: any) => void, onReset: () => void }) => (
  <Form
    form={form}
    layout="vertical"
    onValuesChange={(_, allValues) => onValuesChange(allValues)}
    initialValues={{
      priceRange: [0, 10000000000],
      areaRange: [0, 5000]
    }}
  >
    <Form.Item name="keyword" label="Tìm kiếm">
      <Input placeholder="Tên đường, dự án..." allowClear />
    </Form.Item>

    <Form.Item name="location" label="Khu vực">
      <Select mode="multiple" placeholder="Chọn phường/xã" allowClear>
        {LOCATIONS.map(loc => <Option key={loc.value} value={loc.value}>{loc.label}</Option>)}
      </Select>
    </Form.Item>

    <Form.Item name="propertyType" label="Loại hình">
      <Select placeholder="Chọn loại nhà đất" allowClear>
          {PROPERTY_TYPES.map(type => <Option key={type.value} value={type.value}>{type.label}</Option>)}
      </Select>
    </Form.Item>

    <Form.Item name="priceRange" label="Mức giá">
      <Slider 
        range 
        min={0} 
        max={10000000000} 
        step={100000000}
        tooltip={{ formatter: value => value ? `${value / 1000000000} tỷ` : '0' }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span>10 tỷ+</span>
      </div>
    </Form.Item>

    <Form.Item name="areaRange" label="Diện tích (m²)">
      <Slider 
        range 
        min={0} 
        max={5000} 
        step={50}
      />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span>5000 m²+</span>
      </div>
    </Form.Item>

    <Form.Item name="sortBy" label="Sắp xếp">
      <Select defaultValue="date_desc">
        <Option value="date_desc">Mới nhất</Option>
        <Option value="price_asc">Giá thấp đến cao</Option>
        <Option value="price_desc">Giá cao đến thấp</Option>
        <Option value="area_asc">Diện tích bé đến lớn</Option>
      </Select>
    </Form.Item>

    <Button icon={<ReloadOutlined />} onClick={onReset} block>
      Xóa bộ lọc
    </Button>
  </Form>
);

export const PropertiesPage: React.FC = () => {
  const [desktopForm] = Form.useForm();
  const [mobileForm] = Form.useForm();
  const [filters, setFilters] = useState<PropertyFilters>({ page: 1, limit: 12 });
  const [mobileFilterVisible, setMobileFilterVisible] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyService.getProperties(filters),
    placeholderData: keepPreviousData
  });

  const handleFilterChange = (values: any) => {
    setFilters(prev => ({ ...prev, ...values, page: 1 }));
  };

  const handleReset = () => {
    desktopForm.resetFields();
    mobileForm.resetFields();
    setFilters({ page: 1, limit: 12 });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="!mb-1">Mua Bán Đất Bảo Lộc</Title>
          <Text type="secondary">Tìm thấy {data?.total || 0} bất động sản phù hợp</Text>
        </div>
        <Button 
          className="md:hidden" 
          icon={<FilterOutlined />} 
          onClick={() => setMobileFilterVisible(true)}
        >
          Bộ Lọc
        </Button>
      </div>

      <Row gutter={32}>
        {/* Desktop Sidebar */}
        <Col xs={0} md={6}>
          <Card title="Bộ Lọc Tìm Kiếm" className="shadow-sm sticky top-24">
            <FilterForm form={desktopForm} onValuesChange={handleFilterChange} onReset={handleReset} />
          </Card>
        </Col>

        {/* Mobile Drawer Filter */}
        <Drawer
          title="Bộ Lọc Tìm Kiếm"
          placement="right"
          onClose={() => setMobileFilterVisible(false)}
          open={mobileFilterVisible}
        >
           <FilterForm form={mobileForm} onValuesChange={handleFilterChange} onReset={handleReset} />
        </Drawer>

        {/* Listings Grid */}
        <Col xs={24} md={18}>
          {isLoading ? (
            <Loading />
          ) : data?.data && data.data.length > 0 ? (
            <>
              <Row gutter={[24, 24]}>
                {data.data.map(property => (
                  <Col key={property.id} xs={24} sm={12} lg={8}>
                    <PropertyCard property={property} />
                  </Col>
                ))}
              </Row>
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={filters.page}
                  total={data.total}
                  pageSize={filters.limit}
                  onChange={(page) => setFilters(prev => ({ ...prev, page }))}
                  showSizeChanger={false}
                />
              </div>
            </>
          ) : (
            <Empty description="Không tìm thấy bất động sản nào phù hợp" className="mt-12" />
          )}
        </Col>
      </Row>
    </div>
  );
};