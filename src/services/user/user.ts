import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL, CLIENT_ID } from '~/environments';
import { CustomerFormType } from '~/components/CustomerForm';
export type UserProfileType = {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  user_mode?: string | number;
  is_superuser?: boolean;
  phone?: string;
  avatar?: string;
  avatar_thumb?: string;
  currency?: string;
};
type UserListType = {
  results: UserProfileType[];
};
export const getUserProfile = () => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      return axios
        .get<UserProfileType>(`${API_URL}/user-profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    queryKey: ['self'],
  };
};
type UserListParams = {
  query?: string;
};
export const getUserList = (params: UserListParams) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      return axios
        .get<UserListType>(`${API_URL}/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            query: params?.query,
          },
        })
        .then(({ data }) => data);
    },
    queryKey: ['users', 'list', params?.query],
  };
};
export const deleteUser = () => {
  return {
    queryFn(id: number) {
      const token = getTokenInfo()?.access_token;
      return axios
        .delete(`${API_URL}/users/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data);
    },
  };
};
export const getUserById = (id: number) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      return axios
        .get<UserProfileType>(`${API_URL}/users/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    queryKey: ['users', id],
  };
};
export const createUser = () => {
  return {
    queryFn(data: CustomerFormType) {
      const token = getTokenInfo()?.access_token;
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        // @ts-ignore
        formData.append(key, value);
      }
      return axios
        .post(`${API_URL}/users/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data);
    },
  };
};
export const updateUser = (id: number) => {
  return {
    queryFn(data: any) {
      const token = getTokenInfo()?.access_token;
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        // @ts-ignore
        formData.append(key, value);
      }
      return axios
        .patch(`${API_URL}/users/${id}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data);
    },
  };
};

type ActiveOrInactiveType = {
  id: number;
  status: boolean;
};

export const makeUserActive = () => {
  return {
    queryFn({ id, status }: ActiveOrInactiveType) {
      const token = getTokenInfo()?.access_token;
      return axios
        .patch(
          `${API_URL}/users/${id}/`,
          {
            is_active: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
  };
};
