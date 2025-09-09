import { createReducer, on } from '@ngrx/store';
import { Attachment } from '../../models/attachment';
import * as AttachmentActions from './attachment.actions';

export interface AttachmentState {
    attachments: Attachment[];
    selectedAttachment?: Attachment;
    loading: boolean;
    error?: any;
}

export const initialState: AttachmentState = {
    attachments: [],
    loading: false
};

export const attachmentReducer = createReducer(
    initialState,

    // Load all
    on(AttachmentActions.loadAttachments, (state) => ({ ...state, loading: true })),
    on(AttachmentActions.loadAttachmentsSuccess, (state, { attachments }) => ({
        ...state,
        loading: false,
        attachments
    })),
    on(AttachmentActions.loadAttachmentsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load one
    on(AttachmentActions.loadAttachment, (state) => ({ ...state, loading: true })),
    on(AttachmentActions.loadAttachmentSuccess, (state, { attachment }) => ({
        ...state,
        loading: false,
        selectedAttachment: attachment
    })),
    on(AttachmentActions.loadAttachmentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create
    on(AttachmentActions.createAttachment, (state) => ({ ...state, loading: true })),
    on(AttachmentActions.createAttachmentSuccess, (state, { attachment }) => ({
        ...state,
        loading: false,
        attachments: [...state.attachments, attachment]
    })),
    on(AttachmentActions.createAttachmentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete
    on(AttachmentActions.deleteAttachment, (state) => ({ ...state, loading: true })),
    on(AttachmentActions.deleteAttachmentSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        attachments: state.attachments.filter((a) => a.id !== id)
    })),
    on(AttachmentActions.deleteAttachmentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
