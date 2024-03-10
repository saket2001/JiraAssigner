import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeammatesPageComponent } from './add-teammates-page.component';

describe('AddTeammatesPageComponent', () => {
  let component: AddTeammatesPageComponent;
  let fixture: ComponentFixture<AddTeammatesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeammatesPageComponent]
    });
    fixture = TestBed.createComponent(AddTeammatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
