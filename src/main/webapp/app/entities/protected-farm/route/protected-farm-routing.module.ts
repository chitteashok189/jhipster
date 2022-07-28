import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProtectedFarmComponent } from '../list/protected-farm.component';
import { ProtectedFarmDetailComponent } from '../detail/protected-farm-detail.component';
import { ProtectedFarmUpdateComponent } from '../update/protected-farm-update.component';
import { ProtectedFarmRoutingResolveService } from './protected-farm-routing-resolve.service';

const protectedFarmRoute: Routes = [
  {
    path: '',
    component: ProtectedFarmComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProtectedFarmDetailComponent,
    resolve: {
      protectedFarm: ProtectedFarmRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProtectedFarmUpdateComponent,
    resolve: {
      protectedFarm: ProtectedFarmRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProtectedFarmUpdateComponent,
    resolve: {
      protectedFarm: ProtectedFarmRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(protectedFarmRoute)],
  exports: [RouterModule],
})
export class ProtectedFarmRoutingModule {}
