import { Direccion } from './direccion';
import { Coord } from './coord';
import { GeocodingService } from './geocoding.service';
import { Component, OnInit } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GeocodingService]
})
export class AppComponent implements OnInit {
  title = 'app';
  public lat: number;
  public lng: number;
  latmap: number;
  lngmap: number;
  public latD1: number;
  public lngD1: number;
  public latD2: number;
  public lngD2: number;
  Bogotalat: Coord;
  lati:Array<number[]>;
  long:Array<number>;
  red: string;
  c:number;
  Direccion1;
  Barrio1;
  Direccion2;
  Barrio2;
  mostrarmark1=false;
  mostrarmark2=false;
  mostrardir=false;
  origen: any;
  destino: any;
  carro;
  icono = 'http://localhost:4200/assets/chocon.png'
  public transitOptions: string = 'DRIVING'
  constructor(private Ser: GeocodingService) {
    this.red= '#DC143C'
    
  }


  ngOnInit() {
    //this.hola='';
    this.latmap=4.642122;
    this.lngmap=-74.099567;
    
    this.Ser.obtenerpol().subscribe(res => {
       this.Bogotalat=res.geometries[0].coordinates[0][0];
       this.c=res.geometries[0].coordinates[0][0].length;
    } 
);

    TimerObservable.create(0,10000).
    takeWhile(() => true)
    .subscribe(() =>{
      this.Ser.obtenerveh().subscribe(res => 
        {
          //console.log(res[0].Latitud);
          this.carro=res;
          console.log(this.carro);
        }
    )
    });
    
  }

  Cogerdatos(){
    if(this.Direccion1!=''&&this.Barrio1!=''){
      this.Ser.Obtenerdatos(this.Direccion1+' ,'+this.Barrio1).subscribe(
        res =>{
          this.latD1= res.results[0].geometry.location.lat;
          this.lngD1= res.results[0].geometry.location.lng;
          this.mostrarmark1=true;
          console.log(this.latD1+' Long=' +this.lngD1);
        }
      )
    }
  }

  Cogerdatos2(){
    if(this.Direccion2!=''&&this.Barrio2!=''){
      this.Ser.Obtenerdatos(this.Direccion2+' ,'+this.Barrio2).subscribe(
        res =>{
          this.latD2= res.results[0].geometry.location.lat;
          this.lngD2= res.results[0].geometry.location.lng;
          this.origen={ lat:this.latD1 , lng: this.lngD1};
          this.destino={ lat: this.latD2, lng: this.lngD2};
          console.log(this.origen);
          console.log(this.destino);
          this.mostrardir=true;
          this.mostrarmark2=true;
          //console.log(this.latD2+' Long=' +this.lngD2);
        }
      )
      
    }
    //this.mostrarruta();
  }
  ingresardir(){
    let dir= new Direccion(this.Direccion1, this.Barrio1, this.origen, this.destino);
    this.Ser.ingresardir(dir);
  }
 /* mostrarruta(){
    let laD1=String(this.latD1);
    let loD1=String(this.lngD1);
    let laD2=String(this.latD2);
    let loD2=String(this.lngD2);
    
    
  }*/
}
