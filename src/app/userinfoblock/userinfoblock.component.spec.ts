import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoblockComponent } from './userinfoblock.component';

describe('UserinfoblockComponent', () => {
  let component: UserinfoblockComponent;
  let fixture: ComponentFixture<UserinfoblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinfoblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfoblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
