import { createReducer, on } from '@ngrx/store';
import {
  adapter,
  Board,
  Column,
  initialState,
  SubTask,
  Task,
} from './board.state';
import {
  loadBoards,
  addBoard,
  loadBoardColumns,
  addColumn,
  addTask,
  updateSubtaskStatus,
  editTask,
} from './board.action';

export const boardReducer = createReducer(
  initialState,
  on(loadBoards, (state, { boards }) => {
    const validBoards = boards.map((board: Board, index: number) => ({
      ...board,
      id: board.id || index,
      columns: board.columns || [],
    }));
    return adapter.setAll(validBoards, state);
  }),
  on(addBoard, (state, { board }) => adapter.addOne(board, state)),
  on(loadBoardColumns, (state, { boardId }) => state),
  on(addColumn, (state, { boardId, column }) => {
    const boardColumns = state.entities[boardId]?.columns ?? [];
    return adapter.updateOne(
      {
        id: boardId,
        changes: {
          columns: [...boardColumns, column],
        },
      },
      state
    );
  }),
  on(addTask, (state, { boardId, tasks }) => {
    const board = state.entities[boardId];
    if (!board) return state;
    const updatedColumns = board.columns.map((column: Column) => {
      if (column.name === tasks.status) {
        return {
          ...column,
          tasks: [...(column.tasks || []), tasks],
        };
      }
      return column;
    });
    return adapter.updateOne(
      {
        id: boardId,
        changes: { columns: updatedColumns },
      },
      state
    );
  }),

  on(
    updateSubtaskStatus,
    (state, { boardId, taskId, subtaskId, isComplete }) => {
      const board = state.entities[boardId];

      if (!board) return state;

      const updatedColumns = board.columns.map((column: Column) => ({
        ...column,
        tasks: column.tasks.map((task: Task) => {
          if (task.id === taskId) {
            return {
              ...task,
              subtasks: task.subtasks.map((subtask: SubTask) => {
                if (subtask.id === subtaskId) {
                  return { ...subtask, isComplete };
                }
                return subtask;
              }),
            };
          }
          return task;
        }),
      }));

      return adapter.updateOne(
        { id: boardId, changes: { columns: updatedColumns } },
        state
      );
    }
  ),
  on(editTask, (state, { taskId, updates }) => {
    return {
      ...state,
      tasks: state.tasks.map((task: { id: string }) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    };
  })
);
