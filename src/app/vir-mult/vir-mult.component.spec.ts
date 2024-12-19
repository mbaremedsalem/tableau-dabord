import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirMultComponent } from './vir-mult.component';

describe('VirMultComponent', () => {
  let component: VirMultComponent;
  let fixture: ComponentFixture<VirMultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirMultComponent]
    });
    fixture = TestBed.createComponent(VirMultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
