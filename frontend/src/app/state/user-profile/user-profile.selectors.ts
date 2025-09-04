import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';

export const selectUserProfileState =
    createFeatureSelector<UserProfileState>('userProfile');

export const selectUserProfile = createSelector(
    selectUserProfileState,
    state => state.profile
);

export const selectUserProfileLoading = createSelector(
    selectUserProfileState,
    state => state.loading
);
