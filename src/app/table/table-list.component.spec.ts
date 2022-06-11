import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponentEdit2} from './table-list.component';
import { TableListComponent } from './table-list.component';
import { HistoryComponent } from './history-component';


describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('FormComponentEdit2', () => {
  let component: FormComponentEdit2;
  let fixture: ComponentFixture<FormComponentEdit2>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponentEdit2,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponentEdit2);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
