import { createReducer, on } from '@ngrx/store';
import { loadBoards, addColumn } from './board.action';
import { initialState } from './board.state';

export const taskReducer = createReducer(
  initialState,
  on(loadBoards, (state, { boards }) => ({ ...state, boards })),
  on(addColumn, (state, { boardId, column }) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.id === boardId) {
        return { ...board, columns: [...board.columns, column] };
      }
      return board;
    });
    return { ...state, boards: updatedBoards };
  })
);
