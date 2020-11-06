import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveLocalStorage(key, value): void {
    localStorage.setItem(key, value)
  }

  loadLocalStorage(key) {
    return localStorage.getItem(key)
  }
}
