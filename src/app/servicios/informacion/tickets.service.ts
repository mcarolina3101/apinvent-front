import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from "../../global";
import { DashboardService } from '../apis/dashboard.service';



@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ruta = '';
  constructor(private http: HttpClient,
    private dashboardService: DashboardService) { }

  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json"
  });
  //TICKETS
  listticket(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/list';
    let body = JSON.stringify({
      idagencia: info.idagencia,
      agencia: info.agencia == "" ? null : info.agencia,
      idtipo: info.idtipo,
      tipo: info.tipo == "" ? null : info.tipo,
      idciudad: info.idciudad,
      ciudad: info.ciudad == "" ? null : info.ciudad,

      idenlace: info.idenlace,
      proveedor: info.proveedor == "" ? null : info.proveedor,
      lan:info.lan  == "" ? null : info.lan,

      idproblema: info.idproblema,
      problema: info.problema == "" ? null : info.problema,

      tmins: info.tmins == "" ? null : info.tmins,
      tdias: info.tdias == "" ? null : info.tdias, 

      time0: info.time0 == "" ? null : info.time0,
      time1: info.time1 == "" ? null : info.time1,
      time2: info.time2 == "" ? null : info.time2,      
      tcompleto: info.tcompleto == "" ? null : info.tcompleto,
      descripcion: info.descripcion == "" ? null : info.descripcion,
      ticket: info.ticket == "" ? null : info.ticket,
      ticketprov: info.ticketprov == "" ? null : info.ticketprov,

      estado: info.estado == null ? 1 : info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    //return this.http.post(global.ruta + ruta, {}, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });

    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  downloadticket(info: any): Observable<HttpResponse<Blob>> {
    this.ruta = 'ticket/download';
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
  getticketbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertticket(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/crear';
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
  editarticket(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/actualizar';
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
      username: localStorage.getItem("username")

    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  
}