import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundComponent, LoadingComponent, PlateComponent } from './components';
import { PlateRequestService } from './services';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BackgroundComponent,
    LoadingComponent,
    ToolbarComponent,
    PlateComponent
  ],
  exports: [
    BackgroundComponent,
    LoadingComponent,
    ToolbarComponent,
    PlateComponent
  ],
  providers:[
    PlateRequestService
  ]
})
export class CapcarModule { }
