import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]),
  NgxEchartsModule.forRoot({
    echarts: () => import('echarts'),
  }),
],
  declarations: [HomeComponent],
})
export class HomeModule {}
