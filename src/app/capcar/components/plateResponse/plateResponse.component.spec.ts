import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateReponseComponent } from '.';

describe('PlateReponseComponent', () => {
  let component: PlateReponseComponent;
  let fixture: ComponentFixture<PlateReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlateReponseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
