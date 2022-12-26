import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import LoadingPage from '~/components/LoadingPage';
import Layout from '~/layouts';

const AsyncDashboard = React.lazy(() => import('../screens/ProductsDashboard'));
const AsyncSignIn = React.lazy(() => import('../screens/SignIn'));
const AsyncSignOut = React.lazy(() => import('../screens/SignUp/SignUp'));

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
    element: (
      <React.Suspense fallback={<LoadingPage />}>
        <AsyncSignIn />
      </React.Suspense>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <React.Suspense fallback={<LoadingPage />}>
        <AsyncSignOut />
      </React.Suspense>
    ),
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
