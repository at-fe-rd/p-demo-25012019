import { combineReducers } from 'redux';
import { RootState } from './state';
import { featureReducer } from 'app/features/feature.reducers';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>(featureReducer);
