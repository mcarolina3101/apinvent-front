import { Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'new-device-profile',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

  ambienteFormG = this._formBuilder.group({
    ambiente: [undefined, Validators.required]
  });
  ubicacionFormG = this._formBuilder.group({
    city: [undefined, Validators.required],
    tipo: [undefined, Validators.required],
    ag: [undefined, Validators.required],
    piso: [undefined, Validators.required],
    rack: [undefined, Validators.required]
  });
  modeloFormG = this._formBuilder.group({
    modelo: ['', Validators.minLength(1)],
    equipo: [undefined, Validators.required],
    so: ['', Validators.minLength(1)],
    serie: ['', Validators.minLength(1)]
  });
  adicionalFormG = this._formBuilder.group({
    opm: [undefined],
    ecritico: [undefined],
    inv: ['', Validators.minLength(1)],
    propietario: [undefined, Validators.required],
    orion: [undefined, Validators.required]

  });
  stepperOrientation: Observable<StepperOrientation>;
  
  public ambientes:any[];
  public cities:any[];
  public agencias:any[];
  public tipos:any[];
  public ubi:any[];
  public marcas:any[];
  public equipos:any[];
  public propietarios:any[];
  public orion:any[];

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }
  ngOnInit() {
    
    this.ambientes = [
      {id: '1', nombre: 'LOCALIDADES'},
      {id: '2', nombre: 'WIRELESS'},
      {id: '3', nombre: 'BODEGA'},
      {id: '4', nombre: 'DATACENTER'}
    ];
    this.tipos = [
      {id: '1', nombre: 'GYE_CIN'},
      {id: '2', nombre: 'GYE_VES'},
      {id: '3', nombre: 'GYE_ATM'},
      {id: '4', nombre: 'GYE_EEXT'},
      {id: '5', nombre: 'GYE_SUB'},
      {id: '6', nombre: 'GYE_INT'},
      {id: '7', nombre: 'GYE_CIAC'}
    ];
    this.cities = [
      {id: '1', nombre: 'GUAYAQUIL'},
      {id: '2', nombre: 'AMBATO'},
      {id: '19', nombre: 'QUITO'}
    ];
    this.agencias = [
      {id: '1', nombre: 'GUAYAQUIL'},
      {id: '2', nombre: 'AMBATO'}
    ];
    this.equipos = [
      {id: '1', nombre: 'ROUTER'},
      {id: '2', nombre: 'SWITCH'}
    ];
    this.marcas = [
      {id: '1', nombre: 'CISCO'}
    ];
    this.ubi = [
      {id: '1', nombre: 'P1-R1'},
      {id: '2', nombre: 'P1-R2'}
    ];
    this.propietarios = [
      {id: '1', nombre: 'TELCONEET'},
      {id: '2', nombre: 'PUNTONET'}
    ];
    this.orion = [
      {id: '1', nombre: 'CAJEROS'},
      {id: '2', nombre: 'AGENCIAS'}
    ];
  }
 
  displayFn(value) {
    return value ? value.nombre : undefined;
 }

  selectionamb(value){
    this.ubicacionFormG.reset();
    this.modeloFormG.reset();
    this.adicionalFormG.reset();
    this.ubicacionFormG.reset();
  }

  selectioncity(value){
    this.ubicacionFormG.controls["tipo"].setValue(undefined);
    this.ubicacionFormG.controls["ag"].setValue(undefined);
  }

  selectiontipo(value){
    this.ubicacionFormG.controls["ag"].setValue(undefined);
  }

  selectionag(value){
  }

  selectionubi(value){
  }

  selectionequipo(value){
  }

  selectionmarca(value){
  }

  selectionprop(value){
  }

  selectionorion(value){
  }
}
