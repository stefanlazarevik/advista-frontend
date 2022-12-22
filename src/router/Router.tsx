import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Root from "~/routes/root";
import SignIn from "~/screens/SignIn";
import Layout from "~/layouts";
import ProductsDashboard from "~/screens/ProductsDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <ProductsDashboard />
      </Layout>
    ),
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <ProductsDashboard />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Navigate to={"/sign-in"}></Navigate>,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
