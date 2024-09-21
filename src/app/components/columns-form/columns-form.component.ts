import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-columns-form',
  templateUrl: './columns-form.component.html',
  styleUrls: ['./columns-form.component.css'],
})
export class ColumnsFormComponent {
  @Output() closeForm = new EventEmitter<void>();
  @Output() createColumn = new EventEmitter<string>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  cancel() {
    this.closeForm.emit();
  }

  submitForm() {
    if (this.form.valid) {
      this.createColumn.emit(this.form.value.name);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
