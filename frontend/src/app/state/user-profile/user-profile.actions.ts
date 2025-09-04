import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile';

// Load current user
export const loadMyProfile = createAction('[UserProfile] Load My Profile');
export const loadMyProfileSuccess = createAction(
    '[UserProfile] Load My Profile Success',
    props<{ profile: UserProfile }>()
);
export const loadMyProfileFailure = createAction(
    '[UserProfile] Load My Profile Failure',
    props<{ error: any }>()
);

// Update user info (excluding photo)
export const updateMyProfile = createAction(
    '[UserProfile] Update My Profile',
    props<{ profile: Partial<UserProfile> }>()
);
export const updateMyProfileSuccess = createAction(
    '[UserProfile] Update My Profile Success',
    props<{ profile: UserProfile }>()
);
export const updateMyProfileFailure = createAction(
    '[UserProfile] Update My Profile Failure',
    props<{ error: any }>()
);
