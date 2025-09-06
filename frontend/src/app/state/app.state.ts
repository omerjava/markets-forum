import { categoryReducer, CategoryState } from './category/category.reducer';
import { profilePhotoReducer } from './profile-photo/profile-photo.reducer';
import { ProfilePhotoState } from './profile-photo/profile-photo.state';
import { userProfileReducer } from './user-profile/user-profile.reducer';
import { UserProfileState } from './user-profile/user-profile.state';

export interface AppState {
    userProfile: UserProfileState;
    profilePhoto: ProfilePhotoState;
    category: CategoryState
}

export const appReducers = {
    userProfile: userProfileReducer,
    profilePhoto: profilePhotoReducer,
    category: categoryReducer,
};
