import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LiveListComponent } from './live-list.component';

describe('LiveListComponent', () => {
  let component: LiveListComponent;
  let fixture: ComponentFixture<LiveListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
