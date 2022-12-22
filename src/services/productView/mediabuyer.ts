import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';
import { Product } from '~/components/Accounts';
import { MediaBuyerType } from '~/components/Media Buyer/MediaBuyer';
type ResponseType = {
  count: number;
  next?: string;
  previous?: string;
  total_page: number;
  results: {
    success: boolean;
    data: MediaBuyerType[];
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
