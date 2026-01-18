import React from 'react';
import { Spin } from 'antd';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px] w-full">
      <Spin size="large" tip="Đang tải dữ liệu..." />
    </div>
  );
};