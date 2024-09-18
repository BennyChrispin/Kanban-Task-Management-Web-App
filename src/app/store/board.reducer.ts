import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './board.state';
import { loadBoards } from './board.action';

export const boardReducer = createReducer(
  initialState,
  on(loadBoards, (state, { boards }) => {
    const validBoards = boards.map((board: any, index: number) => ({
      ...board,
      id: board.id || index,
    }));
    return adapter.setAll(validBoards, state);
  })
);
