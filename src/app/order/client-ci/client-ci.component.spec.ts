import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCiComponent } from './client-ci.component';

describe('ClientCiComponent', () => {
  let component: ClientCiComponent;
  let fixture: ComponentFixture<ClientCiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
