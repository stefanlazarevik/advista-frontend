import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, API_URL } from "../../environments";
type Props = {
  username: string;
  password: string;
};
export const signIn = () => {
  return {
    queryFn({ username, password }: Props) {
      const data = new FormData();

      data.append("grant_type", "password");
      data.append("client_id", CLIENT_ID);
      data.append("client_secret", CLIENT_SECRET);
      data.append("username", username);
      data.append("password", password);

      return axios
        .post(`${API_URL}/auth/token/`, data, {})
        .then((response) => response.data);
    },
  };
};
