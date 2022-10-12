import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from "../../global";
import { DashboardService } from '../apis/dashboard.service';
import 'moment/locale/es';
import * as _moment from 'moment';
const moment = _moment;


@Injectable({
  providedIn: 'root'
})
export class EnlaceService {
  private ruta = '';
  constructor(private http: HttpClient,
    private dashboardService: DashboardService) { }

  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json"
  });
 //ENLACES
 listenlace(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'enlace/list';
    let body = JSON.stringify({
      idproveedor: info.idproveedor,
      proveedor: info.proveedor == "" ? null : info.proveedor,
      idpropiedad: info.idpropiedad,
      propiedad: info.propiedad == "" ? null : info.propiedad,
      idpunto: info.idpunto,
      punto: info.punto == "" ? null : info.punto,
      idagencia: info.idagencia,
      agencia: info.agencia == "" ? null : info.agencia,
      idtipo: info.idtipo,
      tipo: info.tipo == "" ? null : info.tipo,
      idciudad: info.idciudad,
      ciudad: info.ciudad == "" ? null : info.ciudad,
      bw: info.bw == "" ? null : info.bw,
      tunel: info.tunel == "" ? null : info.tunel,
      codigo: info.codigo == "" ? null : info.codigo,
      payfor: info.payfor == "" ? null : info.payfor,
      medio: info.medio == "" ? null : info.medio,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    //return this.http.post(global.ruta + ruta, {}, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });

    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  listlogs(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'enlace/logs';
    let body = JSON.stringify({
      id:info.id,
      idproveedor: info.idproveedor,
      proveedor: info.proveedor == "" ? null : info.proveedor,
      idpropiedad: info.idpropiedad,
      propiedad: info.propiedad == "" ? null : info.propiedad,
      idpunto: info.idpunto,
      punto: info.punto == "" ? null : info.punto,
      idagencia: info.idagencia,
      agencia: info.agencia == "" ? null : info.agencia,
      idtipo: info.idtipo,
      tipo: info.tipo == "" ? null : info.tipo,
      idciudad: info.idciudad,
      ciudad: info.ciudad == "" ? null : info.ciudad,
      bw: info.bw == "" ? null : info.bw,
      tunel: info.tunel == "" ? null : info.tunel,
      codigo: info.codigo == "" ? null : info.codigo,
      payfor: info.payfor == "" ? null : info.payfor,
      medio: info.medio == "" ? null : info.medio,
      estado: info.estado == null ? 1 : info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    //return this.http.post(global.ruta + ruta, {}, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });

    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  listbaja(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'enlace/baja';
    let body = JSON.stringify({
      id:info.id,
      estado: info.estado == null ? 1 : info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    //return this.http.post(global.ruta + ruta, {}, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });

    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  
  downloadenlace(info: any): Observable<HttpResponse<Blob>> {
    this.ruta = 'enlace/download';
    let body = JSON.stringify({
      serie: info.serie,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });
    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  getenlacebyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'enlace/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }

  dashboardenlace(): Observable<HttpResponse<any>> {
    this.ruta = 'enlace/dashboard';
    let body = JSON.stringify({
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }

  insertenlace(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'enlace/crear';
    let body = JSON.stringify({
      //id:info.idedit,      
      idproveedor:info.networkFormG.value.proveedor.id == undefined ? null : info.networkFormG.value.proveedor.id,
      bw:info.networkFormG.value.bw == undefined ? null : info.networkFormG.value.bw,
      codigo:info.ubicacionFormG.value.codigo == undefined ? null : info.ubicacionFormG.value.codigo ,
      identificador:info.adicionalFormG.value.identificador == undefined ? null : info.adicionalFormG.value.identificador,
      idmedio:info.networkFormG.value.medio.id == undefined ? null : info.networkFormG.value.medio.id,
      tunel:info.networkFormG.value.ip == undefined ? null : info.networkFormG.value.ip,
      idpunto:info.networkFormG.value.punto.id == undefined ? null : info.networkFormG.value.punto.id,
      doble:info.networkFormG.value.doble ? 1 : 0,
      idpropiedad: info.adicionalFormG.value.propietario.id == undefined ? null : info.adicionalFormG.value.propietario.id,
      idagencia: info.ubicacionFormG.value.ag.id == undefined ? null :info.ubicacionFormG.value.ag.id,
      //estado:1,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }

  editarenlace(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'enlace/actualizar';
    let body = JSON.stringify({
      //nombre:info.nombre,
      //estado:info.estado,
      id:info.idedit,
      idproveedor:info.networkFormG.value.proveedor.id == undefined ? null : info.networkFormG.value.proveedor.id,
      bw:info.networkFormG.value.bw == undefined ? null : info.networkFormG.value.bw,
      codigo:info.ubicacionFormG.value.codigo == undefined ? null : info.ubicacionFormG.value.codigo ,
      identificador:info.adicionalFormG.value.identificador == undefined ? null : info.adicionalFormG.value.identificador,
      idmedio:info.networkFormG.value.medio.id == undefined ? null : info.networkFormG.value.medio.id,
      tunel:info.networkFormG.value.ip == undefined ? null : info.networkFormG.value.ip,
      idpunto:info.networkFormG.value.punto.id == undefined ? null : info.networkFormG.value.punto.id,
      doble:info.networkFormG.value.doble ? 1 : 0,
      idpropiedad: info.adicionalFormG.value.propietario.id == undefined ? null : info.adicionalFormG.value.propietario.id,
      idagencia: info.ubicacionFormG.value.ag.id == undefined ? null :info.ubicacionFormG.value.ag.id,
      estado: info.estado ,
      idbaja: info.inventid.Baja==undefined? null:info.inventid.Baja[0].id,
      fechainicio:info.inicio.value ==undefined?null: moment( info.inicio.value).format('YYYY-MM-DD'),
      fechabaja: info.fin.value ==undefined?null:moment( info.fin.value).format('YYYY-MM-DD'),
      username: localStorage.getItem("username")

    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  
}