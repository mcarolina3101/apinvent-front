import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { UsuarioService } from '../servicios/informacion/usuario.service';
import { ActividadService } from '../servicios/informacion/actividad.service';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
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
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
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
export class ActividadComponent implements OnInit {

  public displayedColumns: string[] = [
    'demo-id',
    'demo-fecha',
    'demo-fecha2',
    'demo-usuario',
    'demo-actividad',
    'demo-actopn',
    'demo-subactividad',
    'demo-subactopn',
    'demo-mins',
    'demo-comentario',
    'demo-ticket',
    'demo-abbanco',
    'demo-estado',
    'demo-action'
  ];
  public dataAct: any[] = [];
  public inventario: any = {};
  public inventid: any;
  public nombre: any = "";
  public estado: any = 1;
  public isnew: boolean = false;
  public isheader: boolean = false;
  public selectedact: number;
  public selectedabb: number;
  public selsubactop: number;

  eventoFormG = new FormControl();
  agenciasFormG = new FormControl();
  public pageIndex = 0;
  public totalenght = 0;
  public usuarios: any[] = [];
  public usuario: any;
  public actividades: any[] = [];
  public subactividades: any[] = [];
  public label = "";
  public titulo = "";
  public activado: any = [{ id: 0, nombre: 'ELIMINADO' }, { id: 1, nombre: 'INGRESADO' }];
  public open: any = [{ id: 0, nombre: 'NO' }, { id: 1, nombre: 'SI' }];
  public subactop: any = [{ id: 0, nombre: 'N/A' }, { id: 1, nombre: 'Ingreso / Retiro de equipo' }, { id: 2, nombre: 'Wireless ' }, { id: 3, nombre: 'Ingreso / Retiro de equipo - Wireless' }];
  public u = { "nombre": "", "estado": 1 }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private actividadService: ActividadService,
    private usuarioService: UsuarioService,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.inventario = {
      "usuario": null,
      "actividad": null,
      "subactividad": null,
      "mins": null,
      "comentario": null,
      "ticket": null,
      "fecha": null,
      "estado": 1,
      "abierto": null,
      "abbanco": null,
      "headab": null,
      "pindex": this.pageIndex + 1
    }
    this.obtenerInfoInventario();
    this.obtenerInfoUsuarios();
    this.obtenerInfoActividades();
    this.obtenerInfoSubctividades();
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
    this.pageIndex = 0;
    this.inventario.pindex = 1;
    if (this.inventario.fecha != "" && this.inventario.fecha != null) {
      this.inventario.fecha = moment(this.inventario.fecha).format('YYYY-MM-DD')
    }


