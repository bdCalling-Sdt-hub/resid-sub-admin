import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Accepted = lazy(() => import('../pages/Accepted'));
const ReUpload = lazy(() => import('../pages/ReUpload'));
const Pending = lazy(() => import('../pages/Pending'));
const ResidenceDetails = lazy(() => import('../pages/ResidenceDetails'));
const Residence = lazy(() => import('../pages/Residence'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/edit-profile',
    title: 'Edit Profile',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/accepted',
    title: 'Accepted Residence',
    component: Accepted,
  },
  {
    path: '/re-upload',
    title: 'Re Upload Residence',
    component: ReUpload,
  },
  {
    path: '/pending',
    title: 'Pending Residence',
    component: Pending,
  },
  {
    path: '/residence',
    title: 'Residence',
    component: Residence,
  },
  {
    path: '/residence/:id',
    title: 'Residence Details',
    component: ResidenceDetails,
  },
];

const routes = [...coreRoutes];
export default routes;
