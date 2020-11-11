import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateNationalComponent } from './plateNational.component';

describe('PlateNacionalComponent', () => {
  let component: PlateNationalComponent;
  let fixture: ComponentFixture<PlateNationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateNationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateNationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
