import { createReducer, on } from '@ngrx/store';
import * as ProfilePhotoActions from './profile-photo.actions';
import { ProfilePhotoState } from './profile-photo.state';

const initialState: ProfilePhotoState = {
    photo: null
};

export const profilePhotoReducer = createReducer(
    initialState,
    on(ProfilePhotoActions.uploadProfilePhotoSuccess, (state, { photo }) => ({ ...state, photo }))
);