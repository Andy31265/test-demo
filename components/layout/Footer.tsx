import React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Space } from 'antd';
import { FacebookFilled, YoutubeFilled, EnvironmentFilled, PhoneFilled, MailFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

export const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 md:px-12">
      <Row gutter={[32, 32]}>
        {/* Company Info */}
        <Col xs={24} md={8}>
          <div className="mb-6">
            <span className="text-2xl font-bold text-white tracking-tight">
              Datnen<span className="text-emerald-500">baoloc</span>.vn
            </span>
          </div>
          <Text className="text-gray-400 block mb-6 leading-relaxed">
            Nền tảng kết nối giao dịch bất động sản uy tín hàng đầu tại Bảo Lộc. Chúng tôi cung cấp thông tin minh bạch, chính xác và giải pháp đầu tư hiệu quả.
          </Text>
          <Space size="large">
            <FacebookFilled className="text-2xl hover:text-emerald-500 cursor-pointer transition-colors" />
            <YoutubeFilled className="text-2xl hover:text-red-500 cursor-pointer transition-colors" />
          </Space>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} className="!text-white mb-6">Liên kết nhanh</Title>
          <ul className="space-y-3">
            <li><Link to={PATHS.PROPERTIES} className="hover:text-emerald-400 transition-colors">Mua bán đất nền</Link></li>
            <li><Link to={PATHS.PROJECTS} className="hover:text-emerald-400 transition-colors">Dự án nổi bật</Link></li>
            <li><Link to={PATHS.NEWS} className="hover:text-emerald-400 transition-colors">Tin tức thị trường</Link></li>
            <li><Link to={PATHS.SUBMIT_PROPERTY} className="hover:text-emerald-400 transition-colors">Ký gửi nhà đất</Link></li>
            <li><Link to={PATHS.CONTACT} className="hover:text-emerald-400 transition-colors">Liên hệ tư vấn</Link></li>
          </ul>
        </Col>

        {/* Contact Info */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} className="!text-white mb-6">Thông tin liên hệ</Title>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <EnvironmentFilled className="text-emerald-500 mt-1" />
              <span>123 Trần Phú, Phường Lộc Sơn, TP. Bảo Lộc, Lâm Đồng</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneFilled className="text-emerald-500" />
              <a href="tel:0901234567" className="hover:text-white">090 123 4567</a>
            </div>
            <div className="flex items-center gap-3">
              <MailFilled className="text-emerald-500" />
              <a href="mailto:info@datnenbaoloc.vn" className="hover:text-white">info@datnenbaoloc.vn</a>
            </div>
          </div>
          
          <div className="mt-6">
            <Text className="text-gray-400 block mb-2">Đăng ký nhận tin:</Text>
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder="Email của bạn" />
              <Button type="primary" className="bg-emerald-600 border-emerald-600">Gửi</Button>
            </Space.Compact>
          </div>
        </Col>
      </Row>
      
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
        © 2024 Datnenbaoloc.vn. All rights reserved.
      </div>
    </AntFooter>
  );
};