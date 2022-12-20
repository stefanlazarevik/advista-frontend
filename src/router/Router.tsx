import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from '~/routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
