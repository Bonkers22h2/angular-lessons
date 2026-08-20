import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BeneficiaryService {
    private baseUrl = 'http://localhost:8080/accounts';

    constructor(private http: HttpClient){}

    getBeneficiaries(accountNumber: string) :Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/${accountNumber}/beneficiaries`);
    }
}
