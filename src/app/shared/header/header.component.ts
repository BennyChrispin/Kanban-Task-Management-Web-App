import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnChanges {
  isDarkMode = false;
  isSidebarVisible: boolean = true;
  @Input() board: any[] = [];
  @Input() selectedBoardId: number | null = null;
  @Input() selectedBoardName: string | null = null;
  @Output() selectBoard = new EventEmitter<number | null>();

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

  toggleSidebar() {
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
      this.selectedBoardId = boardItem.id ?? null;
      this.selectedBoardName = boardItem.name;
      this.selectBoard.emit(this.selectedBoardId);
      console.log(
        'Selected Board ID in HeaderComponent:',
        this.selectedBoardId
      );
    }
  }
}
