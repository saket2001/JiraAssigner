import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveInLocalStorage(key:string,value:object){
    localStorage.setItem(key,JSON.stringify(value));
  }

  public getFromLocalStorage(key:string){
    return localStorage.getItem(key) ?? null;
  }
}
