import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerdialogComponent } from './layerdialog.component';

describe('LayerdialogComponent', () => {
  let component: LayerdialogComponent;
  let fixture: ComponentFixture<LayerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
