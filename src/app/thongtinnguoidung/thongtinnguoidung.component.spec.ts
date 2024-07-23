import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinnguoidungComponent } from './thongtinnguoidung.component';

describe('ThongtinnguoidungComponent', () => {
  let component: ThongtinnguoidungComponent;
  let fixture: ComponentFixture<ThongtinnguoidungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongtinnguoidungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThongtinnguoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
