import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileEditComponent } from './user-profile-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;
  let mockDialogRef: any;
  let mockUser: any;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockUser = { name: 'John Doe', email: 'john@example.com', password: '123456', photo: 'url' };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockUser }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form with user data on init', () => {
    component.ngOnInit();
    expect(component.userForm.value).toEqual({
      name: mockUser.name,
      email: mockUser.email,
      password: mockUser.password,
      photo: null
    });
  });

  it('should handle ngOnChanges correctly', () => {
    component.ngOnInit();
    component.ngOnChanges();
    expect(component.userForm.value.name).toBe(mockUser.name);
    expect(component.userForm.value.email).toBe(mockUser.email);
    expect(component.imagePreview).toBe(mockUser.photo);
  });

  it('should update the imagePreview on file change', () => {
    const mockEvent = {
      target: {
        files: [new Blob([''], { type: 'image/jpeg' })]
      }
    };
    component.onFileChange(mockEvent);
    const photoControl = component.userForm.get('photo');
    expect(photoControl).toBeTruthy(); // Ensure the control exists
    if (photoControl) {
      expect(photoControl.value instanceof Blob).toBeTrue();
    }
  });

  it('should close dialog with updated user data on submit', () => {
    component.ngOnInit();
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(jasmine.objectContaining({
      name: mockUser.name,
      email: mockUser.email,
      password: mockUser.password
    }));
  });
});