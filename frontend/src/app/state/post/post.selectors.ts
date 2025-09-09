import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState =
    createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
    selectPostState,
    (state) => state.posts
);

export const selectSelectedPost = createSelector(
    selectPostState,
    (state) => state.selectedPost
);

export const selectLoading = createSelector(
    selectPostState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectPostState,
    (state) => state.error
);
