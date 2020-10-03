import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store, Actions } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GetAllTicketsByUserId } from 'src/app/core/store/action/core.action';

@Injectable()
export class TicketListResolver implements Resolve<Actions> {

    constructor(private store: Store) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Actions>  {
        return this.store.dispatch(new GetAllTicketsByUserId(+route.parent.paramMap.get('id'))).pipe(take(1));
      }

}
