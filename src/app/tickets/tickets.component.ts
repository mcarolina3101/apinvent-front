import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { UsuarioService } from '../servicios/informacion/usuario.service';
import { TicketsService } from '../servicios/informacion/tickets.service';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/es';
import * as _moment from 'moment';
declare var $: any;
import { saveAs } from 'file-saver';
import { element } from 'protractor';

const moment = _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD ',
  },
  display: {
    dateInput: 'YYYY-MM-DD  ',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class TicketsComponent implements OnInit {

  public displayedColumns: string[] = [
    'demo-ticket',
    'demo-abierto',
    'demo-tecnico2',
    'demo-tecnico1',
    'demo-ciudad',
    'demo-tipo',
    'demo-agencia',
    'demo-lan',
    //'demo-soporte',
    //'demo-descripcion',
    'demo-problema',
    'demo-proveedor',
    'demo-tcompleto',
    'demo-tiempo0',
    'demo-tiempo1',
    'demo-tiempo2',
    'demo-tiempo',
    'demo-tiempom',
    'demo-estado',
    'demo-action'
  ];
  public dataDevices: any[] = [];
  public inventario: any = {};
  public inventid: any = 0;
  public nombre: any = "";
  public estado: any = 1;
  public isnew: boolean = false;
  public isheader: boolean = false;
  public selectedact: number;
  generalFormG = this._formBuilder.group({
    fechai: [undefined, Validators.required],
    tresp: [undefined, Validators.required],
    reportado: [undefined, Validators.required],
    problema: [undefined, Validators.required],
    proveedor: [undefined],
    soporte: [undefined],
    ttprov: [undefined],
    descripcion: [undefined]

  });
  eventoFormG = new FormControl();
  agenciasFormG = new FormControl();
  public pageIndex = 0;
  public totalenght = 0;
  public cities: any[] = [];
  public tipos: any[] = [];
  public problemas: any[] = [];
  public propietarios: any[] = [];
  public usuarios: any[] = [];
  citiescontrol = new FormControl();
  tiposcontrol = new FormControl();
  problemascontrol = new FormControl();
  proveedorescontrol = new FormControl();
  public label = "";
  public titulo = "";
  public activado: any = [{ id: 0, nombre: 'ELIMINADO' }, { id: 1, nombre: 'INGRESADO' }];
  public tcarr: any = [null, "SI", "NO", "NO APLICA"]
  public sino: any = [{ id: null, nombre: null }, { id: 0, nombre: 'NO' }, { id: 1, nombre: 'SI' }];
  public prb = { "nombre": "", "estado": 1 }
  public u = { "nombre": "", "estado": 1 }
  public pr = { "nombre": "", "estado": 1 }
  public cd = { "ciudades": "Guayaquil,Quito,Manta,Quevedo,Riobamba,Ibarra" }
  public ct = { "nombre": "", "estado": 1 }
  public mr = { "nombre": "", "estado": 1 }
  public prp = { "nombre": "", "estado": 1 }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private ticketsService: TicketsService,
    private usuarioService: UsuarioService,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.inventario = {
      "ticket": "",
      "fecha": "",
      "tecnicorespon": "",
      "tecnicoreporte": "",
      "agencia": "",
      "tipo": "",
      "ciudad": "",

      "lan": null,
      "problema": "",
      "proveedor": "",
      "min": "",
      "max": "",

      "tcompleto": "",
      "time0": "",
      "time1": "",
      "time2": "",
      "tdias": "",
      "tmins": "",

      "soporte": "",
      "descripcion": "",

      "estado": 1,
      "abierto": null,
      "nubicacion": "",
      "pindex": this.pageIndex + 1
    }
    this.obtenerInfoInventario();
    this.obtenerInfoCiudades();
    this.obtenerInfoProblemas();
    this.obtenerInfoPropietarios();
    this.obtenerInfoUsuarios();
  }

  dateEvent(event) {
    let date1;
    let date2;
    if (this.range.controls.start.value != null) {
      date1 = moment(this.range.controls.start.value).format('YYYY-MM-DD');
    } else {
      date1 = undefined
    }
    if (this.range.controls.end.value != null) {
      date2 = moment(this.range.controls.end.value).format('YYYY-MM-DD');
    } else {
      date2 = undefined
    }
    this.inventario.time0 = date1;
    this.inventario.time2 = date2;
    this.obtenerInfoInventario_p1()
  }

  obtenerInfoInventario_p1() {
    let nc = this.inventario.nciudad;
    this.pageIndex = 0;
    this.inventario.pindex = 1;
    if (this.inventario.fecha != "") {
      this.inventario.ticket = moment(this.inventario.fecha).format('YYYY-MM-DD')
    }
    if (this.citiescontrol.value != null && this.citiescontrol.value.length > 0) {
      this.inventario.nciudad = '';
      this.citiescontrol.value.forEach(element => {
        this.inventario.nciudad = this.inventario.nciudad + element.nombre + ',';
      });

      if (nc != this.inventario.nciudad) {
        this.cd = { "ciudades": this.inventario.nciudad }
        this.tiposcontrol.reset();
        this.obtenerInfoTipos(this.cd);
      }
    } else {
      this.inventario.nciudad = '';

    }

    if (this.tiposcontrol.value != null && this.tiposcontrol.value.length > 0) {
      this.inventario.ntipo = '';
      this.tiposcontrol.value.forEach(element => {
        this.inventario.ntipo = this.inventario.ntipo + element.nombre + ',';
      });
    } else {
      this.inventario.ntipo = '';
      if (this.citiescontrol.value != null && this.citiescontrol.value.length > 0) {
        this.cd = { "ciudades": this.inventario.nciudad }
        this.obtenerInfoTipos(this.cd);
      } else {
        this.obtenerInfoTipos({ "ciudades": "Guayaquil,Quito,Manta,Quevedo,Riobamba,Ibarra" })
      }

    }

    if (this.proveedorescontrol.value != null && this.proveedorescontrol.value.length > 0) {
      this.inventario.proveedor = '';
      this.proveedorescontrol.value.forEach(element => {
        this.inventario.proveedor = this.inventario.proveedor + element.nombre + ',';
      });

    } else {
      this.inventario.proveedor = '';
    }

    if (this.problemascontrol.value != null && this.problemascontrol.value.length > 0) {
      this.inventario.problema = '';
      this.problemascontrol.value.forEach(element => {
        this.inventario.problema = this.inventario.problema + element.nombre + ',';
      });

    } else {
      this.inventario.problema = '';
    }

    this.obtenerInfoInventario();
  }

  obtenerInfoInventarioClean() {
    this.pageIndex = 0;
    this.inventario = {
      "ticket": "",
      "fecha": "",
      "tecnicorespon": "",
      "tecnicoreporte": "",
      "agencia": "",
      "tipo": "",
      "ciudad": "",

      "lan": null,
      "problema": "",
      "proveedor": "",
      "min": "",
      "max": "",

      "tcompleto": "",
      "time0": "",
      "time1": "",
      "time2": "",
      "tdias": "",
      "tmins": "",

      "soporte": "",
      "descripcion": "",

      "estado": 1,
      "abierto": null,
      "nubicacion": "",
      "pindex": this.pageIndex + 1
    }

    this.citiescontrol.reset();
    this.tiposcontrol.reset();
    this.problemascontrol.reset();
    this.proveedorescontrol.reset();
    this.range.reset();

    this.obtenerInfoInventario();
  }
  
  obtenerInfoInventario() {
    this.ticketsService.list(this.inventario).subscribe(resp => {
      this.dataDevices = resp.body["info"];
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

  obtenerInfoInventarioExcel() {
    this.ticketsService.download(this.inventario).subscribe(resp => {
      //this.dataDevices = resp.body["info"];
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      const blob: any = new Blob([resp.body], { type: keys.getAll("content-type").toString() });
      const file = new File([blob], "Tickets" + '.xlsx', { type: keys.getAll("content-type").toString() });
      saveAs(file);
    }, err => {
      if (err.status === 409) {
        $.notify({
          icon: "notifications",
          message: "No se pudo descargar, ingresar rango de Fechas"
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

  obtenerInventarioid(n) {
    this.ticketsService.getheaderbyid(n).subscribe(resp => {
      this.inventid = resp["info"];
      this.generalFormG.controls["fechai"].setValue(this.inventid.fecha)
      this.generalFormG.controls["soporte"].setValue(this.inventid.soporte)
      this.generalFormG.controls["ttprov"].setValue(this.inventid.ttproveedor)
      this.generalFormG.controls["descripcion"].setValue(this.inventid.descripcion)

      this.openDialogEdit(n);
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

  obtenerTicketid(n) {
    this.ticketsService.getbyid(n).subscribe(resp => {
      this.inventid = resp["info"];
      this.openDialogEditEvento(n);
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

  openDialogEdit(n): void {
    this.isnew = false;
    this.isheader = true;
    this.selectedact = 0;
    const dialogRef = this.dialog.open(FormComponentTickets, {
      width: '100%',
      height: '90%',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        label: "Ticket",
        idedit: n,
        inventario: this.inventario,
        isnew: this.isnew,
        isheader: this.isheader,
        titulo: "Editar",
        activado: this.activado,
        selectedact: this.selectedact,
        generalFormG: this.generalFormG,
        eventoFormG: this.eventoFormG,
        agenciasFormG: this.agenciasFormG,
        inventid: this.inventid,
        cities: this.cities,
        problemas: this.problemas,
        propietarios: this.propietarios,
        usuarios: this.usuarios,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pageIndex = 0;
      this.obtenerInfoInventario();
    });
  }

  openDialogEditEvento(n): void {
    this.isnew = false;
    this.isheader = false;
    this.selectedact = 0;
    const dialogRef = this.dialog.open(FormComponentTickets, {
      width: '100%',
      height: '90%',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        label: "Evento",
        idedit: n,
        isnew: this.isnew,
        isheader: this.isheader,
        inventario: this.inventario,
        titulo: "Editar",
        activado: this.activado,
        selectedact: this.selectedact,
        generalFormG: this.generalFormG,
        eventoFormG: this.eventoFormG,
        agenciasFormG: this.agenciasFormG,
        inventid: this.inventid,
        cities: this.cities,
        problemas: this.problemas,
        propietarios: this.propietarios,
        usuarios: this.usuarios,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pageIndex = 0;
      this.obtenerInfoInventario();
    });
  }

  openDialogNew(): void {
    this.isnew = true;
    this.isheader = true;
    this.selectedact = 0;
    const dialogRef = this.dialog.open(FormComponentTickets, {
      width: '100%',
      height: '90%',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        label: "Ticket",
        isnew: this.isnew,
        inventario: this.inventario,
        isheader: this.isheader,
        titulo: "Crear Ticket",
        activado: this.activado,
        selectedact: this.selectedact,
        generalFormG: this.generalFormG,
        eventoFormG: this.eventoFormG,
        agenciasFormG: this.agenciasFormG,
        inventid: { Ticket: [] },
        cities: this.cities,
        problemas: this.problemas,
        propietarios: this.propietarios,
        usuarios: this.usuarios,

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerInfoInventario();
    });
  }

  obtenerInfoCiudades() {
    this.informacionService.listciudadesNombre({ "nombre": "", "estado": 1 }).subscribe(resp => {
      this.cities = resp.body["info"];
      const keys = resp.headers;

    }, err => {
      if (err.status === 400) {
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

  obtenerInfoTipos(cd) {
    this.informacionService.listtiposCiudades(cd).subscribe(resp => {
      this.tipos = resp.body["info"];
      const keys = resp.headers;

    }, err => {
      if (err.status === 400) {
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
  
  obtenerInfoPropietarios() {
    this.informacionService.listpropietariosNombre(this.pr).subscribe(resp => {
      this.propietarios = resp.body["info"];
      const keys = resp.headers;

    }, err => {
      if (err.status === 400) {
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

  obtenerInfoProblemas() {
    this.informacionService.listproblemasNombre(this.prb).subscribe(resp => {
      this.problemas = resp.body["info"];
      const keys = resp.headers;

    }, err => {
      if (err.status === 400) {
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
  
  obtenerInfoUsuarios() {
    this.usuarioService.listusuariosnombre(this.u).subscribe(resp => {
      this.usuarios = resp.body["info"];
      const keys = resp.headers;
    }, err => {
      if (err.status === 400) {
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

  Page(event) {
    this.pageIndex = event.pageIndex;
    this.inventario.pindex = this.pageIndex + 1;
    this.obtenerInfoInventario();
  }

}

@Component({
  selector: 'app-formedit',
  templateUrl: './formedit.html',
  styleUrls: ['./tickets.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]

})
export class FormComponentTickets implements OnInit {


  public modelSelected: any;
  public boolcity: boolean;
  public inventcheck: boolean;
  public infoeq: any = { "nombre": "", "estado": 1, "idLink": 2, "pindex": 1 };
  public tcompleto: any = ["SI", "NO", "NO APLICA"];
  filteredOptionsAgencias: Observable<any[]>;
  filteredOptionsUsuario: Observable<any[]>;
  public agencias: any[] = [];
  public tipos: any[] = [];
  public tcform: any;
  public d1form: any;
  public d2form: any;
  public d3form: any;
  public disabled2;
  public minimo;
  public maximo;
  public adicional = "";
  public usuariom: "";
  public fecham: "";
  public selectedfecha = true;
  public botonenviar = false;
  public ct = { "nombre": "", "estado": 1 }
  public agc = { "nombre": "", "idlink": 1 }
  dataEventos: any[] = [];
  t2control = new FormControl();
  citiescontrol = new FormControl();
  tiposcontrol = new FormControl();
  agenciascontrol = new FormControl();
  ipcontrol = new FormControl();
  public actividades:any[] = [];


  public displayedColumns: string[] = [
    'demo-agencia',
    'demo-tc',
    'demo-d1',
    'demo-d2',
    'demo-d3',
    'demo-total',
    'demo-adicional',
    'demo-action'
  ];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.ipcontrol.disable();
    this.citiescontrol.enable();
    this.tiposcontrol.enable();
    this.agenciascontrol.enable();

    this.data.generalFormG.controls["ttprov"].disable();
    if (this.data.isnew) {
      this.obtenerInfoAgencias();
      this.data.generalFormG.controls["proveedor"].enable();
      this.data.generalFormG.controls["problema"].enable();
      this.data.generalFormG.controls["fechai"].enable();
      this.data.generalFormG.controls["soporte"].enable();

      this.t2control.disable();
      this.data.generalFormG.reset();
      this.citiescontrol.reset();
      this.tiposcontrol.reset();
      this.agenciascontrol.setValue({ id: undefined, nombreagencia: "" })
      this.data.usuarios.forEach(element => {
        if (element.usuario == localStorage.getItem("username")) {
          this.data.generalFormG.controls["tresp"].setValue(element.nombre)
        }
      });
      this.informacionService.listnombAct({ nombre: "nciden" }).subscribe(resp => {
        let acts = resp.body["info"];
        acts.forEach(element=>{
          let fecha0=undefined;
          if(element.nombre.includes("ngreso")){
            fecha0=moment().format('YYYY-MM-DDTHH:mm');
          }
          let subact ={id:element.id,mins:element.mins==undefined?0:element.mins, fecha:fecha0,nombre:element.nombre,editmins:element.editmins}
          this.actividades.push(subact);
        });
        const keys = resp.headers;
      });
    }
    if (!this.data.isnew) {
      this.usuariom = this.data.inventid.modificacion;
      this.fecham = this.data.inventid.fechamod;
      this.data.generalFormG.controls["proveedor"].reset();
      this.data.generalFormG.controls["ttprov"].reset();
      this.selectedfecha = false;
      if (this.data.inventid.Problema != undefined) {
        this.data.problemas.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Problema[0])) {
            this.data.generalFormG.controls["problema"].setValue(element)
          }
        });
      }
      this.data.usuarios.forEach(element => {
        if (element.nombre == this.data.inventid.tecnicorespon) {
          this.data.generalFormG.controls["tresp"].setValue(element.nombre)
        }
        if (element.nombre == this.data.inventid.tecnicoreporte) {
          this.data.generalFormG.controls["reportado"].setValue(element)
        }

      });
      if (this.data.inventid.Proveedor != undefined) {
        this.data.generalFormG.controls["ttprov"].enable()
        this.data.propietarios.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Proveedor[0])) {
            this.data.generalFormG.controls["proveedor"].setValue(element)
          }
        });
      }
      if(this.data.generalFormG.controls.problema.value!=undefined){
        this.selectedProblem(this.data.generalFormG.controls.problema.value)
      }
      if(this.data.generalFormG.controls.soporte.value!=undefined){
        if(this.data.generalFormG.controls.soporte.value == 'LAN automatico'){
          this.data.generalFormG.controls["soporte"].disable();
        }else{
          this.data.generalFormG.controls["soporte"].enable();
        }
      }else{
        this.data.generalFormG.controls["soporte"].enable();
      }
      this.data.generalFormG.controls["ttprov"].setValue(this.data.inventid.ttproveedor)
      this.data.selectedact = this.data.inventid.estado ? 1 : 0;
      this.data.generalFormG.controls["proveedor"].disable();
      this.data.generalFormG.controls["problema"].disable();
      this.data.generalFormG.controls["fechai"].disable();

      this.obtenerInfoAgencias();
      this.minimo = moment(this.data.generalFormG.controls["fechai"].value).format('YYYY-MM-DDTHH:mm');
      this.maximo = moment(this.data.generalFormG.controls["fechai"].value).add(1439, "minutes").format('YYYY-MM-DDTHH:mm');
      this.d1form = this.minimo;
      this.d2form = this.minimo;
      this.d3form = this.maximo;

      

    }
    if (!this.data.isheader) {
      this.obtenerInfoAgencias();
      this.agencias = this.data.inventid.Agencia;
      this.agenciascontrol.setValue(this.data.inventid.Agencia[0]);
      this.tcform = this.data.inventid.tcompleto;
      this.d1form = moment(this.data.inventid.time0).format('YYYY-MM-DDTHH:mm');
      this.d2form = this.data.inventid.time1==undefined?this.d2form:moment(this.data.inventid.time1).format('YYYY-MM-DDTHH:mm');
      this.d3form = moment(this.data.inventid.time2).format('YYYY-MM-DDTHH:mm');
      this.minimo = moment(this.d3form).format('YYYY-MM-DDT00:00');
      this.maximo = moment(this.d3form).format('YYYY-MM-DDT23:59');
      this.adicional = this.data.inventid.adicional;
      this.data.selectedact = this.data.inventid.estado ? 1 : 0;
      this.citiescontrol.disable();
      this.tiposcontrol.disable();
      this.agenciascontrol.disable()
      if (this.tcform == "NO") {
        this.t2control.enable();
      } else {
        this.t2control.reset()
        this.t2control.disable();
      }
    }
    this.boolcity = true;
    this.inventcheck = false;
    this.disabled2 = true;
    this.data.generalFormG.controls["tresp"].disable();


    this.filteredOptionsUsuario = this.data.generalFormG.controls["reportado"].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filter(nombre) : this.data.usuarios.slice())),
    );
    this.filteredOptionsAgencias = this.agenciascontrol.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombreagencia)),
      map(nombreagencia => (nombreagencia ? this._filterAg(nombreagencia) : this.agencias.slice())),
    );
  }

  constructor(
    public dialogRef: MatDialogRef<FormComponentTickets>,
    breakpointObserver: BreakpointObserver,
    private ticketsService: TicketsService,
    private informacionService: InformacionService,
    @Inject(MAT_DIALOG_DATA) public data: TicketsComponent) {
  }


  sendinfo() {
    this.botonenviar = true;
    //this.data.generalFormG.controls["fechai"].setValue(moment(this.data.generalFormG.value.fechai).format('YYYY-MM-DD'))
    if (this.data.isnew) {
      let actheader =[];
      this.actividades.forEach(element =>{
        let act={
          actividad:element.id, 
          nameact:element.nombre, 
          comentario:this.data.generalFormG.controls["descripcion"].value, 
          subactop:null,
          subactividades:[{subactividad:5,fecha:element.fecha, mins:element.mins}]
        }
        actheader.push(act)
      });
      this.ticketsService.insert(this.data.generalFormG, this.dataEventos, actheader).subscribe(resp => {
        this.data.generalFormG.controls["reportado"].setValue({ id: 0, nombre: "" });
        this.data.generalFormG.controls["problema"].reset();
        this.data.generalFormG.controls["proveedor"].reset();
        this.data.generalFormG.controls["soporte"].reset();
        this.data.generalFormG.controls["ttprov"].reset();
        this.data.generalFormG.controls["descripcion"].reset();
        this.data.generalFormG.controls["fechai"].reset();
        this.tiposcontrol.reset();
        this.citiescontrol.reset();
        this.ipcontrol.reset();
        this.obtenerInfoAgencias();

        this.dataEventos = [];
        $.notify({
          icon: "notifications",
          message: "El Ticket se ha agregado"
        }, {
          type: "success",
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
      }, err => {
        if (err.status === 400) {
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
        this.botonenviar = false;
      });
    } else {
      if (this.data.isheader) {
        this.ticketsService.editarheader(this.data.generalFormG, this.dataEventos, this.data.inventid.id, this.data.selectedact).subscribe(resp => {

          this.botonenviar = false;
          $.notify({
            icon: "notifications",
            message: "El Ticket se ha editado"
          }, {
            type: "success",
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
        }, err => {
          if (err.status === 400) {
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
          this.botonenviar = false;
        });
      } else {
        this.ticketsService.editar(
          moment(this.d1form).format('YYYY-MM-DDTHH:mm:ss'),
          this.d2form == undefined ? null : moment(this.d2form).format('YYYY-MM-DDTHH:mm:ss'),
          moment(this.d3form).format('YYYY-MM-DDTHH:mm:ss'),
          this.tcform,
          this.data.inventid.id,
          this.agenciascontrol.value.id,
          this.data.inventid.idenlace,
          this.data.selectedact,
          this.adicional
        ).subscribe(resp => {
          this.botonenviar = false;
          $.notify({
            icon: "notifications",
            message: "El ticket se ha editado"
          }, {
            type: "success",
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
        }, err => {
          if (err.status === 400) {
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
          this.botonenviar = false;
        });
      }

    }
  }

  selectiond2(value) {
    if (value == "NO") {
      this.t2control.enable();
    } else {
      this.t2control.reset()
      this.t2control.disable();
    }
  }

  selectedProblem(value){
    if(value.nombre.includes("ctric")){
      this.tcform="NO APLICA"
      this.selectiond2(this.tcform)
      this.data.generalFormG.controls["proveedor"].reset();
      this.data.generalFormG.controls["ttprov"].disable();
      this.data.generalFormG.controls["proveedor"].disable();
      this.citiescontrol.reset()
      this.tiposcontrol.reset()
      this.obtenerInfoAgencias();
    }
    else if(value.nombre.includes("anten")){
      this.tcform="NO APLICA"
      this.selectiond2(this.tcform)
      this.data.generalFormG.controls["proveedor"].reset();
      this.data.generalFormG.controls["ttprov"].disable();
      this.data.generalFormG.controls["proveedor"].enable();
      this.citiescontrol.reset()
      this.tiposcontrol.reset()
      this.obtenerInfoAgencias();
    }
    else if(value.nombre.includes("nlace")){
      this.tcform="SI"
      this.data.generalFormG.controls["proveedor"].enable();
      this.selectiond2(this.tcform)
    }else{
      this.data.generalFormG.controls["proveedor"].enable();
    }

  }

  selectionag(value) {
    if(value.Ciudad[0].Tipo[0].Enlace!=undefined){
      this.ipcontrol.setValue(value.Ciudad[0].Tipo[0].Enlace[0].tunel);
    }
    
    this.data.cities.forEach(element => {
      if (element.nombre == value.Ciudad[0].nombreciudad) {
        this.citiescontrol.setValue(element)
        let cd = "";
        cd = cd + this.citiescontrol.value.nombre + ",";
        this.informacionService.listtiposCiudades({ ciudades: cd }).subscribe(resp => {
          this.tipos = resp.body["info"];
          this.tipos.forEach(element => {
            if(element.nombre == value.Ciudad[0].Tipo[0].nombretipo){
              this.tiposcontrol.setValue(element)
            }
          });
          const keys = resp.headers;
        }, err => {
          if (err.status === 400) {
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
    });
    
  }

  selectiondate() {

    this.minimo = moment(this.data.generalFormG.value.fechai).format('YYYY-MM-DDTHH:mm');
    this.maximo = moment(this.data.generalFormG.value.fechai).add(1439, "minutes").format('YYYY-MM-DDTHH:mm');
    this.d1form = this.minimo;
    this.d2form = this.minimo;
    this.d3form = this.maximo;
    this.tiempoinicio();
    this.selectedfecha = false;
    this.botonenviar = false;
  }

  tiempoinicio(){
    this.actividades.forEach(element=>{
      if(element.nombre.includes('eguim')){
        element.fecha=this.d1form
      }
    })
  }

  obtenerInfoTipos() {
    let cd = "";
    this.agencias=[]
    this.ipcontrol.reset();
    this.tiposcontrol.reset();
    cd = cd + this.citiescontrol.value.nombre + ",";
    /*this.citiescontrol.value.forEach(element => {
      cd = cd + element.nombre + ',';
    });*/
    this.informacionService.listtiposCiudades({ ciudades: cd }).subscribe(resp => {
      this.tipos = resp.body["info"];
      const keys = resp.headers;

    }, err => {
      if (err.status === 400) {
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

    this.obtenerInfoAgencias();
  }

  obtenerInfoProveedor() {
    this.agencias=[]
    this.ipcontrol.reset();
    this.data.generalFormG.controls["ttprov"].enable();
    this.obtenerInfoAgencias();
  }

  obtenerInfoAgencias() {
    this.agencias=[]
    this.ipcontrol.reset();
    this.agenciascontrol.setValue({ id: undefined, nombreagencia: "" })
    
    let cd = "";
    let tp = "";
    let idp;
    if (this.data.generalFormG.controls["proveedor"].value != null) {
      idp = this.data.generalFormG.controls["proveedor"].value.id;
    }
    if (this.citiescontrol.value != null) {
      cd = cd + this.citiescontrol.value.nombre + ",";
    }

    if (this.tiposcontrol.value != null) {
      tp = tp + this.tiposcontrol.value.nombre + ",";
    }
    if(this.data.isheader){

      if (this.data.generalFormG.controls.proveedor.value != null) {
        idp = this.data.generalFormG.controls.proveedor.value.id;
      }
    }


    /*
    if (this.citiescontrol.value != null) {
      this.citiescontrol.value.forEach(element => {
        cd = cd + element.nombre + ',';
      });
    }

    if (this.tiposcontrol.value != null) {
      this.tiposcontrol.value.forEach(element => {
        tp = tp + element.nombre + ',';
      });
    }*/

    this.informacionService.listagenciastickets({ ciudad: cd, tipo: tp, idproveedor: idp }).subscribe(resp => {
      this.agencias = resp.body["info"];
      const keys = resp.headers;

    }, err => {
      if (err.status === 400) {
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

  private _filter(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.data.usuarios.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterAg(nombreagencia: string): any[] {
    const filterValue = nombreagencia.toLowerCase();
    return this.agencias.filter(option => option.nombreagencia.toLowerCase().includes(filterValue));
  }

  deletetime(element) {
    let i = 0;
    this.dataEventos.forEach(v => {
      if (v == element) {
        this.dataEventos.splice(i, 1)
      }
      i++;
      this.table.renderRows();
    })
  }

  compareThem(o1, o2): boolean {
    return o1.id === o2.id;
  }

  addtime() {

    //let fechaticket= moment(this.data.generalFormG.value.fechai).format('YYYY-MM-DD')
    let total = 0;
    let d1format;
    let d2format;
    let d3format;
    let add = true;

    if (this.d1form == undefined) {
      add = false;
      $.notify({
        icon: "notifications",
        message: "Definir tiempos"
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
      return 0;
    }
    if (this.tcform == undefined) {
      add = false;
      $.notify({
        icon: "notifications",
        message: "Definir tiempos"
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
      return 0;
    }

    // let d1formfinal= fechaticket+"T"+this.d1form;

    if (this.tcform == "NO") {
      this.t2control.enable();
      if (this.d1form == undefined || this.d2form == undefined) {
        add = false;
        $.notify({
          icon: "notifications",
          message: "Definir tiempos"
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
        return 0;
      } else {
        if (this.d1form != undefined && this.d2form != undefined && this.d3form != undefined) {
          total = new Date(this.d3form).getTime() - new Date(this.d2form).getTime();
        } else {
          total = 0;
        }

      }

    } else {
      this.t2control.reset()
      this.t2control.disable();
      if (this.d1form == undefined) {
        add = false;
        $.notify({
          icon: "notifications",
          message: "Definir tiempos"
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
        return 0;
      } else {
        if (this.d1form != undefined && this.d3form != undefined) {
          total = new Date(this.d3form).getTime() - new Date(this.d1form).getTime();
        } else {
          total = 0;
        }

      }
    }



    if (this.d1form != undefined) {
      d1format = moment(this.d1form).format('YYYY-MM-DD HH:mm:ss');
    } if (this.d2form != undefined) {
      d2format = moment(this.d2form).format('YYYY-MM-DD HH:mm:ss');
    } if (this.d3form != undefined) {
      d3format = moment(this.d3form).format('YYYY-MM-DD HH:mm:ss');
    }

    if (total < 0) {
      add = false;
      $.notify({
        icon: "notifications",
        message: "No se puede realizar calculo de minutos"
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
      return 0;
    } else {
      total = ((total / 1000) / 60);
    }

    if (this.agenciascontrol.value.id == undefined) {
      add = false;
      $.notify({
        icon: "notifications",
        message: "Definir agencia"
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
      return 0;
    }



    if (add) {
      let evento = {
        tcompleto: this.tcform,
        time0: d1format,
        time1: d2format,
        time2: d3format,
        adicional: this.adicional,
        ciudad: this.agenciascontrol.value.Ciudad[0].nombreciudad,
        tipo: this.agenciascontrol.value.Ciudad[0].Tipo[0].nombretipo,
        agencia: this.agenciascontrol.value.nombreagencia,
        tmins: total,
        idagencia: this.agenciascontrol.value.id,
        idenlace: this.agenciascontrol.value.Ciudad[0].Tipo[0].Enlace == undefined ? null : this.agenciascontrol.value.Ciudad[0].Tipo[0].Enlace[0].idEnlace
      }
      this.dataEventos.push(evento);
      this.botonenviar = false;

    }
    this.table.renderRows();

  }

  displayFn(value) {
    return value ? value.nombreagencia : undefined;
  }


  displayFnUsuario(value) {
    return value ? value.nombre : undefined;
  }


}
