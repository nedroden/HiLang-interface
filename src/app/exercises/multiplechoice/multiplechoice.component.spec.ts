import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplechoiseComponent } from './multiplechoise.component';

describe('MultiplechoiseComponent', () => {
  let component: MultiplechoiseComponent;
  let fixture: ComponentFixture<MultiplechoiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplechoiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplechoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
