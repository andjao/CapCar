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

  private readonly BASE_URL = "https://apicarros.com/v1/consulta/";

  public plateResponse:PlateResponse;
  public queryON: boolean = false;

  constructor(private http: HttpClient) { }

  plateRequest(plate: Plate): Observable<any> {
    return this.http
      .get(this.BASE_URL + plate + "/json");
  }


}
