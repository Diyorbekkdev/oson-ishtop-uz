export type SignInForm = {
  phone?: string;
  password: string;
  username?: string;
};

export type SignInData = {
  jwt: string;
  refreshToken: string;
  id: string;
  phone: string;
  roles: string[];
};
