import axios from 'axios';

import { API_URL } from '~/environments';
import { getTokenInfo } from '~/lib/auth/authlib';
type ParamsType = {
  start_date: string;
  end_date: string;
};
export const getTotalReport = (params: ParamsType) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      return axios
        .get(`${API_URL}/total-report/`, {
          params: {
            start_date: params?.start_date,
            end_date: params?.end_date,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data.data);
    },
    queryKey: ['total-report', params?.start_date, params?.end_date],
  };
};
