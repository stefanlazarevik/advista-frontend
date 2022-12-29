import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';
import { MediaBuyerType, TotalReportType } from '~/utils/interface';

type ResponseType = {
  results: {
    success: boolean;
    data: MediaBuyerType[];
    media_buyer_reports: TotalReportType;
  };
};
type ParamsType = {
  selectTab: number;
  start_date: string;
  end_date: string;
};
export const getMediaBuyer = (params: ParamsType) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      let paramsData = {
        start_date: params?.start_date,
        end_date: params?.end_date,
      };
      return axios
        .get<ResponseType>(`${API_URL}/partners/`, {
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
      'media-buyer',
      params?.end_date,
      params?.start_date,
      params?.selectTab,
    ],
  };
};
