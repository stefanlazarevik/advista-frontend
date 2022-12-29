import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';
import { TotalReportType, VerticalsType } from '~/utils/interface';

type ResponseType = {
  results: {
    success: boolean;
    data: VerticalsType[];
    vertical_reports: TotalReportType;
  };
};
type ParamsType = {
  selectTab: number;
  start_date: string;
  end_date: string;
  verticalsSearchFilter: string;
};
export const getVerticals = (params: ParamsType) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      let paramsData = {
        start_date: params?.start_date,
        end_date: params?.end_date,
        query: params?.verticalsSearchFilter,
      };
      return axios
        .get<ResponseType>(`${API_URL}/verticals/`, {
          params: {
            ...paramsData,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    queryKey: [
      'verticals',
      params?.end_date,
      params?.start_date,
      params?.selectTab,
      params?.verticalsSearchFilter,
    ],
  };
};
