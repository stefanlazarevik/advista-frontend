type tokenObj = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

export const setTokenInfo = (data: tokenObj) => {
  localStorage.setItem("token", JSON.stringify(data));
};
export const getTokenInfo = () => {
  try {
    const token: any = localStorage.getItem("token");
    return JSON.parse(token ?? {});
  } catch (error) {
    return {};
  }
};
