import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from "../../global";
import { DashboardService } from '../apis/dashboard.service';



@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private ruta = '';
  constructor(private http: HttpClient,
    private dashboardService: DashboardService) { }

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
      ciudad: info.nciudad,
      countenlaces:info.countenlaces,
      countinv:info.countinv,
      tipo: info.ntipo,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listagenciastickets(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'agencia/tickets';
    let body = JSON.stringify({
      nombre: info.nombre,
      idLink: info.idLink,
      estado: info.estado,
      ciudad: info.ciudad,
      tipo: info.tipo,
      idproveedor: info.idproveedor,
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
      idLink:info.idLink,
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
  //PROBLEMAS
  listproblemas(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'problema/list';
    let body = JSON.stringify({
      nombre: info.nombre,
      lan: info.lan,
      estado: info.estado,
      pageSize: global.pageSize,
      pageIndex: info.pindex,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  listproblemasNombre(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'problema/nombre';
    let body = JSON.stringify({
      nombre: info.nombre,
      lan: info.lan,
      estado: info.estado,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
  }
  getproblemabyid(n: number): Observable<HttpResponse<any>> {
    this.ruta = 'problema/id';
    let body = JSON.stringify({
      id: n,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  insertproblema(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'problema/crear';
    let body = JSON.stringify({
      nombre: info,
      lan: info.lan? 1 : 0,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }
  editarproblema(info: any): Observable<HttpResponse<any>> {
    this.ruta = 'problema/actualizar';
    let body = JSON.stringify({
      nombre: info.nombre,
      lan: info.lan? 1 : 0,
      estado: info.estado,
      id: info.id,
      username: localStorage.getItem("username")
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
  }

    //Actividades
    listact(info: any): Observable<HttpResponse<any>> {
      this.ruta = 'configact/list';
      let body = JSON.stringify({
        nombre: info.nombre,
        estado: info.estado,
        pageSize: global.pageSize,
        pageIndex: info.pindex,
        username: localStorage.getItem("username")
      });
      return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    }
    listnombAct(info: any): Observable<HttpResponse<any>> {
      this.ruta = 'configact/nombAct';
      let body = JSON.stringify({
        nombre: info.nombre,
        username: localStorage.getItem("username")
      });
      return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    }
    listnombSubact(info: any): Observable<HttpResponse<any>> {
      this.ruta = 'configact/nombSubact';
      let body = JSON.stringify({
        nombre: info.nombre,
        username: localStorage.getItem("username")
      });
      return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq, observe: 'response' });
    }
    getactbyid(n: number): Observable<HttpResponse<any>> {
      this.ruta = 'configact/id';
      let body = JSON.stringify({
        id: n,
        username: localStorage.getItem("username")
      });
      return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
    }
    getactopbyid(id: number, op:number): Observable<HttpResponse<any>> {
      this.ruta = 'configact/opcion';
      let body = JSON.stringify({
        id: id,
        subactop:op,
        username: localStorage.getItem("username")
      });
      return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
    }
    insertact(info: string, varform:any): Observable<HttpResponse<any>> {
      this.ruta = 'configact/crear';
      let body = JSON.stringify({
        nombre: info,
        editmins:varform.editmins,
        hassub:varform.hassub,
        issub:varform.issub,
        mins:varform.minutos,
        subact0:varform.subact0,
        subact1:varform.subact1,
        subact2:varform.subact2,
        subact3:varform.subact3,
        username: localStorage.getItem("username")
      });
      return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
    }
    editaract(info: any, varform:any): Observable<HttpResponse<any>> {
      this.ruta = 'configact/actualizar';
      let body = JSON.stringify({
        nombre: info.nombre,
        estado: info.estado,
        id: info.id,
        editmins:varform.editmins ? 1:0,
        hassub:varform.hassub ? 1:0,
        issub:varform.issub ? 1:0,
        mins:varform.minutos,
        subact0:varform.subact0,
        subact1:varform.subact1,
        subact2:varform.subact2,
        subact3:varform.subact3,
        username: localStorage.getItem("username")
      });
      return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq });
    }
  

}
