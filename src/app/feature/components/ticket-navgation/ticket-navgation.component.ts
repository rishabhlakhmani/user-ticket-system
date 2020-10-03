import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { SetActiveItem } from 'src/app/core/store/action/core.action';
import { CoreState } from 'src/app/core/store/state/core.state';
import { IActiveItem } from '../../models/interfaces/active-item.interface';
import { INavItems } from '../../models/interfaces/navigation-items.interface';

@Component({
    selector: 'app-ticket-navgation',
    templateUrl: './ticket-navgation.component.html',
    styleUrls: ['./ticket-navgation.component.scss']
})
export class TicketNavgationComponent implements OnInit {
    @Select(CoreState.getActiveItem) activeItem$: Observable<IActiveItem>;

    @Input() navItems: INavItems[];
    @Input() currentUserId: number;
    constructor(private router: Router, private store: Store) { }

    ngOnInit() {
    }

    onClick(item: INavItems): boolean {
        this.store.dispatch(new SetActiveItem(item));
        this.router.navigate(['/user', this.currentUserId, item.category, item.id]);
        return false;
    }

}
