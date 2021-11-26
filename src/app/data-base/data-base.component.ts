import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformacionService } from '../servicios/informacion/informacion.service';
import 'rxjs/add/observable/interval';
import { FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

//import _rollupMoment from 'moment';

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
  styleUrls: ['./data-base.component.css']
})
export class DataBaseComponent implements OnInit {

  public displayedColumns: string[] = [ //Ambientes, Orion, Propietarios
    'demo-nombre',
    'demo-estado',
    'demo-action'];

  public displayedColumns2: string[] = [ //Ciudad, Hardware
    'demo-nombre2',
    'demo-link2',
    'demo-estado2',
    'demo-action2'];

  public displayedColumns3: string[] = [ //Ciudad, Hardware
    'demo-nombre3',
    'demo-estado3',
    'demo-action3'];

  public displayedColumns4: string[] = [ //Ciudad, Hardware
    'demo-nombre4',
    'demo-equipo4',
    'demo-marca4',
    'demo-fecha4',
    'demo-estado4',
    'demo-action4'];
  
  public myControlEquipo = new FormControl();
  public myControlMarca = new FormControl();
  public myControlFlash = new FormControl();
  public myControlRam = new FormControl();
  public date = new FormControl(moment());

  public ambientes: any[];
  public ambiente: any;

  public ciudades: any[];
  public ciudad: any;
  public expansion: any;
  public totalenght = 1000;
  public pageIndex = 0;


  public orions: any[];
  public orion: any;

  public propietarios: any[];
  public propietario: any;

  public hardwares: any[];
  public hardware: any;
  public tipohardware: any;
  public prefixmem:any;

  public tipos: any[];
  public tipo;

  public agencias: any[];
  public agencia: any;

  public modelo: any;
  public modelos: any[];

