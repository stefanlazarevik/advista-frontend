import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';

export const updateProfile = () => {
  return {
    queryFn(data: any) {
      const token = getTokenInfo()?.access_token;
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        // @ts-ignore
        formData.append(key, value);
      }
      return axios
        .post(`${API_URL}/user-profile/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data);
    },
  };
};
