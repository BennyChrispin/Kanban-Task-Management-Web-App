import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBoardById } from '../../store/board.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-columns-status',
  templateUrl: './columns-status.component.html',
  styleUrls: ['./columns-status.component.css'],
})
export class ColumnsStatusComponent implements OnInit {
  @Input() isDropdownOpen = false;
  @Input() boardId: number | null = null;
  @Output() selectColumn = new EventEmitter<string>();

  columns$: Observable<any[]> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.boardId !== null) {
      this.columns$ = this.store.select(selectBoardById(this.boardId)).pipe(
        map((board) => {
          return board ? board.columns : [];
        })
      );
    }
  }

  onSelect(column: string) {
    this.selectColumn.emit(column);
  }
}
