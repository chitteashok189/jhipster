import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProtectedFarm } from '../protected-farm.model';
import { ProtectedFarmService } from '../service/protected-farm.service';
import { ProtectedFarmDeleteDialogComponent } from '../delete/protected-farm-delete-dialog.component';

@Component({
  selector: 'jhi-protected-farm',
  templateUrl: './protected-farm.component.html',
})
export class ProtectedFarmComponent implements OnInit {
  protectedFarms?: IProtectedFarm[];
  isLoading = false;

  constructor(protected protectedFarmService: ProtectedFarmService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.protectedFarmService.query().subscribe({
      next: (res: HttpResponse<IProtectedFarm[]>) => {
        this.isLoading = false;
        this.protectedFarms = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IProtectedFarm): number {
    return item.id!;
  }

  delete(protectedFarm: IProtectedFarm): void {
    const modalRef = this.modalService.open(ProtectedFarmDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.protectedFarm = protectedFarm;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
