import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceStructureComponentComponent } from './sentence-structure-component.component';

describe('SentenceStructureComponentComponent', () => {
  let component: SentenceStructureComponentComponent;
  let fixture: ComponentFixture<SentenceStructureComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentenceStructureComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceStructureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
