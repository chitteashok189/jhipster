import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProtectedFarmDetailComponent } from './protected-farm-detail.component';

describe('ProtectedFarm Management Detail Component', () => {
  let comp: ProtectedFarmDetailComponent;
  let fixture: ComponentFixture<ProtectedFarmDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectedFarmDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ protectedFarm: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProtectedFarmDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProtectedFarmDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load protectedFarm on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.protectedFarm).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
