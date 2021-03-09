import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PlatesComponent } from '.';
import { RequestsService } from '../..';

describe('PlateComponent', () => {
  let component: PlatesComponent;
  let fixture: ComponentFixture<PlatesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        PlatesComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [
        RequestsService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
