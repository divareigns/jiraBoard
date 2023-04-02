import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListpopupComponent } from './add-listpopup.component';

describe('AddListpopupComponent', () => {
  let component: AddListpopupComponent;
  let fixture: ComponentFixture<AddListpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
