import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkerManagementService {


  private workerApi = `${environment.apiEndPoint}user/master/workers`;
  private http = inject(HttpClient);


  getWorker(payload: any) {
    return this.http.post<any>(`${this.workerApi}/getWorker`, payload);
  }

  seacrhWorker(payload: any) {
    return this.http.post<any>(`${this.workerApi}/search`, payload);
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
