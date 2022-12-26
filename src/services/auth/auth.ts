import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, API_URL } from '../../environments';
import { getTokenInfo } from '~/lib/auth/authlib';
type Props = {
  username: string;
  password: string;
};
export const signIn = () => {
  return {
    queryFn({ username, password }: Props) {
      const data = new FormData();

      data.append('grant_type', 'password');
      data.append('client_id', CLIENT_ID);
      data.append('client_secret', CLIENT_SECRET);
      data.append('username', username);
      data.append('password', password);

      return axios
        .post(`${API_URL}/auth/token/`, data, {})
        .then((response) => response.data);
    },
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
type singUpFormType = {
  username: string;
  password: string;
  email: string;
  confirm_password: string;
};
export const signUpMutation = () => {
  return {
    queryFn({ username, password, email, confirm_password }: singUpFormType) {
      const data = new FormData();

      data.append('username', username);
      data.append('password', password);
      data.append('email', email);
      data.append('confirm_password', confirm_password);

      return axios
        .post(`${API_URL}/users/`, data, {})
        .then((response) => response.data);
    },
  };
};
