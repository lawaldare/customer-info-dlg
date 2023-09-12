import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addCustomerInfo(customerInfo: CustomerInfo): Observable<CustomerInfo> {
    return this.http.post(
      `${this.BASE_URL}/customers`,
      customerInfo
    ) as Observable<CustomerInfo>;
  }
}
