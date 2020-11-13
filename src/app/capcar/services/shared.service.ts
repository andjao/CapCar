import {
  Injectable
} from '@angular/core';

import {
  Plate,
  PlateResponse,
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  stateCountyRes: string;
  plateNational: string;
  plateMercoSul: string;
  selectedType: string;
  mercoSul: boolean;
  queryBtn: boolean = false;

  queryOK: boolean = false;
  vehicleType: string;
  plateResponse: PlateResponse;
  fipeError: Boolean;
  fipeNotFound: any;
  fipeOK: Boolean;
  fipeValues = new Array;
  historyOpen: boolean;
  history = new Array;

}
