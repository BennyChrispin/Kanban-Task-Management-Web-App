import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './board.state';
import {
  loadBoards,
  addBoard,
  loadBoardColumns,
  addColumn,
  addTask,
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
  })
);
