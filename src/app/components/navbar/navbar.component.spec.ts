import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponet } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponet;
  let fixture: ComponentFixture<NavbarComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
