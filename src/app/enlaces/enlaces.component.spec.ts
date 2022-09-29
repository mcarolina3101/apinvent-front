import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponentEnlaces} from './enlaces.component';
import { EnlacesComponent } from './enlaces.component';
import { HistoryComponent } from './history-component';

describe('EnlacesComponent', () => {
  let component: EnlacesComponent;
  let fixture: ComponentFixture<EnlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('FormComponentEnlaces', () => {
  let component: FormComponentEnlaces;
  let fixture: ComponentFixture<FormComponentEnlaces>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponentEnlaces,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponentEnlaces);
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
