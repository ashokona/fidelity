import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCheckBoxComponent } from './table-check-box.component';

describe('TableCheckBoxComponent', () => {
  let component: TableCheckBoxComponent;
  let fixture: ComponentFixture<TableCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
