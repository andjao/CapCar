import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FipeValueComponent } from './fipeValue.component';

describe('FipeValueComponent', () => {
  let component: FipeValueComponent;
  let fixture: ComponentFixture<FipeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FipeValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FipeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
