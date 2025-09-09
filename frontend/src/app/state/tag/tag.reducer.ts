import { createReducer, on } from '@ngrx/store';
import { Tag } from '../../models/tag';
import * as TagActions from './tag.actions';

export interface TagState {
    tags: Tag[];
    selectedTag?: Tag;
    loading: boolean;
    error?: any;
}

export const initialState: TagState = {
    tags: [],
    loading: false
};

export const tagReducer = createReducer(
    initialState,

    // Load all
    on(TagActions.loadTags, (state) => ({ ...state, loading: true })),
    on(TagActions.loadTagsSuccess, (state, { tags }) => ({
        ...state,
        loading: false,
        tags
    })),
    on(TagActions.loadTagsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load one
    on(TagActions.loadTag, (state) => ({ ...state, loading: true })),
    on(TagActions.loadTagSuccess, (state, { tag }) => ({
        ...state,
        loading: false,
        selectedTag: tag
    })),
    on(TagActions.loadTagFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create
    on(TagActions.createTag, (state) => ({ ...state, loading: true })),
    on(TagActions.createTagSuccess, (state, { tag }) => ({
        ...state,
        loading: false,
        tags: [...state.tags, tag]
    })),
    on(TagActions.createTagFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update
    on(TagActions.updateTag, (state) => ({ ...state, loading: true })),
    on(TagActions.updateTagSuccess, (state, { tag }) => ({
        ...state,
        loading: false,
        tags: state.tags.map((t) => (t.id === tag.id ? tag : t))
    })),
    on(TagActions.updateTagFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete
    on(TagActions.deleteTag, (state) => ({ ...state, loading: true })),
    on(TagActions.deleteTagSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        tags: state.tags.filter((t) => t.id !== id)
    })),
    on(TagActions.deleteTagFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
