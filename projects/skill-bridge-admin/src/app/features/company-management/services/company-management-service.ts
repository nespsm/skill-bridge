import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CompanyManagementService {


  private clientApi = 'master/client';
  private http = inject(HttpClient);


  getClients(payload: any) {
    return this.http.post<any>(`${this.clientApi}/get`, payload);
  }


  exportClient(id:number) {
    const payload = {id,};
    return this.http.post<any>(`${this.clientApi}/export`, payload);
  }
}