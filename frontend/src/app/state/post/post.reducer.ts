import { createReducer, on } from '@ngrx/store';
import { Post } from '../../models/post';
import * as PostActions from './post.actions';

export interface PostState {
    posts: Post[];
    selectedPost?: Post;
    loading: boolean;
    error?: any;
}

export const initialState: PostState = {
    posts: [],
    loading: false
};

export const postReducer = createReducer(
    initialState,

    // ✅ Load all
    on(PostActions.loadPosts, (state) => ({ ...state, loading: true })),
    on(PostActions.loadPostsSuccess, (state, { posts }) => ({
        ...state,
        loading: false,
        posts
    })),
    on(PostActions.loadPostsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Load one
    on(PostActions.loadPost, (state) => ({ ...state, loading: true })),
    on(PostActions.loadPostSuccess, (state, { post }) => ({
        ...state,
        loading: false,
        selectedPost: post
    })),
    on(PostActions.loadPostFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Create
    on(PostActions.createPost, (state) => ({ ...state, loading: true })),
    on(PostActions.createPostSuccess, (state, { post }) => ({
        ...state,
        loading: false,
        posts: [...state.posts, post]
    })),
    on(PostActions.createPostFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Update
    on(PostActions.updatePost, (state) => ({ ...state, loading: true })),
    on(PostActions.updatePostSuccess, (state, { post }) => ({
        ...state,
        loading: false,
        posts: state.posts.map((p) => (p.id === post.id ? post : p))
    })),
    on(PostActions.updatePostFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Delete
    on(PostActions.deletePost, (state) => ({ ...state, loading: true })),
    on(PostActions.deletePostSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        posts: state.posts.filter((p) => p.id !== id)
    })),
    on(PostActions.deletePostFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
