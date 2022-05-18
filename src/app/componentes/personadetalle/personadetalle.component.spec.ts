import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonadetalleComponent } from './personadetalle.component';

describe('PersonadetalleComponent', () => {
  let component: PersonadetalleComponent;
  let fixture: ComponentFixture<PersonadetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonadetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
