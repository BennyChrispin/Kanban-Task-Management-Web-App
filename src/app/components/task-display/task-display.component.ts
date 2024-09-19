import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.css'],
})
export class TaskDisplayComponent {
  @Input() tasks: any[] = [];
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  getCompletedSubtasksCount(subtasks: any[]): number {
    return subtasks.filter((subtask) => subtask.isCompleted).length;
  }

  cancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }
}
