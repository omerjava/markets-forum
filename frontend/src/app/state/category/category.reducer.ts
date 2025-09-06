import { createReducer, on } from '@ngrx/store';
import { Category } from '../../models/category';
import * as CategoryActions from './category.actions';

export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: any;
}

export const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const categoryReducer = createReducer(
    initialState,

    // Load
    on(CategoryActions.loadCategories, (state) => ({ ...state, loading: true })),
    on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        loading: false,
        categories,
    })),
    on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Create
    on(CategoryActions.createCategory, (state) => ({ ...state, loading: true })),
    on(CategoryActions.createCategorySuccess, (state, { category }) => ({
        ...state,
        loading: false,
        categories: [...state.categories, category],
    })),
    on(CategoryActions.createCategoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Update
    on(CategoryActions.updateCategory, (state) => ({ ...state, loading: true })),
    on(CategoryActions.updateCategorySuccess, (state, { category }) => ({
        ...state,
        loading: false,
        categories: state.categories.map((c) =>
            c.id === category.id ? category : c
        ),
    })),
    on(CategoryActions.updateCategoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Delete
    on(CategoryActions.deleteCategory, (state) => ({ ...state, loading: true })),
    on(CategoryActions.deleteCategorySuccess, (state, { id }) => ({
        ...state,
        loading: false,
        categories: state.categories.filter((c) => c.id !== id),
    })),
    on(CategoryActions.deleteCategoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
