import { UserProfileType } from '~/services/user/user';

type tokenObj = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

export const setTokenInfo = (data: tokenObj) => {
  localStorage.setItem('token', JSON.stringify(data));
};
export const getTokenInfo = () => {
  try {
    const token: any = localStorage.getItem('token');
    return JSON.parse(token ?? {});
  } catch (error) {
    return {};
  }
};
export const deleteTokenInfo = () => {
  localStorage.setItem('token', '');
};
export const isSuperUser = (user: UserProfileType = {}) => {
  return user?.is_superuser ?? false;
};

export const isAdmin = (user: UserProfileType = {}) => {
  return Number(user.user_mode) === 2;
};
