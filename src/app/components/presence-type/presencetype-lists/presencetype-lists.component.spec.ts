import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencetypeListsComponent } from './presencetype-lists.component';

describe('PresencetypeListsComponent', () => {
  let component: PresencetypeListsComponent;
  let fixture: ComponentFixture<PresencetypeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresencetypeListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresencetypeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
