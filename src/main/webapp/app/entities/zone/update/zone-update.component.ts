import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IZone, Zone } from '../zone.model';
import { ZoneService } from '../service/zone.service';
import { IProtectedFarm } from 'app/entities/protected-farm/protected-farm.model';
import { ProtectedFarmService } from 'app/entities/protected-farm/service/protected-farm.service';
import { ZoneType } from 'app/entities/enumerations/zone-type.model';

@Component({
  selector: 'jhi-zone-update',
  templateUrl: './zone-update.component.html',
})
export class ZoneUpdateComponent implements OnInit {
  isSaving = false;
  zoneTypeValues = Object.keys(ZoneType);

  protectedFarmsSharedCollection: IProtectedFarm[] = [];

  editForm = this.fb.group({
    id: [],
    zoneID: [],
    zoneType: [],
    manufacturer: [],
    protectedFID: [],
    protectedFarm: [],
  });

  constructor(
    protected zoneService: ZoneService,
    protected protectedFarmService: ProtectedFarmService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zone }) => {
      this.updateForm(zone);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zone = this.createFromForm();
    if (zone.id !== undefined) {
      this.subscribeToSaveResponse(this.zoneService.update(zone));
    } else {
      this.subscribeToSaveResponse(this.zoneService.create(zone));
    }
  }

  trackProtectedFarmById(_index: number, item: IProtectedFarm): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZone>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(zone: IZone): void {
    this.editForm.patchValue({
      id: zone.id,
      zoneID: zone.zoneID,
      zoneType: zone.zoneType,
      manufacturer: zone.manufacturer,
      protectedFID: zone.protectedFID,
      protectedFarm: zone.protectedFarm,
    });

    this.protectedFarmsSharedCollection = this.protectedFarmService.addProtectedFarmToCollectionIfMissing(
      this.protectedFarmsSharedCollection,
      zone.protectedFarm
    );
  }

  protected loadRelationshipsOptions(): void {
    this.protectedFarmService
      .query()
      .pipe(map((res: HttpResponse<IProtectedFarm[]>) => res.body ?? []))
      .pipe(
        map((protectedFarms: IProtectedFarm[]) =>
          this.protectedFarmService.addProtectedFarmToCollectionIfMissing(protectedFarms, this.editForm.get('protectedFarm')!.value)
        )
      )
      .subscribe((protectedFarms: IProtectedFarm[]) => (this.protectedFarmsSharedCollection = protectedFarms));
  }

  protected createFromForm(): IZone {
    return {
      ...new Zone(),
      id: this.editForm.get(['id'])!.value,
      zoneID: this.editForm.get(['zoneID'])!.value,
      zoneType: this.editForm.get(['zoneType'])!.value,
      manufacturer: this.editForm.get(['manufacturer'])!.value,
      protectedFID: this.editForm.get(['protectedFID'])!.value,
      protectedFarm: this.editForm.get(['protectedFarm'])!.value,
    };
  }
}
