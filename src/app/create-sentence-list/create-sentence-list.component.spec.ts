import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSentenceListComponent } from './create-sentence-list.component';

describe('CreateSentenceListComponent', () => {
  let component: CreateSentenceListComponent;
  let fixture: ComponentFixture<CreateSentenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSentenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSentenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
