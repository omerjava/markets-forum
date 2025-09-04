import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserProfileActions from './user-profile.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserProfileService } from '../../service/user-profile.service';

@Injectable()
export class UserProfileEffects {
    private actions$ = inject(Actions);
    private userProfileService = inject(UserProfileService);

    loadMyProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserProfileActions.loadMyProfile),
            mergeMap(() =>
                this.userProfileService.getMyProfile().pipe(
                    map((profile) => UserProfileActions.loadMyProfileSuccess({ profile })),
                    catchError((error) => of(UserProfileActions.loadMyProfileFailure({ error })))
                )
            )
        )
    );

    updateMyProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserProfileActions.updateMyProfile),
            mergeMap(({ profile }) =>
                this.userProfileService.updateMyProfile(profile).pipe(
                    map((updatedProfile) =>
                        UserProfileActions.updateMyProfileSuccess({ profile: updatedProfile })
                    ),
                    catchError((error) => of(UserProfileActions.updateMyProfileFailure({ error })))
                )
            )
        )
    );
}
