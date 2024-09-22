import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() tasks!: any[];
  @Input() selectedBoardId: number | null = null;

  ngOnInit(): void {
    if (this.selectedBoardId) {
      this.loadTasksForBoard(this.selectedBoardId);
    }
  }

  loadTasksForBoard(boardId: number): void {
    console.log('Loading tasks for board ID:', boardId);
  }

  selectedTask: any | null = null;
  isModalVisible: boolean = false;

  openModal(task: any): void {
    this.selectedTask = task;
    this.isModalVisible = true;
    console.log('this Task', this.selectedTask);
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedTask = null;
  }

  getCompletedSubtasksCount(subtasks: any[]): number {
    return subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
