import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { addColumn, loadBoards } from '../../store/board.action';
import { BoardState } from '../../store/board.state';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private dataUrl = '../../../assets/data/data.json';

  constructor(private http: HttpClient, private store: Store<BoardState>) {}

  loadBoardData(): void {
    this.fetchBoardData().subscribe();
  }

  fetchBoardData(): Observable<any> {
    return this.http.get<any>(this.dataUrl).pipe(
      tap((boardData) => {
        this.store.dispatch(loadBoards({ boards: boardData.boards }));
      })
    );
  }

  addColumn(boardId: number, column: any): void {
    this.store.dispatch(addColumn({ boardId, column }));
  }
}
