import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActividadListComponent } from './actividad-list.component';

describe('ActividadListComponent', () => {
  let component: ActividadListComponent;
  let fixture: ComponentFixture<ActividadListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
