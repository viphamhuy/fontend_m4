import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHomepageComponent } from './login-homepage.component';

describe('LoginHomepageComponent', () => {
  let component: LoginHomepageComponent;
  let fixture: ComponentFixture<LoginHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
