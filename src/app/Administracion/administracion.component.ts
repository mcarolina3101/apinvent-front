import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { UsuarioService } from '../servicios/informacion/usuario.service';

declare var $:any;

@Component({
  selector: 'app-admin',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  public editado1: any;
  public pageIndex = 0;

  public usuario: any;
  public usuarios: any;

  public perfil: any;
  public perfiles: any;
  public perfileslist: any;

  public nnombre: any;
  public ninformacion: boolean = false;
  public neliminar: boolean = false;
  public nenlaces: boolean = false;
  public nadministrar: boolean = false;
  public idactperfil:any;
  public inombre: any;
  public iinformacion: boolean = false;
  public ieliminar: boolean = false;
  public ienlaces: boolean = false;
  public iadministrar: boolean = false;
  public iestado1=0;
  
  public nusuario: boolean = true;
  public nperfil: boolean = true;
  public iusuario: boolean = true;
  public iperfil: boolean = true;
  public nnombuser: boolean = true;
  public nuser: any;
  public nidperfil: any;
  public idactuser:any;
  public inombuser: any;
  public iuser: any;
  public iidperfil: any;
  public iestado2 =0;

  public activado: any = [
    { id: 1, nombre: 'Si' },
    { id: 0, nombre: 'No' }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    breakpointObserver: BreakpointObserver) {
  }
  ngOnInit() {
    this.usuario = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }
    this.perfil = { "nombre": "", "estado": 1, "pindex": this.pageIndex + 1 }

    this.obtenerInfoUsuarios()
    this.obtenerInfoPerfiles()
    this.obtenerInfoPerfilesNombre()
  }

  obtenerInfoUsuarios() {
    this.usuarioService.listusuarios(this.usuario).subscribe(resp => {
      this.usuarios = resp.body["info"];
      const keys = resp.headers;
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

  clickNuevoUsuario() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = false;

    this.nuser = undefined;
    this.nnombuser = undefined;
    this.nidperfil = undefined;
  }

  ingresarNuevoUsuario() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.usuarioService.insertusuario({
      "usuario": this.nuser,
      "nombre": this.nnombuser,
      "perfil": this.nidperfil
    }).subscribe(resp => {
      this.obtenerInfoUsuarios();
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

  actualizarUsuario() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.usuarioService.editarusuario({
      "id":this.idactuser,
      "usuario": this.iuser,
      "nombre": this.inombuser,
      "perfil": this.iidperfil,
      "estado":this.iestado2
    }).subscribe(resp => {
      this.obtenerInfoUsuarios();
    }, err =>{
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

  clickUsuario(a) {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = false;
    this.nusuario = true;
    this.idactuser=a.id;
    this.iuser = a.usuario;
    this.inombuser = a.nombre;
    this.iidperfil = a.perfil;
    this.iestado2 = a.estado?1:0;
  }

  obtenerInfoPerfiles() {
    this.usuarioService.listperfiles(this.perfil).subscribe(resp => {
      this.perfiles = resp.body["info"];
      const keys = resp.headers;
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

  obtenerInfoPerfilesNombre() {
    this.usuarioService.listperfilesbyNombre("").subscribe(resp => {
      this.perfileslist = resp["info"];
      const keys = resp.headers;
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

  clickNuevoPerfil() {
    this.nusuario = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nperfil = false;

    this.nadministrar = false;
    this.nenlaces = false;
    this.ninformacion = false;
    this.neliminar = false;
    this.nnombre = undefined;
  }

  ingresarNuevoPerfil() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.usuarioService.insertperfil({
      "nombre": this.nnombre,
      "administrar": this.nadministrar? 1:0,
      "informacion": this.ninformacion? 1:0,
      "enlaces": this.nenlaces? 1:0,
      "eliminar": this.neliminar? 1:0
    }).subscribe(resp => {
      this.obtenerInfoPerfiles();
      this.obtenerInfoPerfilesNombre();
    },err =>{
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

  actualizarPerfil() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.usuarioService.editarperfil({
      "id":this.idactperfil,
      "nombre": this.inombre,
      "administrar": this.iadministrar? 1:0,
      "informacion": this.iinformacion? 1:0,
      "enlaces": this.ienlaces? 1:0,
      "eliminar": this.ieliminar? 1:0,
      "estado":this.iestado1
    }).subscribe(resp => {
      this.obtenerInfoPerfiles();
      this.obtenerInfoPerfilesNombre();
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

  clickPerfil(a) {
    this.nperfil = true;
    this.iperfil = false;
    this.iusuario = true;
    this.nusuario = true;
    this.idactperfil = a.id;
    this.inombre = a.nombre;
    this.iadministrar = a.administrar;
    this.ienlaces = a.enlaces;
    this.ieliminar = a.eliminar;
    this.iinformacion = a.informacion;
    this.iestado1 = a.estado?1:0;
  }

}
