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
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Component({
  selector: 'app-enlaces',
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css']
})
export class EnlacesComponent implements OnInit {

  public displayedColumns: string[] = [
    'demo-agencia',
    'demo-ciudad',
    'demo-tipo',
    'demo-punto',
    'demo-proveedor',
    'demo-medio',
    'demo-ip',
    'demo-bw',
    'demo-propiedad',
    'demo-estado',
    'demo-action'];
  public dataDevices: any[] = [];
  public inventario: any;
  public inventid: any;
  public nombre: any;
  public estado: any = 1;
  
  public isnew: boolean = false;

  public activado: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];


  ubicacionFormG = this._formBuilder.group({
    city: [undefined, Validators.required],
    tipo: [undefined, Validators.required],
    ag: [undefined, Validators.required],
    codigo: [undefined]

  });
  networkFormG = this._formBuilder.group({
    ip: [undefined, Validators.required],
    punto: [undefined, Validators.required],
    proveedor: [undefined, Validators.required],
    medio: [undefined],
    bw: [undefined],
    doble: [undefined]

  });
  adicionalFormG = this._formBuilder.group({
    propietario: [undefined, Validators.required],
    identificador: [undefined]

  });

  public pageIndex = 0;
  public totalenght = 0;

  public medios: any[]=[];
  public cities: any[]=[];
  public tipos: any[]=[];
  public agencias: any[]=[];
  public propietarios: any[]=[];
  public entidades: any[] = [];

  citiescontrol = new FormControl();
  tiposcontrol = new FormControl();
  propietarioscontrol = new FormControl();
  medioscontrol  = new FormControl();
  agenciascontrol  = new FormControl();
  entidadescontrol  = new FormControl();

  public cd = { "ciudades": "Guayaquil,Quito,Manta,Quevedo,Riobamba,Ibarra" }
  public mr = { "nombre": "", "estado": 1 }
  public prp = { "nombre": "", "estado": 1 }
  public ent = { "nombre": "", "estado": 1 }
  public ct = { "nombre": "", "estado": 1 }

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private informacionService: InformacionService) { }

  ngOnInit() {
    this.inventario = {
      "tunel": "",
      "proveedor": "",
      "identificador": "",
      "prioridad": "",
      "agencia": "",
      "tipo": "",
      "punto": "",
      "medio": "",
      "bw": "",
      "doble": "",
      "ciudad": "",
      "estado": 1,
      "pindex": this.pageIndex + 1
    }
    this.obtenerInfoInventario();
    this.obtenerInfoEntidades();
    this.obtenerInfoPropietarios();
    this.obtenerInfoCiudades();
    this.obtenerMedios();
  }

  obtenerMedios() {
    this.informacionService.listhardwareOpciones({estado:1,idLink:70}).subscribe(resp => {
      this.medios = resp.body["info"];
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

  obtenerInfoInventario_p1() {
    let nc = this.inventario.ciudad;  
    if(this.citiescontrol.value!=null && this.citiescontrol.value.length>0 ){
      this.inventario.ciudad = '';
      this.citiescontrol.value.forEach(element => {
        this.inventario.ciudad = this.inventario.ciudad +element.nombre+',';
      });  
      
      if(nc != this.inventario.ciudad){
        this.cd = { "ciudades": this.inventario.ciudad}
        this.tiposcontrol.reset();
        this.obtenerInfoTipos(this.cd);
      }
    }else{
      this.inventario.ciudad = '';
       
    }

    if(this.tiposcontrol.value!=null && this.tiposcontrol.value.length>0 ){
      this.inventario.tipo = '';
      this.tiposcontrol.value.forEach(element => {
        this.inventario.tipo = this.inventario.tipo +element.nombre+',';
      });    
    }else{
      this.inventario.tipo = '';
      if(this.citiescontrol.value!=null && this.citiescontrol.value.length>0 ){
        this.cd = { "ciudades": this.inventario.ciudad}
        this.obtenerInfoTipos(this.cd);
      }else{
        this.obtenerInfoTipos({ "ciudades": "Guayaquil,Quito,Manta,Quevedo,Riobamba,Ibarra" })
      }
      
    }
    
    if(this.propietarioscontrol.value!=null && this.propietarioscontrol.value.length>0 ){
      this.inventario.proveedor = '';
      this.propietarioscontrol.value.forEach(element => {
        this.inventario.proveedor = this.inventario.proveedor +element.nombre+',';
      });    
      
    }else{
      this.inventario.proveedor = '';
    }

    if(this.entidadescontrol.value!=null && this.entidadescontrol.value.length>0 ){
      this.inventario.propiedad = '';
      this.entidadescontrol.value.forEach(element => {
        this.inventario.propiedad = this.inventario.propiedad +element.nombre+',';
      });    
      
    }else{
      this.inventario.propiedad = '';
    }

    if(this.medioscontrol.value!=null && this.medioscontrol.value.length>0 ){
      this.inventario.medio = '';
      this.medioscontrol.value.forEach(element => {
        this.inventario.medio = this.inventario.medio +element.nombre+',';
      });     
    }else{
      this.inventario.medio = '';
    }

    this.pageIndex = 0;
    this.inventario.pindex = 1;
    this.obtenerInfoInventario();
  }

  obtenerInfoInventario() {
    this.informacionService.listenlace(this.inventario).subscribe(resp => {
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

  obtenerInfoInventarioExcel() {
    this.informacionService.downloadenlace(this.inventario).subscribe(resp => {
      const keys = resp.headers;
      const blob: any = new Blob([resp.body], { type: keys.getAll("content-type").toString() });
      const file = new File([blob], "inventarioEnlaces" + '.xlsx', { type: keys.getAll("content-type").toString() });
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

  obtenerInventarioid(n) {

    this.informacionService.getenlacebyid(n).subscribe(resp => {
      this.inventid = resp["info"];
      this.networkFormG.controls["ip"].setValue(this.inventid.tunel)
      this.networkFormG.controls["bw"].setValue(this.inventid.bw)
      this.networkFormG.controls["doble"].setValue(this.inventid.doble)
      this.networkFormG.controls["punto"].setValue("")
      this.networkFormG.controls["medio"].setValue(this.inventid.medio)
      this.networkFormG.controls["proveedor"].setValue("")
      this.adicionalFormG.controls["propietario"].setValue("")
      this.adicionalFormG.controls["identificador"].setValue(this.inventid.identificador)
      this.ubicacionFormG.controls["codigo"].setValue(this.inventid.codigo)


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

  obtenerInfoPropietarios() {
    this.informacionService.listpropietariosNombre(this.prp).subscribe(resp => {
      this.propietarios = resp.body["info"];
      const keys = resp.headers;
      /*
      if (this.inventid != undefined) {
        this.propietarios.forEach(element => {
          if (this.compareThem(element, this.inventid.Proveedor[0])) {
            this.networkFormG.controls["proveedor"].setValue(element)
          }
        });


      }
      else {

      }*/
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
  
  obtenerInfoEntidades() {
    this.informacionService.listentidadesNombre(this.ent).subscribe(resp => {
      this.entidades = resp.body["info"];
      const keys = resp.headers;
      /*
      if (this.inventid != undefined) {
        this.entidades.forEach(element => {
          if (this.compareThem(element, this.inventid.Propiedad[0])) {
            this.adicionalFormG.controls["propietario"].setValue(element)
          }
        });
      }*/
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
    this.informacionService.listciudadesNombre(this.ct).subscribe(resp => {
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
  openDialogEdit(n): void {
    this.isnew = false;
    const dialogRef = this.dialog.open(FormComponentEnlaces, {
      width: '1000px',
      data: {
        idedit: n,
        medios:this.medios,
        isnew: this.isnew,
        activado: this.activado,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        inventid: this.inventid,
        estado: this.inventid.estado,
        propietarios:this.propietarios,
        entidades:this.entidades,
        cities:this.cities
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pageIndex = 0;
      this.obtenerInfoInventario();
    });
  }

  openDialogNew(): void {
    this.isnew = true;
    this.ubicacionFormG.reset();
    this.adicionalFormG.reset();
    this.networkFormG.reset();
    const dialogRef = this.dialog.open(FormComponentEnlaces, {
      width: '1000px',
      data: {
        isnew: this.isnew,
        medios:this.medios,
        activado: this.activado,
        adicionalFormG: this.adicionalFormG,
        ubicacionFormG: this.ubicacionFormG,
        networkFormG: this.networkFormG,
        inventid: undefined,
        propietarios:this.propietarios,
        entidades:this.entidades,
        cities:this.cities
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerInfoInventario();
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
  styleUrls: ['./enlaces.component.css']

})
export class FormComponentEnlaces implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  public agenciaSelected: any;
  public puntoSelected: any;
  public proveedorSelected: any;
  public propietarioSelected: any;

  filteredOptionsPunto: Observable<any[]>;

  public agencias: any[] = [];
  public tipos: any[] = [];
  public puntos: any[] = [];
  public dobles: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];
  public tp = { "nombre": "", "idlink": 1 }
  public agc = { "nombre": "", "idlink": 1 }
  public pnto = { "nombre": "", "idlink": 1 }
  public prd = { "nombre": "", "estado": 1 }
  public px = { "nombre": "", "estado": 1 }
  public pt = { "nombre": "", "estado": 1 }

  public npunto = ""

  ngOnInit() {
    //console.log(this.data.cities)
    this.obtenerInfoPunto();
    if (this.data.inventid != undefined) {
      this.data.propietarios.forEach(element => {
        if (this.compareThem(element, this.data.inventid.Proveedor[0])) {
          this.data.networkFormG.controls["proveedor"].setValue(element)
        }
      });
      this.data.entidades.forEach(element => {
        if (this.compareThem(element, this.data.inventid.Propiedad[0])) {
          this.data.adicionalFormG.controls["propietario"].setValue(element)
        }
      });
      this.data.cities.forEach(element => {
        if (this.compareThem(element, this.data.inventid.Agencia[0].Tipo[0].Ciudad[0])) {
          this.tp.idlink = this.data.inventid.Agencia[0].Tipo[0].Ciudad[0].id;
          this.data.ubicacionFormG.controls["city"].setValue(element)
          this.obtenerInfoTipos();
        }
      });
      this.data.medios.forEach(element => {
        if (this.compareThem(element, this.data.inventid.Medio[0])) {
          this.data.networkFormG.controls["medio"].setValue(element)
        }
      });
      

    }
    this.filteredOptionsPunto = this.data.networkFormG.controls["punto"].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filter(nombre) : this.puntos.slice())),
    );

  }

  constructor(
    public dialogRef: MatDialogRef<FormComponentEnlaces>,
    breakpointObserver: BreakpointObserver,
    private informacionService: InformacionService,
    @Inject(MAT_DIALOG_DATA) public data: EnlacesComponent) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }
  

  //TIPOS
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
  //AGENCIAS
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
  obtenerInfoAgenciaid(n) {
    this.informacionService.getagenciabyid(n).subscribe(resp => {
      this.agenciaSelected = resp["info"];
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
  //PUNTOS
  obtenerInfoPunto() {
    if (this.data.inventid != undefined) {
      this.pnto.nombre = this.data.inventid.Punto[0].nombre;
    }
    this.informacionService.listagenciasNombre2(this.pnto).subscribe(resp => {
      this.puntos = resp.body["info"];
      if (this.data.inventid != undefined) {
        //this.data.networkFormG.controls["punto"].setValue(this.data.inventid.Punto[0])
        this.puntos.forEach(element => {
          if (this.compareThem(element, this.data.inventid.Punto[0])) {
            this.data.networkFormG.controls["punto"].setValue(element)
          }
        });
      }
      const keys = resp.headers;
      /*this.filteredOptionsPunto = this.data.networkFormG.controls["punto"].valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.nombre)),
        map(nombre => (nombre ? this._filter(nombre) : this.puntos.slice())),
      );*/
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
  obtenerInfoPuntoNombre(trigger: MatAutocompleteTrigger) {
    this.pnto.nombre = this.npunto;
    this.informacionService.listagenciasNombre2(this.pnto).subscribe(resp => {
      this.puntos = resp.body["info"];
      const keys = resp.headers;
      this.filteredOptionsPunto = this.data.networkFormG.controls["punto"].valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.nombre)),
        map(nombre => (nombre ? this._filter(nombre) : this.puntos.slice())),
      );
      trigger.openPanel();
      //this.completar();
      /*
      if (this.data.inventid != undefined) {
        this.agencias.forEach(element => {

          if (this.compareThem(element, this.data.inventid.Punto[0])) {
            this.data.networkFormG.controls["punto"].setValue(element)
          }
        });
      }*/
    });
  }
  obtenerInfoPuntoid(id) {
    //this.agc.nombre=nombre;
    this.informacionService.getagenciabyid(id).subscribe(resp => {
      this.puntoSelected = resp["info"];
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
  completar(trigger:MatAutocompleteTrigger) {
    this.obtenerInfoPuntoNombre(trigger);
    if (this.puntos.length > 0) {
      this.puntos.forEach(element => {
        if (element.nombre.toLowerCase()==this.npunto.toLocaleLowerCase()) {
          this.data.networkFormG.controls["punto"].setValue(element)
        }
      });
    }
  }
  selectionpunto(value) {
    this.obtenerInfoPuntoid(value.id)
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
  sendinfo() {
    if (this.data.isnew) {
      this.informacionService.insertenlace(this.data).subscribe(resp => {
        $.notify({
          icon: "notifications",
          message: "El enlace se ha agregado"
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
        console.log("close")
        this.dialogRef.close()
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
      this.informacionService.editarenlace(this.data).subscribe(resp => {
        $.notify({
          icon: "notifications",
          message: "El enlace se ha editado"
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
  compareThem(o1, o2): boolean {
    return o1.id === o2.id;
  }
  displayFn(value) {
    return value ? value.nombre : undefined;
  }
  private _filter(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.puntos.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

}
