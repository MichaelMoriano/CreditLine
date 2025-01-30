import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  private apiUrlPEN = 'https://v6.exchangerate-api.com/v6/02fbed6d426fe91c01548bc9/latest/PEN'; // Cambia tu clave de API aquí
  private apiUrlUSD = 'https://v6.exchangerate-api.com/v6/02fbed6d426fe91c01548bc9/latest/USD'; // Cambia tu clave de API aquí

  constructor(private http: HttpClient) {}

  getExchangeRateUSD(): Observable<any> {
    return this.http.get<any>(this.apiUrlPEN);
  }

  getExchangeRatePEN(): Observable<any> {
    return this.http.get<any>(this.apiUrlUSD);
  }
}
