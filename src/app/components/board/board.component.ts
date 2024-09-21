import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBoardById } from '../../store/board.selectors';
import { BoardState } from '../../store/board.state';
import { addColumn } from '../../store/board.action';
import { Task } from '../../core/models/task.model';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnChanges {
  selectedBoard$!: Observable<any>;
  @Input() selectedBoardId!: number | null;

  columnColorMap: { [key: string]: string } = {
    Todo: '#49C4E5',
    Doing: '#8471F2',
    Done: '#67E2AE',
    Now: '#49C4E5',
    Next: '#8471F2',
    Later: '#67E2AE',
  };
  isModalColumnVisible: boolean = false;

  constructor(private store: Store<BoardState>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBoardId'] && this.selectedBoardId !== null) {
      this.selectedBoard$ = this.store.select(
        selectBoardById(this.selectedBoardId)
      );
    }
  }

  getConnectedColumns(selectedBoard: any): string[] {
    return (
      selectedBoard?.columns.map((c: any) => 'cdk-drop-list-' + c.name) || []
    );
  }

  getColumnColor(columnName: string): string {
    return this.columnColorMap[columnName] || '#EA5555';
  }

  drop(event: CdkDragDrop<Task[]>, columnName: string) {
    if (event.previousContainer !== event.container) {
      const task = event.item.data;
      task.columnId = columnName;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openModal(): void {
    this.isModalColumnVisible = true;
  }

  closeModal(): void {
    this.isModalColumnVisible = false;
  }

  createColumn(columnName: string): void {
    if (this.selectedBoardId !== null) {
      this.store.dispatch(
        addColumn({
          boardId: this.selectedBoardId,
          column: {
            name: columnName,
            tasks: [],
            id: Date.now(),
          },
        })
      );
      this.closeModal();
    }
  }
}
