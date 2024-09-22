import { createAction, props } from '@ngrx/store';
import { Board, Column, Task } from './board.state';

export const loadBoards = createAction(
  '[Board] Load Boards',
  props<{ boards: Board[] }>()
);

export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: Board }>()
);

export const addColumn = createAction(
  '[Board] Add Column',
  props<{ boardId: number; column: Column }>()
);

export const addTask = createAction(
  '[Board] Add Task',
  props<{ boardId: number; task: Task }>()
);

export const loadBoardColumns = createAction(
  '[Board] Load Board Columns',
  props<{ boardId: number }>()
);

export const updateSubtaskStatus = createAction(
  '[Task] Update Subtask Status',
  props<{
    boardId: number;
    taskId: number;
    subtaskId: number;
    isComplete: boolean;
  }>()
);
