import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/core/models/User';
import { GetAllTicketsByUserId, GetAllTicketStatus, GetAllTicketTypes, GetUserById } from 'src/app/core/store/action/core.action';
import { CoreState } from 'src/app/core/store/state/core.state';
import { statusColor } from '../../mappers/status-color.mapper';
import { INavItems } from '../../models/interfaces/navigation-items.interface';
import { ITicket } from '../../models/interfaces/ticket.interface';
import { UserTicketsService } from '../../services/user-tickets.service';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.scss']
})
export class UserTicketsComponent implements OnInit {
  public userId: number;
  public navItems: INavItems[];
  public userStatusColor: string;
  private statusColor = statusColor;
  @Select(CoreState.getCurrentUser) user$: Observable<IUser>;
  @Select(CoreState.getAllTickets) allTickets$: Observable<ITicket[]>;

  constructor(private route: ActivatedRoute, private store: Store, private userTicketService: UserTicketsService) { }

  ngOnInit() {
    this.fetchUserAndTickets();
  }

  private fetchUserAndTickets(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.userId = +params.get('id');
        return of(this.userId);
      }
      )).subscribe(() => {
        this.store.dispatch(new GetUserById(this.userId));
        // initally when all 3 gets successful then only we can create navigation Items
        this.store.dispatch([new GetAllTicketsByUserId(this.userId), new GetAllTicketTypes(), new GetAllTicketStatus()]).subscribe(() => {
            this.subscribeToTicketChange();
          });
      });
  }

  private subscribeToTicketChange(): void {
    this.allTickets$.subscribe(() => {
        this.navItems = this.userTicketService.getNavigationItems();
        this.userStatusColor = this.statusColor.get(this.userTicketService.getUserStatus());
    });
  }

}
