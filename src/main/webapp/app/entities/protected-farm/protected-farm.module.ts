import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProtectedFarmComponent } from './list/protected-farm.component';
import { ProtectedFarmDetailComponent } from './detail/protected-farm-detail.component';
import { ProtectedFarmUpdateComponent } from './update/protected-farm-update.component';
import { ProtectedFarmDeleteDialogComponent } from './delete/protected-farm-delete-dialog.component';
import { ProtectedFarmRoutingModule } from './route/protected-farm-routing.module';

@NgModule({
  imports: [SharedModule, ProtectedFarmRoutingModule],
  declarations: [ProtectedFarmComponent, ProtectedFarmDetailComponent, ProtectedFarmUpdateComponent, ProtectedFarmDeleteDialogComponent],
  entryComponents: [ProtectedFarmDeleteDialogComponent],
})
export class ProtectedFarmModule {}
