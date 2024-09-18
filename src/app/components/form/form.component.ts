import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() closeForm = new EventEmitter<void>();

  form: FormGroup;
  subtasks: FormArray;
  statusOptions = ['Pending', 'In Progress', 'Completed'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subtasks: this.fb.array([
        this.fb.control('Fixed Column 1', Validators.required),
        this.fb.control('Fixed Column 2', Validators.required),
      ]),
      status: ['', Validators.required],
    });
    this.subtasks = this.form.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control('', Validators.required));
  }

  removeSubtask(index: number) {
    if (index >= 2) {
      this.subtasks.removeAt(index);
    }
  }

  cancel() {
    this.closeForm.emit();
  }

  saveChanges() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.closeForm.emit();
    }
  }
}
