import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css'],
})
export class BoardFormComponent {
  @Output() closeForm = new EventEmitter<void>();
  form: FormGroup;
  columns: FormArray;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([
        this.fb.control('Fixed Column 1', Validators.required),
        this.fb.control('Fixed Column 2', Validators.required),
      ]),
    });
    this.columns = this.form.get('columns') as FormArray;
  }

  addColumns() {
    this.columns.push(this.fb.control('', Validators.required));
  }

  removeColumns(index: number) {
    if (index >= 2) {
      this.columns.removeAt(index);
    }
  }

  cancel() {
    this.closeForm.emit();
  }

  createNew() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.closeForm.emit();
    }
  }
}
