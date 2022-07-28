import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProtectedFarm, ProtectedFarm } from '../protected-farm.model';
import { ProtectedFarmService } from '../service/protected-farm.service';

@Injectable({ providedIn: 'root' })
export class ProtectedFarmRoutingResolveService implements Resolve<IProtectedFarm> {
  constructor(protected service: ProtectedFarmService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProtectedFarm> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((protectedFarm: HttpResponse<ProtectedFarm>) => {
          if (protectedFarm.body) {
            return of(protectedFarm.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProtectedFarm());
  }
}
