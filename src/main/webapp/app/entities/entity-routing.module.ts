import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'farm',
        data: { pageTitle: 'blogApp.farm.home.title' },
        loadChildren: () => import('./farm/farm.module').then(m => m.FarmModule),
      },
      {
        path: 'protected-farm',
        data: { pageTitle: 'blogApp.protectedFarm.home.title' },
        loadChildren: () => import('./protected-farm/protected-farm.module').then(m => m.ProtectedFarmModule),
      },
      {
        path: 'zone',
        data: { pageTitle: 'blogApp.zone.home.title' },
        loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
