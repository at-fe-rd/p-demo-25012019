export interface RootState {
  pageData: RootState.PageState;
  notification: RootState.NotificationState;
  router?: any;
}

export namespace RootState {
  export type PageState = any[];
  export type NotificationState = {};
}
