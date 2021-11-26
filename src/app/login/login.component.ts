import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //providers: [ AuthService ]
})
export class LoginComponent implements OnInit, OnDestroy {
  public invalidCredentialMsg: string;
  public username: string;
  public password: string;
  public user: any;
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  async check() {
    this.autenticacionService.loginUsuario(this.username, this.password).subscribe(resp => {
      if (resp["info"].length == 1) {
        this.user = resp["info"][0];
      }
      const keys = resp.headers;
      if (this.user != undefined) {
        if (this.user.estado) {
          localStorage.setItem("username", this.user.usuario);
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 401) {

        setTimeout(() => {
          //this.mensaje.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión ha caducado, será redirigido al portal. Por favor, recargue la página y vuelva a iniciar sesión', life: 5500 });
        }, 4500);
      }
      else if (err.status === 400) {
        //this.mensaje.add({ severity: 'warn', summary: 'Alerta', detail: err.error.log, life: 5500 });
      }
      else {
        //this.mensaje.add({ severity: 'error', summary: 'Error', detail: err.error.log, life: 5500 });
      }
    });

  }

  

}
