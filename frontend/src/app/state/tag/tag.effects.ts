import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TagService } from '../../service/tag.service';
import * as TagActions from './tag.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TagEffects {
    private actions$ = inject(Actions);
    private tagService = inject(TagService);

    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.loadTags),
            mergeMap(() =>
                this.tagService.getAll().pipe(
                    map((tags) => TagActions.loadTagsSuccess({ tags })),
                    catchError((error) => of(TagActions.loadTagsFailure({ error })))
                )
            )
        )
    );

    loadTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.loadTag),
            mergeMap(({ id }) =>
                this.tagService.getById(id).pipe(
                    map((tag) => TagActions.loadTagSuccess({ tag })),
                    catchError((error) => of(TagActions.loadTagFailure({ error })))
                )
            )
        )
    );

    createTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.createTag),
            mergeMap(({ tag }) =>
                this.tagService.create(tag).pipe(
                    map((created) => TagActions.createTagSuccess({ tag: created })),
                    catchError((error) => of(TagActions.createTagFailure({ error })))
                )
            )
        )
    );

    updateTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.updateTag),
            mergeMap(({ id, tag }) =>
                this.tagService.update(id, tag).pipe(
                    map((updated) => TagActions.updateTagSuccess({ tag: updated })),
                    catchError((error) => of(TagActions.updateTagFailure({ error })))
                )
            )
        )
    );

    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.deleteTag),
            mergeMap(({ id }) =>
                this.tagService.delete(id).pipe(
                    map(() => TagActions.deleteTagSuccess({ id })),
                    catchError((error) => of(TagActions.deleteTagFailure({ error })))
                )
            )
        )
    );
}
