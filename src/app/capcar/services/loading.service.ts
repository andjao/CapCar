import { Injectable } from '@angular/core';

import { LoadingText } from '../models'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading: Boolean;
  public loadingText:LoadingText
  public loadingOpacity:String;

  constructor() { }

  loadingM(loading, opacity = "1", text = "Carregando"){
    if(loading){
      this.loadingOpacity = opacity;
      this.loadingText = text;
      this.loading = loading;
    }else{
      this.loadingOpacity = opacity;
      this.loadingText = null;
      this.loading = loading;
    }
  }
}
