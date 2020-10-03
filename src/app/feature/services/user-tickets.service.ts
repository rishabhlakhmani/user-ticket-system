import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CoreStateModel } from 'src/app/core/store/state/core.state';
import { ENavItems } from '../models/enums/nav-items.enum';
import { INavItems } from '../models/interfaces/navigation-items.interface';
import { ITicketQuery } from '../models/interfaces/ticket-query.interface';
import { ITicket } from '../models/interfaces/ticket.interface';

@Injectable()
export class UserTicketsService {
    constructor(private store: Store) { }

    public getNavigationItems(): INavItems[] {
        const stateSnap = this.store.selectSnapshot((state): CoreStateModel => state.core);
        return [...stateSnap.ticketTypes.map(item => ({
            ...item, count: this.calculateCount(item.id, ENavItems.Type),
            category: ENavItems.Type
        })),
        ...stateSnap.ticketStatus.map(item => ({
            ...item, count: this.calculateCount(item.id, ENavItems.Status),
            category: ENavItems.Status
        }))];
    }

    public createTickeQueryObject(category: string, ticketId: number): ITicketQuery {
        const queryOj = {};
        queryOj[category] = ticketId;
        return queryOj;
    }

    public calculateCount(id: number, category: string): number {
        const allTickets = this.store.selectSnapshot((state): ITicket[] => state.core.allTickets);
        return category === ENavItems.Type ?
            allTickets.filter(ticket => ticket.type === id).length :
            allTickets.filter(ticket => ticket.status === id).length;
    }

    public getUserStatus(): number {
        const stateSnap = this.store.selectSnapshot((state): CoreStateModel => state.core);
        let userStatus: number;
        for (let i = 0; i < stateSnap.ticketStatus.length; i++) {
            const status = stateSnap.ticketStatus[i];
            if (status.name === 'InProgress' && stateSnap.allTickets.some((ticket: ITicket) => ticket.status === status.id)) {
                userStatus = status.id;
                break;
            } else if (status.name === 'Completed' && stateSnap.allTickets.every((ticket: ITicket) => ticket.status === status.id)) {
                userStatus = status.id;
                break;
            } else if (status.name === 'NotStarted' && stateSnap.allTickets.every((ticket: ITicket) => ticket.status === status.id)) {
                userStatus = status.id;
                break;
            } else {
                // Random - When mixture of Completed and NotStarted
                userStatus = status.id;
            }
        }

        return userStatus;
    }
}
