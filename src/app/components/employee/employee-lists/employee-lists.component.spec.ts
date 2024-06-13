import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListsComponent } from './employee-lists.component';

describe('EmployeeListsComponent', () => {
  let component: EmployeeListsComponent;
  let fixture: ComponentFixture<EmployeeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
