import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../store/board.state';
import { selectBoardById } from '../../store/board.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() board: any[] = [];
  @Input() selectedBoardId: number | null = null;
  @Input() selectedBoardName: string | null = null;
  @Output() selectBoard = new EventEmitter<number | null>();

  isDarkMode = false;
  isSidebarVisible = true;
  isModalVisible = false;
  isModalForm = false;
  isMobileScreen = false;
  isSidebarModalVisible = false;

  boardColumns$: Observable<any[]> | undefined;
  selectedBoard$!: Observable<Board | undefined>;

  constructor(private store: Store) {
    this.checkMobileScreen();
    window.addEventListener(
      'resize',
      this.debounce(this.checkMobileScreen.bind(this), 200)
    );
  }

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateTheme();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['board'] && this.board.length > 0) {
      if (!this.selectedBoardId) {
        this.selectDefaultBoard();
      } else {
        this.selectedBoard$ = this.store.select(
          selectBoardById(this.selectedBoardId!)
        );
      }
    }
  }

  ngOnDestroy() {
    window.removeEventListener(
      'resize',
      this.debounce(this.checkMobileScreen.bind(this), 200)
    );
  }

  onSelectBoard(boardItem: any): void {
    this.selectedBoardId = boardItem.id;
    this.selectedBoardName = boardItem.name;
    this.selectBoard.emit(boardItem.id);
    console.log('Board selected:', boardItem); // Add this line
  }

  private selectDefaultBoard(): void {
    this.selectedBoardId = this.board[0].id;
    this.selectedBoardName = this.board[0].name;
    this.selectBoard.emit(this.selectedBoardId);
    console.log('Selected Board ID in HeaderComponent:', this.selectedBoardId);
  }

  private checkMobileScreen(): void {
    this.isMobileScreen = window.innerWidth < 768;
  }

  private updateTheme(): void {
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  toggleSidebarModal(): void {
    this.isSidebarModalVisible = !this.isSidebarModalVisible;
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  openForm(): void {
    this.isModalForm = true;
  }

  closeForm(): void {
    this.isModalForm = false;
  }

  handleTaskSelected(task: any): void {
    console.log('Task selected:', task);
  }

  debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
}
