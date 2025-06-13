// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('dashboard-layout-svgrepo-com'),
  },
  {
    title: 'Customer Controls',
    path: '/dashboard/customer',
    icon: icon('user-circle-svgrepo-com'),
  },
  {
    title: 'Driver Controls',
    path: '/dashboard/driver',
    icon: icon('car-svgrepo-com'),
  },
  {
    title: 'Vendor Admin Controls',
    path: '/dashboard/vendor',
    icon: icon('shop-svgrepo-com'),
  },
  {
    title: 'Zone Controls',
    path: '/dashboard/zone',
    icon: icon('map-svgrepo-com'),
  },
  {
    title: 'Products Controls',
    path: '/dashboard/product',
    icon: icon('post-svgrepo-com'),
  },
  {
    title: 'App Sliders Controls',
    path: '/dashboard/sliders',
    icon: icon('image-svgrepo-com'),
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: icon('settings-svgrepo-com'),
  },
  {
    title: 'logout',
    path: '/login',
    icon: icon('logout-svgrepo-com'),
  },
];

export default navConfig;
