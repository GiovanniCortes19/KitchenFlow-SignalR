import { Routes } from '@angular/router';
import { CustomersComponent } from './Pages/customers/customers.component';
import { KitchenComponent } from './Pages/kitchen/kitchen.component';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'kitchen', component: KitchenComponent },
];
