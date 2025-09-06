import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category';

// Load
export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction(
    '[Category] Load Categories Success',
    props<{ categories: Category[] }>()
);
export const loadCategoriesFailure = createAction(
    '[Category] Load Categories Failure',
    props<{ error: any }>()
);

// Create
export const createCategory = createAction(
    '[Category] Create Category',
    props<{ category: Partial<Category> }>()
);
export const createCategorySuccess = createAction(
    '[Category] Create Category Success',
    props<{ category: Category }>()
);
export const createCategoryFailure = createAction(
    '[Category] Create Category Failure',
    props<{ error: any }>()
);

// Update
export const updateCategory = createAction(
    '[Category] Update Category',
    props<{ id: number; category: Partial<Category> }>()
);
export const updateCategorySuccess = createAction(
    '[Category] Update Category Success',
    props<{ category: Category }>()
);
export const updateCategoryFailure = createAction(
    '[Category] Update Category Failure',
    props<{ error: any }>()
);

// Delete
export const deleteCategory = createAction(
    '[Category] Delete Category',
    props<{ id: number }>()
);
export const deleteCategorySuccess = createAction(
    '[Category] Delete Category Success',
    props<{ id: number }>()
);
export const deleteCategoryFailure = createAction(
    '[Category] Delete Category Failure',
    props<{ error: any }>()
);