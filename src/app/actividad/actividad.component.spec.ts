import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponentActividad} from './actividad.component';
import { ActividadComponent } from './actividad.component';

describe('ActividadComponent', () => {
  let component: ActividadComponent;
  let fixture: ComponentFixture<ActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('FormComponentActividad', () => {
  let component: FormComponentActividad;
  let fixture: ComponentFixture<FormComponentActividad>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponentActividad,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponentActividad);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
