import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { Subject, takeUntil } from 'rxjs';

const regex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.pattern(regex)]);

  customerInfoForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
  });

  showSuccessMessage: boolean = false;
  private readonly ngOnDestroy$ = new Subject<void>();

  constructor(private customerService: CustomerService) {}

  submit() {
    const customerInfo = {
      firstName: this.customerInfoForm.value.firstName ?? '',
      lastName: this.customerInfoForm.value.lastName ?? '',
      email: this.customerInfoForm.value.email ?? '',
    };
    this.customerService
      .addCustomerInfo(customerInfo)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(
        () => {
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 2000);
          this.customerInfoForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
