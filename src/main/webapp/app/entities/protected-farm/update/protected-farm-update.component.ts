import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProtectedFarm, ProtectedFarm } from '../protected-farm.model';
import { ProtectedFarmService } from '../service/protected-farm.service';
import { IFarm } from 'app/entities/farm/farm.model';
import { FarmService } from 'app/entities/farm/service/farm.service';
import { ProFarmType } from 'app/entities/enumerations/pro-farm-type.model';
import { ProSubType } from 'app/entities/enumerations/pro-sub-type.model';

@Component({
  selector: 'jhi-protected-farm-update',
  templateUrl: './protected-farm-update.component.html',
})
export class ProtectedFarmUpdateComponent implements OnInit {
  isSaving = false;
  proFarmTypeValues = Object.keys(ProFarmType);
  proSubTypeValues = Object.keys(ProSubType);

  farmsSharedCollection: IFarm[] = [];

  editForm = this.fb.group({
    id: [],
    protectedFarmID: [],
    protectedFarmName: [],
    protectedFarmType: [],
    protectedFarmSubType: [],
    protectedFarmDescription: [],
    farm: [],
  });

  constructor(
    protected protectedFarmService: ProtectedFarmService,
    protected farmService: FarmService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ protectedFarm }) => {
      this.updateForm(protectedFarm);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const protectedFarm = this.createFromForm();
    if (protectedFarm.id !== undefined) {
      this.subscribeToSaveResponse(this.protectedFarmService.update(protectedFarm));
    } else {
      this.subscribeToSaveResponse(this.protectedFarmService.create(protectedFarm));
    }
  }

  trackFarmById(_index: number, item: IFarm): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProtectedFarm>>): void {
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

  protected updateForm(protectedFarm: IProtectedFarm): void {
    this.editForm.patchValue({
      id: protectedFarm.id,
      protectedFarmID: protectedFarm.protectedFarmID,
      protectedFarmName: protectedFarm.protectedFarmName,
      protectedFarmType: protectedFarm.protectedFarmType,
      protectedFarmSubType: protectedFarm.protectedFarmSubType,
      protectedFarmDescription: protectedFarm.protectedFarmDescription,
      farm: protectedFarm.farm,
    });

    this.farmsSharedCollection = this.farmService.addFarmToCollectionIfMissing(this.farmsSharedCollection, protectedFarm.farm);
  }

  protected loadRelationshipsOptions(): void {
    this.farmService
      .query()
      .pipe(map((res: HttpResponse<IFarm[]>) => res.body ?? []))
      .pipe(map((farms: IFarm[]) => this.farmService.addFarmToCollectionIfMissing(farms, this.editForm.get('farm')!.value)))
      .subscribe((farms: IFarm[]) => (this.farmsSharedCollection = farms));
  }

  protected createFromForm(): IProtectedFarm {
    return {
      ...new ProtectedFarm(),
      id: this.editForm.get(['id'])!.value,
      protectedFarmID: this.editForm.get(['protectedFarmID'])!.value,
      protectedFarmName: this.editForm.get(['protectedFarmName'])!.value,
      protectedFarmType: this.editForm.get(['protectedFarmType'])!.value,
      protectedFarmSubType: this.editForm.get(['protectedFarmSubType'])!.value,
      protectedFarmDescription: this.editForm.get(['protectedFarmDescription'])!.value,
      farm: this.editForm.get(['farm'])!.value,
    };
  }
}
