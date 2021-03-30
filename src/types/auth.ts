export interface IInit {
  isInit: boolean;
}

export interface IProfileStateUser {
  user: string;
  email: string;
}

export interface IAuth {
  userMail: string;
  userPassword: string;
  userPasswordConfirm?: string;
}

export interface IUserToAuth {
  userToSent: IAuth;
  submitStatus: string;
}
