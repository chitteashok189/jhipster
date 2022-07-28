import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProtectedFarm, getProtectedFarmIdentifier } from '../protected-farm.model';

export type EntityResponseType = HttpResponse<IProtectedFarm>;
export type EntityArrayResponseType = HttpResponse<IProtectedFarm[]>;

@Injectable({ providedIn: 'root' })
export class ProtectedFarmService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/protected-farms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(protectedFarm: IProtectedFarm): Observable<EntityResponseType> {
    return this.http.post<IProtectedFarm>(this.resourceUrl, protectedFarm, { observe: 'response' });
  }

  update(protectedFarm: IProtectedFarm): Observable<EntityResponseType> {
    return this.http.put<IProtectedFarm>(`${this.resourceUrl}/${getProtectedFarmIdentifier(protectedFarm) as number}`, protectedFarm, {
      observe: 'response',
    });
  }

  partialUpdate(protectedFarm: IProtectedFarm): Observable<EntityResponseType> {
    return this.http.patch<IProtectedFarm>(`${this.resourceUrl}/${getProtectedFarmIdentifier(protectedFarm) as number}`, protectedFarm, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProtectedFarm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProtectedFarm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProtectedFarmToCollectionIfMissing(
    protectedFarmCollection: IProtectedFarm[],
    ...protectedFarmsToCheck: (IProtectedFarm | null | undefined)[]
  ): IProtectedFarm[] {
    const protectedFarms: IProtectedFarm[] = protectedFarmsToCheck.filter(isPresent);
    if (protectedFarms.length > 0) {
      const protectedFarmCollectionIdentifiers = protectedFarmCollection.map(
        protectedFarmItem => getProtectedFarmIdentifier(protectedFarmItem)!
      );
      const protectedFarmsToAdd = protectedFarms.filter(protectedFarmItem => {
        const protectedFarmIdentifier = getProtectedFarmIdentifier(protectedFarmItem);
        if (protectedFarmIdentifier == null || protectedFarmCollectionIdentifiers.includes(protectedFarmIdentifier)) {
          return false;
        }
        protectedFarmCollectionIdentifiers.push(protectedFarmIdentifier);
        return true;
      });
      return [...protectedFarmsToAdd, ...protectedFarmCollection];
    }
    return protectedFarmCollection;
  }
}
