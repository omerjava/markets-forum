import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'admin', component: AdminPortalComponent },
    { path: 'category/:categoryId', component: CategoryPageComponent },
]
