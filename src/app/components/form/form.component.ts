import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/board.action';
import { Observable } from 'rxjs';
import { selectBoardById } from '../../store/board.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() closeForm = new EventEmitter<void>();
  @Input() boardId!: string;
  columns$: Observable<any[]> | undefined;
  columns: any[] = [];
  form: FormGroup;
  subtasks: FormArray;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subtasks: this.fb.array([this.fb.control(''), this.fb.control('')]),
      selectedColumn: [null, Validators.required],
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

  ngOnInit(): void {
    if (this.boardId) {
      this.store
        .select(selectBoardById(Number(this.boardId)))
        .subscribe((board) => {
          if (board) {
            this.columns = board.columns;
            console.log('Board:', board);
            console.log('Columns for selected board:', this.columns);
          }
        });
    }
  }
  saveChanges() {
    const selectedColumnName = this.form.value.selectedColumn;

    console.log('Selected Column:', selectedColumnName);

    if (this.form.valid) {
      const selectedColumn = this.columns.find(
        (column) => column.name === selectedColumnName
      );

      const tasks = {
        id: Date.now(),
        title: this.form.value.title,
        description: this.form.value.description,
        status: selectedColumn ? selectedColumn.name : 'No Status',
        subtasks: this.form.value.subtasks.map(
          (title: string, index: number) => ({
            id: index + 1,
            title,
            isCompleted: false,
          })
        ),
      };

      console.log('Task before dispatch:', tasks);
      this.store.dispatch(addTask({ boardId: this.boardId!, tasks }));

      this.closeForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onStatusChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.form.patchValue({ selectedColumn: selectedValue });
    console.log('Selected Column:', selectedValue);
  }
}
