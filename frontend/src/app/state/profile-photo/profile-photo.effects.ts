import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfilePhotoService } from '../../service/profile-photo.service';
import * as ProfilePhotoActions from './profile-photo.actions';
import { mergeMap } from 'rxjs';
import * as UserProfileActions from '../user-profile/user-profile.actions';

@Injectable()
export class ProfilePhotoEffects {
    private actions$ = inject(Actions);
    private service = inject(ProfilePhotoService);

    uploadPhoto$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfilePhotoActions.uploadProfilePhoto),
            mergeMap(({ file }) =>
                this.service.uploadMyPhoto(file).pipe(
                    mergeMap(photo => [
                        ProfilePhotoActions.uploadProfilePhotoSuccess({ photo }),
                        UserProfileActions.loadMyProfile()
                    ])
                )
            )
        )
    );
}
