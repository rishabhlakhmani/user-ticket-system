import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Actions, Select, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { ChangeTicketStatus, GetTicketList, SetActiveItem } from 'src/app/core/store/action/core.action';
import { CoreState } from 'src/app/core/store/state/core.state';
import { ITicket } from '../../models/interfaces/ticket.interface';
import { UserTicketsService } from '../../services/user-tickets.service';
import { statusColor } from '../../mappers/status-color.mapper';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

    @Select(CoreState.getTicketList) ticketList$: Observable<ITicket[]>;
    @Select(CoreState.getTicketStatus) allTicketStatus$: Observable<ITicket[]>;
    public selectedType: number;
    public statusColor = statusColor;
    constructor(private route: ActivatedRoute, private userTicketService: UserTicketsService,
        private store: Store) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                return of(params);
            }
            )).subscribe((params) => {
                const ticketQueryObj = this.userTicketService.createTickeQueryObject(params.get('category'), +params.get('ticketId'));
                this.store.dispatch(new SetActiveItem({id: +params.get('ticketId'), category: params.get('category')}));
                this.store.dispatch(new GetTicketList(ticketQueryObj));
            });
    }

    public onStatusChange(statusId: number, ticketId: number): void {
        this.store.dispatch(new ChangeTicketStatus({ statusId: +statusId, ticketId }));
    }

    trackByFn(index, item): number {
        return item.id;
      }

}
