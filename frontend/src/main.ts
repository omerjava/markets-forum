import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { KeycloakService } from './app/service/keycloak.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { provideRouterStore } from '@ngrx/router-store';
import { appReducers } from './app/state/app.state';
import { UserProfileEffects } from './app/state/user-profile/user-profile.effects';
import { ProfilePhotoEffects } from './app/state/profile-photo/profile-photo.effects';
import { CategoryEffects } from './app/state/category/category.effects';
import { ForumThreadEffects } from './app/state/forum-thread/forum-thread.effects';
import { PostEffects } from './app/state/post/post.effects';
import { LikeEffects } from './app/state/like/like.effects';
import { TagEffects } from './app/state/tag/tag.effects';
import { AttachmentEffects } from './app/state/attachment/attachment.effects';


async function bootstrap() {
  const keycloakService = new KeycloakService();
  const authenticated = await keycloakService.init();
  console.log('Keycloak authenticated:', authenticated);

  // Optionally provide the KeycloakService via appConfig providers
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      ...appConfig.providers || [],
      { provide: KeycloakService, useValue: keycloakService },

      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptor])),

      // ✅ NgRx setup
      provideStore(appReducers),
      provideEffects([UserProfileEffects, ProfilePhotoEffects, CategoryEffects, ForumThreadEffects, AttachmentEffects, PostEffects, LikeEffects, TagEffects]),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
      provideRouterStore(),
    ],
  }).catch((err) => console.error(err));
}

bootstrap();
