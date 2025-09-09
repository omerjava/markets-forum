import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LikeService } from '../../service/like.service';
import * as LikeActions from './like.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LikeEffects {
    private actions$ = inject(Actions);
    private likeService = inject(LikeService);

    loadLikes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LikeActions.loadLikes),
            mergeMap(() =>
                this.likeService.getAll().pipe(
                    map((likes) => LikeActions.loadLikesSuccess({ likes })),
                    catchError((error) => of(LikeActions.loadLikesFailure({ error })))
                )
            )
        )
    );

    loadLike$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LikeActions.loadLike),
            mergeMap(({ id }) =>
                this.likeService.getById(id).pipe(
                    map((like) => LikeActions.loadLikeSuccess({ like })),
                    catchError((error) => of(LikeActions.loadLikeFailure({ error })))
                )
            )
        )
    );

    createLike$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LikeActions.createLike),
            mergeMap(({ like }) =>
                this.likeService.create(like).pipe(
                    map((newLike) => LikeActions.createLikeSuccess({ like: newLike })),
                    catchError((error) => of(LikeActions.createLikeFailure({ error })))
                )
            )
        )
    );

    deleteLike$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LikeActions.deleteLike),
            mergeMap(({ id }) =>
                this.likeService.delete(id).pipe(
                    map(() => LikeActions.deleteLikeSuccess({ id })),
                    catchError((error) => of(LikeActions.deleteLikeFailure({ error })))
                )
            )
        )
    );
}
