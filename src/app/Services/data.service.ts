import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _username : string = "";
  private _userId : any ;
  private _email : any ;
  private _phoneNumber : any ;
  private _address : any;
  private _filepath:any;

  constructor(){}


  set userName(value : string){
    this._username = value;
  }

  get userName(){
    return this._username;
  }

  set userId(value : string){
    this._userId = value;
  }

  get userId(){
    return this._userId;
  }

  set email(value:string){
    this._email = value;
  }

  get email(){
    return this._email;
  }

  set phoneNumber(value : string){
    this._phoneNumber = value;
  }

  get phoneNumber(){
    return this._phoneNumber;
  }

  set address(value : string){
    this._address = value;
  }

  get address(){
    return this._address;
  }

  set filePath(value : string){
    this._filepath = value;
  }

  get filePath(){
    return this._filepath;
  }


}
