import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { Subject, takeUntil } from 'rxjs';

const regex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  customerInfoForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.pattern(regex)]],
  });

  showSuccessMessage: boolean = false;
  private readonly ngOnDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  submit(form: FormGroup) {
    this.customerService
      .addCustomerInfo(form.value)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(
        () => {
          this.showSuccessMessage = true;
        },
        (error) => {
          console.log(error);
        }
      );
    this.customerInfoForm.reset();
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
