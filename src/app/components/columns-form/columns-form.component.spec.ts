import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsFormComponent } from './columns-form.component';

describe('ColumnsFormComponent', () => {
  let component: ColumnsFormComponent;
  let fixture: ComponentFixture<ColumnsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
