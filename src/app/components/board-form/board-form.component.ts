import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addBoard } from '../../store/board.action';
import { BoardState } from '../../store/board.state';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css'],
})
export class BoardFormComponent {
  @Output() closeForm = new EventEmitter<void>();
  form: FormGroup;
  columns: FormArray;

  constructor(private fb: FormBuilder, private store: Store<BoardState>) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([]),
    });

    this.columns = this.form.get('columns') as FormArray;

    this.addColumn('ToDo');
    this.addColumn('Doing');
  }

  addColumn(columnName: string = '') {
    const columnGroup = this.fb.group({
      name: [columnName, Validators.required],
      tasks: this.fb.array([]),
    });
    this.columns.push(columnGroup);
  }

  removeColumn(index: number) {
    if (index >= 2) {
      this.columns.removeAt(index);
    }
  }

  cancel() {
    this.closeForm.emit();
  }

  createNew() {
    if (this.form.valid) {
      const filledColumns = this.columns.controls
        .map((columnGroup, index) => ({
          id: index,
          name: columnGroup.get('name')?.value,
          tasks: columnGroup.get('tasks')?.value,
        }))
        .filter((col) => col.name.trim() !== '');

      const newBoard = {
        id: Date.now(),
        name: this.form.get('name')?.value,
        columns: filledColumns,
      };

      console.log('New Board:', newBoard);
      this.store.dispatch(addBoard({ board: newBoard }));
      this.closeForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
