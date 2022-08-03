import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as global from "../../global";
//import sql from "mssql";

@Injectable()
export class UsuariosService {

  constructor(private router: Router) { }

  getUsuarios(u: string, p: string): Observable<any> {
    let res: any;
    let queryst = "SELECT * FROM Usuario LIKE '%%' \n"
    async () => {
      try {
          // make sure that any items are correctly URL encoded in the connection string
          //await sql.connect('mssql://username:password@localhost/database')
          //const result = await sql.query( "select * from mytable where id = ${value}")
          //const result = await sql.query(queryst)
          //console.dir(result)
      } catch (err) {
          // ... error checks
      }
  }

    return res;
  }
}
