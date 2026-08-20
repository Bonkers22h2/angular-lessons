import { Routes } from '@angular/router';
import { Counter } from './lessons/counter/counter';
import { AccountPreview } from './lessons/account-preview/account-preview';
import { AccountDetail } from './lessons/account-detail/account-detail';
import { BeneficiaryDetail } from './lessons/beneficiary-detail/beneficiary-detail';

export const routes: Routes = [
    { path: 'accounts', component: AccountPreview },
    { path: 'accounts/:accountNumber/beneficiaries/:id', component: BeneficiaryDetail },
    { path: 'accounts/:accountNumber', component: AccountDetail },
    { path: 'counter', component: Counter },
    { path: '', redirectTo: '/accounts', pathMatch: 'full' }
];
