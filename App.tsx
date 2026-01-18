import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/Home/HomePage';
import { PropertiesPage } from './pages/Properties/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetail/PropertyDetailPage';
import { SubmitPropertyPage } from './pages/SubmitProperty/SubmitPropertyPage';
import { PATHS } from './constants';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.PROPERTIES} element={<PropertiesPage />} />
        <Route path={PATHS.PROPERTY_DETAIL} element={<PropertyDetailPage />} />
        <Route path={PATHS.SUBMIT_PROPERTY} element={<SubmitPropertyPage />} />
        <Route path={PATHS.PROJECTS} element={<div className="p-20 text-center">Trang Dự Án (Đang cập nhật)</div>} />
        <Route path={PATHS.NEWS} element={<div className="p-20 text-center">Trang Tin Tức (Đang cập nhật)</div>} />
        <Route path={PATHS.CONTACT} element={<div className="p-20 text-center">Trang Liên Hệ (Đang cập nhật)</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;