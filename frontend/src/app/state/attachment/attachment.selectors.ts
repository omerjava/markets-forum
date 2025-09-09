import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttachmentState } from './attachment.reducer';

export const selectAttachmentState = createFeatureSelector<AttachmentState>('attachments');

export const selectAllAttachments = createSelector(
    selectAttachmentState,
    (state) => state.attachments
);

export const selectSelectedAttachment = createSelector(
    selectAttachmentState,
    (state) => state.selectedAttachment
);

export const selectAttachmentsLoading = createSelector(
    selectAttachmentState,
    (state) => state.loading
);

export const selectAttachmentsError = createSelector(
    selectAttachmentState,
    (state) => state.error
);
