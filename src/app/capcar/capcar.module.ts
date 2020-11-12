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
  PlateNationalComponent,
  PlateMercoSulComponent,
  PlateReponseComponent,
  FipeValueComponent,
  HistoryComponent,
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
    PlateNationalComponent,
    PlateMercoSulComponent,
    PlateReponseComponent,
    FipeValueComponent,
    HistoryComponent,
  ],
  exports: [
    BackgroundComponent,
    LoadingComponent,
    PlatesComponent,
    PlateNationalComponent,
    PlateMercoSulComponent,
    PlateReponseComponent,
    FipeValueComponent,
    HistoryComponent,
  ],
  providers: [
    LoadingService,
    PlateRequestService,
    LocalStorageService,
    FipeValueComponent,
    HistoryComponent,
  ]
})
export class CapcarModule { }
