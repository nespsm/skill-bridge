import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterSkillService {


  private skillsApi = `${environment.apiEndPoint}user/master/skills`;
  private http = inject(HttpClient);

  getSkills(payload: any) {
    return this.http.post<any>(`${this.skillsApi}/list`, payload);
  }


  addSkill(payload: any) {
        return this.http.post<any>(`${this.skillsApi}/add`, payload);
    }
}
