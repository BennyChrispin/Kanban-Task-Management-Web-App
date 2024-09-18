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

  constructor(private store: Store<BoardState>) {}

  ngOnInit(): void {}

  getColumnColor(columnName: string): string {
    const color = this.columnColorMap[columnName];
    if (!color) {
      // console.warn(`No color found for column: ${columnName}`);
    }
    return color || '#EA5555';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBoardId'] && this.selectedBoardId !== null) {
      this.selectedBoard$ = this.store.select(
        selectBoardById(this.selectedBoardId)
      );
    }
  }
}
