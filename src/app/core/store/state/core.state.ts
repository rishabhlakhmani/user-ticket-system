import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';
import {
    ChangeTicketStatus, GetAllTicketsByUserId, GetAllTicketStatus, GetAllTicketTypes, GetTicketList,
    GetUserById, SetActiveItem, SetCurretUser
} from '../action/core.action';
import { Injectable } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { IUser } from '../../models/User';
import { ITicketType } from 'src/app/feature/models/interfaces/ticket-type.interface';
import { ITicketStatus } from 'src/app/feature/models/interfaces/ticket-status.interface';
import { ITicket } from 'src/app/feature/models/interfaces/ticket.interface';
import { INavItems } from 'src/app/feature/models/interfaces/navigation-items.interface';
import { ENavItems } from 'src/app/feature/models/enums/nav-items.enum';

export class CoreStateModel {
    currentUser: IUser;
    activeItem: Pick<INavItems, 'id' | 'category'>;
    allTickets: ITicket[];
    ticketList: ITicket[];
    ticketTypes: ITicketType[];
    ticketStatus: ITicketStatus[];
}

@State<CoreStateModel>({
    name: 'core',
    defaults: new CoreStateModel()
})
@Injectable()
export class CoreState {

    constructor(private coreService: CoreService) { }

    @Selector()
    static getCurrentUser(state: CoreStateModel) {
        return state.currentUser;
    }

    @Selector()
    static getActiveItem(state: CoreStateModel) {
        return state.activeItem;
    }

    @Selector()
    static getTicketList(state: CoreStateModel) {
        return state.ticketList;
    }

    @Selector()
    static getAllTickets(state: CoreStateModel) {
        return state.allTickets;
    }

    @Selector()
    static getTicketStatus(state: CoreStateModel) {
        return state.ticketStatus;
    }

    @Selector()
    static getTicketTypes(state: CoreStateModel) {
        return state.ticketTypes;
    }

    @Action(SetCurretUser)
    setCurretUser(context: StateContext<CoreStateModel>, { user }: SetCurretUser) {
        context.patchState({
            currentUser: user
        });
    }

    @Action(SetActiveItem)
    setActiveItem(context: StateContext<CoreStateModel>, { payload }: SetActiveItem) {
        context.patchState({
            activeItem: payload
        });
    }

    @Action(GetAllTicketsByUserId)
    getAllTickets(context: StateContext<CoreStateModel>, { id }: GetAllTicketsByUserId) {
        if (!context.getState().allTickets) {
            return this.coreService.getAllTickets(id).pipe(
                tap((resp: ITicket[]) => {
                    context.patchState({ allTickets: resp });
                })
            );
        }
    }

    @Action(GetUserById)
    getUserById(context: StateContext<CoreStateModel>, { id }: GetUserById) {
        return this.coreService.getUserById(id).pipe(
            mergeMap((result: IUser) => context.dispatch(new SetCurretUser(result)))
        );
    }

    @Action(GetAllTicketTypes)
    getAllTypes(context: StateContext<CoreStateModel>) {
        return this.coreService.getAllTypes().pipe(
            tap((resp: ITicketType[]) => {
                context.patchState({ ticketTypes: resp });
            })
        );
    }

    @Action(GetAllTicketStatus)
    getAllStatus(context: StateContext<CoreStateModel>) {
        return this.coreService.getAllStatus().pipe(
            tap((resp: ITicketStatus[]) => {
                context.patchState({ ticketStatus: resp });
            })
        );
    }

    @Action(GetTicketList)
    getTicketList(context: StateContext<CoreStateModel>, { payload }: GetTicketList) {
        const state = context.getState();
        const ticketDisplayList = payload.type ? state.allTickets.filter(ticket => ticket.type === payload.type) :
            state.allTickets.filter(ticket => ticket.status === payload.status);
        context.patchState({ ticketList: ticketDisplayList });
    }

    @Action(ChangeTicketStatus)
    changeTicketStatus(context: StateContext<CoreStateModel>, { payload }: ChangeTicketStatus) {
        return this.coreService.changeTicketStatus(payload.statusId, payload.ticketId).pipe(
            tap((resp: ITicket) => {
                const allTickets = [...context.getState().allTickets];
                const foundIndex = allTickets.findIndex(ticket => ticket.id === resp.id);
                allTickets[foundIndex] = resp;
                context.patchState({ allTickets: allTickets });
            }),
            mergeMap(() => {
                const activeItem = context.getState().activeItem;
                const isStatus = activeItem.category === ENavItems.Status ? true : false;
                return context.dispatch(new GetTicketList(isStatus ? { status: activeItem.id } : { type: activeItem.id }));
            })
        );
    }
}
