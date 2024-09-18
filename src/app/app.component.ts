import { Component, OnInit } from '@angular/core';
import { TaskService } from './core/services/task.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BoardState } from './store/board.state';
import { selectAllBoards } from './store/board.selectors';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectedBoardId: number | null = null;
  boards$!: Observable<any[]>;

  constructor(
    private taskService: TaskService,
    private store: Store<BoardState>
  ) {}

  ngOnInit(): void {
    this.taskService.loadBoardData();
    this.boards$ = this.store.select(selectAllBoards).pipe(
      tap((boards) => {
        const defaultBoard = boards.find(
          (board) => board.name === 'Platform Launch'
        );
        if (defaultBoard) {
          this.selectedBoardId = defaultBoard.id;
        }
      })
    );
  }

  onBoardSelected(boardId: number | null) {
    if (boardId !== null) {
      this.selectedBoardId = boardId;
      console.log('Selected Board ID in AppComponent:', this.selectedBoardId);
    }
  }
}
