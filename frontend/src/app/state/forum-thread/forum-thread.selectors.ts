import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForumThreadState } from './forum-thread.reducer';

export const selectForumThreadState =
    createFeatureSelector<ForumThreadState>('forumThreads');

export const selectAllThreads = createSelector(
    selectForumThreadState,
    (state) => state.threads
);

export const selectSelectedThread = createSelector(
    selectForumThreadState,
    (state) => state.selectedThread
);

export const selectLoading = createSelector(
    selectForumThreadState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectForumThreadState,
    (state) => state.error
);
