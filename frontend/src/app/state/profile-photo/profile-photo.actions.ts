import { createAction, props } from '@ngrx/store';
import { ProfilePhoto } from '../../models/profile-photo';

export const uploadProfilePhoto = createAction(
    '[ProfilePhoto] Upload My Photo',
    props<{ file: File }>()
);
export const uploadProfilePhotoSuccess = createAction(
    '[ProfilePhoto] Upload My Photo Success',
    props<{ photo: ProfilePhoto }>()
);
