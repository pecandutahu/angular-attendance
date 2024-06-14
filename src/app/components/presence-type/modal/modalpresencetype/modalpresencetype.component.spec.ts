import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpresencetypeComponent } from './modalpresencetype.component';

describe('ModalpresencetypeComponent', () => {
  let component: ModalpresencetypeComponent;
  let fixture: ComponentFixture<ModalpresencetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalpresencetypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalpresencetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
