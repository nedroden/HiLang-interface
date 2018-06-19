import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreExerciseComponent } from './pre-exercise.component';

describe('PreExerciseComponent', () => {
  let component: PreExerciseComponent;
  let fixture: ComponentFixture<PreExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
