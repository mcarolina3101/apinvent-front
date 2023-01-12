import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table/table-list.component';
import { DataBaseComponent } from '../../data-base/data-base.component';
import { EnlacesComponent } from '../../enlaces/enlaces.component';
import { TicketsComponent } from '../../tickets/tickets.component';
import { ActividadComponent } from '../../actividad/actividad.component';
import { AutenticacionService } from 'app/servicios/autenticacion/autenticacion.service';
import { AdministracionComponent } from '../../Administracion/administracion.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',    component: DashboardComponent, canActivate : [AutenticacionService] },
    { path: 'equipos',    component: TableListComponent, canActivate : [AutenticacionService]  },
    { path: 'data-base',    component: DataBaseComponent, canActivate : [AutenticacionService]  },
    { path: 'enlaces',    component: EnlacesComponent, canActivate : [AutenticacionService]  },
    { path: 'tickets',    component: TicketsComponent, canActivate : [AutenticacionService]  },
    { path: 'actividad',    component: ActividadComponent, canActivate : [AutenticacionService]  },
    { path: 'admin',        component: AdministracionComponent, canActivate : [AutenticacionService] }

];
