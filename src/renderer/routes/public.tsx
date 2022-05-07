import { lazyImport } from 'renderer/utils/lazyImport';

const { NotificationRoutes } = lazyImport(
  () => import('renderer/features/notification'),
  'NotificationRoutes'
);

export const publicRoutes = [
  {
    path: '/*',
    element: <NotificationRoutes />,
  },
];
