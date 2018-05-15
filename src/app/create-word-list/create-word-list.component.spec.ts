import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordListComponent } from './create-word-list.component';

describe('CreateWordListComponent', () => {
  let component: CreateWordListComponent;
  let fixture: ComponentFixture<CreateWordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
