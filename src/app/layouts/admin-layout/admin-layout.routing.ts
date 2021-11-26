import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { DataBaseComponent } from '../../data-base/data-base.component';
import { NewDeviceComponent } from '../../new-device/new-device.component';
import { AutenticacionService } from 'app/servicios/autenticacion/autenticacion.service';
import { AdministracionComponent } from '../../Administracion/administracion.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',    component: DashboardComponent, canActivate : [AutenticacionService] },
    { path: 'inventary',    component: TableListComponent, canActivate : [AutenticacionService]  },
    { path: 'data-base',    component: DataBaseComponent, canActivate : [AutenticacionService]  },
    //{ path: 'add-device',   component: NewDeviceComponent, canActivate : [AutenticacionService] },
    { path: 'admin',        component: AdministracionComponent, canActivate : [AutenticacionService] }

];
