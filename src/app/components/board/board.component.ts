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
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../../core/models/task.model';

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
  isModalColumnVisible: any;

  constructor(private store: Store<BoardState>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBoardId'] && this.selectedBoardId !== null) {
      console.log('selectedBoardId has changed:', this.selectedBoardId);
      this.selectedBoard$ = this.store.select(
        selectBoardById(this.selectedBoardId)
      );
      this.selectedBoard$.subscribe((board) => {
        console.log('Selected Board:', board);
      });
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
  closeModal(): void {
    this.isModalColumnVisible = false;
  }
  openModal(): void {
    this.isModalColumnVisible = true;
  }
}
