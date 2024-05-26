import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';

import { CreateGoalComponent } from './create-goal.component';

describe('CreateGoalComponent', () => {
  let component: CreateGoalComponent;
  let fixture: ComponentFixture<CreateGoalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CreateGoalComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatRadioModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { long: 0, short: 0 } },
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form on init', () => {
    expect(component.goalForm).toBeDefined();
    expect(component.goalForm.controls['title']).toBeDefined();
    expect(component.goalForm.controls['notes']).toBeDefined();
    expect(component.goalForm.controls['type']).toBeDefined();
    expect(component.goalForm.controls['deadline']).toBeDefined();
  });

  it('should submit the form and close the dialog with form values if the form is valid', () => {
    const formValues = {
      title: 'New Goal',
      notes: 'Notes for the new goal',
      type: 'long',
      deadline: new Date()
    };
    component.goalForm.setValue(formValues);
    component.onSubmit();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      ...formValues,
      completed: false,
    });
  });
});
