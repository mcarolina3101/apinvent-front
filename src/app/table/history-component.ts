import { Component, OnInit, Inject } from '@angular/core';
import { InformacionService } from '../servicios/informacion/informacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map, startWith } from 'rxjs/operators';
declare var $: any;
import { animate, state, style, transition, trigger } from '@angular/animations';

import { TableListComponent } from './table-list.component';


@Component({
  selector: 'app-history',
  templateUrl: './history.html',
  styleUrls: ['./table-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0 ' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class HistoryComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  public dataDevices: any[] = [];
  public pageIndex = 0;
  public totalenght = 0;
  public infoeq: any = { "id": 0, "pindex": 1 };

  expandedElement: any | null;

  public displayedColumns2: string[] = [
    'demo-usuario',
    'demo-ambiente',
    'demo-agencia',
    'demo-modelo',
    'demo-orion',
    'demo-propietario',
    'demo-fecha'
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns2, 'expand'];



  ngOnInit() {
    this.infoeq.id = this.data.id;
    this.obtenerInfoInventario();
  }

  constructor(
    public dialogRef: MatDialogRef<HistoryComponent>,
    breakpointObserver: BreakpointObserver,

    private informacionService: InformacionService,
    @Inject(MAT_DIALOG_DATA) public data: TableListComponent) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

  }

  obtenerInfoInventario() {
    this.informacionService.listlogs(this.infoeq).subscribe(resp => {
      this.dataDevices = resp.body["info"];
      console.log(this.dataDevices)
      const keys = resp.headers;
      this.totalenght = Number(keys.getAll("totalresultados")[0].toString());
    }, err => {
      if (err.status === 400) {
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

  Page(event) {
    this.pageIndex = event.pageIndex;
    this.infoeq.pindex = this.pageIndex + 1;
    this.obtenerInfoInventario();
  }



}