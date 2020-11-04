import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  Plate,
  PlateResponse,
} from '..'

@Injectable({
  providedIn: 'root'
})
export class PlateRequestService {

  private readonly apicarros_URL = "https://apicarros.com/v1/consulta/";
  private readonly fipe_URL = "http://fipeapi.appspot.com/api/1/";

  public plateResponse: PlateResponse;
  public queryON: boolean = false;

  constructor(private http: HttpClient) { }

  plateRequest(plate: Plate): Observable<any> {
    return this.http
      .get(`${this.apicarros_URL}${plate}/json`);
  }

  fipeBrandsRequest(type = 'carros'): Observable<any> {
    return this.http
      .get(`${this.fipe_URL + type}/marcas.json`);
  }

  fipeModelsRequest(type, models): Observable<any> {
    return this.http
      .get(`${this.fipe_URL}${type}/${models.json}`);
  }

  fipeYearsRequest(type, models, modelYears): Observable<any> {
    return this.http
      .get(`${this.fipe_URL}/${type}/${models}/${modelYears}.json`);
  }

  fipeAllRequest(type, models, modelYears, year): Observable<any> {
    return this.http
      .get(`${this.fipe_URL}/${type}/${models}/${modelYears}/${year}.json`);
  }
}
