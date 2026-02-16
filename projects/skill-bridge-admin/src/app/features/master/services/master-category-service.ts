import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MasterCategoryService {



    private categoryApi = 'master/category';
    private http = inject(HttpClient);

    getCategories() {
        return this.http.post<any>(`${this.categoryApi}/get`, {});
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
