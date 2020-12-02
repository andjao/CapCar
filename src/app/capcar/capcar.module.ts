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
  PrivacyPoliciesComponent,
  CameraComponent,
  ContactComponent
} from './components';

import {
  LoadingService,
  RequestsService,
  LocalStorageService,
  SharedService,
} from './services';
import { LongPressDirective } from './directives';

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
    LongPressDirective,
    PrivacyPoliciesComponent,
    CameraComponent,
    ContactComponent,
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
    PrivacyPoliciesComponent,
    CameraComponent,
    ContactComponent,
  ],
  providers: [
    LoadingService,
    RequestsService,
    LocalStorageService,
    SharedService,
    PlatesComponent,
    FipeValueComponent,
    HistoryComponent,
  ]
})
export class CapcarModule { }