  public nombre: string = "";
  public id: number = 0;
  public activado: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];

  public selectedact: number;
  public selectedtipo: number;
  public accion: string = '';
  //Formulario Editar
  public editado1: any; //info de editado

  constructor(public dialog: MatDialog, private informacionService: InformacionService) { }

  ngOnInit(): void {
    this.ambiente = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.ciudad = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.tipo = { "nombre": "", "estado": null, "pindex": this.pageIndex + 1 }
    this.orion = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.propietario = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.hardware = { "nombre": "", "estado": 1, "idLink": null, "pindex": this.pageIndex + 1 }
    this.modelo = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }

    this.tipohardware = [
      { id: 1, nombre: 'Marca' },
      { id: 2, nombre: 'Equipo' },
      { id: 3, nombre: 'Memoria' }
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

  //AMBIENTE
  clickListadoAmbientes() {
    this.pageIndex = 0;
    this.obtenerInfoAmbientes();
  }
  openDialogAmbientes(): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertambiente(result.nombre).subscribe(resp => {
        this.obtenerInfoAmbientes();
      });;
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
        data: { nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarambiente({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoAmbientes();

        });
      });
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  obtenerInfoAmbientes() {
    this.informacionService.listambientes(this.ambiente).subscribe(resp => {
      this.ambientes = resp.body["info"];
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  //CIUDAD
  clickListadoCiudades() {
    this.pageIndex = 0;
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
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  expandTipo(n: number, c: number) {
    this.agencias = [];
    this.agencia = { "nombre": "", "estado": null, "pindex": 1, "idLink": n }
    this.informacionService.listagencias(this.agencia).subscribe(resp => {
      this.agencias = resp.body["info"];
      let t = 0;
      if (this.agencias.length > 0) {
        t = this.agencias[0].idtipo;
      }
      this.ciudades.forEach(city => {
        if (city.id == c) {
          city.TipoCiudad.forEach(tc => {
            if (tc.id == n) {
              tc.exmod = true;
            } else {
              tc.exmod = false;
            }
          });
        }
      });
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
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
      data: { nombre: this.nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.inserttipo(result.nombre, n).subscribe(resp => {
        this.obtenerInfoCiudades();
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
        data: { nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editartipo({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoCiudades();
        });
      });
    }, err => {
      if (err.status === 401) {
        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
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
      data: { nombre: this.nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertciudad(result.nombre).subscribe(resp => {
        this.obtenerInfoCiudades();
      });
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
        data: { nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarciudad({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoCiudades();
        });
      });
    }, err => {
      if (err.status === 401) {
        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  openDialogAgencia(n: number): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertagencia(result.nombre, n).subscribe(resp => {
        this.obtenerInfoCiudades();
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
        data: { nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editaragencia({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoCiudades();
        });
      });
    }, err => {
      if (err.status === 401) {
        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }

  //HARDWARE
  clickListadoHardwares() {
    this.pageIndex = 0;
    this.obtenerInfoHardware();
  }
  obtenerInfoHardware() {
    this.informacionService.listhardware(this.hardware).subscribe(resp => {
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.hardwares = resp.body["info"];
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  openDialogHardware(): any {
    this.editado1 = undefined;
    this.nombre = "";
    this.selectedtipo= undefined;
    const dialogRef = this.dialog.open(FormHardwareComponent, {
      width: '400px',
      data: { nombre: this.nombre, tipohardware: this.tipohardware, 
        selectedtipo: this.selectedtipo, prefixmem:this.prefixmem}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.selectedtipo==3 && result.prefixmem !=undefined){
        result.nombre=result.nombre+result.prefixmem
      }
      this.informacionService.inserthardware(result.nombre, result.selectedtipo).subscribe(resp => {
        this.obtenerInfoHardware();
      });
    });
  }
  openDialogHardwareEdit(n: number) {
    this.editado1 = undefined;
    this.nombre = "";
    this.prefixmem=undefined;
    this.informacionService.gethardwarebyid(n).subscribe(resp => {
      this.editado1 = resp["info"];
      this.nombre = this.editado1.nombre;
      this.selectedact = this.editado1.estado ? 1 : 0;
      this.selectedtipo = this.editado1.idhw;
      let digito;
      if(this.selectedtipo==3){
        digito=Number((this.nombre.match("[0-9]*.[0-9]*"))[0])
        this.prefixmem=(this.nombre.match("[A-Z]+"))==null?undefined:(this.nombre.match("[A-Z]+"))[0];
        if(!digito){
          digito=Number((this.nombre.match("[0-9]*"))[0])
        }
        this.nombre=digito
      }
      this.id = this.editado1.id;
      const dialogRef = this.dialog.open(FormHardwareEditComponent, {
        width: '400px',
        data: { nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, prefixmem:this.prefixmem,
          tipohardware: this.tipohardware, selectedtipo: this.selectedtipo, id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.selectedtipo==3){
          result.nombre=result.nombre+result.prefixmem
        }
        this.informacionService.editarhardware({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact, "idLink": this.selectedtipo }).subscribe(resp => {
          this.obtenerInfoHardware();
        });
      });
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  //Modelos

  clickListadoModelos() {
    this.pageIndex = 0;
    this.obtenerInfoModelos();
  }
  obtenerInfoModelos() {
    this.informacionService.listmodelos(this.modelo).subscribe(resp => {
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
      this.modelos = resp.body["info"];
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  openDialogModelo(): void {
    this.editado1 = {
      "Equipo": [{ "id": null, "nombre": "" }],
      "Marca": [{ "id": null, "nombre": "" }]
      , "Flash": [{ "id": null, "nombre": "" }],
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
        nombre: this.nombre, activado: this.activado,
        selectedact: this.selectedact, editado1: this.editado1,
        myControlEquipo: new FormControl(null, CharacterSelectionRequiredValidator),
        myControlMarca: new FormControl(null, CharacterSelectionRequiredValidator),
        myControlFlash: new FormControl(null, CharacterSelectionRequiredValidator),
        myControlRam: new FormControl(null, CharacterSelectionRequiredValidator),
        date: this.date
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertmodelo({
        "nombre": result.nombre,
        "id": this.id,
        "estado": result.selectedact,
        "idEquipo": result.myControlEquipo.value.id,
        "idMarca": result.myControlMarca.value.id,
        "idFlash": result.myControlFlash.value.id,
        "idRam": result.myControlRam.value.id,
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
          nombre: this.nombre, activado: this.activado,
          selectedact: this.selectedact, editado1: this.editado1,
          myControlEquipo: this.myControlEquipo,
          myControlMarca: this.myControlMarca,
          myControlFlash: this.myControlFlash,
          myControlRam: this.myControlRam,
          date: this.date
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarmodelo({
          "nombre": result.nombre,
          "id": this.id,
          "estado": result.selectedact,
          "idEquipo": result.myControlEquipo.value.id,
          "idMarca": result.myControlMarca.value.id,
          "idFlash": result.myControlFlash.value.id,
          "idRam": result.myControlRam.value.id,
          "fecha": moment(result.date.value).format('YYYY-MM-DD')
        }).subscribe(resp => {
          this.obtenerInfoModelos();
        });
      });
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  //ORION
  clickListadoOrions() {
    this.pageIndex = 0;
    this.obtenerInfoOrion();
  }
  obtenerInfoOrion() {
    this.informacionService.listorion(this.orion).subscribe(resp => {
      this.orions = resp.body["info"];
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  openDialogOrion(): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre }
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
        data: { nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarorion({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoOrion();
        });
      });
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  //PROPIETARIOS
  clickListadoPropietarios() {
    this.pageIndex = 0;
    this.obtenerInfoPropietarios();
  }
  obtenerInfoPropietarios() {
    this.informacionService.listpropietarios(this.propietario).subscribe(resp => {
      this.propietarios = resp.body["info"];
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  openDialogPropietario(): void {
    this.editado1 = undefined;
    this.nombre = "";
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { nombre: this.nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.informacionService.insertpropietario(result.nombre).subscribe(resp => {
        this.obtenerInfoPropietarios();
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
        data: { nombre: this.nombre, activado: this.activado, selectedact: this.selectedact, id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.informacionService.editarpropietario({ "nombre": result.nombre, "id": result.id, "estado": result.selectedact }).subscribe(resp => {
          this.obtenerInfoPropietarios();
        });
      });
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
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
  
  public tipomem:string[]=["B","KB","MB","GB","TB","PB"];
  
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent) { }
  
  ngOnInit() {

  }
  changetipo(){
    this.data.nombre=undefined;
  }

}

@Component({
  selector: 'app-formhardwareedit',
  templateUrl: './formhardwareedit.html',
})
export class FormHardwareEditComponent {
  public tipomem:string[]=["B","KB","MB","GB","TB","PB"];

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
  public infoeq: any = { "nombre": "", "estado": 1, "idLink": 2, "pindex": 1 };
  public infomarca: any = { "nombre": "", "estado": 1, "idLink": 1, "pindex": 1 };
  public infoflash: any = { "nombre": "", "estado": 1, "idLink": 3, "pindex": 1 };
  public inforam: any = { "nombre": "", "estado": 1, "idLink": 3, "pindex": 1 };

  public hardwares: any[] = [];
  public equipos: any[] = [];
  public marcas: any[] = [];
  public flashs: any[] = [];
  public rams: any[] = [];

  public disabled: boolean;

  filteredOptionsEquipo: Observable<Hw[]>;
  filteredOptionsMarca: Observable<Hw[]>;
  filteredOptionsFlash: Observable<Hw[]>;
  filteredOptionsRam: Observable<Hw[]>;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataBaseComponent,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.disabled = true;
    this.obtenerInfoEquipos()
    this.obtenerInfoMarcas()
    this.obtenerInfoFlash()
    this.obtenerInfoRam()
    this.data.myControlFlash.disable();
    this.data.myControlRam.disable();
    if (this.data.editado1 != undefined) {
      this.data.myControlEquipo.setValue(this.data.editado1.Equipo[0]);
      this.data.myControlMarca.setValue(this.data.editado1.Marca[0]);
      //this.data.myControlFlash.setValue(this.data.editado1.Flash[0]);
      //this.data.myControlRam.setValue(this.data.editado1.Ram[0]);
      this.data.date.setValue(moment(this.data.editado1.fechafin, 'YYYY-MM-DD'));
    } if (this.data.editado1.Flash != undefined) {
      this.data.myControlFlash.setValue(this.data.editado1.Flash[0]);
    } else {
      this.data.myControlFlash.setValue({ id: 0, nombre: "N/A" });
    } if (this.data.editado1.Ram != undefined) {
      this.data.myControlRam.setValue(this.data.editado1.Ram[0]);
    } else {
      this.data.myControlRam.setValue({ id: 0, nombre: "N/A" });
    }
    if (this.data.editado1.Marca[0] != undefined && this.data.editado1.Marca[0].id == 4) {
      this.data.myControlFlash.enable();
      this.data.myControlRam.enable();
    }
    this.filteredOptionsEquipo = this.data.myControlEquipo.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filterEquipo(nombre) : this.equipos.slice()))
    );
    this.filteredOptionsMarca = this.data.myControlMarca.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filterMarca(nombre) : this.marcas.slice()))
    );
    this.filteredOptionsFlash = this.data.myControlFlash.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filterFlash(nombre) : this.flashs.slice()))
    );
    this.filteredOptionsRam = this.data.myControlRam.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filterRam(nombre) : this.rams.slice()))
    );
  }
  displayFn(value) {
    return value ? value.nombre : undefined;
  }
  //EQUIPO
  setEquipoAutocomplete() {
    const value = this.data.myControlEquipo.value;
    if (typeof value == 'string') {
        this.equipos.forEach(element => {
          if (element.nombre.toLowerCase() === value.trim().toLowerCase()) {
            this.data.myControlEquipo.setValue(element);
          }
        });
    }
  }
  private _filterEquipo(value: string): Hw[] {
    const filterValue = value.toLowerCase();
    this.infoeq.nombre = value;
    this.obtenerInfoEquipos();

    return this.equipos.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  obtenerInfoEquipos() {
    this.informacionService.listhardwarebyNombre(this.infoeq).subscribe(resp => {
      this.equipos = resp["info"];
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  //MARCA
  setMarcaAutocomplete() {
    const value = this.data.myControlMarca.value;
    if (typeof value == 'string') {
      this.marcas.forEach(element => {
        if (element.nombre.toLowerCase() === value.trim().toLowerCase()) {
          this.data.myControlMarca.setValue(element);
        }
      });
    }
  }
  private _filterMarca(value: string): Hw[] {
    const filterValue = value.toLowerCase();
    this.infomarca.nombre = value;
    this.obtenerInfoMarcas();
    if (this.data.myControlMarca.value != undefined && this.data.myControlMarca.value.id != 4) {
      this.data.myControlFlash.disable();
      this.data.myControlFlash.setValue({ id: 0, nombre: "N/A" });
      this.data.myControlRam.disable();
      this.data.myControlRam.setValue({ id: 0, nombre: "N/A" });
    } else {
      this.data.myControlFlash.enable();
      this.data.myControlRam.enable();
      this.data.myControlRam.setValue({ id: 0, nombre: "" });
      this.data.myControlFlash.setValue({ id: 0, nombre: "" });
    }
    return this.marcas.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  obtenerInfoMarcas() {
    this.informacionService.listhardwarebyNombre(this.infomarca).subscribe(resp => {
      this.marcas = resp["info"];
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }

  //FLASH
  setFlashAutocomplete() {
    const value = this.data.myControlFlash.value;
    if (typeof value == 'string') {
      this.flashs.forEach(element => {
        if (element.nombre.toLowerCase() === value.trim().toLowerCase()) {
          this.data.myControlFlash.setValue(element);
        }
      });
    }
  }
  private _filterFlash(value: string): Hw[] {
    const filterValue = value.toLowerCase();
    this.infoflash.nombre = value;
    this.obtenerInfoFlash();
    return this.flashs.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  obtenerInfoFlash() {
    this.informacionService.listhardwarebyNombre(this.infoflash).subscribe(resp => {
      this.flashs = resp["info"];
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }
  //RAM
  setRamAutocomplete() {
    const value = this.data.myControlRam.value;
    if (typeof value == 'string') {
      this.rams.forEach(element => {
        if (element.nombre.toLowerCase() === value.trim().toLowerCase()) {
          this.data.myControlRam.setValue(element);
        }
      });
    }
  }
  private _filterRam(value: string): Hw[] {
    const filterValue = value.toLowerCase();
    this.inforam.nombre = value;
    this.obtenerInfoRam();
    return this.rams.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  obtenerInfoRam() {
    this.informacionService.listhardwarebyNombre(this.inforam).subscribe(resp => {
      this.rams = resp["info"];
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });
  }

}


