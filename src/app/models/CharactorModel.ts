/** CharactorMVC model definitions **/

export interface CharactorModel {
  id?: number;
  name: string;
  age: number;
  comment?: string;
  [key:string]: any;
}

export namespace CharactorModel {
  export enum Filter {

  }
}
