import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfilePhotoState } from './profile-photo.state';

export const selectProfilePhotoState = createFeatureSelector<ProfilePhotoState>('profilePhoto');

export const selectProfilePhotoUrl = createSelector(
    selectProfilePhotoState,
    (state) => state.photo?.url || null
);
