import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService  {
  todayf = '';
  today1f = '';
  util = undefined;
  fechalimite = undefined;
  fecharango = undefined;

  constructor(){}

  settodayf(val){
    this.todayf=val;
  }

  settoday1f(val){
    this.today1f=val;
  }

  setutil(val){
    this.util = val
  }

  setfechalimite(val){
    this.fechalimite = val
  }

  setfecharango(val){
    this.fecharango = val
  }


}