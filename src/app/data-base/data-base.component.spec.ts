import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModeloComponent} from './data-base.component';
import { DataBaseComponent} from './data-base.component';
import { FormComponent} from './data-base.component';
import { FormComponentEdit} from './data-base.component';
import { FormHardwareComponent} from './data-base.component';
import { FormHardwareEditComponent} from './data-base.component';

describe('DataBaseComponent', () => {
  let component: DataBaseComponent;
  let fixture: ComponentFixture<DataBaseComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBaseComponent,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('FormHardwareComponent', () => {
  let component: FormHardwareComponent;
  let fixture: ComponentFixture<FormHardwareComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHardwareComponent,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('FormComponentEdit', () => {
  let component: FormComponentEdit;
  let fixture: ComponentFixture<FormComponentEdit>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponentEdit,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponentEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('FormHardwareEditComponent', () => {
  let component: FormHardwareComponent;
  let fixture: ComponentFixture<FormHardwareEditComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHardwareEditComponent,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHardwareEditComponent);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('FormModeloComponent', () => {
  let component: FormHardwareComponent;
  let fixture: ComponentFixture<FormModeloComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModeloComponent,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModeloComponent);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
