import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './board.state';
import {
  loadBoards,
  addBoard,
  loadBoardColumns,
  addColumn,
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
  })
);
