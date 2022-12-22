import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';
import { MediaBuyerType } from '~/components/Media Buyer/MediaBuyer';
import { VerticalsType } from '~/components/Verticals/Verticals';
type ResponseType = {
  count: number;
  next?: string;
  previous?: string;
  total_page: number;
  results: {
    success: boolean;
    data: VerticalsType[];
  };
};
type ParamsType = {
  selectTab: number;
  start_date: string;
  end_date: string;
};
export const getVerticals = (params: ParamsType) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      let paramsData = {
        start_date: params?.start_date,
        end_date: params?.end_date,
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
    ],
  };
};