import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterSkillService {


  private skillsApi = 'master/skill';
  private http = inject(HttpClient);

  getSkills(payload: any) {
    return this.http.post<any>(`${this.skillsApi}/get`, payload);
  }


  addSkill(payload: any) {
        return this.http.post<any>(`${this.skillsApi}/add`, payload);
    }
}
