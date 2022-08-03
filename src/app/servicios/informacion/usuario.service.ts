import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from "../../global";
import { DashboardService } from '../apis/dashboard.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private ruta = '';
  constructor(private http: HttpClient,
    private dashboardService: DashboardService) { }

  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json"
  });
      //USUARIO
  listusuarios(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'usuario/list';
    let body = JSON.stringify({
      usuario: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listusuariosnombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'usuario/nombre';
    let body = JSON.stringify({
      usuario: info.usuario,
      nombre:info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  insertusuario(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'usuario/crear';
    let body = JSON.stringify({
      usuario: info.usuario,
      nombre: info.nombre,
      perfil: info.perfil,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarusuario(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'usuario/actualizar';
    let body = JSON.stringify({
      id: info.id,
      usuario: info.usuario,
      nombre: info.nombre,
      perfil: info.perfil,
      estado: info.estado,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //PERFIL
  listperfiles(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'perfil/list';
    let body = JSON.stringify({
      usuario: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listperfilesbyNombre(info: string): Observable<HttpResponse<any>> {
    this.ruta = 'perfil/nombre';
    let body = JSON.stringify({
      nombre: info,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertperfil(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'perfil/crear';
    let body = JSON.stringify({
      nombre: info.nombre,
      administrar: info.administrar,
      crear: info.crear,
      editar: info.editar,
      eliminar: info.eliminar,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarperfil(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'perfil/actualizar';
    let body = JSON.stringify({
      id: info.id,
      nombre: info.nombre,
      administrar: info.administrar,
      crear: info.crear,
      editar: info.editar,
      eliminar: info.eliminar,
      estado: info.estado,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  
}