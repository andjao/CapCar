import {
  Injectable,
} from '@angular/core';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  loadLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  saveLocalStorage(key: string, value: any, { type, mercosul: mercoSul }): void {
    let storageSave: any;
    storageSave = JSON.parse(this.loadLocalStorage(key)) || [];
    if (key == "history") {
      storageSave.forEach(function (element, index) {
        if (value.placa === element.placa) {
          storageSave.splice(index, 1);
        };
      });
      storageSave.unshift(value);
      storageSave[0].tipo = type;
      storageSave[0].mercosul = mercoSul || false;
      storageSave[0].placa = storageSave[0].placa.toUpperCase();
    } else {
      storageSave = value;
    }
    localStorage.setItem(key, JSON.stringify(storageSave));
  }

  removeLocalStorage(key, index) {
    console.clear();
    let storageSave = JSON.parse(this.loadLocalStorage(key));
    storageSave.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(storageSave));
  }
}
