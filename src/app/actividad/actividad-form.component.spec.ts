import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActividadFormComponent } from './actividad-form.component';

describe('ActividadFormComponent', () => {
  let component: ActividadFormComponent;
  let fixture: ComponentFixture<ActividadFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
