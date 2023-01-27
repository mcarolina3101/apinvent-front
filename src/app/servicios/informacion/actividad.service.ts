import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { info } from 'console';
import { Observable } from 'rxjs';
import * as global from "../../global";
import { DashboardService } from '../apis/dashboard.service';



@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private ruta = '';
  constructor(private http: HttpClient,
    private dashboardService: DashboardService) { }

  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json"
  });
  //Actividad
  list(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'actividades/list';
    let body = JSON.stringify({
      abierto:info.abierto,
      headab:info.headab,
      headabbanco:info.abbanco,
      comentario:info.comentario,
      estado: info.estado == null ? 1 : info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      fecha: info.fecha,
      time0:info.time0,
      time2:info.time2,
      subactividad:info.subactividad,
      actividad:info.actividad,
      id:info.id,
      usuario:info.usuario,
      mins:info.mins,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    //return this.http.post(global.ruta + ruta, {}, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });

    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  download(info: any): Observable<HttpResponse<Blob>> {
    this.ruta = 'actividades/download';


    let body = JSON.stringify({
      
      time0:info.time0,
      time2:info.time2,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });

    return this.http.post(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });
    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  getheaderbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'actividades/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  /*
  getsubactbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'actividades/idsub';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  */
  insert(actividad,comentario, array, subactop): Observable<HttpResponse<any>> {
    this.ruta = 'actividades/crear';
    let body = JSON.stringify({
      actividad:actividad,
      comentario:comentario,
      subactop:subactop,
      subactividades: array,
      //estado:1,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarheader(actividad,comentario, array,id,estado,abbanco): Observable<HttpResponse<any>> {
    this.ruta = 'actividades/actualizarheader';
    let body = JSON.stringify({
      id:id,
      actividad:actividad,
      comentario: comentario,
      subactividades:array,
      abbanco:abbanco,
      //estado:1,
      estado: estado ,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  
}