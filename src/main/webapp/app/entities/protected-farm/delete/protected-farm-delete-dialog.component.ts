import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProtectedFarm } from '../protected-farm.model';
import { ProtectedFarmService } from '../service/protected-farm.service';

@Component({
  templateUrl: './protected-farm-delete-dialog.component.html',
})
export class ProtectedFarmDeleteDialogComponent {
  protectedFarm?: IProtectedFarm;

  constructor(protected protectedFarmService: ProtectedFarmService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.protectedFarmService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
