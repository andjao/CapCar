import {
  Injectable,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
} from 'rxjs/Observable';

import {
  BASE_URL
} from '../enums';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  private readonly apicarros_URL = BASE_URL.APICARROS;
  private readonly fipe_URL = BASE_URL.FIPE;

  constructor(
    private http: HttpClient,
  ) { }

  plateRequest(plate): Observable<any> {
    return this.http
      .get(`${this.apicarros_URL}${plate}/json`);
  }

  fipeBrandsRequest(type: string): Observable<any> {
    return this.http
      .get(`${this.fipe_URL + type}/marcas.json`);
  }

  fipeModelsRequest(type: string, brandID: string): Observable<any> {
    return this.http
      .get(`${this.fipe_URL + type}/veiculos/${brandID}.json`);
  }

  fipeYearsRequest(type: string, brandID: string, modelYears: string): Observable<any> {
    return this.http
      .get(`${this.fipe_URL + type}/veiculo/${brandID}/${modelYears}.json`);
  }

  fipeAllRequest(type: string, brandID: string, modelYears: string, year: string): Observable<any> {
    return this.http
      .get(`${this.fipe_URL + type}/veiculo/${brandID}/${modelYears}/${year}.json`);
  }
}
