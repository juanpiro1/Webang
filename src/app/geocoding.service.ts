import { Direccion } from './direccion';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  url: 'https://maps.googleapis.com/maps/api/geocode/json';
  urld: 'http://localhost:3000/api/Datos';
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private Http: HttpClient) { }


  Obtenerdatos(lugar:string): Observable<any> {
   // const lugar = 'Carrera 99 # 69a-81 ,Los angeles';
    return this.Http
      .get<any>('https://maps.googleapis.com/maps/api/geocode/json',
        {params: {
          address: lugar,
          key: 'AIzaSyD7ty2ZAGdqwbdh2zoTXRnbKu22MPhV13I'
        }
        });
    /*return new Promise(resolve => {
      this.Http.get(this.url + '&key=AIzaSyD7ty2ZAGdqwbdh2zoTXRnbKu22MPhV13I').subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }); */
  }
  obtenerpol(): Observable<any>{
    return this.Http.get('http://localhost:4200/assets/Bogota.json');
  }
  ingresardir(dir :Direccion) : Observable<any>{
    return this.Http.post(this.urld, dir);
  }
  obtenerveh():Observable<any> {
    return this.Http.get('http://localhost:3000/api/vehiculos');
  }
}

