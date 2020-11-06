import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, value)
  }

  loadLocalStorage(key: string) {
    return localStorage.getItem(key)
  }
}
