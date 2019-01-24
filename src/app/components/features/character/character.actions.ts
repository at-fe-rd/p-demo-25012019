import { createAction } from 'redux-actions';
import { CharacterModel } from 'app/models';
import { API } from 'app/utils/api';

export namespace CharacterActions {
  export enum Type {
    CHARACTER_LIST = 'CHARACTER_LIST',
    CHARACTER_NEW = 'CHARACTER_NEW',
    CHARACTER_UPDATE = 'CHARACTER_UPDATE',
    CHARACTER_DELETE = 'CHARACTER_DELETE'
  }
  export const indexCharacter = createAction<any>(Type.CHARACTER_LIST);
  export const newCharacter = createAction<CharacterModel>(Type.CHARACTER_NEW);
  export const updateCharacter = createAction<CharacterModel>(Type.CHARACTER_UPDATE);
  export const deleteCharacter = createAction<CharacterModel['id']>(Type.CHARACTER_DELETE);
  export const getCharacter= (offset: number) => {
    return async (dispatch: any) => {
      await API.get(`/characters?offset=${offset}`)
        .then((res: any) => {
          dispatch(indexCharacter(res.data.characters));
          return Promise.resolve(res.data);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    };
  };
}

export type CharacterActions = Omit<typeof CharacterActions, 'Type'>;
