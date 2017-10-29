import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsImportComponent } from './cards-import.component';

describe('CardsImportComponent', () => {
  let component: CardsImportComponent;
  let fixture: ComponentFixture<CardsImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
