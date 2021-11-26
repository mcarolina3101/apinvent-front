import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { InformacionService } from '../servicios/informacion/informacion.service';


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
  public ncrear: boolean = false;
  public neliminar: boolean = false;
  public neditar: boolean = false;
  public nadministrar: boolean = false;
  public idactperfil:any;
  public inombre: any;
  public icrear: boolean = false;
  public ieliminar: boolean = false;
  public ieditar: boolean = false;
  public iadministrar: boolean = false;

  public nusuario: boolean = true;
  public nperfil: boolean = true;
  public iusuario: boolean = true;
  public iperfil: boolean = true;
  public nuser: any;
  public nidperfil: any;
  public idactuser:any;
  public iuser: any;
  public iidperfil: any;

  constructor(
    private _formBuilder: FormBuilder,
    private informacionService: InformacionService,
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
    this.informacionService.listusuarios(this.usuario).subscribe(resp => {
      this.usuarios = resp.body["info"];
      const keys = resp.headers;
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

  clickNuevoUsuario() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = false;

    this.nuser = undefined;
    this.nidperfil = undefined;
  }

  ingresarNuevoUsuario() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.informacionService.insertusuario({
      "usuario": this.nuser,
      "perfil": this.nidperfil
    }).subscribe(resp => {
      this.obtenerInfoUsuarios();
    });
  }

  actualizarUsuario() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.informacionService.editarusuario({
      "id":this.idactuser,
      "usuario": this.iuser,
      "perfil": this.iidperfil
    }).subscribe(resp => {
      this.obtenerInfoUsuarios();
    });
  }

  clickUsuario(a) {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = false;
    this.nusuario = true;
    this.idactuser=a.id;
    this.iuser = a.usuario;
    this.iidperfil = a.perfil;
  }

  obtenerInfoPerfiles() {
    this.informacionService.listperfiles(this.perfil).subscribe(resp => {
      this.perfiles = resp.body["info"];
      const keys = resp.headers;
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

  obtenerInfoPerfilesNombre() {
    this.informacionService.listperfilesbyNombre("").subscribe(resp => {
      this.perfileslist = resp["info"];
      const keys = resp.headers;
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

  clickNuevoPerfil() {
    this.nusuario = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nperfil = false;

    this.nadministrar = false;
    this.neditar = false;
    this.ncrear = false;
    this.neliminar = false;
    this.nnombre = undefined;
  }

  ingresarNuevoPerfil() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.informacionService.insertperfil({
      "nombre": this.nnombre,
      "administrar": this.nadministrar? 1:0,
      "crear": this.ncrear? 1:0,
      "editar": this.neditar? 1:0,
      "eliminar": this.neliminar? 1:0
    }).subscribe(resp => {
      this.obtenerInfoPerfiles();
      this.obtenerInfoPerfilesNombre();
    });
  }

  actualizarPerfil() {
    this.nperfil = true;
    this.iperfil = true;
    this.iusuario = true;
    this.nusuario = true;
    this.informacionService.editarperfil({
      "id":this.idactperfil,
      "nombre": this.inombre,
      "administrar": this.iadministrar? 1:0,
      "crear": this.icrear? 1:0,
      "editar": this.ieditar? 1:0,
      "eliminar": this.ieliminar? 1:0
    }).subscribe(resp => {
      this.obtenerInfoPerfiles();
      this.obtenerInfoPerfilesNombre();
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
    this.ieditar = a.editar;
    this.ieliminar = a.eliminar;
    this.icrear = a.crear;
  }

}
