import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProFarmType } from 'app/entities/enumerations/pro-farm-type.model';
import { ProSubType } from 'app/entities/enumerations/pro-sub-type.model';
import { IProtectedFarm, ProtectedFarm } from '../protected-farm.model';

import { ProtectedFarmService } from './protected-farm.service';

describe('ProtectedFarm Service', () => {
  let service: ProtectedFarmService;
  let httpMock: HttpTestingController;
  let elemDefault: IProtectedFarm;
  let expectedResult: IProtectedFarm | IProtectedFarm[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProtectedFarmService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      protectedFarmID: 'AAAAAAA',
      protectedFarmName: 'AAAAAAA',
      protectedFarmType: ProFarmType.SN_Shade,
      protectedFarmSubType: ProSubType.Femto,
      protectedFarmDescription: 'AAAAAAA',
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

    it('should create a ProtectedFarm', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ProtectedFarm()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProtectedFarm', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          protectedFarmID: 'BBBBBB',
          protectedFarmName: 'BBBBBB',
          protectedFarmType: 'BBBBBB',
          protectedFarmSubType: 'BBBBBB',
          protectedFarmDescription: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProtectedFarm', () => {
      const patchObject = Object.assign(
        {
          protectedFarmName: 'BBBBBB',
          protectedFarmSubType: 'BBBBBB',
          protectedFarmDescription: 'BBBBBB',
        },
        new ProtectedFarm()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProtectedFarm', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          protectedFarmID: 'BBBBBB',
          protectedFarmName: 'BBBBBB',
          protectedFarmType: 'BBBBBB',
          protectedFarmSubType: 'BBBBBB',
          protectedFarmDescription: 'BBBBBB',
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

    it('should delete a ProtectedFarm', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProtectedFarmToCollectionIfMissing', () => {
      it('should add a ProtectedFarm to an empty array', () => {
        const protectedFarm: IProtectedFarm = { id: 123 };
        expectedResult = service.addProtectedFarmToCollectionIfMissing([], protectedFarm);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(protectedFarm);
      });

      it('should not add a ProtectedFarm to an array that contains it', () => {
        const protectedFarm: IProtectedFarm = { id: 123 };
        const protectedFarmCollection: IProtectedFarm[] = [
          {
            ...protectedFarm,
          },
          { id: 456 },
        ];
        expectedResult = service.addProtectedFarmToCollectionIfMissing(protectedFarmCollection, protectedFarm);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProtectedFarm to an array that doesn't contain it", () => {
        const protectedFarm: IProtectedFarm = { id: 123 };
        const protectedFarmCollection: IProtectedFarm[] = [{ id: 456 }];
        expectedResult = service.addProtectedFarmToCollectionIfMissing(protectedFarmCollection, protectedFarm);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(protectedFarm);
      });

      it('should add only unique ProtectedFarm to an array', () => {
        const protectedFarmArray: IProtectedFarm[] = [{ id: 123 }, { id: 456 }, { id: 7756 }];
        const protectedFarmCollection: IProtectedFarm[] = [{ id: 123 }];
        expectedResult = service.addProtectedFarmToCollectionIfMissing(protectedFarmCollection, ...protectedFarmArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const protectedFarm: IProtectedFarm = { id: 123 };
        const protectedFarm2: IProtectedFarm = { id: 456 };
        expectedResult = service.addProtectedFarmToCollectionIfMissing([], protectedFarm, protectedFarm2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(protectedFarm);
        expect(expectedResult).toContain(protectedFarm2);
      });

      it('should accept null and undefined values', () => {
        const protectedFarm: IProtectedFarm = { id: 123 };
        expectedResult = service.addProtectedFarmToCollectionIfMissing([], null, protectedFarm, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(protectedFarm);
      });

      it('should return initial array if no ProtectedFarm is added', () => {
        const protectedFarmCollection: IProtectedFarm[] = [{ id: 123 }];
        expectedResult = service.addProtectedFarmToCollectionIfMissing(protectedFarmCollection, undefined, null);
        expect(expectedResult).toEqual(protectedFarmCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
