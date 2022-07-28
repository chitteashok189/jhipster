import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProtectedFarmService } from '../service/protected-farm.service';

import { ProtectedFarmComponent } from './protected-farm.component';

describe('ProtectedFarm Management Component', () => {
  let comp: ProtectedFarmComponent;
  let fixture: ComponentFixture<ProtectedFarmComponent>;
  let service: ProtectedFarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProtectedFarmComponent],
    })
      .overrideTemplate(ProtectedFarmComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProtectedFarmComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProtectedFarmService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.protectedFarms?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
