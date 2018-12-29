import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
// import { CharactorActions } from './charactor.actions';
import { CharactorModel } from 'app/models';

const initialState: RootState.CharactorState = [];

export const CharactorReducer = handleActions<RootState.CharactorState, CharactorModel>(
  {
    
  },
  initialState
);
