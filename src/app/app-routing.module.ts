import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [UserGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UserGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  // lazy-loading:
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./items-admin/items-admin.module').then((m) => m.ItemsAdminModule)
  },
  {path: '', redirectTo: "/home", pathMatch: "full"},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
