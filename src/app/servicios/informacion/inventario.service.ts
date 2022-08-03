import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from "../../global";
import { DashboardService } from '../apis/dashboard.service';



@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private ruta = '';
  constructor(private http: HttpClient,
    private dashboardService: DashboardService) { }

  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json"
  });
  //INVENTARIO
  listinventario(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'inventario/list';
    let fin;
    let ini
    if (this.dashboardService.fechalimite == 0 && this.dashboardService.fecharango == 1) {
      ini = this.dashboardService.todayf
      fin = this.dashboardService.today1f
    } else if (this.dashboardService.fechalimite == 1 && this.dashboardService.fecharango == 0) {
      fin = this.dashboardService.todayf
      ini = undefined
    } else {
      fin = undefined
      ini = undefined
    }
    if (fin == undefined) {
      fin = info.fechafin
    } if (ini == undefined) {
      ini = info.fechaini
    }


    let body = JSON.stringify({
      nombre: info.nombre,
      ip: info.ip == "" ? null : info.ip,
      serie: info.serie == "" ? null : info.serie,
      so: info.so == "" ? null : info.so,
      inventario: info.inv == "" ? null : info.inv,
      piso: info.piso,
      rack: info.rack,
      util: this.dashboardService.util != undefined ? this.dashboardService.util : info.util,
      ubicacion: info.ubicacion,
      critico: info.critico,
      opmger: info.opmger,
      bpac: info.bpac,

      fechafin: fin,
      fechaini: ini,


      fecha: info.fecha == "" ? null : info.fecha,
      nAmbiente: info.nAmbiente == "" ? null : info.nAmbiente,
      nModelo: info.nModelo == "" ? null : info.nModelo,
      nEquipo: info.nEquipo == "" ? null : info.nEquipo,
      nPropietario: info.nPropietario == "" ? null : info.nPropietario,
      norion: info.norion == "" ? null : info.norion,
      nagencia: info.nagencia == "" ? null : info.nagencia,
      ntipo: info.ntipo == "" ? null : info.ntipo,
      nciudad: info.nciudad == "" ? null : info.nciudad,
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
    this.ruta = 'inventario/logs';
    let body = JSON.stringify({
      id: info.id,
      fecha: info.fecha == "" ? null : info.fecha,
      nAmbiente: info.nAmbiente == "" ? null : info.nAmbiente,
      nModelo: info.nModelo == "" ? null : info.nModelo,
      nEquipo: info.nEquipo == "" ? null : info.nEquipo,
      nPropietario: info.nPropietario == "" ? null : info.nPropietario,
      norion: info.norion == "" ? null : info.norion,
      nagencia: info.nagencia == "" ? null : info.nagencia,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    //return this.http.post(global.ruta + ruta, {}, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });

    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  downloadinv(info: any): Observable<HttpResponse<Blob>> {
    this.ruta = 'inventario/download';
    let fin;
    let ini
    if (this.dashboardService.fechalimite == 0 && this.dashboardService.fecharango == 1) {
      ini = this.dashboardService.todayf
      fin = this.dashboardService.today1f
    } else if (this.dashboardService.fechalimite == 1 && this.dashboardService.fecharango == 0) {
      fin = this.dashboardService.todayf
      ini = undefined
    } else {
      fin = undefined
      ini = undefined
    }

    if (fin == undefined) {
      fin = info.fechafin
    } if (ini == undefined) {
      ini = info.fechaini
    }



    let body = JSON.stringify({
      nombre: info.nombre,
      ip: info.ip == "" ? null : info.ip,
      serie: info.serie == "" ? null : info.serie,
      so: info.so == "" ? null : info.so,
      inventario: info.inv == "" ? null : info.inv,
      piso: info.piso,
      rack: info.rack,
      util: this.dashboardService.util != undefined ? this.dashboardService.util : info.util,
      ubicacion: info.ubicacion,
      critico: info.critico,
      opmger: info.opmger,
      bpac: info.bpac,

      fechafin: fin,
      fechaini: ini,


      fecha: info.fecha == "" ? null : info.fecha,
      nAmbiente: info.nAmbiente == "" ? null : info.nAmbiente,
      nModelo: info.nModelo == "" ? null : info.nModelo,
      nEquipo: info.nEquipo == "" ? null : info.nEquipo,
      nPropietario: info.nPropietario == "" ? null : info.nPropietario,
      norion: info.norion == "" ? null : info.norion,
      nagencia: info.nagencia == "" ? null : info.nagencia,
      ntipo: info.ntipo == "" ? null : info.ntipo,
      nciudad: info.nciudad == "" ? null : info.nciudad,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });

    return this.http.post(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob' });
    //return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  getinventariobyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'inventario/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  dashboard(): Observable<HttpResponse<any>> {
    this.ruta = 'inventario/dashboard';
    let body = JSON.stringify({
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertinventario(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'inventario/crear';
    let body = JSON.stringify({
      //id:info.idedit,      
      ip: info.networkFormG.value.ip,
      so: info.networkFormG.value.so,
      serie: info.adicionalFormG.value.serie,
      inventario: info.adicionalFormG.value.inv,
      fechabanco: info.adicionalFormG.value.fechab,
      critico: info.networkFormG.value.ecritico ? 1 : 0,
      opmger: info.adicionalFormG.value.opm ? 1 : 0,
      idAmbiente: info.ambienteFormG.value.ambiente.id,
      nombre: info.modeloFormG.value.nombre,
      idModelo: info.modeloFormG.value.modelo.id,
      idPropietario: info.adicionalFormG.value.propietario.id,
      idOrion: info.networkFormG.value.orion == undefined ? null : info.networkFormG.value.orion.id,
      agencia: info.ubicacionFormG.value.ag.id,
      tipo: info.ubicacionFormG.value.tipo.id,
      ciudad: info.ubicacionFormG.value.city.id,
      piso: info.ubicacionFormG.value.piso,
      rack: info.ubicacionFormG.value.rack,
      util: info.adicionalFormG.value.util == undefined ? 0 : info.ubicacionFormG.value.util,
      //estado:1,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarinventario(info: any): Observable<HttpResponse<any>> {

    this.ruta = 'inventario/actualizar';
    let body = JSON.stringify({
      //nombre:info.nombre,
      //estado:info.estado,
      id: info.idedit,
      ip: info.networkFormG.value.ip,
      so: info.networkFormG.value.so,
      serie: info.adicionalFormG.controls["serie"].value,
      inventario: info.adicionalFormG.controls["inv"].value,
      fechabanco: info.fechabanco,
      critico: info.networkFormG.value.ecritico ? 1 : 0,
      opmger: info.adicionalFormG.value.opm ? 1 : 0,
      idAmbiente: info.ambienteFormG.value.ambiente.id,
      nombre: info.modeloFormG.value.nombre,
      idModelo: info.modeloFormG.controls["modelo"].value.id,
      idPropietario: info.adicionalFormG.controls["propietario"].value.id,
      idOrion: info.networkFormG.controls["orion"].value == undefined ? undefined : info.networkFormG.controls["orion"].value.id,
      agencia: info.ubicacionFormG.value.ag.id,
      tipo: info.ubicacionFormG.value.tipo.id,
      ciudad: info.ubicacionFormG.value.city.id,
      piso: info.ubicacionFormG.value.piso,
      rack: info.ubicacionFormG.value.rack,
      util: info.ubicacionFormG.value.util == undefined ? 0 : info.ubicacionFormG.value.util,
      estado: info.estado,
      username: localStorage.getItem("username")

    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }

}