import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceListsComponent } from './presence-lists.component';

describe('PresenceListsComponent', () => {
  let component: PresenceListsComponent;
  let fixture: ComponentFixture<PresenceListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresenceListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresenceListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
