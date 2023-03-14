import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeletedComponent } from './list-deleted.component';

describe('ListDeletedComponent', () => {
  let component: ListDeletedComponent;
  let fixture: ComponentFixture<ListDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
