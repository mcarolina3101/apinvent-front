import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs-compat/operator/ignoreElements';
import * as global from "../../global";



@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private ruta = '';
  constructor(private http: HttpClient) { }

  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json"
  });
  //AMBIENTES
  listambientes(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listambientesNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getambientebyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertambiente(info: string): Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/crear';
    let body = JSON.stringify({
      nombre: info,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarambiente(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //ENTIDADES
  listentidades(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'entidades/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listentidadesNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'entidades/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getentidadesbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'entidades/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertentidades(info: string): Observable<HttpResponse<any>> {
    this.ruta = 'entidades/crear';
    let body = JSON.stringify({
      nombre: info,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarentidades(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'entidades/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //CIUDADES
  listciudades(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listciudadesNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getciudadbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertciudad(info: string): Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/crear';
    let body = JSON.stringify({
      nombre: info,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarciudad(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //TIPOS
  listtipos(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'tipo/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listtiposNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'tipo/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      idLink: info.idlink,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listtiposCiudades(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'tipo/ciudades';
    let body = JSON.stringify({
      ciudades: info.ciudades,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  gettipobyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'tipo/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  inserttipo(info: string, info2: number): Observable<HttpResponse<any>> {
    this.ruta = 'tipo/crear';
    let body = JSON.stringify({
      nombre: info,
      idLink: info2,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editartipo(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'tipo/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //AGENCIAS
  listagencias(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'agencia/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      idLink: info.idLink,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listagenciasNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'agencia/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      idLink: info.idlink,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listagenciasNombre2(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'agencia/nombre2';
    let body = JSON.stringify({
      nombre: info.nombre,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getagenciabyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'agencia/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertagencia(info: string, info2: number): Observable<HttpResponse<any>> {
    this.ruta = 'agencia/crear';
    let body = JSON.stringify({
      nombre: info,
      idLink: info2,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editaragencia(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'agencia/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //HARDWARE
  listhardware(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'hardware/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      idLink: info.idLink,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listhardwareOpciones(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'hardware/listopciones';
    let body = JSON.stringify({
      estado: info.estado,
      idLink: info.idLink,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listhardwarebyNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'hardware/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      idLink: info.idLink,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  gethardwarebyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'hardware/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  inserthardware(info: string, info2: number): Observable<HttpResponse<any>> {
    this.ruta = 'hardware/crear';
    let body = JSON.stringify({
      nombre: info,
      idLink: info2,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarhardware(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'hardware/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      idLink: info.idLink,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //MODELOS
  listmodelos(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'modelo/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      idEquipo: info.idEquipo,
      idMarca: info.idMarca,
      idFlash: info.idFlash,
      idRam: info.idRam,
      fecha: info.fecha,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listmodelosNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'modelo/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getmodelobyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'modelo/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertmodelo(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'modelo/crear';
    let body = JSON.stringify({
      nombre: info.nombre,
      idEquipo: info.idEquipo,
      idMarca: info.idMarca,
      idFlash: info.idFlash,
      idRam: info.idRam,
      fecha: info.fecha,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarmodelo(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'modelo/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      idEquipo: info.idEquipo,
      idMarca: info.idMarca,
      idFlash: info.idFlash,
      idRam: info.idRam,
      fecha: info.fecha,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //ORION
  listorion(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'orion/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listorionNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'orion/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getorionbyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'orion/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertorion(info: string): Observable<HttpResponse<any>> {
    this.ruta = 'orion/crear';
    let body = JSON.stringify({
      nombre: info,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarorion(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'orion/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //PROPIETARIOS
  listpropietarios(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'propietario/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listpropietariosNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'propietario/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getpropietariobyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'propietario/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertpropietario(info: string): Observable<HttpResponse<any>> {
    this.ruta = 'propietario/crear';
    let body = JSON.stringify({
      nombre: info,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarpropietario(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'propietario/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  //INVENTARIO
  listinventario(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'inventario/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      ip: info.ip == "" ? null : info.ip,
      serie: info.serie == "" ? null : info.serie,
      so: info.so == "" ? null : info.so,
      inventario: info.inv == "" ? null : info.inv,
      piso: info.piso,
      rack: info.rack,
      critico: info.critico,
      opmger: info.opmger,
      bpac: info.bpac,
      util: info.util,
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
      id:info.id,
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
      fechabanco:info.adicionalFormG.value.fechab,
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
      fechabanco:info.fechabanco,
      critico: info.networkFormG.value.ecritico ? 1 : 0,
      opmger: info.adicionalFormG.value.opm ? 1 : 0,
      idAmbiente: info.ambienteFormG.value.ambiente.id,
      nombre: info.modeloFormG.value.nombre,
      idModelo: info.modeloFormG.controls["modelo"].value.id,
      idPropietario: info.adicionalFormG.controls["propietario"].value.id, 
      idOrion:info.networkFormG.controls["orion"].value == undefined? undefined : info.networkFormG.controls["orion"].value.id, 
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
      tunel: info.ip == "" ? null : info.ip,
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
      username: localStorage.getItem("username")

    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
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
  insertusuario(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'usuario/crear';
    let body = JSON.stringify({
      usuario: info.usuario,
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
