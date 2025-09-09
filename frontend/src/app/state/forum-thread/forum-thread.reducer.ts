import { createReducer, on } from '@ngrx/store';
import { ForumThread } from '../../models/forum-thread';
import * as ForumThreadActions from './forum-thread.actions';

export interface ForumThreadState {
    threads: ForumThread[];
    selectedThread?: ForumThread;
    loading: boolean;
    error?: any;
}

export const initialState: ForumThreadState = {
    threads: [],
    loading: false
};

export const forumThreadReducer = createReducer(
    initialState,

    // ✅ Load all
    on(ForumThreadActions.loadThreads, (state) => ({ ...state, loading: true })),
    on(ForumThreadActions.loadThreadsSuccess, (state, { threads }) => ({
        ...state,
        loading: false,
        threads
    })),
    on(ForumThreadActions.loadThreadsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Load one
    on(ForumThreadActions.loadThread, (state) => ({ ...state, loading: true })),
    on(ForumThreadActions.loadThreadSuccess, (state, { thread }) => ({
        ...state,
        loading: false,
        selectedThread: thread
    })),
    on(ForumThreadActions.loadThreadFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Create
    on(ForumThreadActions.createThread, (state) => ({ ...state, loading: true })),
    on(ForumThreadActions.createThreadSuccess, (state, { thread }) => ({
        ...state,
        loading: false,
        threads: [...state.threads, thread]
    })),
    on(ForumThreadActions.createThreadFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Update
    on(ForumThreadActions.updateThread, (state) => ({ ...state, loading: true })),
    on(ForumThreadActions.updateThreadSuccess, (state, { thread }) => ({
        ...state,
        loading: false,
        threads: state.threads.map((t) => (t.id === thread.id ? thread : t))
    })),
    on(ForumThreadActions.updateThreadFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ✅ Delete
    on(ForumThreadActions.deleteThread, (state) => ({ ...state, loading: true })),
    on(ForumThreadActions.deleteThreadSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        threads: state.threads.filter((t) => t.id !== id)
    })),
    on(ForumThreadActions.deleteThreadFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
