import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import {
  selectUserProfile,
} from '../../state/user-profile/user-profile.selectors';
import { loadMyProfile } from '../../state/user-profile/user-profile.actions';
import {
  uploadProfilePhoto,
} from '../../state/profile-photo/profile-photo.actions';
import { HeaderComponent } from '../header/header.component';
import { UserProfile } from '../../models/user-profile';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
})
export class ProfileComponent implements OnInit {
  private store = inject(Store<AppState>);

  userProfile$: Observable<UserProfile | null> = this.store.select(selectUserProfile);


  defaultAvatar = '/assets/default-avatar.jpg';

  ngOnInit() {
    this.store.dispatch(loadMyProfile());
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this.store.dispatch(uploadProfilePhoto({ file }));
  }

  getPhotoUrl(user: UserProfile | null): string {
    if (user?.profilePhoto?.url) {
      return user.profilePhoto.url;
    }
    return this.defaultAvatar;
  }

}
