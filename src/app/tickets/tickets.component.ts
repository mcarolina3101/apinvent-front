import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { UsuarioService } from '../servicios/informacion/usuario.service';
import { TicketsService } from '../servicios/informacion/tickets.service';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
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
  public activado: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];
  public titulo = "";
  ticketFormG = this._formBuilder.group({
    fechai: [undefined, Validators.required],
    numero: [undefined, Validators.required]
  });
  generalFormG = this._formBuilder.group({
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
  public cities: any[];
  public problemas: any[] = [];
  public propietarios: any[] = [];
  public usuarios: any[] = [];
  public prb = { "nombre": "", "estado": 1 }
  public u = { "nombre": "", "estado": 1 }
  public pr = { "nombre": "", "estado": 1 }

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private ticketsService: TicketsService,
    private usuarioService: UsuarioService,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.inventario = {
      "ticket": "",
      "agencia": "",
      "tipo": "",
      "ciudad": "",

      "lan": "",
      "problema": "",
      "proveedor": "",


      "tcompleto": "",
      "time0": "",
      "time1": "",
      "time2": "",
      "tdias": "",
      "tmins": "",

      "soporte": "",
      "descripcion": "",

      "estado": 1,
      "nubicacion": "",
      "pindex": this.pageIndex + 1
    }
    this.obtenerInfoInventario();
    this.obtenerInfoCiudades();
    this.obtenerInfoProblemas()
    this.obtenerInfoPropietarios()
    this.obtenerInfoUsuarios()
  }

  obtenerInfoInventario_p1() {
    this.pageIndex = 0;
    this.inventario.pindex = 1;
    this.obtenerInfoInventario();
  }

  obtenerInfoInventario() {
    this.ticketsService.listticket(this.inventario).subscribe(resp => {
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
    this.ticketsService.downloadticket(this.inventario).subscribe(resp => {
      //this.dataDevices = resp.body["info"];
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());

      const blob: any = new Blob([resp.body], { type: keys.getAll("content-type").toString() });
      const file = new File([blob], "inventario" + '.xlsx', { type: keys.getAll("content-type").toString() });
      saveAs(file);
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

  obtenerInventarioid(n) {
    this.ticketsService.getticketbyid(n).subscribe(resp => {
      this.inventid = resp["info"];

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

  openDialogEdit(n): void {
    this.isnew = false;
    const dialogRef = this.dialog.open(FormComponentTickets, {
      width: '100%',
      height: '800px',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        idedit: n,
        isnew: this.isnew,
        titulo: "Editar",
        activado: this.activado,
        ticketFormG: this.ticketFormG,
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
    this.ticketFormG.reset();
    const dialogRef = this.dialog.open(FormComponentTickets, {
      width: '100%',
      height: '800px',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        isnew: this.isnew,
        titulo: "Crear Ticket",
        activado: this.activado,
        ticketFormG: this.ticketFormG,
        generalFormG: this.generalFormG,
        eventoFormG: this.eventoFormG,
        agenciasFormG: this.agenciasFormG,
        inventid: undefined,
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
      /*
      this.usuarios.forEach(element => {
        if (element.usuario == localStorage.getItem("username")) {
          this.data.generalFormG.controls["tresp"].setValue(element.nombre)
        }
      });
      */
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
  public tcompleto: any = ["SI", "NO", "No Aplica"];
  filteredOptionsAgencias: Observable<any[]>;
  filteredOptionsUsuario: Observable<any[]>;
  public agencias: any[] = [];
  public tipos: any[] = [];
  public tcform: any;
  public d1form: any;
  public d2form: any;
  public d3form: any;
  public disabled2;
  public ct = { "nombre": "", "estado": 1 }
  public agc = { "nombre": "", "idlink": 1 }
  dataEventos: any[] = [];
  t2control = new FormControl();
  citiescontrol = new FormControl();
  tiposcontrol = new FormControl();
  agenciascontrol = new FormControl();


  public displayedColumns: string[] = [
    'demo-ciudad',
    'demo-tipo',
    'demo-agencia',
    'demo-tc',
    'demo-d1',
    'demo-d2',
    'demo-d3',
    'demo-total',
    'demo-action'
  ];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.t2control.disable();
    this.data.ticketFormG.reset();
    this.data.generalFormG.reset();
    this.citiescontrol.reset();
    this.tiposcontrol.reset();
    this.agenciascontrol.setValue({id:undefined,nombreagencia:""})
    this.boolcity = true;
    this.inventcheck = false;
    this.disabled2 = true;
    this.data.generalFormG.controls["tresp"].disable();
    this.data.usuarios.forEach(element => {
      if (element.usuario == localStorage.getItem("username")) {
        this.data.generalFormG.controls["tresp"].setValue(element.nombre)
      }
    });

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
    if (this.data.isnew) {
      this.ticketsService.insertticket(this.data).subscribe(resp => {
        //const keys = resp.headers;
        //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
        $.notify({
          icon: "notifications",
          message: "El equipo se ha agregado"
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
    } else {
      this.ticketsService.insertticket(this.data).subscribe(resp => {
        //const keys = resp.headers;
        //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
        $.notify({
          icon: "notifications",
          message: "El equipo se ha editado"
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

  selectiond2(value) {
    if (value == "NO") {
      this.t2control.enable();
    } else {
      this.t2control.reset()
      this.t2control.disable();
    }
  }

  obtenerInfoTipos() {
    this.tiposcontrol.reset();
    let cd = "";
    this.citiescontrol.value.forEach(element => {
      cd = cd + element.nombre + ',';
    });
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

  obtenerInfoAgencias() {
    this.agenciascontrol.setValue({id:undefined,nombreagencia:""})
    let cd = "";
    let tp = "";
    let idp;
    if (this.data.generalFormG.controls["proveedor"].value != null) {
      idp = this.data.generalFormG.controls["proveedor"].value.id;
    }
    if (this.citiescontrol.value != null) {
      this.citiescontrol.value.forEach(element => {
        cd = cd + element.nombre + ',';
      });
    }

    if (this.tiposcontrol.value != null) {
      this.tiposcontrol.value.forEach(element => {
        tp = tp + element.nombre + ',';
      });
    }

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
    console.log(this.agencias)
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

  addtime() {
    let total = 0;
    let d1format;
    let d2format;
    let d3format;
    let add = true;

    if (this.tcform == "NO") {
      this.t2control.enable();
      if (this.d1form == undefined || this.d2form == undefined || this.d3form == undefined) {
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
        total = new Date(this.d3form).getTime() - new Date(this.d2form).getTime();
      }

    } else {
      this.t2control.reset()
      this.t2control.disable();
      if (this.d1form == undefined || this.d3form == undefined) {
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
        total = new Date(this.d3form).getTime() - new Date(this.d1form).getTime();
      }
    }

    if (this.tcform == undefined && this.d1form == undefined && this.d2form == undefined && this.d3form == undefined) {
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

    if (this.d1form != undefined) {
      d1format = moment(this.d1form).format('DD-MM-YYYY HH:mm');
    } if (this.d2form != undefined) {
      d2format = moment(this.d2form).format('DD-MM-YYYY HH:mm');
    } if (this.d3form != undefined) {
      d3format = moment(this.d3form).format('DD-MM-YYYY HH:mm');
    }

    if(total<0){
      add=false;
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
    }else{
      total=((total/1000)/60);
    }

    if(this.agenciascontrol.value.id==undefined){
      add=false;
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
        tc: this.tcform,
        d1: d1format,
        d2: d2format,
        d3: d3format,
        ciudad: this.agenciascontrol.value.Ciudad[0].nombreciudad,
        tipo: this.agenciascontrol.value.Ciudad[0].Tipo[0].nombretipo,
        agencia: this.agenciascontrol.value.nombreagencia,
        tt: total
      }
      this.dataEventos.push(evento);

    }
    this.table.renderRows();

  }



  displayFn(value) {
    return value ? value.nombreagencia : undefined;
  }
}
