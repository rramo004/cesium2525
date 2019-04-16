import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlaydialogComponent } from './overlaydialog.component';

describe('OverlaydialogComponent', () => {
  let component: OverlaydialogComponent;
  let fixture: ComponentFixture<OverlaydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlaydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlaydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
