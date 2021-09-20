import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidioComponent } from './presidio.component';

describe('PresidioComponent', () => {
  let component: PresidioComponent;
  let fixture: ComponentFixture<PresidioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
