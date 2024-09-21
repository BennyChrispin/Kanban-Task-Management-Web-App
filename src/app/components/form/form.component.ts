import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() closeForm = new EventEmitter<void>();

  form: FormGroup;
  subtasks: FormArray;
  selectedColumn = '';
  isDropdownOpen = false;
  columns$: Observable<any[]> | undefined;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subtasks: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onColumnSelected(column: string) {
    this.selectedColumn = column;
    this.toggleDropdown();
    this.form.patchValue({ status: column });
  }

  saveChanges() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.closeForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
