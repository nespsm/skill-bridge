import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterUserService {



    private userAuthApi = `${environment.apiEndPoint}user/admin/auth`;
    private http = inject(HttpClient);

    createUser(payload: any) {
        return this.http.post<any>(`${this.userAuthApi}/createUsers/v1.0`, payload);
    }

    editUser(payload: any) {
        return this.http.post<any>(`${this.userAuthApi}/editUsers/v1.0`, payload);
    }

    getUsers() {
        return this.http.get<any>(`${this.userAuthApi}/getUsers/v1.0`);
    }

    getUserRoles() {
        return this.http.post<any>(`${this.userAuthApi}/allowedRoles/v1.0`, {});
    }

    deleteUser(payload: any) {
        return this.http.post<any>(`${this.userAuthApi}/delete`, payload);
    }
}
