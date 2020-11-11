import {
  NgModule,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  FormsModule,
} from '@angular/forms';

import {
  HttpClientModule,
} from '@angular/common/http';


import {
  NgxMaskModule,
  IConfig
} from 'ngx-mask';

import {
  BackgroundComponent,
  LoadingComponent,
  PlatesComponent,
  PlateReponseComponent,
  FipeValueComponent,
} from './components';

import {
  LoadingService,
  PlateRequestService,
  LocalStorageService,
} from './services';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  declarations: [
    BackgroundComponent,
    LoadingComponent,
    PlatesComponent,
    PlateReponseComponent,
    FipeValueComponent,
  ],
  exports: [
    BackgroundComponent,
    LoadingComponent,
    PlatesComponent,
    PlateReponseComponent,
    FipeValueComponent,
  ],
  providers: [
    LoadingService,
    PlateRequestService,
    LocalStorageService,
    FipeValueComponent,
  ]
})
export class CapcarModule { }
