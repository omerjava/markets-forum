import { createAction, props } from '@ngrx/store';
import { ForumThread } from '../../models/forum-thread';
import { ForumThreadRequest } from '../../models/forum-thread-request';

// Load all threads
export const loadThreads = createAction('[ForumThread] Load All');
export const loadThreadsSuccess = createAction(
    '[ForumThread] Load All Success',
    props<{ threads: ForumThread[] }>()
);
export const loadThreadsFailure = createAction(
    '[ForumThread] Load All Failure',
    props<{ error: any }>()
);

// Load single thread
export const loadThread = createAction(
    '[ForumThread] Load One',
    props<{ id: number }>()
);
export const loadThreadSuccess = createAction(
    '[ForumThread] Load One Success',
    props<{ thread: ForumThread }>()
);
export const loadThreadFailure = createAction(
    '[ForumThread] Load One Failure',
    props<{ error: any }>()
);

// Create
export const createThread = createAction(
    '[ForumThread] Create',
    props<{ request: ForumThreadRequest }>()
);
export const createThreadSuccess = createAction(
    '[ForumThread] Create Success',
    props<{ thread: ForumThread }>()
);
export const createThreadFailure = createAction(
    '[ForumThread] Create Failure',
    props<{ error: any }>()
);

// Update
export const updateThread = createAction(
    '[ForumThread] Update',
    props<{ id: number; request: ForumThreadRequest }>()
);
export const updateThreadSuccess = createAction(
    '[ForumThread] Update Success',
    props<{ thread: ForumThread }>()
);
export const updateThreadFailure = createAction(
    '[ForumThread] Update Failure',
    props<{ error: any }>()
);

// Delete
export const deleteThread = createAction(
    '[ForumThread] Delete',
    props<{ id: number }>()
);
export const deleteThreadSuccess = createAction(
    '[ForumThread] Delete Success',
    props<{ id: number }>()
);
export const deleteThreadFailure = createAction(
    '[ForumThread] Delete Failure',
    props<{ error: any }>()
);
