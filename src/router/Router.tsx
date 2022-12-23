import React from 'react';
import Loadable from 'react-loadable';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import LoadingPage from '~/components/LoadingPage';
import Layout from '~/layouts';
import Root from '~/routes/root';
import ProductsDashboard from '~/screens/ProductsDashboard';
import SignIn from '~/screens/SignIn';

const AsyncDashboard = React.lazy(() => import('../screens/ProductsDashboard'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<LoadingPage />}>
        <Layout>
          <AsyncDashboard />
        </Layout>
      </React.Suspense>
    ),
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: (
      <React.Suspense fallback={<LoadingPage />}>
        <Layout>
          <AsyncDashboard />
        </Layout>
      </React.Suspense>
    ),
  },
  {
    path: '*',
    element: <Navigate to={'/sign-in'} />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
