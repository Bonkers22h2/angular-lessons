import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private baseUrl = 'http://localhost:8080/accounts';

    constructor(private http: HttpClient) { }

    getAccounts(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    getAccount(accountNumber: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${accountNumber}`);
    }
    createAccount(account: any): Observable<any> {
        return this.http.post<any>(this.baseUrl, account);
    }

    withdraw(accountNumber: string, amount: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${accountNumber}/withdraw`, { amount });
    }
}   