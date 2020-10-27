import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateComponent } from './plate.component';
import { PlateRequestService } from '../../services';

describe('PlateComponent', () => {
  let component: PlateComponent;
  let fixture: ComponentFixture<PlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PlateComponent
      ],
      providers: [
        PlateRequestService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
