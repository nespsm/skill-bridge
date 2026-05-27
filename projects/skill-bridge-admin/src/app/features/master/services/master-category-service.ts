import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterCategoryService {



    private categoryApi = `${environment.apiEndPoint}/master/skill-category`;
    private categoryStatApi = `${environment.apiEndPoint}/master/stats`;
    private http = inject(HttpClient);

    getCategories() {
        return this.http.get<any>(`${this.categoryApi}/list`);
    }

    getCategoryStats() {
        return this.http.get<any>(`${this.categoryStatApi}/byCategory`);
    }

    deleteCategory(payload: any) {
        return this.http.post<any>(`${this.categoryApi}/delete`, payload);
    }

    addCategory(payload: any) {
        return this.http.post<any>(`${this.categoryApi}/add`, payload);
    }
    
    updateCategory(payload: any) {
        return this.http.post<any>(`${this.categoryApi}/update`, payload);
    }
}
