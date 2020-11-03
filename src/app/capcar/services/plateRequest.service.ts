import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  Plate,
  PlateResponse
} from '../models'

@Injectable({
  providedIn: 'root'
})
export class PlateRequestService {

  private readonly apicarros_URL = "https://apicarros.com/v1/consulta/";
  private readonly fipe_URL = "https://veiculos.fipe.org.br/api/veiculos/";

  public plateResponse: PlateResponse;
  public queryON: boolean = false;

  constructor(private http: HttpClient) { }

  plateRequest(plate: Plate): Observable<any> {
    return this.http
      .get(`${this.apicarros_URL}${plate}/json`);
  }

  fipeBrandsRequest(): Observable<any> {
    return this.http
      .get(this.fipe_URL);
  }

  fipeModelsRequest(): Observable<any> {
    return this.http
      .get(this.fipe_URL);
  }

  fipeYearsRequest(): Observable<any> {
    return this.http
      .get(this.fipe_URL);
  }

  fipeAllRequest(): Observable<any> {
    return this.http
      .get(this.fipe_URL);
  }
}
