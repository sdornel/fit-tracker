import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let userServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    userServiceMock = jasmine.createSpyObj('UserService', ['register']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, NoopAnimationsModule],
      declarations: [],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with two controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should make the email and password controls required', () => {
    let email = component.loginForm.get('email');
    let password = component.loginForm.get('password');

    email!.setValue('');
    password!.setValue('');

    expect(email!.valid).toBeFalsy();
    expect(password!.valid).toBeFalsy();
  });

  it('should not call the login method if the form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.onSubmit();

    expect(authServiceMock.login.calls.any()).toBeFalse();
  });

  it('should call the login method if the form is valid', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith({ email: 'test@example.com', password: '123456' });
  });

  it('should open the registration dialog and call register on close', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({ name: 'Test', email: 'test@example.com', password: '123456' }), close: null });
    dialogMock.open.and.returnValue(dialogRefSpyObj);
    userServiceMock.register = jasmine.createSpy('register').and.returnValue(of({}));
    component.register();
    fixture.detectChanges();

    expect(dialogMock.open).toHaveBeenCalled();
    expect(userServiceMock.register).toHaveBeenCalledWith('Test', 'test@example.com', '123456');
  });

  it('should unsubscribe on component destroy', () => {
    const spy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
