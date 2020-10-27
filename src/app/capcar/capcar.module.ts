import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './components/loading/loading.component';
import { PlateComponent } from './components';
import { PlateRequestService } from './services';

@NgModule({
  declarations: [
    LoadingComponent,
    PlateComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingComponent,
    PlateComponent
  ],
  providers:[
    PlateRequestService
  ]
})
export class CapcarModule { }
