import { createAction, props } from '@ngrx/store';
import { Tag } from '../../models/tag';

// Load all
export const loadTags = createAction('[Tag] Load Tags');
export const loadTagsSuccess = createAction('[Tag] Load Tags Success', props<{ tags: Tag[] }>());
export const loadTagsFailure = createAction('[Tag] Load Tags Failure', props<{ error: any }>());

// Load one
export const loadTag = createAction('[Tag] Load Tag', props<{ id: number }>());
export const loadTagSuccess = createAction('[Tag] Load Tag Success', props<{ tag: Tag }>());
export const loadTagFailure = createAction('[Tag] Load Tag Failure', props<{ error: any }>());

// Create
export const createTag = createAction('[Tag] Create Tag', props<{ tag: Tag }>());
export const createTagSuccess = createAction('[Tag] Create Tag Success', props<{ tag: Tag }>());
export const createTagFailure = createAction('[Tag] Create Tag Failure', props<{ error: any }>());

// Update
export const updateTag = createAction('[Tag] Update Tag', props<{ id: number, tag: Tag }>());
export const updateTagSuccess = createAction('[Tag] Update Tag Success', props<{ tag: Tag }>());
export const updateTagFailure = createAction('[Tag] Update Tag Failure', props<{ error: any }>());

// Delete
export const deleteTag = createAction('[Tag] Delete Tag', props<{ id: number }>());
export const deleteTagSuccess = createAction('[Tag] Delete Tag Success', props<{ id: number }>());
export const deleteTagFailure = createAction('[Tag] Delete Tag Failure', props<{ error: any }>());
