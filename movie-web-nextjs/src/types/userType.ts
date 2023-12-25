type UserLogin = {
  email: string;
  password: string;
};
type UserInfo = {
  id: string;
  email: string;
  full_name: string;
  image: string;
  birthday: Date;
  is_superuser: boolean;
};
type TokenInfo = {
  access: string;
  refresh: string;
};
type UserType = {
  user: UserInfo;
  token: TokenInfo;
};

type UserCommentType = {
  id: string;
  email: string;
  full_name: string;
  image: string;
};

export type { UserLogin, UserType, UserCommentType };
