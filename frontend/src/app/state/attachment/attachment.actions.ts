import { createAction, props } from '@ngrx/store';
import { Attachment } from '../../models/attachment';

// Load all
export const loadAttachments = createAction('[Attachment] Load Attachments');
export const loadAttachmentsSuccess = createAction('[Attachment] Load Attachments Success', props<{ attachments: Attachment[] }>());
export const loadAttachmentsFailure = createAction('[Attachment] Load Attachments Failure', props<{ error: any }>());

// Load one
export const loadAttachment = createAction('[Attachment] Load Attachment', props<{ id: number }>());
export const loadAttachmentSuccess = createAction('[Attachment] Load Attachment Success', props<{ attachment: Attachment }>());
export const loadAttachmentFailure = createAction('[Attachment] Load Attachment Failure', props<{ error: any }>());

// Create
export const createAttachment = createAction('[Attachment] Create Attachment', props<{ attachment: Attachment }>());
export const createAttachmentSuccess = createAction('[Attachment] Create Attachment Success', props<{ attachment: Attachment }>());
export const createAttachmentFailure = createAction('[Attachment] Create Attachment Failure', props<{ error: any }>());

// Delete
export const deleteAttachment = createAction('[Attachment] Delete Attachment', props<{ id: number }>());
export const deleteAttachmentSuccess = createAction('[Attachment] Delete Attachment Success', props<{ id: number }>());
export const deleteAttachmentFailure = createAction('[Attachment] Delete Attachment Failure', props<{ error: any }>());
