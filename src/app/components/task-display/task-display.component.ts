import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateSubtaskStatus } from '../../store/board.action';

@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.css'],
})
export class TaskDisplayComponent {
  @Input() tasks: any[] = [];
  @Input() isVisible: boolean = false;
  @Input() boardId!: number;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private store: Store) {}

  onSubtaskCompletionChange(
    event: Event,
    boardId: number,
    taskId: number,
    subtaskId: number
  ): void {
    const isComplete = (event.target as HTMLInputElement).checked;
    this.toggleSubtaskCompletion(boardId, taskId, subtaskId, isComplete);
  }

  toggleSubtaskCompletion(
    boardId: number,
    taskId: number,
    subtaskId: number,
    isComplete: boolean
  ): void {
    this.store.dispatch(
      updateSubtaskStatus({ boardId, taskId, subtaskId, isComplete })
    );
  }

  cancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }

  getCompletedSubtasksCount(subtasks: any[]): number {
    return subtasks.filter((subtask) => subtask.isComplete).length;
  }

  toggleOptions(task: any): void {
    const updatedTask = {
      ...task,
      showOptions: !task.showOptions,
    };

    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
}
