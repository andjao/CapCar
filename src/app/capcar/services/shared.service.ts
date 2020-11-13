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
  plateNational: Plate;
  plateMercoSul: Plate;
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
