import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './board.state';
import { loadBoards, addBoard } from './board.action';

export const boardReducer = createReducer(
  initialState,
  on(loadBoards, (state, { boards }) => {
    const validBoards = boards.map((board: any, index: number) => ({
      ...board,
      id: board.id || index,
    }));
    return adapter.setAll(validBoards, state);
  }),
  on(addBoard, (state, { board }) => {
    return adapter.addOne(board, state);
  })
);
