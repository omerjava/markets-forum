import { createReducer, on } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';
import * as UserProfileActions from './user-profile.actions';

export const initialState: UserProfileState = {
    profile: null,
    loading: false,
    error: null,
};

export const userProfileReducer = createReducer(
    initialState,

    on(UserProfileActions.loadMyProfile, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(UserProfileActions.loadMyProfileSuccess, (state, { profile }) => ({
        ...state,
        profile,
        loading: false,
    })),
    on(UserProfileActions.loadMyProfileFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(UserProfileActions.updateMyProfile, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(UserProfileActions.updateMyProfileSuccess, (state, { profile }) => ({
        ...state,
        profile,
        loading: false,
    })),
    on(UserProfileActions.updateMyProfileFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
