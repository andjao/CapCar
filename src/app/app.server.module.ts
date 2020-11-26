import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { MetadataService } from '../app/capcar/services';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [MetadataService],
  bootstrap: [AppComponent],
})
export class AppServerModule {}