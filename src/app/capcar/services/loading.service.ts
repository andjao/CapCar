import { Injectable } from '@angular/core';

import { LoadingText } from '../models'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading: Boolean;
  public loadingText:LoadingText = "Carregando";

  constructor() { }

  loadingM(loading, text){
    if(loading){
      this.loadingText = text;
      this.loading = loading;
    }else{
      this.loadingText = null;
      this.loading = loading;
    }
  }
}
