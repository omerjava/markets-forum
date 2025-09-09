import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../service/post.service';
import * as PostActions from './post.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PostEffects {
    private actions$ = inject(Actions);
    private service = inject(PostService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.loadPosts),
            mergeMap(() =>
                this.service.getAll().pipe(
                    map((posts) => PostActions.loadPostsSuccess({ posts })),
                    catchError((error) => of(PostActions.loadPostsFailure({ error })))
                )
            )
        )
    );

    loadPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.loadPost),
            mergeMap(({ id }) =>
                this.service.getById(id).pipe(
                    map((post) => PostActions.loadPostSuccess({ post })),
                    catchError((error) => of(PostActions.loadPostFailure({ error })))
                )
            )
        )
    );

    createPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.createPost),
            mergeMap(({ post }) =>
                this.service.create(post).pipe(
                    map((created) => PostActions.createPostSuccess({ post: created })),
                    catchError((error) => of(PostActions.createPostFailure({ error })))
                )
            )
        )
    );

    updatePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.updatePost),
            mergeMap(({ id, post }) =>
                this.service.update(id, post).pipe(
                    map((updated) => PostActions.updatePostSuccess({ post: updated })),
                    catchError((error) => of(PostActions.updatePostFailure({ error })))
                )
            )
        )
    );

    deletePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.deletePost),
            mergeMap(({ id }) =>
                this.service.delete(id).pipe(
                    map(() => PostActions.deletePostSuccess({ id })),
                    catchError((error) => of(PostActions.deletePostFailure({ error })))
                )
            )
        )
    );
}
