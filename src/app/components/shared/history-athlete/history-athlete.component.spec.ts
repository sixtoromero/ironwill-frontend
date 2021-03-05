import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAthleteComponent } from './history-athlete.component';

describe('HistoryAthleteComponent', () => {
  let component: HistoryAthleteComponent;
  let fixture: ComponentFixture<HistoryAthleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAthleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
