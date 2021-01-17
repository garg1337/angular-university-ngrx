import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';

export interface AuthState {
  user: User
};

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  }),
  on(AuthActions.localStorageUserLoaded, (state, action) => {
    if(action.user){
      return {
        user: action.user
      };
    }
    return state;
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  }),
);