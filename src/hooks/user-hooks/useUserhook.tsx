import { useNavigate } from "react-router";
import { getUserProfile } from "~/services/user/user";
import { useQuery } from "@tanstack/react-query";
const useUserHook = () => {
  const router = useNavigate();
  return useQuery(getUserProfile().queryKey, getUserProfile().queryFn, {
    onError(error: any) {
      const isInvalid = error?.response?.status !== 200;
      if (isInvalid) {
        router("/sign-in");
      }
    },
    retry: 1,
    cacheTime: 100000,
  });
};
export default useUserHook;
