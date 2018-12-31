import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CharactorActions } from './charactor.actions';
import { CharactorModel } from 'app/models';

const initialState: RootState.PageState = [
  {
    id: 1,
    age: 29,
    name: 'Vix Nguyen',
    comment: 'Senior Software Engineer'
  }
];

export const characterReducer = handleActions<RootState.PageState, CharactorModel>(
  {
    [CharactorActions.Type.NEW_CHARACTOR]: (state, action) => {
      if (action.payload && action.payload.name) {
        return [
          {
            id: state.reduce((max: any, todo: any) => Math.max(todo.id || 1, max), 0) + 1,
            age: action.payload.age,
            name: action.payload.name,
            comment: action.payload.comment
          },
          ...state
        ];
      }
      return state;
    },
    [CharactorActions.Type.UPDATE_CHARACTOR]: (state, action) => {
      return state.map((item) => {
        if (!item || !action || !action.payload) {
          return item;
        }
        return (item.id || 0) === action.payload ? { ...item, age: ++item.age } : item;
      });
    },
    [CharactorActions.Type.DELETE_CHARACTOR]: (state, action) => {
      return state.filter((item: CharactorModel) => item.id !== (action.payload as any));
    }
  },
  initialState
);
