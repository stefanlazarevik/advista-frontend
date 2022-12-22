import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';
import { Product } from '~/components/Accounts';
type Params = {
  selectedTab: number;
  startDate: string;
  endDate: string;
};
type ResponseType = {
  count: number;
  next?: string;
  previous?: string;
  total_page: number;
  results: {
    success: boolean;
    data: Product[];
  };
};
export const getProducts = (params: Params) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      let paramsData = {
        start_date: params?.startDate,
        end_date: params?.endDate,
      };
      return axios
        .get<ResponseType>(`${API_URL}/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...paramsData,
          },
        })
        .then(({ data }) => data);
    },
    queryKey: [
      'products',
      params?.selectedTab,
      params?.startDate,
      params?.endDate,
    ],
  };
};
