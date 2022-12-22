import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL, CLIENT_ID } from '~/environments';

export const getUserProfile = () => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      return axios
        .get(`${API_URL}/user-profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    queryKey: ['self'],
  };
};
const { access_token } = getTokenInfo();
export const logoutUser = () => {
  return {
    queryFn() {
      const data = new FormData();
      data.append('client_id', CLIENT_ID);
      data.append('token', access_token);

      return axios
        .post(`${API_URL}/auth/revoke_token/`, data, {})
        .then((response) => response.data);
    },
  };
};
