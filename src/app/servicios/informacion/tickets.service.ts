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
      nagencia: info.agencia == "" ? null : info.agencia,
      idtipo: info.idtipo,
      abierto: info.abierto,
      ntipo: info.ntipo == "" ? null : info.ntipo,
      idciudad: info.idciudad,
      nciudad: info.nciudad == "" ? null : info.nciudad,
      tecnicorespon: info.tecnicorespon,
      tecnicoreporte: info.tecnicoreporte,

      idenlace: info.idenlace,
      proveedor: info.proveedor == "" ? null : info.proveedor,
      lan:info.lan,

      idproblema: info.idproblema,
      problema: info.problema == "" ? null : info.problema,

      tmins: info.tmins == "" ? null : info.tmins,
      tdias: info.tdias == "" ? null : info.tdias, 
      min: info.min == "" ? null : info.min,
      max: info.max == "" ? null : info.max,
      
      time0: info.time0 == "" ? null : info.time0,
      //time1: info.time1 == "" ? null : info.time1,
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
      

      fecha: info.fecha == "" ? null : info.fecha,
      nagencia: info.nagencia == "" ? null : info.nagencia,
      ntipo: info.ntipo == "" ? null : info.ntipo,
      nciudad: info.nciudad == "" ? null : info.nciudad,
      time0: info.time0 == "" ? null : info.time0,
      //time1: info.time1 == "" ? null : info.time1,
      time2: info.time2 == "" ? null : info.time2,  
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });

    return this.http.post(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });
    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  getheaderbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  getticketbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/idticket';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertticket(info: any, array): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/crear';
    let body = JSON.stringify({
      fecha:info.value.fechai==undefined?null:info.value.fechai,
      idproblema:info.value.problema==undefined?null:info.value.problema.id,
      idproveedor:info.value.proveedor==undefined?null:info.value.proveedor.id,
      soporte:info.value.soporte==undefined?null:info.value.soporte,
      ttproveedor:info.value.ttprov==undefined?null:info.value.ttprov,
      descripcion:info.value.descripcion==undefined?null:info.value.descripcion,
      tecnicorespon:info.controls["tresp"].value==undefined?null:info.controls["tresp"].value,
      tecnicoreporte:info.value.reportado==undefined?null:info.value.reportado.nombre,
      tickets:array==undefined?null:array,
      //estado:1,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarheader(info: any, array,id,estado): Observable<HttpResponse<any>> {
    console.log(info)
    this.ruta = 'ticket/actualizarheader';
    let body = JSON.stringify({
      fecha:info.controls.fechai.value==undefined?null:info.controls.fechai.value,
      idproblema:info.controls.problema.value==undefined?null:info.controls.problema.value.id,
      idproveedor:info.controls.proveedor.value==undefined?null:info.controls.proveedor.value.id,
      tecnicorespon:info.controls["tresp"].value==undefined?null:info.controls.tresp.value,
      id:id,
      soporte:info.value.soporte==undefined?null:info.value.soporte,    
      descripcion:info.value.descripcion==undefined?null:info.value.descripcion,     
      tecnicoreporte:info.value.reportado==undefined?null:info.value.reportado.nombre,
      ttproveedor:info.value.ttprov==undefined?null:info.value.ttprov,   
      tickets:array==undefined?null:array,
      //estado:1,
      estado: estado ,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarticket(d1form,d2form,d3form,tc,id,idagencia,idenlace,estado,adicional): Observable<HttpResponse<any>> {
    this.ruta = 'ticket/actualizar';
    let body = JSON.stringify({
      //nombre:info.nombre,
      //estado:info.estado,
      id:id,
      tcompleto:tc,
      time0:d1form,
      time1:d2form,
      time2:d3form,
      idagencia:idagencia,
      idenlace:idenlace,
      estado: estado ,
      adicional:adicional,
      username: localStorage.getItem("username")

    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  
}