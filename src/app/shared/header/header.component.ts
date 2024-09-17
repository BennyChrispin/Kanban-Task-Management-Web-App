import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  isSidebarVisible: boolean = true;
  @Input() board: any[] = [];
  @Output() selectBoard = new EventEmitter<number | null>();
  selectedBoardId: number | null = null;

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateTheme();
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

  onSelectBoard(boardItem: any) {
    console.log('Selected Board Item:', boardItem);
    if (boardItem && boardItem.name) {
      this.selectedBoardId = boardItem.id ?? null;
      this.selectBoard.emit(this.selectedBoardId);
      console.log('Selected Board ID:', this.selectedBoardId);
    } else {
      console.log('Board is not selected or available.');
    }
  }
}
