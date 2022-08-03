import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

//import { AuthService } from '../service/auth.service';
declare var $:any
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
      if (resp["info"].length>0) {
        this.user = resp["info"][0];
      }
      
      const keys = resp.headers;
      if (this.user != undefined) {
        if (this.user.estado) {
          localStorage.setItem("username", this.user.usuario);
          localStorage.setItem("perfil", this.user.perfil);
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
      //this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 400) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "notifications",
          message: err.error.log
        }, {
          type: "warning",
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });

  }

  

}
