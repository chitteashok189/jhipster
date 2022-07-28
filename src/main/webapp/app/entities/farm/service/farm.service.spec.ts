import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FarmType } from 'app/entities/enumerations/farm-type.model';
import { SubType } from 'app/entities/enumerations/sub-type.model';
import { IFarm, Farm } from '../farm.model';

import { FarmService } from './farm.service';

describe('Farm Service', () => {
  let service: FarmService;
  let httpMock: HttpTestingController;
  let elemDefault: IFarm;
  let expectedResult: IFarm | IFarm[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FarmService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      farmID: 'AAAAAAA',
      pformID: 'AAAAAAA',
      farmName: 'AAAAAAA',
      farmType: FarmType.PFAL,
      farmSubType: SubType.Pico,
      farmDescription: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Farm', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Farm()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Farm', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          farmID: 'BBBBBB',
          pformID: 'BBBBBB',
          farmName: 'BBBBBB',
          farmType: 'BBBBBB',
          farmSubType: 'BBBBBB',
          farmDescription: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Farm', () => {
      const patchObject = Object.assign(
        {
          farmID: 'BBBBBB',
          farmName: 'BBBBBB',
          farmType: 'BBBBBB',
        },
        new Farm()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Farm', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          farmID: 'BBBBBB',
          pformID: 'BBBBBB',
          farmName: 'BBBBBB',
          farmType: 'BBBBBB',
          farmSubType: 'BBBBBB',
          farmDescription: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Farm', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFarmToCollectionIfMissing', () => {
      it('should add a Farm to an empty array', () => {
        const farm: IFarm = { id: 123 };
        expectedResult = service.addFarmToCollectionIfMissing([], farm);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(farm);
      });

      it('should not add a Farm to an array that contains it', () => {
        const farm: IFarm = { id: 123 };
        const farmCollection: IFarm[] = [
          {
            ...farm,
          },
          { id: 456 },
        ];
        expectedResult = service.addFarmToCollectionIfMissing(farmCollection, farm);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Farm to an array that doesn't contain it", () => {
        const farm: IFarm = { id: 123 };
        const farmCollection: IFarm[] = [{ id: 456 }];
        expectedResult = service.addFarmToCollectionIfMissing(farmCollection, farm);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(farm);
      });

      it('should add only unique Farm to an array', () => {
        const farmArray: IFarm[] = [{ id: 123 }, { id: 456 }, { id: 61235 }];
        const farmCollection: IFarm[] = [{ id: 123 }];
        expectedResult = service.addFarmToCollectionIfMissing(farmCollection, ...farmArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const farm: IFarm = { id: 123 };
        const farm2: IFarm = { id: 456 };
        expectedResult = service.addFarmToCollectionIfMissing([], farm, farm2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(farm);
        expect(expectedResult).toContain(farm2);
      });

      it('should accept null and undefined values', () => {
        const farm: IFarm = { id: 123 };
        expectedResult = service.addFarmToCollectionIfMissing([], null, farm, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(farm);
      });

      it('should return initial array if no Farm is added', () => {
        const farmCollection: IFarm[] = [{ id: 123 }];
        expectedResult = service.addFarmToCollectionIfMissing(farmCollection, undefined, null);
        expect(expectedResult).toEqual(farmCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
