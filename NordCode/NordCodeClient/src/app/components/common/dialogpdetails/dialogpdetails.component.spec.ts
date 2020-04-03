import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpdetailsComponent } from './dialogpdetails.component';

describe('DialogpdetailsComponent', () => {
  let component: DialogpdetailsComponent;
  let fixture: ComponentFixture<DialogpdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogpdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
