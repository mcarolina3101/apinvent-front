import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  public displayedColumns: string[] = [
    'demo-nombre',
    'demo-ciudad',
    'demo-agencia',
    'demo-ubicacion',
    'demo-ambiente',
    'demo-ip',
    'demo-equipo',
    'demo-fecha',
    'demo-action'];
  public dataDevices: any[];
  public inventario: any;
  public inventid: any;
  public ambientes: any[];
  public cities: any[];
  public agencias: any[];
  public tipos: any[];
  public modelos: any[];
  public propietarios: any[];
  public orion: any[];

  public amb: any;
  public ct: any;
  public tp: any;
  public agc: any;
  public mdl: any;
  public mr: any;
  public eq: any;
  public prp: any;
  public on: any;

  ambienteFormG = this._formBuilder.group({

    ambiente: new FormControl(undefined, [Validators.required])
  });
  ubicacionFormG = this._formBuilder.group({
    city: [undefined, Validators.required],
    tipo: [undefined, Validators.required],
    ag: [undefined, Validators.required],
    piso: [undefined, Validators.required],
    rack: [undefined, Validators.required]
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
    util: [undefined, Validators.required],
    inv: ['', Validators.minLength(1)],
    propietario: [undefined, Validators.required],
    serie: ['', Validators.minLength(1)]
  });


  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.inventario = { "serie": "", "estado": 1, "pindex": 1 }
    this.amb = { "nombre": "", "estado": 1 }
    this.ct = { "nombre": "", "estado": 1 }
    this.ct = { "nombre": "", "estado": 1 }
    this.tp = { "nombre": "", "idlink": 1 }
    this.agc = { "nombre": "", "idlink": 1 }
    this.mdl = { "nombre": "", "estado": 1 }
    this.mr = { "nombre": "", "estado": 1 }
    this.eq = { "nombre": "", "idlink": 1 }
    this.prp = { "nombre": "", "estado": 1 }
    this.on = { "nombre": "", "estado": 1 }
    this.obtenerInfoInventario();
    this.obtenerInfoAmbientes();
    this.obtenerInfoCiudades();
    this.obtenerInfoModelos();
    this.obtenerInfoPropietarios();
    this.obtenerInfoOrion();
  }

  compareThem(o1, o2): boolean {
    return o1.id === o2.id;
  }

  obtenerInfoInventario() {
    this.informacionService.listinventario(this.inventario).subscribe(resp => {
      this.dataDevices = resp["info"];
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
    this.informacionService.listambientesNombre(this.amb).subscribe(resp => {
      this.ambientes = resp.body["info"];
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoCiudades() {
    this.informacionService.listciudadesNombre(this.ct).subscribe(resp => {
      this.cities = resp.body["info"];
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoPropietarios() {
    this.informacionService.listpropietariosNombre(this.prp).subscribe(resp => {
      this.propietarios = resp.body["info"];
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoOrion() {
    this.informacionService.listorionNombre(this.on).subscribe(resp => {
      this.orion = resp.body["info"];
      const keys = resp.headers;
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoModelos() {
    this.informacionService.listmodelosNombre(this.mdl).subscribe(resp => {
      this.modelos = resp.body["info"];
      const keys = resp.headers;

      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoTipos() {

    this.informacionService.listtiposNombre(this.tp).subscribe(resp => {
      this.tipos = resp.body["info"];
      const keys = resp.headers;
      if (this.inventid != undefined) {
        this.tipos.forEach(element => {
          if (this.compareThem(element, this.inventid.Agencia[0].Tipo[0])) {
            this.agc.idlink = this.inventid.Agencia[0].Tipo[0].id;
            this.ubicacionFormG.controls["tipo"].setValue(element)
            this.obtenerInfoAgencias();
          }
        });
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoAgencias() {
    this.informacionService.listagenciasNombre(this.agc).subscribe(resp => {
      this.agencias = resp.body["info"];
      const keys = resp.headers;
      if (this.inventid != undefined) {
        this.agencias.forEach(element => {
          if (this.compareThem(element, this.inventid.Agencia[0])) {
            this.ubicacionFormG.controls["ag"].setValue(element)
          }
        });
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInventarioid(n) {
    this.informacionService.getinventariobyid(n).subscribe(resp => {
      this.inventid = resp["info"];
      this.modeloFormG.controls["nombre"].setValue(this.inventid.nombre)
      this.networkFormG.controls["ip"].setValue(this.inventid.ip)
      this.networkFormG.controls["so"].setValue(this.inventid.so)
      this.networkFormG.controls["ecritico"].setValue(this.inventid.critico)
      this.adicionalFormG.controls["bpac"].setValue(this.inventid.bacp)
      this.adicionalFormG.controls["opm"].setValue(this.inventid.opmger)
      this.adicionalFormG.controls["serie"].setValue(this.inventid.serie)
      this.adicionalFormG.controls["inv"].setValue(this.inventid.inventario)
      this.adicionalFormG.controls["util"].setValue(this.inventid.util)
      this.ubicacionFormG.controls["piso"].setValue(this.inventid.piso)
      this.ubicacionFormG.controls["rack"].setValue(this.inventid.rack)
      this.ambientes.forEach(element => {
        if (this.compareThem(element, this.inventid.Ambiente[0])) {
          this.ambienteFormG.controls["ambiente"].setValue(element)
        }
      });
      this.cities.forEach(element => {
        if (this.compareThem(element, this.inventid.Agencia[0].Tipo[0].Ciudad[0])) {
          this.tp.idlink = this.inventid.Agencia[0].Tipo[0].Ciudad[0].id;
          this.ubicacionFormG.controls["city"].setValue(element)
          //this.obtenerInfoTipos();
        }
      });
      this.orion.forEach(element => {
        if (this.compareThem(element, this.inventid.Orion[0])) {
          this.networkFormG.controls["orion"].setValue(element)
        }
      });
      this.modelos.forEach(element => {
        if (this.compareThem(element, this.inventid.Modelo[0])) {
          this.modeloFormG.controls["modelo"].setValue(element)
        }
      });
      this.propietarios.forEach(element => {
        if (this.compareThem(element, this.inventid.Propietario[0])) {
          this.adicionalFormG.controls["propietario"].setValue(element)
        }
      });
      //this.obtenerInfoTipos();
      this.openDialogEdit();
    });

  }

  openDialogEdit(): void {
    //this.editado1 = undefined;
    //this.nombre = "";
    const dialogRef = this.dialog.open(FormComponentEdit2, {
      width: '1000px',
      data: {
        ambienteFormG: this.ambienteFormG,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        modeloFormG: this.modeloFormG,
        inventid: this.inventid,
        ambientes: this.ambientes,
        cities: this.cities,
        modelos: this.modelos,
        propietarios: this.propietarios,
        agencias: this.agencias,
        tipos: this.tipos,
        orion: this.orion,
        agc: this.agc,
        tp: this.tp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.informacionService.insertambiente(result.nombre).subscribe(resp => {
      //  this.obtenerInfoAmbientes();
      //});
    });
  }

  openDialogNew(): void {
    //this.editado1 = undefined;
    //this.nombre = "";
    this.modeloFormG.reset();
    this.ambienteFormG.reset();
    this.ubicacionFormG.reset();
    this.adicionalFormG.reset();
    this.networkFormG.reset();
    const dialogRef = this.dialog.open(FormComponentEdit2, {
      width: '1000px',
      data: {
        ambienteFormG: this.ambienteFormG,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        modeloFormG: this.modeloFormG,
        inventid: undefined,
        ambientes: this.ambientes,
        cities: this.cities,
        modelos: this.modelos,
        propietarios: this.propietarios,
        agencias: this.agencias,
        tipos: this.tipos,
        orion: this.orion,
        agc: this.agc,
        tp: this.tp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.informacionService.insertambiente(result.nombre).subscribe(resp => {
      //  this.obtenerInfoAmbientes();
      //});
    });
  }
}

@Component({
  selector: 'app-formedit',
  templateUrl: './formedit.html',
  styleUrls: ['./table-list.component.css']

})
export class FormComponentEdit2 implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  public modelSelected:any;


  ngOnInit() {

    this.data.modeloFormG.controls["equipo"].disable();
    this.data.modeloFormG.controls["marca"].disable();
    this.data.modeloFormG.controls["flash"].disable();
    this.data.modeloFormG.controls["ram"].disable();
    this.data.modeloFormG.controls["fecha"].disable();
    this.data.adicionalFormG.controls["bpac"].disable();
    this.data.adicionalFormG.controls["util"].disable()
    
    if (this.data.inventid != undefined) {
      this.obtenerInfoTipos();
      this.obtenerInfoModelo(this.data.inventid.Modelo[0].id);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<FormComponentEdit2>,
    breakpointObserver: BreakpointObserver,
    private informacionService: InformacionService,
    @Inject(MAT_DIALOG_DATA) public data: TableListComponent) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  compareThem(o1, o2): boolean {
    return o1.id === o2.id;
  }

  obtenerInfoTipos() {

    this.informacionService.listtiposNombre(this.data.tp).subscribe(resp => {
      this.data.tipos = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.data.tipos.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Agencia[0].Tipo[0])) {
            this.data.agc.idlink = this.data.inventid.Agencia[0].Tipo[0].id;
            this.data.ubicacionFormG.controls["tipo"].setValue(element)
            this.obtenerInfoAgencias();
          }
        });
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoAgencias() {
    this.informacionService.listagenciasNombre(this.data.agc).subscribe(resp => {
      this.data.agencias = resp.body["info"];
      const keys = resp.headers;
      if (this.data.inventid != undefined) {
        this.data.agencias.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Agencia[0])) {
            this.data.ubicacionFormG.controls["ag"].setValue(element)
          }
        });
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  obtenerInfoModelo(n) {
    this.informacionService.getmodelobyid(n).subscribe(resp => {
      this.modelSelected = resp["info"];
      //const keys = resp.headers;
      this.data.modeloFormG.controls["equipo"].setValue(this.modelSelected.Equipo[0].nombre)
      this.data.modeloFormG.controls["marca"].setValue(this.modelSelected.Marca[0].nombre)
      this.data.modeloFormG.controls["flash"].setValue(this.modelSelected.Flash==undefined? undefined:this.modelSelected.Flash[0].nombre)
      this.data.modeloFormG.controls["ram"].setValue(this.modelSelected.Ram==undefined? undefined:this.modelSelected.Ram[0].nombre)
      this.data.modeloFormG.controls["fecha"].setValue(this.modelSelected.fechafin==undefined? undefined:this.modelSelected.fechafin)
      
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    });
  }

  selectionamb(value) {
    this.data.ubicacionFormG.reset();
    this.data.modeloFormG.reset();
    this.data.adicionalFormG.reset();
    this.data.networkFormG.reset();
    if (value.id === 52) {
      this.data.networkFormG.controls["orion"].setValue(undefined);
      this.data.networkFormG.controls["orion"].disable()
      this.data.networkFormG.controls["ecritico"].setValue(false);
      this.data.networkFormG.controls["ecritico"].disable()
      this.data.adicionalFormG.controls["opm"].setValue(false);
      this.data.adicionalFormG.controls["opm"].disable()
      this.data.adicionalFormG.controls["bpac"].setValue(false);
      this.data.adicionalFormG.controls["util"].setValue(false);

    } else {
      this.data.adicionalFormG.controls["util"].setValue(true);
      this.data.adicionalFormG.controls["opm"].enable();
      this.data.networkFormG.controls["ecritico"].enable();
      this.data.networkFormG.controls["orion"].enable()
    }
  }

  selectioncity(value) {
    this.data.ubicacionFormG.controls["tipo"].setValue(undefined);
    this.data.ubicacionFormG.controls["ag"].setValue(undefined);
    this.data.tp.idlink = value.id;
    this.obtenerInfoTipos();
  }

  selectiontipo(value) {
    this.data.ubicacionFormG.controls["ag"].setValue(undefined);
    this.data.agc.idlink = value.id;
    this.obtenerInfoAgencias();
  }

  selectionopm(value) {
    if (value) {
      this.data.adicionalFormG.controls["bpac"].setValue(true);
    } else {
        this.data.adicionalFormG.controls["bpac"].setValue(false);
    }
  }

  selectionequipo(value) {
    this.obtenerInfoModelo(value.id)
  }

  selectionag(value) {
  }
  selectionubi(value) {
  }
  
  selectionprop(value) {
  }
  selectionorion(value) {
  }
}
