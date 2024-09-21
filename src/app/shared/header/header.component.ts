import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { loadBoardColumns } from '../../store/board.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBoardById } from '../../store/board.selectors';
import { Board } from '../../store/board.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnChanges {
  isDarkMode = false;
  isSidebarVisible: boolean = true;
  isModalVisible: boolean = false;
  isModalForm: boolean = false;
  @Input() board: any[] = [];
  @Input() selectedBoardId: number | null = null;
  @Input() selectedBoardName: string | null = null;
  @Output() selectBoard = new EventEmitter<number | null>();

  boardColumns$: Observable<any[]> | undefined;
  selectedBoard$!: Observable<Board | undefined>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateTheme();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['board'] && this.board.length > 0) {
      if (!this.selectedBoardId) {
        this.selectedBoardId = this.board[0].id;
        this.selectedBoardName = this.board[0].name;
        this.selectBoard.emit(this.selectedBoardId);
        console.log('Selected Board ID on changes:', this.selectedBoardId);
      }
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  updateTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  onSelectBoard(boardItem: any): void {
    if (boardItem && boardItem.name) {
      this.selectedBoardId = boardItem.id;
      this.selectedBoardName = boardItem.name;
      this.selectBoard.emit(this.selectedBoardId);

      this.store.dispatch(loadBoardColumns({ boardId: boardItem.id }));

      this.selectedBoard$ = this.store.select(selectBoardById(boardItem.id));

      this.selectedBoard$.subscribe((selectedBoard) => {
        if (selectedBoard) {
          console.log('Loaded columns for board:', selectedBoard.columns);
        }
      });
    }
  }

  openModal(): void {
    this.isModalVisible = true;
  }
  openForm(): void {
    this.isModalForm = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
  closeForm(): void {
    this.isModalForm = false;
  }
}
