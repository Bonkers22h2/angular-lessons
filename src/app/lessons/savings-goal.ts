import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SavingsGoalService {
    private baseUrl = 'http://localhost:8080/accounts';

    constructor(private http:HttpClient){}

    getSavingsGoal(accountNumber: string): Observable<any[]>{
        return this.http.get<any[]>(`${this.baseUrl}/${accountNumber}/savingsGoal`);
    }
    
    getSavingGoal(accountNumber: string, id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${accountNumber}/savingsGoal/${id}`);
    }

    createSavingsGoal(accountNumber: string, savingGoal: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${accountNumber}/savingsGoal`, savingGoal);
    }
}
