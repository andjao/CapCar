import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PlateComponent } from '.';
import { PlateRequestService } from '../..';

describe('PlateComponent', () => {
  let component: PlateComponent;
  let fixture: ComponentFixture<PlateComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PlateComponent
      ],
      imports:[
        FormsModule,
        HttpClientModule
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
