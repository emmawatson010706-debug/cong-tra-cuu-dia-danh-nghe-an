import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

import Index from './pages/Index.tsx';
import CommunePage from './pages/don-vi/page.tsx';
import StatsPage from './pages/thong-ke/page.tsx';
import NotFound from './pages/NotFound.tsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/thong-ke" element={<StatsPage />} />
        <Route path="/don-vi/:slug" element={<CommunePage />} />
        <Route path="/dia-danh/:slug" element={<CommunePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);