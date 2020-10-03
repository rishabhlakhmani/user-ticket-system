import { INavItems } from 'src/app/feature/models/interfaces/navigation-items.interface';
import { ITicketQuery } from 'src/app/feature/models/interfaces/ticket-query.interface';
import { IUser } from '../../models/User';


export class GetUserById {
    static readonly type = `[User] Get User By Id`;

    constructor(public id: number) {}
}

export class SetCurretUser {
    static readonly type = `[User] Set User`;

    constructor(public user: IUser) {}
}

export class SetActiveItem {
    static readonly type = `[Navigation] Set Active Item`;

    constructor(public payload: Pick<INavItems, 'id' | 'category'>) {}
}

export class GetAllTicketsByUserId {
    static readonly type = `[Ticket] Get All`;

    constructor(public id: number) {}
}

export class GetAllTicketTypes {
    static readonly type = `[Ticket] Get Ticket Types`;

    constructor() {}
}

export class GetAllTicketStatus {
    static readonly type = `[Ticket] Get Ticket Status`;

    constructor() {}
}

export class GetTicketList {
    static readonly type = `[Ticket] Get List`;

    constructor(public payload: ITicketQuery) {}
}

export class ChangeTicketStatus {
    static readonly type = `[Ticket] changeStatus`;

    constructor(public payload: {statusId: number, ticketId: number}) {}
}
