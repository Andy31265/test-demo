import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined, PhoneOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants';

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: PATHS.HOME, label: 'Trang Chủ' },
    { key: PATHS.PROPERTIES, label: 'Mua Bán Đất' },
    { key: PATHS.PROJECTS, label: 'Dự Án' },
    { key: PATHS.NEWS, label: 'Tin Tức' },
    { key: PATHS.CONTACT, label: 'Liên Hệ' },
  ];

  return (
    <AntHeader className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link to={PATHS.HOME} className="flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
        </div>
        <span className="text-xl font-bold text-emerald-800 tracking-tight">
          Datnen<span className="text-emerald-600">baoloc</span>.vn
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center flex-1 justify-center">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems.map(item => ({
            key: item.key,
            label: <Link to={item.key}>{item.label}</Link>
          }))}
          className="border-none bg-transparent min-w-[400px] justify-center text-base font-medium"
        />
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <Button 
          type="primary" 
          icon={<PlusCircleOutlined />} 
          className="bg-emerald-600 hover:bg-emerald-500 border-none"
          onClick={() => navigate(PATHS.SUBMIT_PROPERTY)}
        >
          Đăng Tin
        </Button>
        <Button 
          icon={<PhoneOutlined />}
          className="border-emerald-600 text-emerald-600 hover:text-emerald-500"
          href="tel:0901234567"
        >
          Hotline
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button 
          type="text" 
          icon={<MenuOutlined className="text-xl" />} 
          onClick={() => setMobileMenuOpen(true)} 
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems.map(item => ({
            key: item.key,
            label: <Link to={item.key} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
          }))}
          className="border-none"
        />
        <div className="p-4 flex flex-col gap-3 mt-4 border-t border-gray-100">
          <Button 
            type="primary" 
            block 
            icon={<PlusCircleOutlined />}
            className="bg-emerald-600"
            onClick={() => {
              navigate(PATHS.SUBMIT_PROPERTY);
              setMobileMenuOpen(false);
            }}
          >
            Đăng Tin Miễn Phí
          </Button>
          <Button block icon={<PhoneOutlined />} href="tel:0901234567">
            090 123 4567
          </Button>
        </div>
      </Drawer>
    </AntHeader>
  );
};