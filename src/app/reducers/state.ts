export interface RootState {
  pageData: RootState.PageState;
  router?: any;
}

export namespace RootState {
  export type PageState = any[];
}
