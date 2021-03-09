import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateMercoSulComponent } from './plateMercoSul.component';

describe('PlateMercoSulComponent', () => {
  let component: PlateMercoSulComponent;
  let fixture: ComponentFixture<PlateMercoSulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlateMercoSulComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateMercoSulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
