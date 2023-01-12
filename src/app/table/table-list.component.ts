import { Component, OnInit, Inject } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { InventarioService } from '../servicios/informacion/inventario.service';
import { DashboardService } from '../servicios/apis/dashboard.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map, startWith } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { HistoryComponent } from './history-component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/es';
import * as _moment from 'moment';
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

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
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

export class TableListComponent implements OnInit {

  public displayedColumns: string[] = [
    'demo-nombre',
    'demo-ambiente',
    'demo-ciudad',
    'demo-tipo',
    'demo-agencia',
    'demo-ubicacion',
    'demo-ip',
    'demo-serie',
    'demo-inv',
    'demo-fechab',
    'demo-util',
    'demo-propiedad',
    'demo-equipo',
    'demo-equipo2',
    'demo-orion',
    'demo-so',
    'demo-fecha',
    'demo-estado',
    'demo-action'];
  public dataDevices: any[] = [];
  public inventario: any;
  public inventid: any;
  public nombre: any;
  public estado: any = 1;
  public isnew: boolean = false;
  public id: any;
  public pageIndex = 0;
  public totalenght = 0;
  public idedit;
  public perfil;
  public usuario = '';
  public fecha = '';
  public fechabanco: any;
  public utildis = false;
  public activado: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];

  range = new FormGroup({
    start: new FormControl(undefined),
    end: new FormControl(undefined),
  });
  ambienteFormG = this._formBuilder.group({
    ambiente: [undefined, Validators.required]
  });
  ubicacionFormG = this._formBuilder.group({
    city: [undefined, Validators.required],
    tipo: [undefined, Validators.required],
    ag: [undefined, Validators.required],
    piso: [undefined],
    rack: [undefined]
  });
  modeloFormG = this._formBuilder.group({
    nombre: ['', Validators.minLength(1)],
    modelo: [undefined, Validators.required],
    equipo: [undefined, Validators.required],
    marca: [undefined, Validators.required],
    flash: [undefined, Validators.required],
    ram: [undefined, Validators.required],
    fecha: [undefined, Validators.required]
  });
  networkFormG = this._formBuilder.group({
    ip: ['', Validators.minLength(1)],
    so: ['', Validators.minLength(1)],
    orion: [undefined],
    ecritico: [undefined]
  });
  adicionalFormG = this._formBuilder.group({
    opm: [undefined],
    bpac: [undefined],
    boolinvent: [undefined],
    util: [undefined],
    inv: [undefined],
    fechab: [undefined],
    boolfechab: [undefined],
    propietario: [undefined],
    serie: [undefined]
  });

  public cities: any[] = [];
  public tipos: any[] = [];
  public ambientes: any[] = [];
  public agencias: any[] = [];
  public modelos: any[] = [];
  public propietarios: any[] = [];
  public orion: any[] = [];
  public equipos: any[] = [];

  citiescontrol = new FormControl();
  tiposcontrol = new FormControl();
  propietarioscontrol = new FormControl();
  orioncontrol = new FormControl();
  modeloscontrol = new FormControl();
  ambientecontrol = new FormControl();
  equiposcontrol = new FormControl();

  public cd = { "ciudades": "Guayaquil,Quito,Manta,Quevedo,Riobamba,Ibarra" }
  public amb = { "nombre": "", "estado": 1 }
  public ct = { "nombre": "", "estado": 1 }
  public mdl = { "nombre": "", "estado": 1 }
  public mr = { "nombre": "", "estado": 1 }
  public prp = { "nombre": "", "estado": 1 }
  public on = { "nombre": "", "estado": 1 }
  public infoeq: any = { "nombre": "", "estado": 1, "idLink": 2, "pindex": 1 };


  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private informacionService: InformacionService,
    private inventarioService: InventarioService,
    private dashboardService: DashboardService

  ) { }

  ngOnInit() {
    this.inventario = {
      "nombre": "",
      "fecha": "",
      "ip": "",
      "serie": "",
      "so": "",
      "inv": "",
      "fechab": "",
      "nAmbiente": "",
      "nModelo": "",
      "nPropietario": "",
      "norion": "",
      "nagencia": "",
      "ntipo": "",
      "nciudad": "",
      "estado": 1,
      "nubicacion": "",
      "pindex": this.pageIndex + 1
    }
    this.inventario.util=this.dashboardService.util;
    if(this.dashboardService.fechalimite==1){
      this.range.controls.start.reset()
      this.range.controls.end.setValue(moment(this.dashboardService.todayf).format('YYYY-MM-DD'))
      this.range.disable()
    }else if(this.dashboardService.fecharango==1){
      this.range.controls.end.setValue(moment(this.dashboardService.today1f).format('YYYY-MM-DD'))
      this.range.controls.start.setValue(moment(this.dashboardService.todayf).format('YYYY-MM-DD'))
      this.range.disable()
    }else{
      this.range.reset()
      this.range.enable()
    }
    if(this.dashboardService.util !=undefined){
      this.utildis = true;
    }else{
      this.utildis = false;
    }
    this.obtenerInfoInventario();
    this.obtenerInfoPropietarios();
    this.obtenerInfoOrion();
    this.obtenerInfoModelos();
    this.obtenerInfoCiudades();
    this.obtenerInfoTipos(this.cd);
    this.obtenerInfoAmbientes();
    this.obtenerInfoEquipos();
  }

  openDialogEdit(n): void {
    this.isnew = false;
    const dialogRef = this.dialog.open(FormComponentEdit2, {
      width: '1000px',
      data: {
        idedit: n,
        isnew: this.isnew,
        activado: this.activado,
        ambienteFormG: this.ambienteFormG,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        modeloFormG: this.modeloFormG,
        inventid: this.inventid,
        fechabanco: this.fechabanco
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pageIndex = 0;
      this.obtenerInfoInventario();
    });
  }

  openDialogNew(): void {
    this.isnew = true;
    this.modeloFormG.reset();
    this.ambienteFormG.reset();
    this.ubicacionFormG.reset();
    this.adicionalFormG.reset();
    this.networkFormG.reset();
    const dialogRef = this.dialog.open(FormComponentEdit2, {
      width: '1000px',
      data: {
        idedit : 0 ,
        isnew: this.isnew,
        activado: this.activado,
        ambienteFormG: this.ambienteFormG,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        modeloFormG: this.modeloFormG,
        inventid: undefined,
        fechabanco: this.fechabanco
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerInfoInventario();
    });
  }

  obtenerInventarioid(n) {
    this.inventarioService.getbyid(n).subscribe(resp => {
      this.inventid = resp["info"];
      this.usuario = this.inventid.usuario,
        this.fecha = this.inventid.fecha,
        this.modeloFormG.controls["nombre"].setValue(this.inventid.nombre)
      this.networkFormG.controls["ip"].setValue(this.inventid.ip)
      this.networkFormG.controls["so"].setValue(this.inventid.so)
      this.networkFormG.controls["ecritico"].setValue(this.inventid.critico == undefined ? false : this.inventid.critico)
      this.adicionalFormG.controls["bpac"].setValue(this.inventid.bpac == undefined ? false : this.inventid.bpac)
      this.adicionalFormG.controls["opm"].setValue(this.inventid.opmger == undefined ? false : this.inventid.opmger)
      this.adicionalFormG.controls["serie"].setValue(this.inventid.serie)
      this.adicionalFormG.controls["inv"].setValue(this.inventid.inventario)
      this.adicionalFormG.controls["fechab"].setValue(this.inventid.fechabanco)
      this.adicionalFormG.controls["util"].setValue(this.inventid.util)
      this.ubicacionFormG.controls["piso"].setValue(this.inventid.piso)
      this.ubicacionFormG.controls["rack"].setValue(this.inventid.rack)
      this.openDialogEdit(n);
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

  openDialogHistory(n): void {
    this.isnew = false;
    const dialogRef = this.dialog.open(HistoryComponent, {
      width: '100%',
      height: '800px',
      position: {
        top: '50px',
        left: '200px'
      },
      data: {
        id: n,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pageIndex = 0;
      this.obtenerInfoInventario();
    });
  }

  Page(event) {
    this.pageIndex = event.pageIndex;
    this.inventario.pindex = this.pageIndex + 1;
    this.obtenerInfoInventario();
  }

  obtenerInfoInventario_p1() {
    let nc = this.inventario.nciudad;
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

    if (this.propietarioscontrol.value != null && this.propietarioscontrol.value.length > 0) {
      this.inventario.nPropietario = '';
      this.propietarioscontrol.value.forEach(element => {
        this.inventario.nPropietario = this.inventario.nPropietario + element.nombre + ',';
      });

    } else {
      this.inventario.nPropietario = '';
    }

    if (this.orioncontrol.value != null && this.orioncontrol.value.length > 0) {
      this.inventario.norion = '';
      this.orioncontrol.value.forEach(element => {
        this.inventario.norion = this.inventario.norion + element.nombre + ',';
      });

    } else {
      this.inventario.norion = '';
    }

    if (this.ambientecontrol.value != null && this.ambientecontrol.value.length > 0) {
      this.inventario.nAmbiente = '';
      this.ambientecontrol.value.forEach(element => {
        this.inventario.nAmbiente = this.inventario.nAmbiente + element.nombre + ',';
      });

    } else {
      this.inventario.nAmbiente = '';
    }

    if (this.modeloscontrol.value != null && this.modeloscontrol.value.length > 0) {
      this.inventario.nModelo = '';
      this.modeloscontrol.value.forEach(element => {
        this.inventario.nModelo = this.inventario.nModelo + element.nombre + ',';
      });

    } else {
      this.inventario.nModelo = '';
    }

    if (this.equiposcontrol.value != null && this.equiposcontrol.value.length > 0) {
      this.inventario.nEquipo = '';
      this.equiposcontrol.value.forEach(element => {
        this.inventario.nEquipo = this.inventario.nEquipo + element.nombre + ',';
      });

    } else {
      this.inventario.nEquipo = '';
    }

    this.pageIndex = 0;
    this.inventario.pindex = 1;
    this.obtenerInfoInventario();
  }

  obtenerInfoInventario() {

    this.inventarioService.list(this.inventario).subscribe(resp => {
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

  obtenerInfoInventarioClean() {
    this.pageIndex = 0;
    this.inventario = {
      "nombre": "",
      "fecha": "",
      "ip": "",
      "serie": "",
      "so": "",
      "inv": "",
      "fechab": "",
      "nAmbiente": "",
      "nModelo": "",
      "nPropietario": "",
      "norion": "",
      "nagencia": "",
      "ntipo": "",
      "nciudad": "",
      "estado": 1,
      "nubicacion": "",
      "pindex": this.pageIndex + 1
    }
    this.range.reset();
    this.dashboardService.setutil(undefined);
    this.utildis = false;
    this.dashboardService.setfechalimite(undefined)
    this.dashboardService.setfecharango(undefined)
    this.range.enable();

    this.citiescontrol.reset();
    this.tiposcontrol.reset();
    this.propietarioscontrol.reset();
    this.orioncontrol.reset();
    this.modeloscontrol.reset();
    this.ambientecontrol.reset();
    this.equiposcontrol.reset();

    /*this.informacionService.listinventario(this.inventario).subscribe(resp => {
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
    });*/

    this.obtenerInfoInventario();
  }

  obtenerInfoInventarioExcel() {
    this.inventarioService.download(this.inventario).subscribe(resp => {
      const keys = resp.headers;

      const blob: any = new Blob([resp.body], { type: keys.getAll("content-type").toString() });
      const file = new File([blob], "inventarioEquipos" + '.xlsx', { type: keys.getAll("content-type").toString() });
      saveAs(file);
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
    this.informacionService.listpropietariosNombre(this.prp).subscribe(resp => {
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

  obtenerInfoOrion() {
    this.informacionService.listorionNombre(this.on).subscribe(resp => {
      this.orion = resp.body["info"];
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

  obtenerInfoModelos() {
    this.informacionService.listmodelosNombre(this.mdl).subscribe(resp => {
      this.modelos = resp.body["info"];
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

  obtenerInfoAmbientes() {
    this.informacionService.listambientesNombre(this.amb).subscribe(resp => {
      this.ambientes = resp.body["info"];
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
    }
    )
  }

  obtenerInfoEquipos() {
    this.informacionService.listhardwarebyNombre(this.infoeq).subscribe(resp => {
      this.equipos = resp["info"];
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

  dateEvent(event) {
    let date1;
    let date2;
    if(this.range.controls.start.value !=null){
      date1 =  moment(this.range.controls.start.value).format('YYYY-MM-DD');
    }else{
      date1 = undefined
    }
    if(this.range.controls.end.value !=null){
      date2 =  moment(this.range.controls.end.value).format('YYYY-MM-DD');
    }else{
      date2 = undefined
    }
    this.inventario.fechaini=date1;
    this.inventario.fechafin=date2;
    this.obtenerInfoInventario_p1()
  }

}

@Component({
  selector: 'app-formedit',
  templateUrl: './formedit.html',
  styleUrls: ['./table-list.component.css'],
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

export class FormComponentEdit2 implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  filteredOptionsModelo: Observable<any[]>;

  public modelSelected: any;
  public boolcity: boolean;
  public boolorion: boolean;
  public inventcheck: boolean;
  public usuariom: "";
  public fecham: "";
  public usuarioc: "";
  public fechac: "";

  public ambientes: any[] = [];
  public cities: any[] = [];
  public agencias: any[] = [];
  public tipos: any[] = [];
  public modelos: any[] = [];
  public propietarios: any[] = [];
  public orion: any[] = [];
  public perfil;


  public infoeq: any = { "nombre": "", "estado": 1, "idLink": 2, "pindex": 1 };
  public amb = { "nombre": "", "estado": 1 }
  public ct = { "nombre": "", "estado": 1 }
  public tp = { "nombre": "", "idlink": 1 }
  public agc = { "nombre": "", "idlink": 1 }
  public mdl = { "nombre": "", "estado": 1 }
  public mr = { "nombre": "", "estado": 1 }
  public eq = { "nombre": "", "idlink": 1 }
  public prp = { "nombre": "", "estado": 1 }
  public on = { "nombre": "", "estado": 1 }

  ngOnInit() {
    this.obtenerInfoAmbientes();
    this.obtenerInfoCiudades();
    this.obtenerInfoModelos();
    this.obtenerInfoOrion();
    this.obtenerInfoPropietarios();
    this.perfil = localStorage.getItem("perfil")

    this.data.modeloFormG.controls["equipo"].disable();
    this.data.modeloFormG.controls["marca"].disable();
    this.data.modeloFormG.controls["flash"].disable();
    this.data.modeloFormG.controls["ram"].disable();
    this.data.modeloFormG.controls["fecha"].disable();
    this.data.adicionalFormG.controls["bpac"].disable();
    this.data.adicionalFormG.controls["util"].disable()
    this.data.adicionalFormG.controls["boolinvent"].enable();
    this.data.adicionalFormG.controls["inv"].enable();
    this.data.adicionalFormG.controls["boolfechab"].enable();
    this.data.adicionalFormG.controls["fechab"].enable();

    this.boolcity = false;
    this.boolorion = false;
    this.inventcheck = false;

    this.data.adicionalFormG.controls["boolfechab"].setValue(false)

    this.data.adicionalFormG.controls["boolinvent"].setValue(false)
    if (this.data.inventid != undefined) {
      this.usuariom = this.data.inventid.usuario;
      this.usuarioc = this.data.inventid.usuarioc;
      this.fecham = this.data.inventid.fecha;
      this.fechac = this.data.inventid.fechac;

      this.data.estado = (this.data.inventid.estado) ? 1 : 0;
      this.data.adicionalFormG.controls["serie"].disable();
      this.data.adicionalFormG.controls["inv"].setValue(this.data.inventid.inventario)
      this.data.adicionalFormG.controls["fechab"].setValue(this.data.inventid.fechabanco)


    } else {
      this.data.adicionalFormG.controls["serie"].enable();
    }

    if (this.perfil == 1 || this.perfil == 6) {
      this.habilitarAdministrador();
    }

    this._locale = 'es';
    this._adapter.setLocale(this._locale);

  }

  constructor(
    public dialogRef: MatDialogRef<FormComponentEdit2>,
    breakpointObserver: BreakpointObserver,

    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private inventarioService: InventarioService,
    private informacionService: InformacionService,
    @Inject(MAT_DIALOG_DATA) public data: TableListComponent) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

  }

  obtenerInfoModelo(n) {
    this.informacionService.getmodelobyid(n).subscribe(resp => {
      this.modelSelected = resp["info"];
      this.data.modeloFormG.controls["equipo"].setValue(this.modelSelected.Equipo[0].nombre)
      this.data.modeloFormG.controls["marca"].setValue(this.modelSelected.Marca[0].nombre)
      this.data.modeloFormG.controls["flash"].setValue(this.modelSelected.Flash == undefined ? undefined : this.modelSelected.Flash[0].nombre)
      this.data.modeloFormG.controls["ram"].setValue(this.modelSelected.Ram == undefined ? undefined : this.modelSelected.Ram[0].nombre)
      this.data.modeloFormG.controls["fecha"].setValue(this.modelSelected.fechafin == undefined ? undefined : this.modelSelected.fechafin)
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

  obtenerInfoAmbientes() {
    this.informacionService.listambientesNombre(this.amb).subscribe(resp => {
      this.ambientes = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.ambientes.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Ambiente[0])) {
            this.data.ambienteFormG.controls["ambiente"].setValue(element)
            if (this.data.ambienteFormG.controls["ambiente"].value.id == 4 ||
              this.data.ambienteFormG.controls["ambiente"].value.id == 5
            ) {
              this.data.ubicacionFormG.controls["piso"].disable();
              this.data.ubicacionFormG.controls["rack"].disable();
            } else {
              this.data.ubicacionFormG.controls["piso"].enable();
              this.data.ubicacionFormG.controls["rack"].enable();
            }
            if (this.data.ambienteFormG.controls["ambiente"].value.id == 3) {
              this.data.adicionalFormG.controls["opm"].enable()
              this.data.adicionalFormG.controls["bpac"].enable()
            }

            if (this.data.ambienteFormG.controls["ambiente"].value.id == 1) {
              this.data.adicionalFormG.controls["opm"].disable()
              this.data.adicionalFormG.controls["bpac"].disable()
            }
            if (this.data.ambienteFormG.controls["ambiente"].value.id == 2) {
              this.data.adicionalFormG.controls["opm"].disable()
              this.data.adicionalFormG.controls["bpac"].disable()
              //this.data.adicionalFormG.controls["bpac"].setValue(true);
              this.boolorion = true;
            } else {
              this.boolorion = false;
            }

          }
        });
        if (this.perfil == 1 || this.perfil==6) {
          this.habilitarAdministrador();
        }
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
    }
    )
  }

  obtenerInfoCiudades() {
    this.informacionService.listciudadesNombre(this.ct).subscribe(resp => {
      this.cities = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.cities.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Agencia[0].Tipo[0].Ciudad[0])) {
            this.tp.idlink = this.data.inventid.Agencia[0].Tipo[0].Ciudad[0].id;
            this.data.ubicacionFormG.controls["city"].setValue(element)
            this.obtenerInfoTipos();
          }
        });

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

  habilitarAdministrador() {
    this.data.modeloFormG.controls["modelo"].enable();
    this.data.adicionalFormG.controls["propietario"].enable();
    this.data.adicionalFormG.controls["serie"].enable();
    this.data.adicionalFormG.controls["boolinvent"].enable();
    this.data.adicionalFormG.controls["inv"].enable();
    this.data.adicionalFormG.controls["boolfechab"].enable();
    this.data.adicionalFormG.controls["fechab"].enable();
    this.data.adicionalFormG.controls["opm"].enable();
    this.data.adicionalFormG.controls["bpac"].enable()
  }

  obtenerInfoPropietarios() {
    this.informacionService.listpropietariosNombre(this.prp).subscribe(resp => {
      this.propietarios = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.propietarios.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Propietario[0])) {
            this.data.adicionalFormG.controls["propietario"].setValue(element)
          }
        });
        this.data.adicionalFormG.controls["boolfechab"].disable();
        this.data.adicionalFormG.controls["fechab"].disable();

        this.data.adicionalFormG.controls["boolinvent"].disable();
        this.data.adicionalFormG.controls["inv"].disable();

        this.data.adicionalFormG.controls["propietario"].disable();

        if (!this.data.adicionalFormG.controls["propietario"].value.nombre.toLowerCase().includes("banco")) {
          this.data.adicionalFormG.controls["inv"].disable();
          this.data.adicionalFormG.controls["inv"].setValue(undefined)
          this.data.adicionalFormG.controls["boolinvent"].disable();
          this.data.adicionalFormG.controls["boolinvent"].setValue(true)

          this.data.adicionalFormG.controls["fechab"].disable();
          this.data.adicionalFormG.controls["fechab"].setValue(undefined)
          this.data.adicionalFormG.controls["boolfechab"].disable();
          this.data.adicionalFormG.controls["boolfechab"].setValue(true)
        } else {
          if (this.data.inventid.inventario == undefined) {
            this.data.adicionalFormG.controls["boolinvent"].enable();
          } else {
            this.data.adicionalFormG.controls["boolinvent"].disable();
          }

          if (this.data.inventid.fechabanco == undefined) {
            this.data.adicionalFormG.controls["boolfechab"].enable();
          } else {
            this.data.adicionalFormG.controls["boolfechab"].disable();
          }

          if (this.data.adicionalFormG.controls["inv"].value == undefined) {
            this.data.adicionalFormG.controls["inv"].disable();
            this.data.adicionalFormG.controls["boolinvent"].setValue(true);
            this.data.adicionalFormG.controls["inv"].setValue(undefined);
          } else {
            this.data.adicionalFormG.controls["boolinvent"].setValue(false);
          }

          if (this.data.adicionalFormG.controls["fechab"].value == undefined) {
            this.data.adicionalFormG.controls["fechab"].disable();
            this.data.adicionalFormG.controls["boolfechab"].setValue(true);
            this.data.adicionalFormG.controls["fechab"].setValue(undefined);
          } else {
            this.data.adicionalFormG.controls["boolfechab"].setValue(false);
          }
        }
        if (this.perfil == 1 || this.perfil == 6) {
          this.habilitarAdministrador();
        }

      }
      else {
        this.data.adicionalFormG.controls["boolinvent"].enable();
        this.data.adicionalFormG.controls["inv"].enable();

        this.data.adicionalFormG.controls["boolfechab"].enable();
        this.data.adicionalFormG.controls["fechab"].enable();

        this.data.adicionalFormG.controls["propietario"].enable();
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

  obtenerInfoOrion() {
    this.informacionService.listorionNombre(this.on).subscribe(resp => {
      this.orion = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.orion.forEach(element => {
          if (this.data.inventid.Orion != undefined) {
            if (this.compareThem(element, this.data.inventid.Orion[0])) {
              this.data.networkFormG.controls["orion"].setValue(element)
            }
          }
        });

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

  obtenerInfoModelos() {
    this.informacionService.listmodelosNombre(this.mdl).subscribe(resp => {
      this.modelos = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.modelos.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Modelo[0])) {
            this.data.modeloFormG.controls["modelo"].setValue(element)
          }
        });
        this.data.modeloFormG.controls["modelo"].disable();
        this.obtenerInfoModelo(this.data.inventid.Modelo[0].id);

        if (this.perfil == 1 || this.perfil ==6) {
          this.habilitarAdministrador();
        }

      } else {
        this.data.modeloFormG.controls["modelo"].setValue({ id: undefined, nombre: '' })
        this.data.modeloFormG.controls["modelo"].enable();
      }
      this.filteredOptionsModelo = this.data.modeloFormG.controls["modelo"].valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.nombre)),
        map(nombre => (nombre ? this._filter(nombre) : this.modelos.slice())),
      );
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

  obtenerInfoTipos() {

    this.informacionService.listtiposNombre(this.tp).subscribe(resp => {
      this.tipos = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.tipos.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Agencia[0].Tipo[0])) {
            this.agc.idlink = this.data.inventid.Agencia[0].Tipo[0].id;
            this.data.ubicacionFormG.controls["tipo"].setValue(element)
            this.obtenerInfoAgencias();
          }
        });

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

  obtenerInfoAgencias() {
    this.informacionService.listagenciasNombre(this.agc).subscribe(resp => {
      this.agencias = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.agencias.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Agencia[0])) {
            this.data.ubicacionFormG.controls["ag"].setValue(element)
          }
        });
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

  selectionamb(value) {
    if (this.data.isnew) {
      this.data.ubicacionFormG.reset();
      this.data.modeloFormG.controls["nombre"].reset();
      this.data.modeloFormG.controls["equipo"].reset();
      this.data.modeloFormG.controls["marca"].reset();
      this.data.modeloFormG.controls["flash"].reset();
      this.data.modeloFormG.controls["ram"].reset();
      this.data.modeloFormG.controls["fecha"].reset();
      this.data.modeloFormG.controls["modelo"].setValue({ id: 0, nombre: '' });
      this.data.adicionalFormG.reset();
      this.data.networkFormG.reset();
    }
    if (value.id === 4 || value.id === 5) {
      this.data.networkFormG.controls["orion"].setValue(undefined);
      this.data.networkFormG.controls["orion"].disable()
      this.data.networkFormG.controls["ecritico"].setValue(false);
      this.data.networkFormG.controls["ecritico"].disable()
      this.data.adicionalFormG.controls["opm"].setValue(false);
      this.data.adicionalFormG.controls["opm"].disable();
      this.data.adicionalFormG.controls["bpac"].disable();
      this.data.adicionalFormG.controls["bpac"].setValue(false);
      this.data.adicionalFormG.controls["util"].setValue(false);
      this.data.ubicacionFormG.controls["piso"].reset();
      this.data.ubicacionFormG.controls["rack"].reset();
      this.data.ubicacionFormG.controls["piso"].disable();
      this.data.ubicacionFormG.controls["rack"].disable();

    } else {
      this.data.adicionalFormG.controls["util"].setValue(true);
      this.data.adicionalFormG.controls["opm"].enable();
      this.data.adicionalFormG.controls["bpac"].enable();
      this.data.networkFormG.controls["ecritico"].enable();
      this.data.networkFormG.controls["orion"].enable();
      this.data.ubicacionFormG.controls["piso"].enable();
      this.data.ubicacionFormG.controls["rack"].enable();
    }

    if (value.id == 3) {
      this.boolcity = true;
    } else {
      this.boolcity = false;
    }
    
    if (value.id == 1) {
      this.data.adicionalFormG.controls["opm"].setValue(false);
      this.data.adicionalFormG.controls["opm"].disable();
      this.data.adicionalFormG.controls["bpac"].disable();
      this.data.adicionalFormG.controls["bpac"].setValue(true);
    } if (value.id == 2) {
      this.data.adicionalFormG.controls["opm"].setValue(true);
      this.data.adicionalFormG.controls["opm"].disable();
      this.data.adicionalFormG.controls["bpac"].disable();
      this.data.adicionalFormG.controls["bpac"].setValue(true);
      this.boolorion = true;
    } else {
      this.boolorion = false;

    }

  }

  selectioncity(value) {
    this.data.ubicacionFormG.controls["tipo"].setValue(undefined);
    this.data.ubicacionFormG.controls["ag"].setValue(undefined);
    this.tp.idlink = value.id;
    this.obtenerInfoTipos();
  }

  selectiontipo(value) {
    this.data.ubicacionFormG.controls["ag"].setValue(undefined);
    this.agc.idlink = value.id;
    this.obtenerInfoAgencias();
  }

  selectionopm(value) {

    if (this.data.ambienteFormG.controls["ambiente"].value.id != 3) {
      if (value) {
        this.data.adicionalFormG.controls["bpac"].setValue(true);
      } else {
        this.data.adicionalFormG.controls["bpac"].setValue(false);
      }
    }

  }

  selectionmodelo(value) {
    this.obtenerInfoModelo(value.id)
  }

  selectionprop(value) {
    if (!value.nombre.toLowerCase().includes("banco")) {
      this.data.adicionalFormG.controls["inv"].disable();
      this.data.adicionalFormG.controls["inv"].setValue(undefined)
      this.data.adicionalFormG.controls["boolinvent"].disable();
      this.data.adicionalFormG.controls["boolinvent"].setValue(true)

      this.data.adicionalFormG.controls["fechab"].disable();
      this.data.adicionalFormG.controls["fechab"].setValue(undefined)
      this.data.adicionalFormG.controls["boolfechab"].disable();
      this.data.adicionalFormG.controls["boolfechab"].setValue(true)
    } else {
      this.data.adicionalFormG.controls["boolinvent"].enable();
      this.data.adicionalFormG.controls["boolfechab"].enable();

    }
  }

  selectionboolinvent(value) {
    if (value) {
      this.data.adicionalFormG.controls["inv"].disable();
      this.data.adicionalFormG.controls["inv"].setValue(undefined)
    } else {
      this.data.adicionalFormG.controls["inv"].enable();
    }


  }

  selectionboolfechab(value) {
    if (value) {
      this.data.adicionalFormG.controls["fechab"].disable();
      this.data.adicionalFormG.controls["fechab"].setValue(undefined)
    } else {
      this.data.adicionalFormG.controls["fechab"].enable();
    }


  }

  sendinfo() {

    this.data.fechabanco = this.data.adicionalFormG.value.fechab == undefined ? undefined : moment(this.data.adicionalFormG.value.fechab).format('YYYY-MM-DD');
    if (this.data.isnew) {
      this.inventarioService.insert(this.data).subscribe(resp => {
        $.notify({
          icon: "notifications",
          message: "El equipo " + this.data.modeloFormG.value.nombre + " - Serie " + this.data.adicionalFormG.controls["serie"].value + " se ha agregado"
        }, {
          type: "success",
          timer: 10000,
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
    } else {
      this.inventarioService.editar(this.data).subscribe(resp => {
        let msg = ""
        if (this.data.estado) {
          msg = "modificado"
        } else {
          msg = "eliminado"
        }
        $.notify({
          icon: "notifications",
          message: "El equipo " + this.data.modeloFormG.value.nombre + " - Serie " + this.data.adicionalFormG.controls["serie"].value + " se ha " + msg
        }, {
          type: "success",
          timer: 10000,
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

  private _filter(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.modelos.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  compareThem(o1, o2): boolean {
    return o1.id === o2.id;
  }

  displayFn(value) {
    return value ? value.nombre : undefined;
  }
}

