import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AttachmentService } from '../../service/attachment.service';
import * as AttachmentActions from './attachment.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AttachmentEffects {
    private actions$ = inject(Actions);
    private attachmentService = inject(AttachmentService);

    loadAttachments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttachmentActions.loadAttachments),
            mergeMap(() =>
                this.attachmentService.getAll().pipe(
                    map((attachments) => AttachmentActions.loadAttachmentsSuccess({ attachments })),
                    catchError((error) => of(AttachmentActions.loadAttachmentsFailure({ error })))
                )
            )
        )
    );

    loadAttachment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttachmentActions.loadAttachment),
            mergeMap(({ id }) =>
                this.attachmentService.getById(id).pipe(
                    map((attachment) => AttachmentActions.loadAttachmentSuccess({ attachment })),
                    catchError((error) => of(AttachmentActions.loadAttachmentFailure({ error })))
                )
            )
        )
    );

    createAttachment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttachmentActions.createAttachment),
            mergeMap(({ attachment }) =>
                this.attachmentService.create(attachment).pipe(
                    map((created) => AttachmentActions.createAttachmentSuccess({ attachment: created })),
                    catchError((error) => of(AttachmentActions.createAttachmentFailure({ error })))
                )
            )
        )
    );

    deleteAttachment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttachmentActions.deleteAttachment),
            mergeMap(({ id }) =>
                this.attachmentService.delete(id).pipe(
                    map(() => AttachmentActions.deleteAttachmentSuccess({ id })),
                    catchError((error) => of(AttachmentActions.deleteAttachmentFailure({ error })))
                )
            )
        )
    );
}
