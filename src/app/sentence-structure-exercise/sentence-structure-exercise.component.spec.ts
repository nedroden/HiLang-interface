import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceStructureExerciseComponent } from './sentence-structure-exercise.component';

describe('SentenceStructureExerciseComponent', () => {
  let component: SentenceStructureExerciseComponent;
  let fixture: ComponentFixture<SentenceStructureExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentenceStructureExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceStructureExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
