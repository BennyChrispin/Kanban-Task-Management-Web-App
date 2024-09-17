import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() tasks!: any[];

  getCompletedSubtasksCount(subtasks: any[]): number {
    return subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
