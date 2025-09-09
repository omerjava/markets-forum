import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../state/app.state';
import { ForumThread } from '../../models/forum-thread';
import { ForumThreadRequest } from '../../models/forum-thread-request';
import { UserProfile } from '../../models/user-profile';

import {
  selectUserProfile
} from '../../state/user-profile/user-profile.selectors';

import {
  selectAllThreads,
  selectLoading as selectThreadsLoading,
  selectError as selectThreadsError
} from '../../state/forum-thread/forum-thread.selectors';

import {
  selectCategoryById,
  selectCategoryLoading
} from '../../state/category/category.selectors';

import * as ForumThreadActions from '../../state/forum-thread/forum-thread.actions';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-category-page',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  private store = inject(Store<AppState>);
  private route = inject(ActivatedRoute);

  userProfile$: Observable<UserProfile | null> = this.store.select(selectUserProfile);
  threads$: Observable<ForumThread[]> = this.store.select(selectAllThreads);
  threadsLoading$: Observable<boolean> = this.store.select(selectThreadsLoading);
  threadsError$: Observable<any> = this.store.select(selectThreadsError);

  categoryId!: number;
  category$!: Observable<any>; // selected category
  categoryLoading$: Observable<boolean> = this.store.select(selectCategoryLoading);

  newThreadTitle = '';
  currentUser: UserProfile | null = null;

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));

    this.category$ = this.store.select(selectCategoryById(this.categoryId));

    // Subscribe to user profile
    this.userProfile$.subscribe(user => {
      this.currentUser = user;
    });
  }

  createThread() {
    if (!this.newThreadTitle.trim() || !this.currentUser) return;

    const request: ForumThreadRequest = {
      title: this.newThreadTitle.trim(),
      userId: this.currentUser.id,
      categoryId: this.categoryId
    };

    this.store.dispatch(ForumThreadActions.createThread({ request }));
    this.newThreadTitle = '';
  }

  updateThread(thread: ForumThread) {
    if (!this.currentUser) return;

    const request: ForumThreadRequest = {
      title: thread.title,
      userId: this.currentUser.id,
      categoryId: this.categoryId
    };

    this.store.dispatch(ForumThreadActions.updateThread({ id: thread.id, request }));
  }
}
