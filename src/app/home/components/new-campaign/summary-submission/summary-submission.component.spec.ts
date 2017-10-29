import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySubmissionComponent } from './summary-submission.component';

describe('SummarySubmissionComponent', () => {
  let component: SummarySubmissionComponent;
  let fixture: ComponentFixture<SummarySubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
