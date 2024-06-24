import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { authGuard } from './guard/auth.guard';
import { RegisterComponent } from './page/register/register.component';
import { AccountComponent } from './page/account/account.component';
import { MenuItemComponent } from './admin/menu-item/menu-item.component';
import { roleGuard } from './guard/role.guard';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { CategoryComponent } from './admin/category/category.component';
import { EditUserComponent } from './page/edit-user/edit-user.component';
import { OrderCreateComponent } from './admin/order-create/order-create.component';
import { ViewOrdersComponent } from './admin/view-order/view-order.component';
import { RoleComponent } from './admin/role/role.component';
import { AddUserComponent } from './page/add-user/add-user.component';
import { HomeComponent } from './page/home/home.component';
import { redirectToHomeGuard } from './guard/redirect-to-home.guard';
import { TableComponent } from './admin/table/table.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'login',
    canActivate: [redirectToHomeGuard],component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-user/:id', component: EditUserComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager'] }
  },
  {
    path: 'add-user', component: AddUserComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager'] }
  },
  {
    path: 'admin/menu-item', component: MenuItemComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager'] }
  },
  {
    path: 'admin/users', component: UsersListComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager'] }
  },
  {
    path: 'admin/order-create', component: OrderCreateComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager','Employee'] }
  },
  {
    path: 'admin/category', component: CategoryComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager'] }
  },
  {
    path: 'view-orders', component: ViewOrdersComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager','Employee'] }
  },
  {
    path: 'admin/roles', component: RoleComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager'] },
  },
  {
    path: 'admin/table', component: TableComponent, canActivate: [roleGuard], data: { roles: ['Admin','Manager'] },
  },
];
