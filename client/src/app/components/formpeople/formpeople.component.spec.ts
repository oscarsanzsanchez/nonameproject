import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpeopleComponent } from './formpeople.component';

describe('FormpeopleComponent', () => {
  let component: FormpeopleComponent;
  let fixture: ComponentFixture<FormpeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
