import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { AlertActions } from './alert.actions';

const initialState: RootState.NotificationState = {};

export const alertReducer = handleActions<RootState.NotificationState, any>(
  {
    [AlertActions.Type.ALERT_SHOW]: (state, action: any) => {
      return { ...state, ...action.payload, ...{ isOpen: true } };
    },
    [AlertActions.Type.ALERT_HIDE]: (state, action: any) => {
      return { ...state, ...action.payload, ...{ isOpen: false } };
    }
  },
  initialState
);
