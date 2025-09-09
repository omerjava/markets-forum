import { createReducer, on } from '@ngrx/store';
import { Like } from '../../models/like';
import * as LikeActions from './like.actions';

export interface LikeState {
    likes: Like[];
    selectedLike?: Like;
    loading: boolean;
    error?: any;
}

export const initialState: LikeState = {
    likes: [],
    loading: false
};

export const likeReducer = createReducer(
    initialState,

    // Load all
    on(LikeActions.loadLikes, (state) => ({ ...state, loading: true })),
    on(LikeActions.loadLikesSuccess, (state, { likes }) => ({
        ...state,
        loading: false,
        likes
    })),
    on(LikeActions.loadLikesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load one
    on(LikeActions.loadLike, (state) => ({ ...state, loading: true })),
    on(LikeActions.loadLikeSuccess, (state, { like }) => ({
        ...state,
        loading: false,
        selectedLike: like
    })),
    on(LikeActions.loadLikeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create
    on(LikeActions.createLike, (state) => ({ ...state, loading: true })),
    on(LikeActions.createLikeSuccess, (state, { like }) => ({
        ...state,
        loading: false,
        likes: [...state.likes, like]
    })),
    on(LikeActions.createLikeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete
    on(LikeActions.deleteLike, (state) => ({ ...state, loading: true })),
    on(LikeActions.deleteLikeSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        likes: state.likes.filter((l) => l.id !== id)
    })),
    on(LikeActions.deleteLikeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
