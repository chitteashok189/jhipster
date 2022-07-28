import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FarmService } from '../service/farm.service';
import { IFarm, Farm } from '../farm.model';

import { FarmUpdateComponent } from './farm-update.component';

describe('Farm Management Update Component', () => {
  let comp: FarmUpdateComponent;
  let fixture: ComponentFixture<FarmUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let farmService: FarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FarmUpdateComponent],
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
      .overrideTemplate(FarmUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FarmUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    farmService = TestBed.inject(FarmService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const farm: IFarm = { id: 456 };

      activatedRoute.data = of({ farm });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(farm));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Farm>>();
      const farm = { id: 123 };
      jest.spyOn(farmService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ farm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: farm }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(farmService.update).toHaveBeenCalledWith(farm);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Farm>>();
      const farm = new Farm();
      jest.spyOn(farmService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ farm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: farm }));
      saveSubject.complete();

      // THEN
      expect(farmService.create).toHaveBeenCalledWith(farm);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Farm>>();
      const farm = { id: 123 };
      jest.spyOn(farmService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ farm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(farmService.update).toHaveBeenCalledWith(farm);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
