import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ForumThreadService } from '../../service/forum-thread.service';
import * as ForumThreadActions from './forum-thread.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ForumThreadRequest } from '../../models/forum-thread-request';

@Injectable()
export class ForumThreadEffects {
    private actions$ = inject(Actions);
    private service = inject(ForumThreadService);

    loadThreads$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ForumThreadActions.loadThreads),
            mergeMap(() =>
                this.service.getAll().pipe(
                    map((threads) => ForumThreadActions.loadThreadsSuccess({ threads })),
                    catchError((error) =>
                        of(ForumThreadActions.loadThreadsFailure({ error }))
                    )
                )
            )
        )
    );

    loadThread$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ForumThreadActions.loadThread),
            mergeMap(({ id }) =>
                this.service.getById(id).pipe(
                    map((thread) => ForumThreadActions.loadThreadSuccess({ thread })),
                    catchError((error) =>
                        of(ForumThreadActions.loadThreadFailure({ error }))
                    )
                )
            )
        )
    );

    createThread$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ForumThreadActions.createThread),
            mergeMap(({ request }: { request: ForumThreadRequest }) =>
                this.service.create(request).pipe(
                    map((created) =>
                        ForumThreadActions.createThreadSuccess({ thread: created })
                    ),
                    catchError((error) =>
                        of(ForumThreadActions.createThreadFailure({ error }))
                    )
                )
            )
        )
    );

    updateThread$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ForumThreadActions.updateThread),
            mergeMap(({ id, request }: { id: number; request: ForumThreadRequest }) =>
                this.service.update(id, request).pipe(
                    map((updated) =>
                        ForumThreadActions.updateThreadSuccess({ thread: updated })
                    ),
                    catchError((error) =>
                        of(ForumThreadActions.updateThreadFailure({ error }))
                    )
                )
            )
        )
    );

    deleteThread$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ForumThreadActions.deleteThread),
            mergeMap(({ id }) =>
                this.service.delete(id).pipe(
                    map(() => ForumThreadActions.deleteThreadSuccess({ id })),
                    catchError((error) =>
                        of(ForumThreadActions.deleteThreadFailure({ error }))
                    )
                )
            )
        )
    );
}
