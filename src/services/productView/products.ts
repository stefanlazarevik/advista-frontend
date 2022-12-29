import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';
import { Product, TotalReportType } from '~/utils/interface';

type Params = {
  selectedTab: number;
  startDate: string;
  endDate: string;
};
type ResponseType = {
  results: {
    success: true;
    data: Product[];
    total_reports: TotalReportType;
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
