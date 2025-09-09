import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagState } from './tag.reducer';

export const selectTagState = createFeatureSelector<TagState>('tags');

export const selectAllTags = createSelector(
    selectTagState,
    (state) => state.tags
);

export const selectSelectedTag = createSelector(
    selectTagState,
    (state) => state.selectedTag
);

export const selectTagsLoading = createSelector(
    selectTagState,
    (state) => state.loading
);

export const selectTagsError = createSelector(
    selectTagState,
    (state) => state.error
);
