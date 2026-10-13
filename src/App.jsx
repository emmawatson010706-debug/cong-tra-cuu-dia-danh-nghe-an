import React from 'react';
import { HomePage } from './pages/HomePage.jsx';
import { PlaceDetailPage } from './pages/PlaceDetailPage.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';

export default function App() {
  const path = window.location.pathname;
  if (path.startsWith('/admin-login')) return <AdminLogin />;
  if (path.startsWith('/admin')) return <AdminDashboard />;
  if (path.startsWith('/dia-danh/')) {
    const slug = path.split('/').filter(Boolean).pop();
    return <PlaceDetailPage slug={slug} />;
  }
  return <HomePage />;
}
