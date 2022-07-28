import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFarm, getFarmIdentifier } from '../farm.model';

export type EntityResponseType = HttpResponse<IFarm>;
export type EntityArrayResponseType = HttpResponse<IFarm[]>;

@Injectable({ providedIn: 'root' })
export class FarmService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/farms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(farm: IFarm): Observable<EntityResponseType> {
    return this.http.post<IFarm>(this.resourceUrl, farm, { observe: 'response' });
  }

  update(farm: IFarm): Observable<EntityResponseType> {
    return this.http.put<IFarm>(`${this.resourceUrl}/${getFarmIdentifier(farm) as number}`, farm, { observe: 'response' });
  }

  partialUpdate(farm: IFarm): Observable<EntityResponseType> {
    return this.http.patch<IFarm>(`${this.resourceUrl}/${getFarmIdentifier(farm) as number}`, farm, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFarm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFarm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFarmToCollectionIfMissing(farmCollection: IFarm[], ...farmsToCheck: (IFarm | null | undefined)[]): IFarm[] {
    const farms: IFarm[] = farmsToCheck.filter(isPresent);
    if (farms.length > 0) {
      const farmCollectionIdentifiers = farmCollection.map(farmItem => getFarmIdentifier(farmItem)!);
      const farmsToAdd = farms.filter(farmItem => {
        const farmIdentifier = getFarmIdentifier(farmItem);
        if (farmIdentifier == null || farmCollectionIdentifiers.includes(farmIdentifier)) {
          return false;
        }
        farmCollectionIdentifiers.push(farmIdentifier);
        return true;
      });
      return [...farmsToAdd, ...farmCollection];
    }
    return farmCollection;
  }
}
