import { Routes } from '@angular/router';
import { CreditLineListComponent } from './features/credit-line/pages/credit-line-list/credit-line-list.component';
import { CreditLineFormComponent } from './features/credit-line/components/credit-line-form/credit-line-form.component';
import { CreditLineDetailComponent } from './features/credit-line/pages/credit-line-detail/credit-line-detail.component';
import { CreditLineConsumptionComponent } from './features/credit-line/pages/credit-line-consumption/credit-line-consumption.component';
import { CreditLineCreateComponent } from './features/credit-line/pages/credit-line-create/credit-line-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'credit-lines', pathMatch: 'full' },
  { path: 'credit-lines', component: CreditLineListComponent },
  { path: 'credit-lines/new', component: CreditLineFormComponent },
  { path: 'credit-lines/create', component: CreditLineCreateComponent },
  { path: 'credit-lines/:id', component: CreditLineDetailComponent },
  { path: 'credit-lines/consumption/:id', component: CreditLineConsumptionComponent },
  { path: '**', redirectTo: 'credit-lines' }
];
