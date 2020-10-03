import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { UserTicketsComponent } from './components/user-tickets/user-tickets.component';
import { TicketListResolver } from './guard/ticketList.resolver';

const routes: Routes = [
    {
        path: '', component: UserTicketsComponent, children: [
            {
                path: ':category/:ticketId', component: TicketListComponent, resolve: {
                    allTickets: TicketListResolver
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
