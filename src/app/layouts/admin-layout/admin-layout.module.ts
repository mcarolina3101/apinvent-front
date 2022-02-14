import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DataBaseComponent } from '../../data-base/data-base.component';
import { AdministracionComponent } from '../../Administracion/administracion.component';
import { FormComponent } from '../../data-base/data-base.component';
import { FormComponentEdit } from '../../data-base/data-base.component';
import { FormHardwareComponent } from '../../data-base/data-base.component';
import { FormModeloComponent } from '../../data-base/data-base.component';
import { FormHardwareEditComponent } from '../../data-base/data-base.component';
import { NewDeviceComponent } from '../../new-device/new-device.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { FormComponentEdit2 } from '../../table-list/table-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatRippleModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatStepperModule,
    MatExpansionModule,
    MatDatepickerModule
  ],
  declarations: [
    DashboardComponent,
    NewDeviceComponent,
    TableListComponent,
    DataBaseComponent,
    AdministracionComponent,
    FormComponent,
    FormComponentEdit2,
    FormHardwareComponent,
    FormComponentEdit,
    FormHardwareEditComponent,
    FormModeloComponent
  ]
})

export class AdminLayoutModule {

}
