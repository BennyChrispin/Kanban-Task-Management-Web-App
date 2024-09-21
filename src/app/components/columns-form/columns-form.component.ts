import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-columns-form',
  templateUrl: './columns-form.component.html',
  styleUrls: ['./columns-form.component.css'],
})
export class ColumnsFormComponent {
  @Output() closeForm = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  cancel() {
    this.closeForm.emit();
  }

  createColumn() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.closeForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
