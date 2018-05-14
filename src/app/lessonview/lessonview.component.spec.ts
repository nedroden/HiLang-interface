import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonviewComponent } from './lessonview.component';

describe('LessonviewComponent', () => {
  let component: LessonviewComponent;
  let fixture: ComponentFixture<LessonviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
