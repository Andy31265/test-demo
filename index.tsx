import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#059669', // Emerald 600
              fontFamily: "'Inter', sans-serif",
              borderRadius: 8,
            },
            components: {
              Button: {
                controlHeightLG: 48,
                borderRadius: 8,
              },
              Input: {
                controlHeightLG: 48,
              },
              Select: {
                controlHeightLG: 48,
              }
            }
          }}
        >
          <HashRouter>
            <App />
          </HashRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}