import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardpopupComponent } from './add-cardpopup.component';

describe('AddCardpopupComponent', () => {
  let component: AddCardpopupComponent;
  let fixture: ComponentFixture<AddCardpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCardpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
