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
  Plate,
} from '..';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  private readonly apicarros_URL = "https://apicarros.com/v1/consulta/";
  private readonly fipe_URL = "https://fipeapi.appspot.com/api/1/";

  constructor(
    private http: HttpClient,
  ) { }

  plateRequest(plate: Plate): Observable<any> {
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
