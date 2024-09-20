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

  constructor(private fb: FormBuilder, private store: Store<BoardState>) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([this.createColumn(), this.createColumn()]),
    });
  }

  get columns(): FormArray {
    return this.form.get('columns') as FormArray;
  }

  createColumn(): FormGroup {
    return this.fb.group({
      id: [this.generateId()],
      name: ['', Validators.required],
      tasks: this.fb.array([]),
    });
  }

  addColumn() {
    this.columns.push(this.createColumn());
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  cancel() {
    this.closeForm.emit();
  }

  createNew() {
    if (this.form.valid) {
      const newBoard = {
        id: Date.now(),
        name: this.form.get('name')?.value,
        columns: this.columns.controls.map((column) => ({
          id: column.get('id')?.value,
          name: column.get('name')?.value,
          tasks: column.get('tasks')?.value || [],
        })),
      };

      this.store.dispatch(addBoard({ board: newBoard }));
      this.closeForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private generateId(length: number = 4): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
