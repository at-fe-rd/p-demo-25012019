import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CharactorActions } from './charactor.actions';
import { CharactorModel } from 'app/models';

const initialState: RootState.CharactorState = [];

export const CharactorReducer = handleActions<RootState.CharactorState, CharactorModel>(
  {
    [CharactorActions.Type.NEW_CHARACTOR]: (state, action) => {
      if (action.payload && action.payload.name) {
        return [
          {
            id: state.reduce((max: any, Charactor: any) => Math.max(Charactor.id || 1, max), 0) + 1,
            completed: false,
            text: action.payload.name
          },
          ...state
        ];
      }
      return state;
    },
    [CharactorActions.Type.DELETE_CHARACTOR]: (state, action) => {
      return state.filter((Charactor: any) => Charactor.id !== (action.payload as any));
    },
    [CharactorActions.Type.UPDATE_CHARACTOR]: (state, action) => {
      return state.map((Charactor: any) => {
        if (!Charactor || !action || !action.payload) {
          return Charactor;
        }
        return (Charactor.id || 0) === action.payload.id ? { ...Charactor, text: action.payload.name } : Charactor;
      });
    }
  },
  initialState
);
