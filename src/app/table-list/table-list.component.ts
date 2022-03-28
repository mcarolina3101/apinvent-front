import { Component, OnInit, Inject } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map, startWith } from 'rxjs/operators';
declare var $: any;
import { saveAs } from 'file-saver';


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
    'demo-tipo',
    'demo-ubicacion',
    'demo-ambiente',
    'demo-ip',
    'demo-equipo',
    'demo-serie',
    'demo-inv',
    'demo-so',
    'demo-orion',
    'demo-fecha',
    'demo-estado',
    'demo-action'];
  public dataDevices: any[]=[];
  public inventario: any;
  public inventid: any;
  public nombre:any;
  public estado:any=1;


  public isnew: boolean = false;

  public activado: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];

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
    boolinvent:[undefined],
    util: [undefined],
    inv: [undefined],
    propietario: [undefined],
    serie: [undefined]
  });
  
  public pageIndex = 0;
  public totalenght = 0;


  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.inventario = { 
      "nombre": "", 
      "fecha":"",
      "ip": "", 
      "serie": "", 
      "so": "", 
      "inv": "",  
      "nAmbiente": "", 
      "nModelo": "", 
      "nPropietario": "", 
      "norion": "", 
      "nagencia": "", 
      "ntipo": "", 
      "nciudad": "", 
      "estado": 1,
      "nubicacion":"", 
      "pindex": this.pageIndex + 1}

    this.obtenerInfoInventario();
    
  }

  obtenerInfoInventario_p1(){
    this.pageIndex=0;
    this.inventario.pindex=1;
    this.obtenerInfoInventario();
  }

  obtenerInfoInventario() {
    this.informacionService.listinventario(this.inventario).subscribe(resp => {
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
    this.informacionService.downloadinv(this.inventario).subscribe(resp => {
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
    this.informacionService.getinventariobyid(n).subscribe(resp => {
      this.inventid = resp["info"];
      this.modeloFormG.controls["nombre"].setValue(this.inventid.nombre)
      this.networkFormG.controls["ip"].setValue(this.inventid.ip)
      this.networkFormG.controls["so"].setValue(this.inventid.so)
      this.networkFormG.controls["ecritico"].setValue(this.inventid.critico == undefined ? false : this.inventid.critico)
      this.adicionalFormG.controls["bpac"].setValue(this.inventid.bpac == undefined ? false : this.inventid.bpac)
      this.adicionalFormG.controls["opm"].setValue(this.inventid.opmger == undefined ? false : this.inventid.opmger)
      this.adicionalFormG.controls["serie"].setValue(this.inventid.serie)
      this.adicionalFormG.controls["inv"].setValue(this.inventid.inventario)
      this.adicionalFormG.controls["util"].setValue(this.inventid.util)
      this.ubicacionFormG.controls["piso"].setValue(this.inventid.piso)
      this.ubicacionFormG.controls["rack"].setValue(this.inventid.rack)
      /*
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
        if (this.inventid.Orion != undefined) {
          if (this.compareThem(element, this.inventid.Orion[0])) {
            this.networkFormG.controls["orion"].setValue(element)
          }
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
      });*/
      this.openDialogEdit(n);
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

  }

  openDialogEdit(n): void {
    //this.editado1 = undefined;
    //this.nombre = "";
    this.isnew = false;
    const dialogRef = this.dialog.open(FormComponentEdit2, {
      width: '1000px',
      data: {
        idedit: n,
        isnew: this.isnew,
        activado:this.activado,
        ambienteFormG: this.ambienteFormG,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        modeloFormG: this.modeloFormG,
        inventid: this.inventid/*,
        ambientes: this.ambientes,
        cities: this.cities,
        modelos: this.modelos,
        propietarios: this.propietarios,
        agencias: this.agencias,
        tipos: this.tipos,
        orion: this.orion,
        agc: this.agc,
        tp: this.tp*/
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pageIndex = 0;
      this.obtenerInfoInventario();
      //this.informacionService.insertambiente(result.nombre).subscribe(resp => {
      //  this.obtenerInfoAmbientes();
      //});
    });
  }

  openDialogNew(): void {
    //this.editado1 = undefined;
    //this.nombre = "";
    this.isnew = true;
    this.modeloFormG.reset();
    this.ambienteFormG.reset();
    this.ubicacionFormG.reset();
    this.adicionalFormG.reset();
    this.networkFormG.reset();
    const dialogRef = this.dialog.open(FormComponentEdit2, {
      width: '1000px',
      data: {
        isnew: this.isnew,
        activado:this.activado,
        ambienteFormG: this.ambienteFormG,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        modeloFormG: this.modeloFormG,
        inventid: undefined/*,
        ambientes: this.ambientes,
        cities: this.cities,
        modelos: this.modelos,
        propietarios: this.propietarios,
        agencias: this.agencias,
        tipos: this.tipos,
        orion: this.orion,
        agc: this.agc,
        tp: this.tp*/
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerInfoInventario();
      //this.informacionService.insertambiente(result.nombre).subscribe(resp => {
      //  this.obtenerInfoAmbientes();
      //});
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
  styleUrls: ['./table-list.component.css']

})
export class FormComponentEdit2 implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  public modelSelected: any;
  public boolcity:boolean;
  public inventcheck:boolean;
  public infoeq: any = { "nombre": "", "estado": 1, "idLink": 2, "pindex": 1 };
  filteredOptionsModelo: Observable<any[]>;

  public ambientes: any[]=[];
  public cities: any[]=[];
  public agencias: any[]=[];
  public tipos: any[]=[];
  public modelos: any[]=[];
  public propietarios: any[]=[];
  public orion: any[]=[];

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

    this.data.modeloFormG.controls["equipo"].disable();
    this.data.modeloFormG.controls["marca"].disable();
    this.data.modeloFormG.controls["flash"].disable();
    this.data.modeloFormG.controls["ram"].disable();
    this.data.modeloFormG.controls["fecha"].disable();
    this.data.adicionalFormG.controls["bpac"].disable();
    this.data.adicionalFormG.controls["util"].disable()
    this.boolcity=true;
    this.inventcheck=false;
    this.data.adicionalFormG.controls["boolinvent"].enable();
    this.data.adicionalFormG.controls["inv"].enable();
    this.data.adicionalFormG.controls["boolinvent"].setValue(false)
    if (this.data.inventid != undefined) {
      this.data.estado=(this.data.inventid.estado)?1:0;
      this.data.adicionalFormG.controls["serie"].disable();
      this.data.adicionalFormG.controls["inv"].setValue(this.data.inventid.inventario)
    }else{
      this.data.adicionalFormG.controls["serie"].enable();
    }
    this.filteredOptionsModelo = this.data.modeloFormG.controls["modelo"].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filter(nombre) : this.modelos.slice())),
    );
  }

  constructor(
    public dialogRef: MatDialogRef<FormComponentEdit2>,
    breakpointObserver: BreakpointObserver,
    private informacionService: InformacionService,
    @Inject(MAT_DIALOG_DATA) public data: TableListComponent) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }


/*
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
  obtenerInfoModelo(n) {
    this.informacionService.getmodelobyid(n).subscribe(resp => {
      this.modelSelected = resp["info"];
      //const keys = resp.headers;
      this.data.modeloFormG.controls["equipo"].setValue(this.modelSelected.Equipo[0].nombre)
      this.data.modeloFormG.controls["marca"].setValue(this.modelSelected.Marca[0].nombre)
      this.data.modeloFormG.controls["flash"].setValue(this.modelSelected.Flash == undefined ? undefined : this.modelSelected.Flash[0].nombre)
      this.data.modeloFormG.controls["ram"].setValue(this.modelSelected.Ram == undefined ? undefined : this.modelSelected.Ram[0].nombre)
      this.data.modeloFormG.controls["fecha"].setValue(this.modelSelected.fechafin == undefined ? undefined : this.modelSelected.fechafin)

      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    },err=> {
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

  obtenerInfoAmbientes() {
    this.informacionService.listambientesNombre(this.amb).subscribe(resp => {
      this.ambientes = resp.body["info"];
      const keys = resp.headers;
      if(this.data.inventid!=undefined){
        this.ambientes.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Ambiente[0])) {
            this.data.ambienteFormG.controls["ambiente"].setValue(element)
            
            
            if(this.data.ambienteFormG.controls["ambiente"].value.id==4){
              this.data.ubicacionFormG.controls["piso"].disable();
              this.data.ubicacionFormG.controls["rack"].disable();
            } else {
              this.data.ubicacionFormG.controls["piso"].enable();
              this.data.ubicacionFormG.controls["rack"].enable();
            }
            
          }
        });
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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
    }
    )
  }

  obtenerInfoCiudades() {
    this.informacionService.listciudadesNombre(this.ct).subscribe(resp => {
      this.cities = resp.body["info"];
      const keys = resp.headers;
      if(this.data.inventid!=undefined){
        this.cities.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Agencia[0].Tipo[0].Ciudad[0])) {
            this.tp.idlink = this.data.inventid.Agencia[0].Tipo[0].Ciudad[0].id;
            this.data.ubicacionFormG.controls["city"].setValue(element)
            this.obtenerInfoTipos();
          }
        });
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

        this.data.adicionalFormG.controls["boolinvent"].disable();
        this.data.adicionalFormG.controls["inv"].disable();
        this.data.adicionalFormG.controls["propietario"].disable();

        if(!this.data.adicionalFormG.controls["propietario"].value.nombre.toLowerCase().includes("banco")){
          this.data.adicionalFormG.controls["inv"].disable();
          this.data.adicionalFormG.controls["inv"].setValue(undefined)
          this.data.adicionalFormG.controls["boolinvent"].disable();
          this.data.adicionalFormG.controls["boolinvent"].setValue(true)
        }else{
          if(this.data.inventid.inventario==undefined){
            this.data.adicionalFormG.controls["boolinvent"].enable();
          }else{
            this.data.adicionalFormG.controls["boolinvent"].disable();
          }
          if(this.data.adicionalFormG.controls["inv"].value==undefined){
            this.data.adicionalFormG.controls["inv"].disable();
            this.data.adicionalFormG.controls["boolinvent"].setValue(true);
            this.data.adicionalFormG.controls["inv"].setValue(undefined);
          }else{
            this.data.adicionalFormG.controls["boolinvent"].setValue(false);
            //this.data.adicionalFormG.controls["inv"].enable();
          }
        }
      }
      else{
        this.data.adicionalFormG.controls["boolinvent"].enable();
        this.data.adicionalFormG.controls["inv"].enable();
        this.data.adicionalFormG.controls["propietario"].enable();
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

      }else{
        this.data.modeloFormG.controls["modelo"].setValue({id:undefined,nombre:''})
        this.data.modeloFormG.controls["modelo"].enable();
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
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

  selectionamb(value) {
    if(this.data.isnew){
      this.data.ubicacionFormG.reset();
      this.data.modeloFormG.controls["nombre"].reset();
      this.data.modeloFormG.controls["equipo"].reset();
      this.data.modeloFormG.controls["marca"].reset();
      this.data.modeloFormG.controls["flash"].reset();
      this.data.modeloFormG.controls["ram"].reset();
      this.data.modeloFormG.controls["fecha"].reset();
      this.data.modeloFormG.controls["modelo"].setValue({id:0,nombre:''});
      this.data.adicionalFormG.reset();
      this.data.networkFormG.reset();
    }
    if (value.id === 4) {
      this.data.networkFormG.controls["orion"].setValue(undefined);
      this.data.networkFormG.controls["orion"].disable()
      this.data.networkFormG.controls["ecritico"].setValue(false);
      this.data.networkFormG.controls["ecritico"].disable()
      this.data.adicionalFormG.controls["opm"].setValue(false);
      this.data.adicionalFormG.controls["opm"].disable()
      this.data.adicionalFormG.controls["bpac"].setValue(false);
      this.data.adicionalFormG.controls["util"].setValue(false);
      this.data.ubicacionFormG.controls["piso"].reset();
      this.data.ubicacionFormG.controls["rack"].reset();
      this.data.ubicacionFormG.controls["piso"].disable();
      this.data.ubicacionFormG.controls["rack"].disable();

    } else {
      this.data.adicionalFormG.controls["util"].setValue(true);
      this.data.adicionalFormG.controls["opm"].enable();
      this.data.networkFormG.controls["ecritico"].enable();
      this.data.networkFormG.controls["orion"].enable();
      this.data.ubicacionFormG.controls["piso"].enable();
      this.data.ubicacionFormG.controls["rack"].enable();
    }
    if(value.id == 3){
      this.boolcity=true;
    }else{
      this.boolcity=false;
    }
    console.log(this.data.adicionalFormG.valid)
    console.log(this.data.adicionalFormG)

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
    if (value) {
      this.data.adicionalFormG.controls["bpac"].setValue(true);
    } else {
      this.data.adicionalFormG.controls["bpac"].setValue(false);
    }
  }

  selectionmodelo(value) {
    this.obtenerInfoModelo(value.id)
  }

  selectionprop(value) {
    if(!value.nombre.toLowerCase().includes("banco")){
      this.data.adicionalFormG.controls["inv"].disable();
      this.data.adicionalFormG.controls["inv"].setValue(undefined)
      this.data.adicionalFormG.controls["boolinvent"].disable();
      this.data.adicionalFormG.controls["boolinvent"].setValue(true)
    }else{
      this.data.adicionalFormG.controls["boolinvent"].enable();
    }
  }

  selectionboolinvent(value){
    if(value){
      this.data.adicionalFormG.controls["inv"].disable();
      this.data.adicionalFormG.controls["inv"].setValue(undefined)
    }else{
      this.data.adicionalFormG.controls["inv"].enable();
    }
    

  }

  sendinfo() {
    if (this.data.isnew) {
      this.informacionService.insertinventario(this.data).subscribe(resp => {
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
      this.informacionService.editarinventario(this.data).subscribe(resp => {
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
