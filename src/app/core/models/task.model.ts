export class Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  boardId: number;
  columnId: number;
  userId: number;
  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.priority = task.priority;
    this.dueDate = task.dueDate;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.boardId = task.boardId;
    this.columnId = task.columnId;
    this.userId = task.userId;
  }
}
