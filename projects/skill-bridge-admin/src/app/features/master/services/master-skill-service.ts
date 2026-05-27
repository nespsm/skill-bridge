import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterSkillService {


  private skillsApi = `${environment.apiEndPoint}/master/skills`;
  private skillStatApi = `${environment.apiEndPoint}/master/stats`;

  private http = inject(HttpClient);

  getSkills(payload: any) {
    return this.http.post<any>(`${this.skillsApi}/list`, payload);
  }

  getSkillStats(categoryId: number) {
    return this.http.get<any>(`${this.skillStatApi}/bySkill?categoryId=${categoryId}`);
  }

  addSkill(payload: any) {
    return this.http.post<any>(`${this.skillsApi}/add`, payload);
  }

  updateSkill(payload: any) {
    return this.http.post<any>(`${this.skillsApi}/update`, payload);
  }

  deleteSkill(payload: { id: number, skillName: string }) {
    return this.http.post<any>(`${this.skillsApi}/delete`, payload);
  }
}
