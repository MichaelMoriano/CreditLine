 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreditLine {
  id: number;
  customerName: string;
  approvedAmount: number;
  usedAmount: number;
  availableAmount: number;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditLineService {
  private apiUrl = 'http://localhost:5047/api/creditline';

  constructor(private http: HttpClient) {}

  getCreditLines(): Observable<any> {
    return this.http.get(`${this.apiUrl}/active`);
  }

  getCreditLinesById(Id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/detail/${Id}`);
  }

  createCreditLine(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // makeDisbursement(creditLineId: number, amount: number, currency: string, exchangeRate: number = 1): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const body = JSON.stringify({ creditLineId, amount, currency, exchangeRate });
    
  //   return this.http.post(`${this.apiUrl}/Disburse`,body, {headers});
  // }

  makeDisbursement(creditLineId: number, amount: number, currency: string, exchangeRate: number = 1): Observable<any> {
    const body = { creditLineId, amount, currency, exchangeRate };
    return this.http.post(`${this.apiUrl}/Disburse`, body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: false });
  }
}