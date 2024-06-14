import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceModalComponent } from './presence-modal.component';

describe('PresenceModalComponent', () => {
  let component: PresenceModalComponent;
  let fixture: ComponentFixture<PresenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresenceModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
