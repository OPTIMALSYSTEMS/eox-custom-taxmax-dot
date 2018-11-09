import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIndicatorComponent } from './upload-indicator.component';

describe('UploadIndicatorComponent', () => {
  let component: UploadIndicatorComponent;
  let fixture: ComponentFixture<UploadIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
