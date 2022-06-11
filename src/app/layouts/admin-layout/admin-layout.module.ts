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
import { TableListComponent } from '../../table/table-list.component';
import { FormComponentEdit2 } from '../../table/table-list.component';
import { HistoryComponent } from '../../table/history-component';
import { EnlacesComponent } from '../../enlaces/enlaces.component';
import { FormComponentEnlaces } from '../../enlaces/enlaces.component';
import { TicketsComponent } from '../../tickets/tickets.component';
import { FormComponentTickets } from '../../tickets/tickets.component';
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
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectFilterModule } from 'mat-select-filter';





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
    MatSelectFilterModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatStepperModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    DataBaseComponent,
    AdministracionComponent,
    FormComponent,
    FormComponentEdit2,
    HistoryComponent,
    FormHardwareComponent,
    FormComponentEdit,
    FormHardwareEditComponent,
    FormModeloComponent,
    EnlacesComponent,
    TicketsComponent,
    FormComponentTickets,
    FormComponentEnlaces
  ]
})

export class AdminLayoutModule {

}
