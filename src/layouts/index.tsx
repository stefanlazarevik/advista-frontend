import Header from "~/layouts/Header";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "~/services/user/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = (props: LayoutProps) => {
  const router = useNavigate();
  const { status } = useQuery(
    getUserProfile().queryKey,
    getUserProfile().queryFn,
    {
      onError(error: any) {
        const isInvalid = error?.response?.status !== 200;
        if (isInvalid) {
          toast.error("Your session has expired. Please log in");
          router("/sign-in");
        }
      },
      retry: 1,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 100000,
    }
  );
  if (status === "loading") {
    return <div></div>;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {props.children}
    </div>
  );
};
export default Layout;
