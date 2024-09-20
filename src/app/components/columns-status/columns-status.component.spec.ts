import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsStatusComponent } from './columns-status.component';

describe('ColumnsStatusComponent', () => {
  let component: ColumnsStatusComponent;
  let fixture: ComponentFixture<ColumnsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnsStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
