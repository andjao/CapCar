import {
  Injectable,
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  loadLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  saveLocalStorage(key: string, value: any, { type, mercosul }): void {
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
      storageSave[0].mercosul = mercosul || false;
    } else {
      storageSave = value;
    }
    localStorage.setItem(key, JSON.stringify(storageSave));
  }

  removeLocalStorage(key, index) {
    console.clear();
    let a = JSON.parse(this.loadLocalStorage(key));
    console.log('tamanho antes', a.length);
    a = a.splice(index, 1);
    console.log('tamanho depois', a.length);
    console.log(a[0].modelo);
    console.log('index', index);
    // localStorage.setItem(key, JSON.stringify(JSON.parse(this.loadLocalStorage(key)).slice(index, 1)));
  }
}
