import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import * as CategoryActions from '../../state/category/category.actions';
import * as ForumThreadActions from '../../state/forum-thread/forum-thread.actions';
import * as PostActions from '../../state/post/post.actions';
import * as UserProfileActions from '../../state/user-profile/user-profile.actions';

import * as CategorySelectors from '../../state/category/category.selectors';
import { CategoryComponent } from '../category/category.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { AppState } from '../../state/app.state';


@Component({
  selector: 'app-home',
  imports: [CategoryComponent, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private store = inject(Store<AppState>);

  categories$!: Observable<Category[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  ngOnInit(): void {
    // Load category via NgRx
    this.store.dispatch(CategoryActions.loadCategories());

    // Load threads via NgRx
    this.store.dispatch(ForumThreadActions.loadThreads());

    // Load posts via NgRx
    this.store.dispatch(PostActions.loadPosts());

    // Load user profile via NgRx
    this.store.dispatch(UserProfileActions.loadMyProfile());

    this.categories$ = this.store.select(CategorySelectors.selectCategories);
    this.loading$ = this.store.select(CategorySelectors.selectCategoryLoading);
  }
}
