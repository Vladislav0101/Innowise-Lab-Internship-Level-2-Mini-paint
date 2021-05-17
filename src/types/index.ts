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
  isStart: boolean;
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
  isInfiniteScrollEnabled: boolean;
}

export interface IRenderingContext {
  context: CanvasRenderingContext2D | null | undefined;
}

export interface IVersion {
  features: { [key: string]: IFeaturesElement };
  version: string;
  isLearningPathActive: boolean;
  isVersionsMatch: boolean;
  isNeedToLearningPath: boolean;
}

export interface IFeaturesElement {
  isChecked: boolean;
  text: string;
}

export interface IUser {
  userAccountInfo: null | { [key: string]: string };
  userAvatar: string | null;
}

export interface ISomeoneUser {
  someoneUserInfo: null | { [key: string]: string };
  someoneUserEmail: null | string;
  usersAvatars: { [key: string]: string };
}

export interface IAnalytics {
  // countEvents: { [key: string]: number };
  drawingProcess: {
    start: number | null;
    end: number | null;
    isDrawing: boolean;
  };
  dataAnalytics: { [key: number]: {} } | null;
}

export interface ICharts {
  objEventCount: { [key: string]: number } | null;
}
