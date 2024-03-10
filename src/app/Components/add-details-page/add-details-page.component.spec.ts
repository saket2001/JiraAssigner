import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailsPageComponent } from './add-details-page.component';

describe('AddDetailsPageComponent', () => {
  let component: AddDetailsPageComponent;
  let fixture: ComponentFixture<AddDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDetailsPageComponent]
    });
    fixture = TestBed.createComponent(AddDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
