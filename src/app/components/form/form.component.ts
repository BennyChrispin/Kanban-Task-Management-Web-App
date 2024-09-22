import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/board.action';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() closeForm = new EventEmitter<void>();
  @Input() columns: any[] = [];
  @Input() boardId: number | null = null;

  form: FormGroup;
  subtasks: FormArray;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subtasks: this.fb.array([this.fb.control(''), this.fb.control('')]),
      selectedColumn: [null, Validators.required], // Ensure it's not undefined
    });

    this.subtasks = this.form.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control(''));
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
    if (this.form.valid && this.boardId !== null) {
      const selectedColumnId = this.form.value.selectedColumn;
      const selectedColumn = this.columns?.find(
        (column) => column.id === selectedColumnId
      );

      const task = {
        title: this.form.value.title,
        description: this.form.value.description,
        // Safely assign status
        status: selectedColumn ? selectedColumn.name : 'No Status',
        subtasks: this.form.value.subtasks.map(
          (title: string, index: number) => ({
            id: index + 1,
            title,
            isComplete: false,
          })
        ),
      };

      this.store.dispatch(addTask({ boardId: this.boardId, task }));
      
      this.closeForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
