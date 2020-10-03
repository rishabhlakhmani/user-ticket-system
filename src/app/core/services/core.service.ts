import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CoreService {

    public apiBaseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    changeTicketStatus(statusId: number, ticketId: number) {
        const url = `${this.apiBaseUrl}/ticket/${ticketId}`;
        return this.http.patch(
            url,
            {
                status: statusId
            },
        );
    }

    getUserById(id: number) {
        const url = `${this.apiBaseUrl}/user/${id}`;
        return this.http.get(
            url,
        );
    }

    getAllTypes() {
        const url = `${this.apiBaseUrl}/type`;
        return this.http.get(
            url,
        );
    }

    getAllStatus() {
        const url = `${this.apiBaseUrl}/status`;
        return this.http.get(
            url,
        );
    }

    getAllTickets(id: number) {
        const url = `${this.apiBaseUrl}/ticket/?assignee=${id}`;
        return this.http.get(
            url,
        );
    }

}
