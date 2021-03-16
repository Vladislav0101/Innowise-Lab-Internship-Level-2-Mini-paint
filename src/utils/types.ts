export interface IRootState {
  version: string;
}
export interface IProfileStateUser {
  user: string;
  email: string;
}
export interface IUserToAuth {
  userToSent: IAuth;
  submitStatus: string;
}
export interface IAuth {
  userMail: string;
  userPassword: string;
  userPasswordConfirm?: string;
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
}
export interface ISettings {
  localSize: number;
  isSizeInput?: boolean;
  localColor: string;
  mode: string;
}
export interface ICoordinates {
  [key: string]: number;
}
export interface IMainData {
  [key: string]: string;
}
export interface IDate {
  dateLocal: string;
}
export interface IRenderingContext {
  context: CanvasRenderingContext2D | null | undefined;
}
