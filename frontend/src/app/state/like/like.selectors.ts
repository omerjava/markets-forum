import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LikeState } from './like.reducer';

// Feature key (dezelfde naam als je in StoreModule.forRoot of forFeature gebruikt)
export const selectLikeState = createFeatureSelector<LikeState>('likes');

// Alle likes
export const selectAllLikes = createSelector(
    selectLikeState,
    (state) => state.likes
);

// Geselecteerde like (bijvoorbeeld via loadLikeSuccess)
export const selectSelectedLike = createSelector(
    selectLikeState,
    (state) => state.selectedLike
);

// Loading status
export const selectLikesLoading = createSelector(
    selectLikeState,
    (state) => state.loading
);

// Error status
export const selectLikesError = createSelector(
    selectLikeState,
    (state) => state.error
);
