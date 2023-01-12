import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformacionService } from '../servicios/informacion/informacion.service';
import 'rxjs/add/observable/interval';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { DashboardService } from '../servicios/apis/dashboard.service';

declare var $: any;

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
      state('collapsed', style({ height: '0px', minHeight: '0 ' })),
      state('expanded', style({ height: '*' })),
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
  public displayedColumns2: string[] = [ //Hardware
    'demo-nombre2',
    'demo-link2',
    'demo-estado2',
    'demo-action2'
  ];
  public displayedColumnsCiudad: string[] = [ //Hardware
    'demo-ciudad',
    'demo-tipo',
    'demo-agencia',
    'demo-countenlaces',
    'demo-countinv',
    'demo-estado',
    'demo-action'
  ];
  public displayedColumns3: string[] = [ //Ambientes, Orion, Propietarios
    'demo-nombre3',
    'demo-estado3',
    'demo-lan3',
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
  public displayedColumns5: string[] = [ //Actividades
    'demo-id5',
    'demo-nombre5',
    'demo-issub5',
    'demo-mins5',
    'demo-hassub5',
    'demo-sub50',
    'demo-sub51',
    'demo-sub52',
    'demo-sub53',
    'demo-estado5',
    'demo-action5'
  ];
  public date = new FormControl(moment());
  modeloFormG = this._formBuilder.group({
    equipo: new FormControl(undefined, [Validators.required]),
    marca: new FormControl(undefined, [Validators.required]),
    flash: new FormControl(undefined),
    ram: new FormControl(undefined),
    date: new FormControl(undefined)
  });

  public varform: any;
  public cd;
  public inventario: any;
  public ambiente: any;
  public problema: any;
  public actividad: any;
  public orion: any;
  public propietario: any;
  public entidad: any;
  public hardware: any;
  public hardwareOp: any;
  public tipohardware: any;
  public modelo: any;
  public totalenght = 1000;
  public pageIndex = 0;

  public prefixmem: any;
  public selectedtipo: number;
  public editado1: any;
  public accion: string = '';
  public isnew: any;
  public id: number = 0;
  public nombre: string = "";
  public selectedact: any;
  tiposcontrolarr = new FormControl();
  citiescontrolarr = new FormControl();
  tiposcontrol = new FormControl();
  citiescontrol = new FormControl();
  ubicontrol = new FormControl();

  public activado: any = [{ id: 1, nombre: 'Si' }, { id: 0, nombre: 'No' }];
  public hardwares: any[];
  public entidades: any[];
  public propietarios: any[];
  public ambientes: any[];
  public problemas: any[];
  public orions: any[];
  public actividades: any[];
  public equipos: any[] = [];
  public marcas: any[] = [];
  public flashs: any[] = [];
  public rams: any[] = [];
  public dataDevices: any[] = [];
  public tipos: any[];
  public cities: any[] = [];
  public modelos: any[];
  public modelomarca: any[];
  public modeloequipo: any[];

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private informacionService: InformacionService) { }

  ngOnInit(): void {
    this.dashboardService.setutil(undefined)
    this.dashboardService.setfechalimite(0)
    this.dashboardService.setfecharango(0)

    this.cd = { "ciudades": "Guayaquil,Quito,Manta,Quevedo,Riobamba,Ibarra" }
    this.inventario = { "nagencia": "", "ntipo": "", "nciudad": "", "countenlaces": null, "countinv": null, "estado": 1, "pindex": this.pageIndex + 1 }
    this.ambiente = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.problema = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.orion = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.actividad = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.entidad = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.propietario = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.hardware = { "nombre": "", "estado": 1, "idLink": null, "pindex": this.pageIndex + 1 }
    this.hardwareOp = { "nombre": "", "estado": 1, "idLink": null, "pindex": this.pageIndex + 1 }
    this.modelo = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }

    this.tipohardware = [
      { id: 1, nombre: 'Marca' },
      { id: 2, nombre: 'Equipo' },
      { id: 3, nombre: 'Memoria' },
      { id: 70, nombre: 'Medio' }
    ]

    this.obtenerInfoAmbientes()
  }

  resetVarform() {
    this.varform = {
      lan: false,
      isproblem: false,
      isnew: false,
      botonenviar: false,
      activado: false,
      minutos: 0,
      issub: false,
      hassub: false,
      editmins: false,
      hiddenact: true,
      hiddenselectubi: true,
      editagencia: false,
      editcitytipo: true,
      hiddennombre: false,
      accion: '',
      blockednombre: false,
      subact0: null,
      subact1: null,
      subact2: null,
      subact3: null,
    }
    this.nombre = null;
    this.selectedact = null;
  }

  //AMBIENTE
  PageAmbientes(event) {
    this.pageIndex = event.pageIndex;
    this.ambiente.pindex = this.pageIndex + 1;
    this.openDialogAmbientes()
  }
  clickListadoAmbientes() {
    this.pageIndex = 0;
    this.ambiente.pindex = 1;
    this.obtenerInfoAmbientes();
  }
  openDialogAmbientes(): void {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.isnew = true;
    this.varform.accion = "Ambiente"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.informacionService.insertambiente(result.nombre).subscribe(resp => {
          this.obtenerInfoAmbientes();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
    });
  }
  openDialogAmbientesEdit(n: number) {
    this.nombre = "";
    this.id = 0;
    this.editado1 = undefined;
    this.resetVarform();
    this.varform.blockednombre = true;
    this.varform.accion = "Ambiente";
    this.informacionService.getambientebyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: {
          varform: this.varform,
          nombre: this.nombre,
          activado: this.activado,
          id: this.id,
          selectedact: this.selectedact,
          tiposcontrol: this.tiposcontrol,
          citiescontrol: this.citiescontrol,
          ubicontrol: this.ubicontrol,
          editado1: this.editado1
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.informacionService.editarambiente({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
            this.obtenerInfoAmbientes();
            $.notify({
              icon: "notifications",
              message: "Editado"
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
  PageCiudades(event) {
    this.pageIndex = event.pageIndex;
    this.inventario.pindex = this.pageIndex + 1;
    this.obtenerInfoInventario()
  }
  clickListadoCiudades() {
    this.pageIndex = 0;
    this.inventario.pindex = 1;
    this.obtenerInfoInventario()
    this.obtenerInfoCiudades();
    this.obtenerInfoTipos(this.cd);
  }
  openDialogAgencia(n: number): void {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.isnew = true;
    this.varform.hiddenselectubi = false;
    this.varform.accion = "Ubicacion"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.ubicontrol.value.id == 0) {
        this.informacionService.insertciudad(result.nombre).subscribe(resp => {
          this.clickListadoCiudades();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
      } else if (result.ubicontrol.value.id == 1) {
        this.informacionService.inserttipo(result.nombre, result.citiescontrol.value.id).subscribe(resp => {
          this.clickListadoCiudades();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
      } else if (result.ubicontrol.value.id == 2) {
        if (result != undefined) {
          this.informacionService.insertagencia(result.nombre, result.tiposcontrol.value.id).subscribe(resp => {
            this.clickListadoCiudades();
            $.notify({
              icon: "notifications",
              message: "Ingresado"
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
          });
        }
      }


    });

  }
  openDialogAgenciaEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.editagencia = true;
    this.varform.accion = "Ubicacion"
    this.informacionService.getagenciabyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.nombre = this.editado1.nombre;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: {
          varform: this.varform,
          nombre: this.nombre,
          activado: this.activado,
          id: this.id,
          selectedact: this.selectedact,
          tiposcontrol: this.tiposcontrol,
          citiescontrol: this.citiescontrol,
          ubicontrol: this.ubicontrol,
          editado1: this.editado1
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.informacionService.editaragencia(
            {
              "nombre": result.nombre,
              "id": result.id,
              "idLink": result.tiposcontrol.value == undefined ? null : result.tiposcontrol.value.id,
              "estado": result.selectedact
            }
          ).subscribe(resp => {
            this.clickListadoCiudades();
            $.notify({
              icon: "notifications",
              message: "Editado"
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
          });
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
  openDialogCTedit() {
    //this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.hiddennombre = true;
    this.varform.editcitytipo = false;
    this.varform.accion = "Ubicacion"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.ubicontrol.value != null) {
          if (result.ubicontrol.value.id == 2) {
            this.informacionService.editartipo({ "nombre": result.tiposcontrol.value.nombre, "id": result.tiposcontrol.value.id, "estado": result.selectedact }).subscribe(resp => {
              this.obtenerInfoCiudades();
              $.notify({
                icon: "notifications",
                message: "Editado"
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
            });
          } if (result.ubicontrol.value.id == 1) {
            this.informacionService.editarciudad({ "nombre": result.citiescontrol.value.nombre, "id": result.citiescontrol.value.id, "estado": result.selectedact }).subscribe(resp => {
              this.obtenerInfoCiudades();
              $.notify({
                icon: "notifications",
                message: "Editado"
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
            });
          }
        }
      }
    });

  }
  obtenerInfoInventario_p1() {
    let nc = this.inventario.nciudad;
    if (this.citiescontrolarr.value != null && this.citiescontrolarr.value.length > 0) {
      this.inventario.nciudad = '';
      this.citiescontrolarr.value.forEach(element => {
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

    if (this.tiposcontrolarr.value != null && this.tiposcontrolarr.value.length > 0) {
      this.inventario.ntipo = '';
      this.tiposcontrolarr.value.forEach(element => {
        this.inventario.ntipo = this.inventario.ntipo + element.nombre + ',';
      });
    } else {
      this.inventario.ntipo = '';
      if (this.citiescontrolarr.value != null && this.citiescontrolarr
        .value.length > 0) {
        this.cd = { "ciudades": this.inventario.nciudad }
        this.obtenerInfoTipos(this.cd);
      } else {
        this.obtenerInfoTipos({ "ciudades": "Guayaquil,Quito,Manta,Quevedo,Riobamba,Ibarra" })
      }

    }


    this.pageIndex = 0;
    this.inventario.pindex = 1;
    this.obtenerInfoInventario();
  }
  obtenerInfoInventario() {

    this.informacionService.listagencias(this.inventario).subscribe(resp => {
      this.dataDevices = resp.body["info"];
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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
  //HARDWARE
  PageHardwares(event) {
    this.pageIndex = event.pageIndex;
    this.hardware.pindex = this.pageIndex + 1;
    this.obtenerInfoHardware()
  }
  clickListadoHardwares() {
    this.pageIndex = 0;
    this.hardware.pindex = 1;
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
    this.hardwareOp.idLink = 1;
    //this.hardware.pindex = 1;
    this.informacionService.listhardwareOpciones(this.hardwareOp).subscribe(resp => {
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.modelomarca = resp.body["info"];
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
    this.hardwareOp.idLink = 2;
    //this.hardware.pindex = 1;
    this.informacionService.listhardwareOpciones(this.hardwareOp).subscribe(resp => {
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.modeloequipo = resp.body["info"];
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

    const dialogRef = this.dialog.open(FormHardwareEditComponent, {
      width: '400px',
      data: {
        nombre: this.nombre, tipohardware: this.tipohardware,
        selectedtipo: this.selectedtipo, prefixmem: this.prefixmem,
        isnew: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.selectedtipo == 3 && result.prefixmem != undefined) {
          result.nombre = result.nombre + result.prefixmem
        }
        this.informacionService.inserthardware(result.nombre, result.selectedtipo).subscribe(resp => {
          this.obtenerInfoHardware();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
          isnew: false,
          nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, prefixmem: this.prefixmem,
          tipohardware: this.tipohardware, selectedtipo: this.selectedtipo, id: this.id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          if (result.selectedtipo == 3) {
            result.nombre = result.nombre + result.prefixmem
          }
          this.informacionService.editarhardware({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact, "idLink": this.selectedtipo }).subscribe(resp => {
            this.obtenerInfoHardware();
            $.notify({
              icon: "notifications",
              message: "Editado"
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
  //MODELOS
  PageModelos(event) {
    this.pageIndex = event.pageIndex;
    this.modelo.pindex = this.pageIndex + 1;
    this.obtenerInfoModelos()
  }
  clickListadoModelos() {
    this.pageIndex = 0;
    this.modelo.pindex = 1;
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
    this.selectedact = 1;
    const dialogRef = this.dialog.open(FormModeloComponent, {
      width: '400px',
      data: {
        botonenviar: false,
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
      if (result != undefined) {
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
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
        });
      }
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
        if (result != undefined) {
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
            $.notify({
              icon: "notifications",
              message: "Editado"
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
  PageOrions(event) {
    this.pageIndex = event.pageIndex;
    this.orion.pindex = this.pageIndex + 1;
    this.obtenerInfoOrion()
  }
  clickListadoOrions() {
    this.pageIndex = 0;
    this.orion.pindex = 1;
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
    this.resetVarform();
    this.varform.isnew = true;
    this.varform.accion = "Orion"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.informacionService.insertorion(result.nombre).subscribe(resp => {
          this.obtenerInfoOrion();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
        });
      }
    });
  }
  openDialogOrionEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.accion = "Orion"
    this.informacionService.getorionbyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: {
          varform: this.varform,
          nombre: this.nombre,
          activado: this.activado,
          id: this.id,
          selectedact: this.selectedact,
          tiposcontrol: this.tiposcontrol,
          citiescontrol: this.citiescontrol,
          ubicontrol: this.ubicontrol,
          editado1: this.editado1
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.informacionService.editarorion({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
            this.obtenerInfoOrion();
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
  PagePropietarios(event) {
    this.pageIndex = event.pageIndex;
    this.propietario.pindex = this.pageIndex + 1;
    this.obtenerInfoPropietarios()
  }
  clickListadoPropietarios() {
    this.pageIndex = 0;
    this.propietario.pindex = 1;
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
    this.resetVarform();
    this.varform.isnew = true;
    this.varform.accion = "Propietario"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.informacionService.insertpropietario(result.nombre).subscribe(resp => {
          this.obtenerInfoPropietarios();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
    });
  }
  openDialogPropietariosEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.accion = "Propietario"
    this.varform.blockednombre = true;
    this.informacionService.getpropietariobyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.varform.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: {
          varform: this.varform,
          nombre: this.nombre,
          activado: this.activado,
          id: this.id,
          selectedact: this.selectedact,
          tiposcontrol: this.tiposcontrol,
          citiescontrol: this.citiescontrol,
          ubicontrol: this.ubicontrol,
          editado1: this.editado1
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.informacionService.editarpropietario({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
            this.obtenerInfoPropietarios();
            $.notify({
              icon: "notifications",
              message: "Editado"
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
  PageEntidades(event) {
    this.pageIndex = event.pageIndex;
    this.entidad.pindex = this.pageIndex + 1;
    this.obtenerInfoEntidades()
  }
  clickListadoEntidades() {
    this.pageIndex = 0;
    this.entidad.pindex = 1;
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
    this.resetVarform();
    this.varform.isnew = true;
    this.varform.accion = "Entidad"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.informacionService.insertentidades(result.nombre).subscribe(resp => {
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
      }
    });
  }
  openDialogEntidadEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.accion = "Entidad"
    this.informacionService.getentidadesbyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: {
          varform: this.varform,
          nombre: this.nombre,
          activado: this.activado,
          id: this.id,
          selectedact: this.selectedact,
          tiposcontrol: this.tiposcontrol,
          citiescontrol: this.citiescontrol,
          ubicontrol: this.ubicontrol,
          editado1: this.editado1
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.informacionService.editarentidades({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
            this.obtenerInfoEntidades();
            $.notify({
              icon: "notifications",
              message: "Editado"
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
  //PROBLEMAS
  PageProblemas(event) {
    this.pageIndex = event.pageIndex;
    this.problema.pindex = this.pageIndex + 1;
    this.openDialogProblemas()
  }
  clickListadoProblemas() {
    this.pageIndex = 0;
    this.problema.pindex = 1;
    this.obtenerInfoProblemas();
  }
  openDialogProblemas(): void {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.isnew = true;
    this.varform.isproblem = true;
    this.varform.accion = "Problema"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.informacionService.insertproblema({ "nombre": result.nombre, "lan": result.lan }).subscribe(resp => {
          this.obtenerInfoProblemas();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
    });
  }
  openDialogProblemasEdit(n: number) {
    this.nombre = "";
    this.id = 0;
    this.editado1 = undefined;
    this.resetVarform();
    this.varform.isproblem = true;
    this.varform.blockednombre = true;
    this.varform.accion = "Problema"
    this.informacionService.getproblemabyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.varform.lan = this.editado1.lan;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: {
          varform: this.varform,
          nombre: this.nombre,
          activado: this.activado,
          id: this.id,
          selectedact: this.selectedact,
          tiposcontrol: this.tiposcontrol,
          citiescontrol: this.citiescontrol,
          ubicontrol: this.ubicontrol,
          editado1: this.editado1
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.informacionService.editarproblema({ "nombre": result.nombre, "lan": result.lan, "id": result.id, "estado": result.varform.selectedact }).subscribe(resp => {
            this.obtenerInfoProblemas();
            $.notify({
              icon: "notifications",
              message: "Editado"
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
      });
    });
  }
  obtenerInfoProblemas() {
    this.informacionService.listproblemas(this.ambiente).subscribe(resp => {
      this.problemas = resp.body["info"];
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
  //ACTIVIDADES
  PageActividades(event) {
    this.pageIndex = event.pageIndex;
    this.actividad.pindex = this.pageIndex + 1;
    this.obtenerInfoActividades()
  }
  clickListadoActividades() {
    this.pageIndex = 0;
    this.orion.pindex = 1;
    this.obtenerInfoActividades();
  }
  obtenerInfoActividades() {
    this.informacionService.listact(this.actividad).subscribe(resp => {
      this.actividades = resp.body["info"];
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
  openDialogActividades(): void {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.isnew = true;
    this.varform.hiddenact = false;
    this.varform.accion = "Actividad"
    const dialogRef = this.dialog.open(FormComponentEdit, {
      width: '400px',
      data: {
        varform: this.varform,
        nombre: this.nombre,
        activado: this.activado,
        id: this.id,
        selectedact: this.selectedact,
        tiposcontrol: this.tiposcontrol,
        citiescontrol: this.citiescontrol,
        ubicontrol: this.ubicontrol,
        editado1: this.editado1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        result.varform.editmins = result.varform.editmins ? 1 : 0;
        result.varform.hassub = result.varform.hassub ? 1 : 0;
        result.varform.issub = result.varform.issub ? 1 : 0;
        this.informacionService.insertact(result.nombre, result.varform).subscribe(resp => {
          this.obtenerInfoActividades();
          $.notify({
            icon: "notifications",
            message: "Ingresado"
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
        });
      }
    });
  }
  openDialogActividadesEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.resetVarform();
    this.varform.hiddenact = false;
    this.varform.accion = "Actividad"
    this.informacionService.getactbyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.varform.editmins = this.editado1.editmins ? 1 : 0;
      this.varform.hassub = this.editado1.hassub ? 1 : 0;
      this.varform.issub = this.editado1.issub ? 1 : 0;
      this.varform.minutos = this.editado1.mins;
      this.varform.subact0 = this.editado1.subact0;
      this.varform.subact1 = this.editado1.subact1;
      this.varform.subact2 = this.editado1.subact2;
      this.varform.subact3 = this.editado1.subact3;
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormComponentEdit, {
        width: '400px',
        data: {
          varform: this.varform,
          nombre: this.nombre,
          activado: this.activado,
          id: this.id,
          selectedact: this.selectedact,
          tiposcontrol: this.tiposcontrol,
          citiescontrol: this.citiescontrol,
          ubicontrol: this.ubicontrol,
          editado1: this.editado1
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.informacionService.editaract({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }, this.varform).subscribe(resp => {
            this.obtenerInfoActividades();
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


  public cd: any;
  public tipos: any[] = [];
  public cities: any[] = [];
  public hiddencities = true;
  public hiddentipos = true;


  public selectUbic: any = [
    { id: 2, nombre: 'Localidad' },
    { id: 1, nombre: 'Tipo' },
    { id: 0, nombre: 'Ciudad' }
  ];
  public selectUbicEdit: any = [
    { id: 2, nombre: 'Tipo' },
    { id: 1, nombre: 'Ciudad' },
  ];
  constructor(
    public dialogRef: MatDialogRef<FormComponentEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent,
    private informacionService: InformacionService) { }

  ngOnInit(): void {
    if (!this.data.varform.hiddenselectubi) {
      this.obtenerInfoCiudades();
    }

    if (!this.data.varform.editcitytipo) {
      this.obtenerInfoCiudades();
    }

    if (this.data.varform.editagencia) {
      this.obtenerInfoCiudades();
      this.hiddencities = false;
      this.hiddentipos = false;
    }
  }

  onSelectionUbi() {
    if (this.data.ubicontrol.value.id == 0) {
      this.hiddencities = true;
      this.hiddentipos = true;
    } else if (this.data.ubicontrol.value.id == 1) {
      this.hiddencities = false;
      this.hiddentipos = true;
    } else if (this.data.ubicontrol.value.id == 2) {
      this.hiddencities = false;
      this.hiddentipos = false;
    }
  }

  obtenerInfoTipos(cd) {
    this.informacionService.listtiposNombre(cd).subscribe(resp => {
      this.tipos = resp.body["info"];
      const keys = resp.headers;
      if (this.data.varform.editagencia) {
        this.tipos.forEach(element => {
          if (element.id == this.data.editado1.Ciudad[0].Tipo[0].idtipo) {
            this.data.tiposcontrol.setValue(element)
          }
        })
      }

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

  obtenerInfoCiudades() {
    this.informacionService.listciudadesNombre({ "nombre": "", "estado": 1 }).subscribe(resp => {
      this.cities = resp.body["info"];
      const keys = resp.headers;
      if (this.data.varform.editagencia) {
        this.cities.forEach(element => {
          if (element.id == this.data.editado1.Ciudad[0].idciudad) {
            this.data.citiescontrol.setValue(element)
            this.obtenerInfoTipos({ "nombre": "", "idlink": element.id });
          }
        })

      }
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

  onSelectionCiudad() {
    this.cd = { "idlink": this.data.citiescontrol.value.id, "nombre": "" }
    this.obtenerInfoTipos(this.cd);
  }
}

@Component({
  selector: 'app-formhardwareedit',
  templateUrl: './formhardwareedit.html',
})
export class FormHardwareEditComponent {
  public tipomem: string[] = ["B", "KB", "MB", "GB", "TB", "PB"];

  constructor(
    public dialogRef: MatDialogRef<FormComponentEdit>,
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
  public fs: boolean;

  public infoeq: any = { "nombre": "", "estado": 1, "idLink": 2, "pindex": 1 };
  public infomarca: any = { "nombre": "", "estado": 1, "idLink": 1, "pindex": 1 };
  public infoflash: any = { "nombre": "", "estado": 1, "idLink": 3, "pindex": 1 };
  public inforam: any = { "nombre": "", "estado": 1, "idLink": 3, "pindex": 1 };


  constructor(
    public dialogRef: MatDialogRef<FormModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.disabled = true;
    this.accionmems = true;
    this.fsop = false;
    this.fs = true;

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
    if (this.data.editado1.fechafin != undefined) {//HAY FECHA
      this.fs = false;
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
    } else {
      this.fsop = true;
      this.data.date.setValue(moment(this.data.editado1.fechafin, 'YYYY-MM-DD'));
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


