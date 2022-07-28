import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProtectedFarmService } from '../service/protected-farm.service';
import { IProtectedFarm, ProtectedFarm } from '../protected-farm.model';
import { IFarm } from 'app/entities/farm/farm.model';
import { FarmService } from 'app/entities/farm/service/farm.service';

import { ProtectedFarmUpdateComponent } from './protected-farm-update.component';

describe('ProtectedFarm Management Update Component', () => {
  let comp: ProtectedFarmUpdateComponent;
  let fixture: ComponentFixture<ProtectedFarmUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let protectedFarmService: ProtectedFarmService;
  let farmService: FarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProtectedFarmUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProtectedFarmUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProtectedFarmUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    protectedFarmService = TestBed.inject(ProtectedFarmService);
    farmService = TestBed.inject(FarmService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Farm query and add missing value', () => {
      const protectedFarm: IProtectedFarm = { id: 456 };
      const farm: IFarm = { id: 43977 };
      protectedFarm.farm = farm;

      const farmCollection: IFarm[] = [{ id: 11936 }];
      jest.spyOn(farmService, 'query').mockReturnValue(of(new HttpResponse({ body: farmCollection })));
      const additionalFarms = [farm];
      const expectedCollection: IFarm[] = [...additionalFarms, ...farmCollection];
      jest.spyOn(farmService, 'addFarmToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ protectedFarm });
      comp.ngOnInit();

      expect(farmService.query).toHaveBeenCalled();
      expect(farmService.addFarmToCollectionIfMissing).toHaveBeenCalledWith(farmCollection, ...additionalFarms);
      expect(comp.farmsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const protectedFarm: IProtectedFarm = { id: 456 };
      const farm: IFarm = { id: 24627 };
      protectedFarm.farm = farm;

      activatedRoute.data = of({ protectedFarm });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(protectedFarm));
      expect(comp.farmsSharedCollection).toContain(farm);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProtectedFarm>>();
      const protectedFarm = { id: 123 };
      jest.spyOn(protectedFarmService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ protectedFarm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: protectedFarm }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(protectedFarmService.update).toHaveBeenCalledWith(protectedFarm);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProtectedFarm>>();
      const protectedFarm = new ProtectedFarm();
      jest.spyOn(protectedFarmService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ protectedFarm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: protectedFarm }));
      saveSubject.complete();

      // THEN
      expect(protectedFarmService.create).toHaveBeenCalledWith(protectedFarm);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProtectedFarm>>();
      const protectedFarm = { id: 123 };
      jest.spyOn(protectedFarmService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ protectedFarm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(protectedFarmService.update).toHaveBeenCalledWith(protectedFarm);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackFarmById', () => {
      it('Should return tracked Farm primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFarmById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
