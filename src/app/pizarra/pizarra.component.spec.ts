import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizarraComponent } from './pizarra.component';

describe('PizarraComponent', () => {
  let component: PizarraComponent;
  let fixture: ComponentFixture<PizarraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizarraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
