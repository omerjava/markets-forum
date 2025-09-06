import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import * as CategoryActions from '../../state/category/category.actions';
import { selectCategories } from '../../state/category/category.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-portal',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-portal.component.html',
  styleUrl: './admin-portal.component.css'
})
export class AdminPortalComponent implements OnInit {
  private store = inject(Store<AppState>);
  private fb = inject(FormBuilder);

  categories$: Observable<Category[]> = this.store.select(selectCategories);

  editingCategory: Category | null = null;

  categoryForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: [''],
  });

  ngOnInit() {
    this.store.dispatch(CategoryActions.loadCategories());

    this.categories$.subscribe(cats => console.log('Categories loaded:', cats));

  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;

      if (this.editingCategory) {
        this.store.dispatch(
          CategoryActions.updateCategory({
            id: Number(formValue.id),
            category: {
              name: formValue.name!,
              description: formValue.description!,
            },
          })
        );
      } else {
        this.store.dispatch(
          CategoryActions.createCategory({
            category: {
              name: formValue.name!,
              description: formValue.description!,
            },
          })
        );
      }

      this.categoryForm.reset();
      this.editingCategory = null;
    }
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
      description: category.description ?? ''
    });
  }

  deleteCategory(id: number) {
    this.store.dispatch(CategoryActions.deleteCategory({ id }));
  }

  cancelEdit() {
    this.editingCategory = null;
    this.categoryForm.reset();
  }
}
