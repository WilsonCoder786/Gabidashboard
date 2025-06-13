import { useEffect } from 'react';

import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import CustomerPage from './pages/CustomerPage';
import DriverPage from './pages/DriverPage';
import VendorPage from './pages/VendorPage';
import ZonePage from './pages/ZonePage';
import ProductPage from './pages/ProductPage';
import SlidersPage from './pages/SlidersPage';
import SettingsPage from './pages/SettingsPage';

export default function Router() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, []);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'customer', element: <CustomerPage /> },
        { path: 'driver', element: <DriverPage /> },
        { path: 'vendor', element: <VendorPage /> },
        { path: 'zone', element: <ZonePage /> },
        { path: 'product', element: <ProductPage /> },
        { path: 'sliders', element: <SlidersPage /> },
        { path: 'settings', element: <SettingsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
