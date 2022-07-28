import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProtectedFarm } from '../protected-farm.model';

@Component({
  selector: 'jhi-protected-farm-detail',
  templateUrl: './protected-farm-detail.component.html',
})
export class ProtectedFarmDetailComponent implements OnInit {
  protectedFarm: IProtectedFarm | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ protectedFarm }) => {
      this.protectedFarm = protectedFarm;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