    this.obtenerInfoInventario();
  }

  obtenerInfoInventarioClean() {
    this.pageIndex = 0;
    this.inventario = {
      "usuario": null,
      "actividad": null,
      "subactividad": null,
      "mins": null,
      "comentario": null,
      "ticket":null,
      "fecha": null,
      "estado": 1,
      "abierto": null,
      "abbanco": null,
      "headab": null,
      "time0": null,
      "time2": null,
      "pindex": this.pageIndex + 1
    }
    this.range.reset();
    this.obtenerInfoInventario();
  }

  obtenerInfoInventario() {
    this.actividadService.list(this.inventario).subscribe(resp => {
      this.dataAct = resp.body["info"];
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
    this.actividadService.download(this.inventario).subscribe(resp => {
      const keys = resp.headers;
      const blob: any = new Blob([resp.body], { type: keys.getAll("content-type").toString() });
      const file = new File([blob], "Actividades" + '.xlsx', { type: keys.getAll("content-type").toString() });
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

  obtenerActid(n, estado) {
    this.actividadService.getheaderbyid(n,estado).subscribe(resp => {
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
  /*
    obtenerSubactid(n) {
      this.actividadService.getsubactbyid(n).subscribe(resp => {
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
  */
  openDialogEdit(n): void {
    this.isnew = false;
    this.isheader = true;
    this.selectedact = 0;
    this.selectedabb = 0;
    this.selsubactop = this.inventid.subactop;
    const dialogRef = this.dialog.open(FormComponentActividad, {
      width: '100%',
      height: '90%',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        label: "Actividad",
        idedit: n,
        inventario: this.inventario,
        isnew: this.isnew,
        isheader: this.isheader,
        titulo: "Editar",
        activado: this.activado,
        subactop: this.subactop,
        selectedact: this.selectedact,
        selectedbb: this.selectedabb,
        selsubactop: this.selsubactop,
        open: this.open,
        inventid: this.inventid,
        usuario: this.usuario,
        actividades: this.actividades,
        subactividades: this.subactividades,
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
    this.selectedabb = 0;
    const dialogRef = this.dialog.open(FormComponentActividad, {
      width: '100%',
      height: '90%',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        label: "Actividades",
        isnew: this.isnew,
        inventario: this.inventario,
        isheader: this.isheader,
        titulo: "Crear actividad",
        activado: this.activado,
        subactop: this.subactop,
        selectedact: this.selectedact,
        selectedabb: this.selectedabb,
        open: this.open,
        selsubactop: this.selsubactop,
        inventid: undefined,
        usuario: this.usuario,
        actividades: this.actividades,
        subactividades: this.subactividades,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerInfoInventario();
    });
  }

  obtenerInfoUsuarios() {
    this.usuarioService.listusuariosnombre(this.u).subscribe(resp => {
      this.usuarios = resp.body["info"];
      const keys = resp.headers;
      this.usuarios.forEach(element => {
        if (element.usuario == localStorage.getItem("username")) {
          this.usuario = element.nombre
        }
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
    });
  }

  obtenerInfoActividades() {
    this.informacionService.listnombAct({ nombre: "" }).subscribe(resp => {
      this.actividades = resp.body["info"];
      const keys = resp.headers;
      /*
      this.usuarios.forEach(element => {
        if (element.usuario == localStorage.getItem("username")) {
          this.usuario =element.nombre
        }
      });*/
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

  obtenerInfoSubctividades() {
    this.informacionService.listnombSubact({ nombre: "" }).subscribe(resp => {
      this.subactividades = resp.body["info"];
      const keys = resp.headers;
      /*
      this.usuarios.forEach(element => {
        if (element.usuario == localStorage.getItem("username")) {
          this.usuario =element.nombre
        }
      });*/
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
  styleUrls: ['./actividad.component.css'],
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
export class FormComponentActividad implements OnInit {

  public modelSelected: any;
  public boolcity: boolean;
  public inventcheck: boolean;
  filteredOptionsUsuario: Observable<any[]>;
  public usuariom: any;
  public fecham: any;
  public comentario: any;
  public botonenviar = false;
  public disableop = true;
  public ire = false;
  public w = false;
  public perfil;
  public disire = false;
  public disw = false;
  dataEventos: any[] = [];
  public actest: any = [{ id:0, bul: false, nombre: 'ELIMINADO' }, { id:1, bul: true, nombre: 'INGRESADO' }];

  actividadescontrol = new FormControl();

  public displayedColumns: string[] = [
    'demo-fecha',
    'demo-subactividad',
    'demo-usuario',
    'demo-mins',
    'demo-action'
  ];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.perfil = localStorage.getItem("perfil")
    this.boolcity = true;
    this.inventcheck = false;
    if (this.data.inventid != undefined) {
      if (this.data.inventid.id != undefined) {
        this.data.actividades.forEach(element => {
          if (element.id == this.data.inventid.ConfigActividad[0].idactividad) {
            this.actividadescontrol.setValue(element)
          }
        });
        this.editAct();

      }
      this.usuariom = this.data.inventid.modificacion;
      this.fecham = this.data.inventid.fechamod;
      this.comentario = this.data.inventid.comentario;
      this.data.selectedact = this.data.inventid.estado ? 1 : 0;
      this.data.selectedabb = this.data.inventid.abbanco ? 1 : 0;
    }
  }

  constructor(
    public dialogRef: MatDialogRef<FormComponentActividad>,
    breakpointObserver: BreakpointObserver,
    private actividadService: ActividadService,
    private informacionService: InformacionService,
    @Inject(MAT_DIALOG_DATA) public data: ActividadComponent) {
  }


  sendinfo() {
    this.botonenviar = true;
    if (this.data.isnew) {
      this.actividadService.insert(this.actividadescontrol.value.id, this.comentario, this.dataEventos, this.data.selsubactop).subscribe(resp => {
        this.dataEventos = [];
        this.actividadescontrol.reset()
        this.disableop = true;
        this.ire = false;
        this.w = false;
        $.notify({
          icon: "notifications",
          message: "La actividad se ha agregado"
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
        this.actividadService.editarheader(this.actividadescontrol.value.id, this.comentario, this.dataEventos, this.data.inventid.id, this.data.selectedact, this.data.selectedabb).subscribe(resp => {
          this.botonenviar = false;
          $.notify({
            icon: "notifications",
            message: "La actividad se ha editado"
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

  selectActividad() {
    this.dataEventos = [];
    this.ire = false;
    this.w = false;
    if (!this.actividadescontrol.value.hassub) {
      this.data.selsubactop = undefined;
      this.disableop = true;
      this.data.subactividades.forEach(element => {
        if (element.id == 5) {
          let eventos = {
            fecha: undefined,
            subactividad: element.id,
            namesubact: element.nombre,
            usuario: this.data.usuario,
            mins: this.actividadescontrol.value.mins,
            disfecha: false,
            estado: element.estado?1:0,
            dismins: !this.actividadescontrol.value.editmins,
            check: true,
            discheck: true
          }
          this.dataEventos.push(eventos)
        }
      });

    } else {
      this.disableop = false;
      this.fungetop();
      this.ire = false;
      this.w = false;
      
      if (this.actividadescontrol.value.subact0 == undefined && this.actividadescontrol.value.subact2 == undefined) {
        this.disire = true;
        this.disw = false;
        this.ire=true;
        this.fungetop();
      } else if (this.actividadescontrol.value.subact1 == undefined && this.actividadescontrol.value.subact3 == undefined) {
        this.disire = true;
        this.disw = false;
        this.fungetop();
      } else if (this.actividadescontrol.value.subact0 == undefined && this.actividadescontrol.value.subact1 == undefined) {
        this.disire = false;
        this.disw = true;
        this.w=true
        this.fungetop();
      }else if (this.actividadescontrol.value.subact2 == undefined && this.actividadescontrol.value.subact3 == undefined) {
        this.disire = false;
        this.disw = true;
        this.fungetop();
      }else{
        this.disire=false;
        this.disw=false;
      }

    }

  }

  editAct() {
    this.dataEventos = [];
    this.ire = false;
    this.w = false;
    this.disableop = true;
    this.actividadescontrol.disable();
    if (!this.actividadescontrol.value.hassub) {
      this.data.selsubactop = undefined;
    } else {
      if (this.data.selsubactop == 0) {
        this.ire = false;
        this.w = false;
      } else if (this.data.selsubactop == 1) {
        this.ire = true;
        this.w = false;
      } else if (this.data.selsubactop == 2) {
        this.ire = false;
        this.w = true;
      } else if (this.data.selsubactop == 3) {
        this.ire = true;
        this.w = true;
      }
    }

    this.data.inventid.ConfigActividad[0].Actividades.forEach(element => {
      let eventos = {
        id: element.id,
        fecha: element.fecha,
        subactividad: element.ConfigActividad[0].id,
        namesubact: element.ConfigActividad[0].subactividad,
        usuario: element.usuario,
        mins: element.mins,
        estado: element.estado?1:0,
        disfecha: element.usuario == undefined ? true : false,
        dismins: !this.actividadescontrol.value.editmins,
        check: element.usuario == undefined ? false : true,
        discheck: element.usuario == undefined ? false : true
      }
      this.dataEventos.push(eventos)
    });
  }

  checksubact(a) {
    if (a.check) {
      a.usuario = this.data.usuario;
      a.disfecha = false;
    } else {
      a.fecha = undefined;
      a.disfecha = true;
      a.usuario = this.data.usuario;
      a.usuario = undefined;
    }
  }


  fungetop() {
    this.dataEventos = [];
    if (this.ire == false && this.w == false) {
      this.data.selsubactop = this.data.subactop[0].id
    } else if (this.ire == true && this.w == false) {
      this.data.selsubactop = this.data.subactop[1].id
    } else if (this.ire == false && this.w == true) {
      this.data.selsubactop = this.data.subactop[2].id
    } else if (this.ire == true && this.w == true) {
      this.data.selsubactop = this.data.subactop[3].id
    }
    this.informacionService.getactopbyid(this.actividadescontrol.value.id, this.data.selsubactop).subscribe(resp => {
      let opcion = new String(resp["info"]);
      var keys = resp.headers;
      var oparr = opcion.split(",")
      this.dataEventos = [];
      this.data.subactividades.forEach(element => {
        var eid = element.id + '';
        if (oparr.includes(eid)) {
          let eventos = {
            fecha: undefined,
            subactividad: element.id,
            namesubact: element.nombre,
            usuario: undefined,
            mins: element.mins,
            estado: element.estado?1:0,
            disfecha: true,
            dismins: !element.editmis,
            check: false,
            discheck: false
          }
          this.dataEventos.push(eventos)
        }
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
    });
  }



  /*
    addAct() {
      if (this.actividadescontrol.value == undefined) {
        $.notify({
          icon: "notifications",
          message: "Seleccionar actividad"
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
      if (this.fhora == undefined) {
        $.notify({
          icon: "notifications",
          message: "Definir fecha"
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
      if (this.subactividadescontrol.value == undefined) {
        $.notify({
          icon: "notifications",
          message: "Seleccionar subactividad"
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
      if (this.minutos == undefined || this.minutos == 0) {
        $.notify({
          icon: "notifications",
          message: "Definir minutos"
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
      let eventos = {
        fecha: moment(this.fhora).format('YYYY-MM-DD HH:mm:ss'),
        subactividad: this.subactividadescontrol.value.id,
        namesubact: this.subactividadescontrol.value.nombre,
        usuario: this.data.usuario,
        mins: this.minutos
      }
      this.dataEventos.push(eventos)
      this.table.renderRows()
    }
  
    deleteAct(element) {
      let i = 0;
      this.dataEventos.forEach(v => {
        if (v == element) {
          this.dataEventos.splice(i, 1)
        }
        i++;
        this.table.renderRows();
      })
    }
  */
  private _filter(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.data.usuarios.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  compareThem(o1, o2): boolean {
    return o1.id === o2.id;
  }

  displayFn(value) {
    return value ? value.nombre : undefined;
  }


}
