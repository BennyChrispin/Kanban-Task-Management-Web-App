import { createReducer, on } from '@ngrx/store';
import { adapter, Column, initialState, SubTask, Task } from './board.state';
import {
  loadBoards,
  addBoard,
  loadBoardColumns,
  addColumn,
  addTask,
  updateSubtaskStatus,
} from './board.action';

export const boardReducer = createReducer(
  initialState,
  on(loadBoards, (state, { boards }) => {
    const validBoards = boards.map((board, index) => ({
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
  on(addTask, (state, { boardId, task }) => {
    const board = state.entities[boardId];

    const updatedColumns = board?.columns.map((column: any) => {
      if (column.id === task.status) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        };
      }
      return column;
    });

    return adapter.updateOne(
      {
        id: boardId,
        changes: {
          columns: updatedColumns,
        },
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
          if (taskId === taskId) {
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
  )
);
