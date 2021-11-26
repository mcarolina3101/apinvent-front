import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from "../../global";



@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private ruta = '';
  constructor(private http: HttpClient) { }

  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json",
    });
  
  //AMBIENTES
  listambientes(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }
  listambientesNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  getambientebyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  insertambiente(info:string):Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info
      });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarambiente(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'ambiente/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //CIUDADES
  listciudades(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listciudadesNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  getciudadbyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  insertciudad(info:string):Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarciudad(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'ciudad/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //TIPOS
  listtipos(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'tipo/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listtiposNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'tipo/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      idLink: info.idlink 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  gettipobyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'tipo/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  inserttipo(info:string,info2:number):Observable<HttpResponse<any>> {
    this.ruta = 'tipo/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info,
      idLink:info2
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editartipo(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'tipo/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //AGENCIAS
  listagencias(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'agencia/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      idLink:info.idLink,
      estado:info.estado,
      pageSize: 1000, 
      pageIndex: 1
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listagenciasNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'agencia/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      idLink: info.idlink 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  getagenciabyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'agencia/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  insertagencia(info:string, info2:number):Observable<HttpResponse<any>> {
    this.ruta = 'agencia/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info,
      idLink:info2
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editaragencia(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'agencia/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //HARDWARE
  listhardware(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'hardware/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      idLink:info.idLink,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listhardwarebyNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'hardware/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      idLink:info.idLink
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  gethardwarebyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'hardware/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  inserthardware(info:string, info2:number):Observable<HttpResponse<any>> {
    this.ruta = 'hardware/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info,
      idLink:info2
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarhardware(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'hardware/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      idLink: info.idLink,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //MODELOS
  listmodelos(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'modelo/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      idEquipo:info.idEquipo,
      idMarca:info.idMarca,
      idFlash:info.idFlash,
      idRam:info.idRam,
      fecha:info.fecha,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listmodelosNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'modelo/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  getmodelobyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'modelo/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  insertmodelo(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'modelo/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      idEquipo:info.idEquipo,
      idMarca:info.idMarca,
      idFlash:info.idFlash,
      idRam:info.idRam,
      fecha:info.fecha
      });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarmodelo(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'modelo/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      idEquipo:info.idEquipo,
      idMarca:info.idMarca,
      idFlash:info.idFlash,
      idRam:info.idRam,
      fecha:info.fecha,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //ORION
  listorion(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'orion/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listorionNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'orion/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  getorionbyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'orion/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  insertorion(info:string):Observable<HttpResponse<any>> {
    this.ruta = 'orion/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarorion(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'orion/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //PROPIETARIOS
  listpropietarios(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'propietario/list';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listpropietariosNombre(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'propietario/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  getpropietariobyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'propietario/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  insertpropietario(info:string):Observable<HttpResponse<any>> {
    this.ruta = 'propietario/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarpropietario(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'propietario/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      estado:info.estado,
      id:info.id
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //INVENTARIO
  listinventario(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'inventario/list';
    //console.log("login");
    let body = JSON.stringify({ 
      serie:info.serie,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }
  getinventariobyid(n:number):Observable<HttpResponse<any>> {
    this.ruta = 'inventario/id';
    let body = JSON.stringify({ 
      id:n
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //USUARIO
  listusuarios(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'usuario/list';
    //console.log("login");
    let body = JSON.stringify({ 
      usuario:info.nombre,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  insertusuario(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'usuario/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      usuario:info.usuario,
      perfil:info.perfil
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarusuario(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'usuario/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      id:info.id,
      usuario:info.usuario,
      perfil:info.perfil,
      estado:info.estado
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  //PERFIL
  listperfiles(info: any):Observable<HttpResponse<any>> {
    this.ruta = 'perfil/list';
    //console.log("login");
    let body = JSON.stringify({ 
      usuario:info.nombre,
      estado:info.estado,
      pageSize: global.pageSize, 
      pageIndex: info.pindex 
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response'});
  }

  listperfilesbyNombre(info: string):Observable<HttpResponse<any>> {
    this.ruta = 'perfil/nombre';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }  

  insertperfil(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'perfil/crear';
    //console.log("login");
    let body = JSON.stringify({ 
      nombre:info.nombre,
      administrar:info.administrar,
      crear:info.crear,
      editar:info.editar,
      eliminar:info.eliminar
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  editarperfil(info:any):Observable<HttpResponse<any>> {
    this.ruta = 'perfil/actualizar';
    //console.log("login");
    let body = JSON.stringify({ 
      id:info.id,
      nombre:info.nombre,
      administrar:info.administrar,
      crear:info.crear,
      editar:info.editar,
      eliminar:info.eliminar,
      estado:info.estado
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

}
