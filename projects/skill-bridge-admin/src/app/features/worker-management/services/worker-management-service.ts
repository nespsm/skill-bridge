import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkerManagementService {


  private workerApi = 'master/worker';
  private http = inject(HttpClient);


  getWorker(payload: any) {
    return this.http.post<any>(`${this.workerApi}/get`, payload);
  }

  updateWorker(id:number, workerData: any) {
    const payload = {id, ...workerData};
    return this.http.post<any>(`${this.workerApi}/update`, payload);
  }

  exportWorker(id:number) {
    const payload = {id,};
    return this.http.post<any>(`${this.workerApi}/export`, payload);
  }
}
