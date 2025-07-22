import { lazy } from 'react';

// Layout components
import MainLayout from '../components/layout/MainLayout';

// Use lazy loading for route components
const CalendarPage = lazy(() => import('./Calendar/CalendarPage'));
const ExperiencePage = lazy(() => import('./Experience/ExperiencePage'));

// Define routes structure
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CalendarPage />,
        label: 'Holiday Calendar',
      },
      {
        path: 'experience',
        element: <ExperiencePage />,
        label: 'Experience Form',
      },
      {
        path: '*',
        element: <div className="page-container">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>,
        label: 'Not Found',
      }
    ]
  }
];

export default routes; 