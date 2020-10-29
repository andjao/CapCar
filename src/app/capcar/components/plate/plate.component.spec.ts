import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PlateComponent } from './plate.component';
import { PlateRequestService } from '../../services';

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
      schemas:[
       CUSTOM_ELEMENTS_SCHEMA
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
