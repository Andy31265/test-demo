import React from 'react';
import { Layout } from 'antd';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Content className="flex-grow">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};