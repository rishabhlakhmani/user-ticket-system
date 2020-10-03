import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { UserTicketsComponent } from './components/user-tickets/user-tickets.component';
import { TicketNavgationComponent } from './components/ticket-navgation/ticket-navgation.component';
import { UserTicketsService } from './services/user-tickets.service';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { SharedModule } from '../shared/shared.module';
import { TicketListResolver } from './guard/ticketList.resolver';


@NgModule({
  declarations: [UserTicketsComponent, TicketNavgationComponent, TicketListComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule
  ],
  providers: [UserTicketsService, TicketListResolver]
})
export class FeatureModule { }
