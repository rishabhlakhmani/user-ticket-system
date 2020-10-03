import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNavgationComponent } from './ticket-navgation.component';

describe('TicketNavgationComponent', () => {
  let component: TicketNavgationComponent;
  let fixture: ComponentFixture<TicketNavgationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNavgationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNavgationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
