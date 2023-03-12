import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { InventarioService } from '../servicios/informacion/inventario.service';
import { DashboardService } from '../servicios/apis/dashboard.service';
import { ActividadService } from '../servicios/informacion/actividad.service';
import { FormComponentActividad } from '../actividad/actividad.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public total = {c:0,b:0,n:0};
  public tfecha = {c:0,b:0,n:0};
  public tfechaprox = {c:0,b:0,n:0};
  //public tcritico=0;
  //public tbpac=0;
  //public topmger=0;
  public tutil = {c:0,b:0,n:0};
  public tufecha = {c:0,b:0,n:0};
  public tufechaprox = {c:0,b:0,n:0};
  public tbodega = {c:0,b:0,n:0};
  public tbfecha = {c:0,b:0,n:0};
  public tbfechaprox = {c:0,b:0,n:0};
  public inventario;
  public pageIndex = 0;
  public dataAct: any[] = [];
  public totalenght = 0;
  public today = new Date();
  public todayf = formatDate(this.today,'yyyy-MM-dd','en')
  public today1 = this.today.setFullYear((this.today.getFullYear())+1)
  public today1f = formatDate(this.today1,'yyyy-MM-dd','en')

  public displayedColumns: string[] = [
    'demo-action',
    'demo-id',
    'demo-actividad',
    
  ];


  public inventid: any;
  public isnew: boolean = false;
  public isheader: boolean = false;
  public selectedact: number;
  public selectedabb: number;
  public selsubactop: number;
  public usuario: any;
  public actividades: any[] = [];
  public subactividades: any[] = [];
  public label = "";
  public titulo = "";
  public activado: any = [{ id: 0, nombre: 'ELIMINADO' }, { id: 1, nombre: 'INGRESADO' }];
  public open: any = [{ id: 0, nombre: 'NO' }, { id: 1, nombre: 'SI' }];
  public subactop: any = [{ id: 0, nombre: 'N/A' }, { id: 1, nombre: 'Ingreso / Retiro de equipo' }, { id: 2, nombre: 'Wireless ' }, { id: 3, nombre: 'Ingreso / Retiro de equipo - Wireless' }];

 
  constructor( 
    public dialog: MatDialog,
    private informacionService: InformacionService,
    private actividadService: ActividadService,
    private inventarioService: InventarioService,
    private dashboardService: DashboardService,
    //public dialogRef: MatDialogRef<FormComponentActividad>
    ) { }
    ngOnInit() {
      this.inventario = {
        "actividad": null,
        "pindex": this.pageIndex + 1
      }
    this.dashboardService.settodayf(this.todayf)
    this.dashboardService.settoday1f(this.today1f)
    this.dashboardService.setutil(undefined)
    this.dashboardService.setfechalimite(undefined)
    this.dashboardService.setfecharango(undefined)
    this.obtenerInfo();
    this.obtenerInfoActividades();
    this.obtenerInfoInventario();
}

    obtenerInfo() {
      this.inventarioService.dashboard().subscribe(resp => {
        this.total = resp["total"];
        this.tfecha = resp["tfecha"];
        this.tfechaprox = resp["tfechaprox"];
        //this.tcritico = resp["tcritico"];
        //this.tbpac = resp["tbpac"];
        //this.topmger = resp["topmger"];
        this.tutil = resp["tutil"];
        this.tufecha = resp["tufecha"];
        this.tufechaprox = resp["tufechaprox"];
        this.tbodega = resp["tbodega"];
        this.tbfecha = resp["tbfecha"];
        this.tbfechaprox = resp["tbfechaprox"];

        
        const keys = resp.headers;
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
    
    public clickicon(val){
      if(val==1){
        this.dashboardService.setutil(undefined)
        this.dashboardService.setfechalimite(undefined)
        this.dashboardService.setfecharango(undefined)
      }else if(val==2){
        this.dashboardService.setutil(undefined)
        this.dashboardService.setfechalimite(1)
        this.dashboardService.setfecharango(0)
      }else if(val==3){
        this.dashboardService.setutil(undefined)
        this.dashboardService.setfechalimite(0)
        this.dashboardService.setfecharango(1)
      }else if(val==4){
        this.dashboardService.setutil(1)
        this.dashboardService.setfechalimite(undefined)
        this.dashboardService.setfecharango(undefined)
      }else if(val==5){
        this.dashboardService.setutil(1)
        this.dashboardService.setfechalimite(1)
        this.dashboardService.setfecharango(0)
      }else if(val==6){
        this.dashboardService.setutil(1)
        this.dashboardService.setfechalimite(0)
        this.dashboardService.setfecharango(1)
      }else if(val==7){
        this.dashboardService.setutil(0)
        this.dashboardService.setfechalimite(undefined)
        this.dashboardService.setfecharango(undefined)
      }else if(val==8){
        this.dashboardService.setutil(0)
        this.dashboardService.setfechalimite(1)
        this.dashboardService.setfecharango(0)
      }else if(val==9){
        this.dashboardService.setutil(0)
        this.dashboardService.setfechalimite(0)
        this.dashboardService.setfecharango(1)
      }

      location.href="#/equipos"   
    }

    Page(event) {
      this.pageIndex = event.pageIndex;
      this.inventario.pindex = this.pageIndex + 1;
      this.obtenerInfoInventario();
    }

    obtenerInfoInventario() {
      this.actividadService.listact(this.inventario).subscribe(resp => {
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

    obtenerActid(n) {
      this.actividadService.getheaderbyid(n,1).subscribe(resp => {
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


}
