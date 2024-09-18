import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.css',
})
export class BoardFormComponent {
  @Output() closeForm = new EventEmitter<void>();
  form: FormGroup;
  columns: FormArray;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([]),
    });
    this.columns = this.form.get('columns') as FormArray;
  }
  addColumns() {
    this.columns.push(this.fb.control(''));
  }

  removeColumns(index: number) {
    this.columns.removeAt(index);
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
