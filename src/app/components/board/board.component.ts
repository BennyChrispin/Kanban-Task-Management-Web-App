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

  constructor(private store: Store<BoardState>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBoardId'] && this.selectedBoardId !== null) {
      this.selectedBoard$ = this.store.select(
        selectBoardById(this.selectedBoardId)
      );
    }
  }
}
