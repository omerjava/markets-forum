import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';

// Load all posts
export const loadPosts = createAction('[Post] Load All');
export const loadPostsSuccess = createAction(
    '[Post] Load All Success',
    props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
    '[Post] Load All Failure',
    props<{ error: any }>()
);

// Load single post
export const loadPost = createAction(
    '[Post] Load One',
    props<{ id: number }>()
);
export const loadPostSuccess = createAction(
    '[Post] Load One Success',
    props<{ post: Post }>()
);
export const loadPostFailure = createAction(
    '[Post] Load One Failure',
    props<{ error: any }>()
);

// Create
export const createPost = createAction(
    '[Post] Create',
    props<{ post: Post }>()
);
export const createPostSuccess = createAction(
    '[Post] Create Success',
    props<{ post: Post }>()
);
export const createPostFailure = createAction(
    '[Post] Create Failure',
    props<{ error: any }>()
);

// Update
export const updatePost = createAction(
    '[Post] Update',
    props<{ id: number; post: Post }>()
);
export const updatePostSuccess = createAction(
    '[Post] Update Success',
    props<{ post: Post }>()
);
export const updatePostFailure = createAction(
    '[Post] Update Failure',
    props<{ error: any }>()
);

// Delete
export const deletePost = createAction(
    '[Post] Delete',
    props<{ id: number }>()
);
export const deletePostSuccess = createAction(
    '[Post] Delete Success',
    props<{ id: number }>()
);
export const deletePostFailure = createAction(
    '[Post] Delete Failure',
    props<{ error: any }>()
);
