import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformacionService } from '../servicios/informacion/informacion.service';
import 'rxjs/add/observable/interval';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
declare var $:any;

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface Character {
  id: number;
  nombre: string;
}
function instanceOfCharacter(character: any): character is Character {
  return !!character // truthy
    && typeof character !== 'string' // Not just string input in the autocomplete
    && 'id' in character; // Has some qualifying property of Character type
}

export const CharacterSelectionRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  !instanceOfCharacter(control?.value) ? { matchRequired: true } : null;

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.component.html',
  styleUrls: ['./data-base.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0 '})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataBaseComponent implements OnInit {

  public displayedColumns: string[] = [ //Ambientes, Orion, Propietarios
    'demo-nombre1',
    'demo-estado1',
    'demo-action1'
  ];

  public displayedColumns2: string[] = [ //Ciudad, Hardware
    'demo-nombre2',
    'demo-link2',
    'demo-estado2',
    'demo-action2'
  ];

  public displayedColumns3: string[] = [ //Ciudad, Hardware
    'demo-nombre3',
    'demo-estado3',
    'demo-action3'
  ];

  public displayedColumns4: string[] = [ //Ciudad, Hardware
    'demo-nombre4',
    'demo-equipo4',
    'demo-marca4',
    'demo-fecha4',
    'demo-estado4',
    'demo-action4'
  ];

  public date = new FormControl(moment());

  modeloFormG = this._formBuilder.group({

    equipo: new FormControl(undefined, [Validators.required]),
    marca: new FormControl(undefined, [Validators.required]),
    flash: new FormControl(undefined),
    ram: new FormControl(undefined),
    date: new FormControl(undefined)
  });

  public ambientes: any[];
  public ambiente: any;

  public ciudades: any[];
  public ciudad: any;
  public expansion: any;
  public totalenght = 1000;
  public totalenght2 = 1000;

  public pageIndex = 0;
  public pageIndex2 = 0;

  public orions: any[];
  public orion: any;

  public propietarios: any[];
  public propietario: any;

  public entidades: any[];
  public entidad: any;

  public hardwares: any[];
  public hardware: any;
  public hardwareOp: any;
  public tipohardware: any;
  public prefixmem: any;

  public tipos: any[];
  public tipo;

  public agencias: any[] = [];
  public agencia: any;

  public modelo: any;
  public modelos: any[];
  public modelomarca:any[];
  public modeloequipo:any[]; 

  public nombre: string = "";
  public id: number = 0;
  public activado: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];

  public equipos: any[] = [];
  public marcas: any[] = [];
  public flashs: any[] = [];
  public rams: any[] = [];

  public selectedact: number;
  public selectedtipo: number;
  public accion: string = '';
  //Formulario Editar
  public editado1: any; //info de editado
  public blockednombre:any;

  //expansion example
  expandedElement: any | null;
  expandedElement2: any | null;


  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private informacionService: InformacionService) { }

  ngOnInit(): void {
    this.ambiente = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.ciudad = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.tipo = { "nombre": "", "estado": null, "pindex": this.pageIndex + 1 }
    this.orion = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.entidad = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.propietario = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.hardware = { "nombre": "", "estado": 1, "idLink": null, "pindex": this.pageIndex + 1 }
    this.hardwareOp = { "nombre": "", "estado": 1, "idLink": null, "pindex": this.pageIndex + 1 }
    this.modelo = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.agencia = { "nombre": "", "estado": null, "pindex": 1, "idLink": 0 }

    this.tipohardware = [
      { id: 1, nombre: 'Marca' },
      { id: 2, nombre: 'Equipo' },
      { id: 3, nombre: 'Memoria' },
      { id: 70, nombre: 'Medio' }
    ]

    this.obtenerInfoAmbientes()
  }

  PageAmbientes(event) {
    this.pageIndex = event.pageIndex;
    this.ambiente.pindex = this.pageIndex + 1;
    this.openDialogAmbientes()
  }
  PageCiudades(event) {
    this.pageIndex = event.pageIndex;
    this.ciudad.pindex = this.pageIndex + 1;
    this.obtenerInfoCiudades()
  }
  PageHardwares(event) {
    this.pageIndex = event.pageIndex;
    this.hardware.pindex = this.pageIndex + 1;
    this.obtenerInfoHardware()
  }
  PageModelos(event) {
    this.pageIndex = event.pageIndex;
    this.modelo.pindex = this.pageIndex + 1;
    this.obtenerInfoModelos()
  }
  PageOrions(event) {
    this.pageIndex = event.pageIndex;
    this.orion.pindex = this.pageIndex + 1;
    this.obtenerInfoOrion()
  }
  PagePropietarios(event) {
    this.pageIndex = event.pageIndex;
    this.propietario.pindex = this.pageIndex + 1;
    this.obtenerInfoPropietarios()
  }
  PageEntidades(event) {
    this.pageIndex = event.pageIndex;
    this.entidad.pindex = this.pageIndex + 1;
    this.obtenerInfoEntidades()
  }
  PageAgencias(event) {
    this.pageIndex2 = event.pageIndex;
    this.agencia.pindex = this.pageIndex2 + 1;
    this.obtenerInfoAgencias()
  }
  //AMBIENTE
  clickListadoAmbientes() {
    this.pageIndex = 0;
    this.ambiente.pindex=1;
    this.obtenerInfoAmbientes();
  }
  openDialogAmbientes(): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre ,
        accion:'Ambiente',}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertambiente(result.nombre).subscribe(resp => {
        this.obtenerInfoAmbientes();
      },err => {
        if (err.status === 400) {
          //const type = ['', 'info', 'success', 'warning', 'danger'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "notifications",
            message: err.error.log
          }, {
            type: "warning",
            timer: 4000,
            placement: {
              from: 'top',
              align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
        }
      });
    });
  }
  openDialogAmbientesEdit(n: number) {
    this.nombre = "";
    this.id = 0;
    this.editado1 = undefined;
    this.informacionService.getambientebyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: { nombre: this.nombre, 
          activado: this.activado,
           selectedact: this.selectedact, 
           id: this.id, 
           accion:'Ambiente',
           blockednombre:true }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarambiente({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoAmbientes();

        }, err => {      
          if (err.status === 400) {
          //const type = ['', 'info', 'success', 'warning', 'danger'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "notifications",
            message: err.error.log
          }, {
            type: "warning",
            timer: 4000,
            placement: {
              from: 'top',
              align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
        }});
      });
    });
  }
  obtenerInfoAmbientes() {
    this.informacionService.listambientes(this.ambiente).subscribe(resp => {
      this.ambientes = resp.body["info"];
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  //CIUDAD
  clickListadoCiudades() {
    this.pageIndex = 0;
    this.ciudad.pindex=1;
    this.obtenerInfoCiudades();
  }
  obtenerInfoCiudades() {
    this.informacionService.listciudades(this.ciudad).subscribe(resp => {
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.ciudades = resp.body["info"];
      this.ciudades.forEach(element => {
        element.exmod = false;
      });
    }, err => {
      this.ciudades = this.ciudades;
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  expandTipo(n: number) {
    this.agencias = [];
    this.pageIndex2=0;
    this.agencia = { "nombre": "", "estado": null, "pindex": 1, "idLink": n }
    this.obtenerInfoAgencias();
  }
  clickListadoAgencias(){
    this.pageIndex = 0;
    this.agencia.pindex=1;
    this.obtenerInfoAgencias();
  }
  obtenerInfoAgencias(){
    this.informacionService.listagencias(this.agencia).subscribe(resp => {
      this.agencias = resp.body["info"];
      const keys = resp.headers;
      this.totalenght2 = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  closeTipo(n: number, c: number) {
    this.ciudades.forEach(city => {
      if (city.id == c) {
        city.TipoCiudad.forEach(tc => {
          if (tc.id == n) {
            tc.exmod = false;
          }
        });
      }
    });
  }
  openDialogTipo(n: number): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre,
        accion:'Tipo' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.inserttipo(result.nombre, n).subscribe(resp => {
        this.obtenerInfoCiudades();
      }, err =>{
        if (err.status === 400) {
          //const type = ['', 'info', 'success', 'warning', 'danger'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "notifications",
            message: err.error.log
          }, {
            type: "warning",
            timer: 4000,
            placement: {
              from: 'top',
              align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
        }
      });
    });

  }
  openDialogTipoEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    //this.tipociudad = undefined;
    this.informacionService.gettipobyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      //this.tipociudad = this.editado1.TipoCiudad;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: { nombre: this.nombre, 
          activado: this.activado, 
          selectedact: this.selectedact, 
          id: this.id, 
          accion:'Tipo',
          blockednombre:true }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editartipo({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoCiudades();
        }, err => {
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  expandCiudad(n) {
    this.agencias = [];
    this.ciudades.forEach(element => {
      if (element.id == n) {
        element.exmod = true;
      } else {
        element.exmod = false;
      }
    });
  }
  closeCiudad(n) {
    this.agencias = [];
    this.ciudades.forEach(element => {
      if (element.id == n) {
        element.exmod = false;
      }
    });
  }
  openDialogCiudad(): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre,
        accion:'Ciudad', }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertciudad(result.nombre).subscribe(resp => {
        this.obtenerInfoCiudades();
      }, err => {      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }});
    });

  }
  openDialogCiudadEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    //this.tipociudad = undefined;
    this.informacionService.getciudadbyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      //this.tipociudad = this.editado1.TipoCiudad;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: { nombre: this.nombre, 
          activado: this.activado, 
          selectedact: this.selectedact, 
          id: this.id, 
          accion:'Ciudad',
          blockednombre:true }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarciudad({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoCiudades();
        }, err => {
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  openDialogAgencia(n: number): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre,
        accion:'Agencia', }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertagencia(result.nombre, n).subscribe(resp => {
        this.obtenerInfoCiudades();
      }, err => {
        if (err.status === 400) {
          //const type = ['', 'info', 'success', 'warning', 'danger'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "notifications",
            message: err.error.log
          }, {
            type: "warning",
            timer: 4000,
            placement: {
              from: 'top',
              align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
        }
      });
    });

  }
  openDialogAgenciaEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    //this.tipociudad = undefined;
    this.informacionService.getagenciabyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      //this.tipociudad = this.editado1.TipoCiudad;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: { nombre: this.nombre, 
          activado: this.activado,
           selectedact: this.selectedact, 
           id: this.id, 
           accion:'Agencia',
           blockednombre:false }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editaragencia({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoCiudades();
        }, err => {
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }

  //HARDWARE
  clickListadoHardwares() {
    this.pageIndex = 0;
    this.hardware.pindex=1;
    this.obtenerInfoHardware();
  }
  obtenerInfoHardware() {
    //this.hardware.pindex = 1;
    this.informacionService.listhardware(this.hardware).subscribe(resp => {
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.hardwares = resp.body["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  obtenerInfoHardwareMarca() {
    this.hardwareOp.idLink=1;
    //this.hardware.pindex = 1;
    this.informacionService.listhardwareOpciones(this.hardwareOp).subscribe(resp => {
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.modelomarca=resp.body["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  obtenerInfoHardwareEquipo() {
    this.hardwareOp.idLink=2;
    //this.hardware.pindex = 1;
    this.informacionService.listhardwareOpciones(this.hardwareOp).subscribe(resp => {
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.modeloequipo=resp.body["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  openDialogHardware(): any {
    this.editado1 = undefined;
    this.nombre = "";
    this.selectedtipo = undefined;
    const dialogRef = this.dialog.open(FormHardwareComponent, {
      width: '400px',
      data: {
        nombre: this.nombre, tipohardware: this.tipohardware,
        selectedtipo: this.selectedtipo, prefixmem: this.prefixmem
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.selectedtipo == 3 && result.prefixmem != undefined) {
        result.nombre = result.nombre + result.prefixmem
      }
      this.informacionService.inserthardware(result.nombre, result.selectedtipo).subscribe(resp => {
        this.obtenerInfoHardware();
      },err => {      
        if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }

      });
    });
  }
  openDialogHardwareEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.prefixmem = undefined;
    this.informacionService.gethardwarebyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.selectedtipo = this.editado1.idhw;
      let digito;
      if (this.selectedtipo == 3) {
        digito = Number((this.nombre.match("[0-9]*.[0-9]*"))[0])
        this.prefixmem = (this.nombre.match("[A-Z]+")) == null ? undefined : (this.nombre.match("[A-Z]+"))[0];
        if (!digito) {
          digito = Number((this.nombre.match("[0-9]*"))[0])
        }
        this.nombre = digito
      }
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormHardwareEditComponent, {
        width: '400px',
        data: {
          nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, prefixmem: this.prefixmem,
          tipohardware: this.tipohardware, selectedtipo: this.selectedtipo, id: this.id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.selectedtipo == 3) {
          result.nombre = result.nombre + result.prefixmem
        }
        this.informacionService.editarhardware({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact, "idLink": this.selectedtipo }).subscribe(resp => {
          this.obtenerInfoHardware();
        }, err => {
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  //Modelos

  clickListadoModelos() {
    this.pageIndex = 0;
    this.modelo.pindex=1;
    this.obtenerInfoModelos();
    this.obtenerInfoHardwareMarca();
    this.obtenerInfoHardwareEquipo();

  }
  obtenerInfoModelos() {
    this.informacionService.listmodelos(this.modelo).subscribe(resp => {
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.modelos = resp.body["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  openDialogModelo(): void {
    this.editado1 = {
      "Equipo": [{ "id": null, "nombre": "" }],
      "Marca": [{ "id": null, "nombre": "" }],
      "Flash": [{ "id": null, "nombre": "" }],
      "Ram": [{ "id": null, "nombre": "" }]
    }
    this.nombre = "";
    /*this.selectedtipo = 0;
    this.selectedequipo = 0;*/
    this.selectedact = 1;
    //this.myControlEquipo.setValidators(Validators.compose([Validators.required,]))
    const dialogRef = this.dialog.open(FormModeloComponent, {
      width: '400px',
      data: {
        accion: "Ingresar",
        nombre: this.nombre,
        activado: this.activado,
        selectedact: this.selectedact,
        editado1: this.editado1,
        date: this.date,
        equipos: this.equipos,
        marcas: this.marcas,
        flashs: this.flashs,
        rams: this.rams
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertmodelo({
        "nombre": result.nombre,
        "id": this.id,
        "estado": result.selectedact,
        "idEquipo": result.editado1.Equipo[0].id,
        "idMarca": result.editado1.Marca[0].id,
        "idFlash": result.editado1.Flash[0].id,
        "idRam": result.editado1.Ram[0].id,
        "fecha": moment(result.date.value).format('YYYY-MM-DD')
      }).subscribe(resp => {
        this.obtenerInfoModelos();
      });
    })

  }
  openDialogModeloEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.informacionService.getmodelobyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormModeloComponent, {
        width: '400px',
        data: {
          accion: "Editar",
          nombre: this.nombre,
          activado: this.activado,
          selectedact: this.selectedact,
          editado1: this.editado1,
          date: this.date,
          equipos: this.equipos,
          marcas: this.marcas,
          flashs: this.flashs,
          rams: this.rams
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        this.informacionService.editarmodelo({
          "nombre": result.nombre,
          "id": this.id,
          "estado": result.selectedact,
          "idEquipo": result.editado1.Equipo[0].id,
          "idMarca": result.editado1.Marca[0].id,
          "idFlash": result.editado1.Flash[0].id,
          "idRam": result.editado1.Ram[0].id,
          "fecha": moment(result.date.value).format('YYYY-MM-DD')
        }).subscribe(resp => {
          this.obtenerInfoModelos();
        },err => {
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  //ORION
  clickListadoOrions() {
    this.pageIndex = 0;
    this.orion.pindex=1;
    this.obtenerInfoOrion();
  }
  obtenerInfoOrion() {
    this.informacionService.listorion(this.orion).subscribe(resp => {
      this.orions = resp.body["info"];
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  openDialogOrion(): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre,
        accion:'Orion', }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertorion(result.nombre).subscribe(resp => {
        this.obtenerInfoOrion();
      });
    });
  }
  openDialogOrionEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.informacionService.getorionbyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: { nombre: this.nombre, 
          activado: this.activado, 
          selectedact: this.selectedact, 
          id: this.id , 
          accion:'Orion',
          blockednombre:false }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarorion({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoOrion();
        }, err =>{
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  //PROPIETARIOS
  clickListadoPropietarios() {
    this.pageIndex = 0;
    this.propietario.pindex=1;
    this.obtenerInfoPropietarios();
  }
  obtenerInfoPropietarios() {
    this.informacionService.listpropietarios(this.propietario).subscribe(resp => {
      this.propietarios = resp.body["info"];
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  openDialogPropietario(): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre,
        accion:'Propietario', }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertpropietario(result.nombre).subscribe(resp => {
        this.obtenerInfoPropietarios();
      },err => {
        if (err.status === 400) {
          //const type = ['', 'info', 'success', 'warning', 'danger'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "notifications",
            message: err.error.log
          }, {
            type: "warning",
            timer: 4000,
            placement: {
              from: 'top',
              align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
        }
      });
    });
  }
  openDialogPropietariosEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.informacionService.getpropietariobyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: { nombre: this.nombre, 
          activado: this.activado, 
          selectedact: this.selectedact, 
          id: this.id , 
          accion:'Propietario',
          blockednombre:true }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarpropietario({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoPropietarios();
        }, err => {
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
    //ENTIDADES
    clickListadoEntidades() {
      console.log('entidades')
      this.pageIndex = 0;
      this.entidad.pindex=1;
      this.obtenerInfoEntidades();
    }
    obtenerInfoEntidades() {
      this.informacionService.listentidades(this.entidad).subscribe(resp => {
        this.entidades = resp.body["info"];
        const keys = resp.headers;
        this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      }, err => {
        if (err.status === 400) {
          //const type = ['', 'info', 'success', 'warning', 'danger'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "notifications",
            message: err.error.log
          }, {
            type: "warning",
            timer: 4000,
            placement: {
              from: 'top',
              align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
        }
      });
    }
    openDialogEntidad(): void {
      this.editado1 = undefined;
      this.nombre = "";
      const dialogRef = this.dialog.open(FormComponent, {
        width: '400px',
        data: { nombre: this.nombre,
          accion:'Entidad', }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.insertentidades(result.nombre).subscribe(resp => {
          this.obtenerInfoEntidades();
        },err => {
          if (err.status === 400) {
            //const type = ['', 'info', 'success', 'warning', 'danger'];
            //const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
              icon: "notifications",
              message: err.error.log
            }, {
              type: "warning",
              timer: 4000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
          }
        });
      });
    }
    openDialogEntidadEdit(n: number) {
      this.editado1 = undefined;
      this.nombre = "";
      this.informacionService.getentidadesbyid(n).subscribe(resp => {
        this.editado1 = resp["info"];
        this.nombre = this.editado1.nombre;
        this.selectedact = this.editado1.estado ? 1 : 0;
        this.id = this.editado1.id;
        const dialogRef = this.dialog.open(FormComponentEdit, {
          width: '400px',
          data: { nombre: this.nombre, 
            activado: this.activado, 
            selectedact: this.selectedact, 
            id: this.id , 
            accion:'Entidad',
            blockednombre:true }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.informacionService.editarentidades({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
            this.obtenerInfoEntidades();
          }, err => {
            if (err.status === 400) {
              //const type = ['', 'info', 'success', 'warning', 'danger'];
              //const color = Math.floor((Math.random() * 4) + 1);
              $.notify({
                icon: "notifications",
                message: err.error.log
              }, {
                type: "warning",
                timer: 4000,
                placement: {
                  from: 'top',
                  align: 'center'
                },
                template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                  '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                  '<i class="material-icons" data-notify="icon">notifications</i> ' +
                  '<span data-notify="title">{1}</span> ' +
                  '<span data-notify="message">{2}</span>' +
                  '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                  '</div>' +
                  '<a href="{3}" target="{4}" data-notify="url"></a>' +
                  '</div>'
              });
            }
          });
        });
      }, err => {
        if (err.status === 400) {
          //const type = ['', 'info', 'success', 'warning', 'danger'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "notifications",
            message: err.error.log
          }, {
            type: "warning",
            timer: 4000,
            placement: {
              from: 'top',
              align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
        }
      });
    }



}

@Component({
  selector: 'app-formedit',
  templateUrl: './formedit.html',
})
export class FormComponentEdit {

  constructor(
    public dialogRef: MatDialogRef<FormComponentEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent) { }

}

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
})
export class FormComponent {

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent) { }

}

@Component({
  selector: 'app-formhardware',
  templateUrl: './formhardware.html',
})
export class FormHardwareComponent implements OnInit {

  public tipomem: string[] = ["B", "KB", "MB", "GB", "TB", "PB"];

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent) { }

  ngOnInit() {

  }
  changetipo() {
    this.data.nombre = undefined;
  }

}

@Component({
  selector: 'app-formhardwareedit',
  templateUrl: './formhardwareedit.html',
})
export class FormHardwareEditComponent {
  public tipomem: string[] = ["B", "KB", "MB", "GB", "TB", "PB"];

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent) { }

}
export interface Hw {
  nombre: string;
  id: number;
}
@Component({
  selector: 'app-formmodelo',
  templateUrl: './formmodelo.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class FormModeloComponent implements OnInit {

  public accionmems;
  public disabled: boolean;
  public fsop: boolean;
  public fs:boolean;

  public infoeq: any = { "nombre": "", "estado": 1, "idLink": 2, "pindex": 1 };
  public infomarca: any = { "nombre": "", "estado": 1, "idLink": 1, "pindex": 1 };
  public infoflash: any = { "nombre": "", "estado": 1, "idLink": 3, "pindex": 1 };
  public inforam: any = { "nombre": "", "estado": 1, "idLink": 3, "pindex": 1 };


  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.disabled = true;
    this.accionmems = true;
    this.fsop = false;
    this.fs=true;

    this.obtenerInfoEquipos();
    this.obtenerInfoFlash();
    this.obtenerInfoMarcas();
    this.obtenerInfoRam();

    if (this.data.editado1 != undefined) {
      this.data.date.setValue(moment(this.data.editado1.fechafin, 'YYYY-MM-DD'));
    }
    if (this.data.editado1.Flash == undefined) {
      this.data.editado1.Flash = [{ id: 0, nombre: "N/A" }];
    }
    if (this.data.editado1.Ram == undefined) {
      this.data.editado1.Ram = [{ id: 0, nombre: "N/A" }];
    }
    if (this.data.editado1.Marca[0] != undefined && this.data.editado1.Marca[0].id == 13) {
      this.accionmems = false;
    } else {
      this.accionmems = true;
    }
    //console.log(this.data.editado1)
    if(this.data.editado1.fechafin != undefined){//HAY FECHA
      this.fs=false;
      this.fsop = true;
    }
  }


  displayFn(value) {
    return value ? value.nombre : undefined;
  }

  selectsoporte(value) {
    if (value) {
      this.fsop = false;
      this.data.date.reset();
      console.log(this.data.date)
    } else {
      this.fsop = true;
      this.data.date.setValue(moment(this.data.editado1.fechafin, 'YYYY-MM-DD'));
      console.log(this.data.date)
      //soporte
    }
  }

  selectionMarcas() {
    if (this.data.editado1.Marca[0] != undefined && this.data.editado1.Marca[0].id == 13) {
      this.data.editado1.Flash = [{ id: 0, nombre: "N/A" }];
      this.data.editado1.Ram = [{ id: 0, nombre: "N/A" }];
      this.accionmems = false;

    } else {
      this.data.editado1.Flash = [{ id: 0, nombre: "" }];
      this.data.editado1.Ram = [{ id: 0, nombre: "" }];
      this.accionmems = true;
    }
  }
  //EQUIPO
  obtenerInfoEquipos() {
    this.informacionService.listhardwarebyNombre(this.infoeq).subscribe(resp => {
      this.data.equipos = resp["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  //MARCA
  obtenerInfoMarcas() {
    this.informacionService.listhardwarebyNombre(this.infomarca).subscribe(resp => {
      this.data.marcas = resp["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  //FLASH
  obtenerInfoFlash() {
    this.informacionService.listhardwarebyNombre(this.infoflash).subscribe(resp => {
      this.data.flashs = resp["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
  //RAM
  obtenerInfoRam() {
    this.informacionService.listhardwarebyNombre(this.inforam).subscribe(resp => {
      this.data.rams = resp["info"];
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
}


