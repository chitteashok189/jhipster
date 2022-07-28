import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFarm, Farm } from '../farm.model';
import { FarmService } from '../service/farm.service';
import { FarmType } from 'app/entities/enumerations/farm-type.model';
import { SubType } from 'app/entities/enumerations/sub-type.model';

@Component({
  selector: 'jhi-farm-update',
  templateUrl: './farm-update.component.html',
})
export class FarmUpdateComponent implements OnInit {
  isSaving = false;
  farmTypeValues = Object.keys(FarmType);
  subTypeValues = Object.keys(SubType);

  editForm = this.fb.group({
    id: [],
    farmID: [],
    pformID: [],
    farmName: [],
    farmType: [],
    farmSubType: [],
    farmDescription: [],
  });

  constructor(protected farmService: FarmService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ farm }) => {
      this.updateForm(farm);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const farm = this.createFromForm();
    if (farm.id !== undefined) {
      this.subscribeToSaveResponse(this.farmService.update(farm));
    } else {
      this.subscribeToSaveResponse(this.farmService.create(farm));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFarm>>): void {
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

  protected updateForm(farm: IFarm): void {
    this.editForm.patchValue({
      id: farm.id,
      farmID: farm.farmID,
      pformID: farm.pformID,
      farmName: farm.farmName,
      farmType: farm.farmType,
      farmSubType: farm.farmSubType,
      farmDescription: farm.farmDescription,
    });
  }

  protected createFromForm(): IFarm {
    return {
      ...new Farm(),
      id: this.editForm.get(['id'])!.value,
      farmID: this.editForm.get(['farmID'])!.value,
      pformID: this.editForm.get(['pformID'])!.value,
      farmName: this.editForm.get(['farmName'])!.value,
      farmType: this.editForm.get(['farmType'])!.value,
      farmSubType: this.editForm.get(['farmSubType'])!.value,
      farmDescription: this.editForm.get(['farmDescription'])!.value,
    };
  }
}
