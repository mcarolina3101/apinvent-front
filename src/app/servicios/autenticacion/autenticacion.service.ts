import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as global from "../../global";

@Injectable()
export class AutenticacionService implements CanActivate {
  private ruta = '';
  private cabeceraReq: any = new HttpHeaders({
    'Content-type': "application/json"
    });
   
  constructor(private router : Router, private http: HttpClient){}

  loginUsuario(u:string,p:string):Observable<HttpResponse<any>> {
    this.ruta = 'usuario/login';
    let body = JSON.stringify({ 
      usuario:u,
      password:p
    });
    return this.http.post<any>(global.ruta + this.ruta, body, { headers: this.cabeceraReq});
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(localStorage.getItem('username')!== null && localStorage.getItem('username')!=="undefined" ){
        //this.router.navigate(['/login']);
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

}