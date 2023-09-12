import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './shared/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent, InputComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    })
  );

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Sign up form', () => {
    beforeEach(async () => {
      component.customerInfoForm.get('firstName')?.setValue('Dare');
      component.customerInfoForm.get('lastName')?.setValue('Lawal');
      component.customerInfoForm.get('email')?.setValue('lawaldare@gmail.com');
      fixture.detectChanges();
    });

    it('should call `submit` method of AppComponent when the button is clicked', () => {
      spyOn(component, 'submit');
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
      expect(component.submit).toHaveBeenCalled();
    });
  });
});
