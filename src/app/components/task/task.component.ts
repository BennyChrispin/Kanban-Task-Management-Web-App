import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() tasks!: any[];

  selectedTask: any | null = null;
  isModalVisible: boolean = false;

  openModal(task: any): void {
    this.selectedTask = task;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedTask = null;
  }

  getCompletedSubtasksCount(subtasks: any[]): number {
    return subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
