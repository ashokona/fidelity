import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageImportComponent } from './image-import.component';

describe('ImageImportComponent', () => {
  let component: ImageImportComponent;
  let fixture: ComponentFixture<ImageImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
