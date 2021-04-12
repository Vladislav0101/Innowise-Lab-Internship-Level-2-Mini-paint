export interface IRootState {
  version: string;
}

// export * from "./auth";
// export * from "./paint";

export interface IInit {
  isInit: boolean;
}

export interface IProfileStateUser {
  user: string;
  email: string;
}

export interface IPasswordToCheck {
  userPasswordConfirm: string;
}

export interface IAuth {
  userMail: string;
  userPassword: string;
}

export interface ICanvas {
  canvas: HTMLCanvasElement | null;
  context: any;
  sizeLocal: number;
  colorLocal: string;
  action: string;
  arrToBuildFigure: Array<Array<number>>;
  imageData: any;
}

export interface IProfileStateCreate {
  size: number;
  color: string;
  mode: string;
}

export interface IFeedObject {
  [key: string]: string;
}

export interface IFeed {
  arrayOfUrls: Array<IFeedObject>;
  token: null;
}

export interface IRenderingContext {
  context: CanvasRenderingContext2D | null | undefined;
}

export interface IVersion {
  features: object;
  version: string;
  versionReviewed: boolean;
}
