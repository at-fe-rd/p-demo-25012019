import { createAction } from 'redux-actions';
import { CharactorModel } from 'app/models';

export namespace CharactorActions {
  export enum Type {
    NEW_CHARACTOR = 'NEW_CHARACTOR',
    UPDATE_CHARACTOR = 'UPDATE_CHARACTOR',
    DELETE_CHARACTOR = 'DELETE_CHARACTOR',
  }

  export const newCharactor = createAction<PartialPick<CharactorModel, 'name'>>(Type.NEW_CHARACTOR);
  export const updateCharactor = createAction<PartialPick<CharactorModel, 'id'>>(Type.UPDATE_CHARACTOR);
  export const deleteCharactor = createAction<CharactorModel['id']>(Type.DELETE_CHARACTOR);
}

export type CharactorActions = Omit<typeof CharactorActions, 'Type'>;
