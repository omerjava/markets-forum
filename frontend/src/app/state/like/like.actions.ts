import { createAction, props } from '@ngrx/store';
import { Like } from '../../models/like';

// Load all
export const loadLikes = createAction('[Like] Load Likes');
export const loadLikesSuccess = createAction('[Like] Load Likes Success', props<{ likes: Like[] }>());
export const loadLikesFailure = createAction('[Like] Load Likes Failure', props<{ error: any }>());

// Load one
export const loadLike = createAction('[Like] Load Like', props<{ id: number }>());
export const loadLikeSuccess = createAction('[Like] Load Like Success', props<{ like: Like }>());
export const loadLikeFailure = createAction('[Like] Load Like Failure', props<{ error: any }>());

// Create
export const createLike = createAction('[Like] Create Like', props<{ like: Like }>());
export const createLikeSuccess = createAction('[Like] Create Like Success', props<{ like: Like }>());
export const createLikeFailure = createAction('[Like] Create Like Failure', props<{ error: any }>());

// Delete
export const deleteLike = createAction('[Like] Delete Like', props<{ id: number }>());
export const deleteLikeSuccess = createAction('[Like] Delete Like Success', props<{ id: number }>());
export const deleteLikeFailure = createAction('[Like] Delete Like Failure', props<{ error: any }>());
