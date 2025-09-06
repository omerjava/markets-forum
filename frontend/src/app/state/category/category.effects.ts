import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../../service/category.service';
import * as CategoryActions from './category.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CategoryEffects {
    private actions$ = inject(Actions);
    private categoryService = inject(CategoryService);

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.loadCategories),
            mergeMap(() =>
                this.categoryService.getAll().pipe(
                    map((categories) =>
                        CategoryActions.loadCategoriesSuccess({ categories })
                    ),
                    catchError((error) =>
                        of(CategoryActions.loadCategoriesFailure({ error }))
                    )
                )
            )
        )
    );

    createCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.createCategory),
            mergeMap(({ category }) =>
                this.categoryService.create(category as any).pipe(
                    map((newCategory) =>
                        CategoryActions.createCategorySuccess({ category: newCategory })
                    ),
                    catchError((error) =>
                        of(CategoryActions.createCategoryFailure({ error }))
                    )
                )
            )
        )
    );

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.updateCategory),
            mergeMap(({ id, category }) =>
                this.categoryService.update(id, category as any).pipe(
                    map((updatedCategory) =>
                        CategoryActions.updateCategorySuccess({ category: updatedCategory })
                    ),
                    catchError((error) =>
                        of(CategoryActions.updateCategoryFailure({ error }))
                    )
                )
            )
        )
    );

    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.deleteCategory),
            mergeMap(({ id }) =>
                this.categoryService.delete(id).pipe(
                    map(() => CategoryActions.deleteCategorySuccess({ id })),
                    catchError((error) =>
                        of(CategoryActions.deleteCategoryFailure({ error }))
                    )
                )
            )
        )
    );
}
