import { createAction } from 'redux-actions';
import { CharacterModel } from 'app/models';

export namespace CharacterActions {
  export enum Type {
    CHARACTER_LIST = 'CHARACTER_LIST',
    CHARACTER_NEW = 'CHARACTER_NEW',
    CHARACTER_UPDATE = 'CHARACTER_UPDATE',
    CHARACTER_DELETE = 'CHARACTER_DELETE',
  }
  export const indexCharactor = createAction<any>(Type.CHARACTER_LIST);
  export const newCharactor = createAction<CharacterModel>(Type.CHARACTER_NEW);
  export const updateCharactor = createAction<CharacterModel>(Type.CHARACTER_UPDATE);
  export const deleteCharactor = createAction<CharacterModel['id']>(Type.CHARACTER_DELETE);
}

export type CharacterActions = Omit<typeof CharacterActions, 'Type'>;
