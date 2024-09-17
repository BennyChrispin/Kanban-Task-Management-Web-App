import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BoardState } from './board.state';

export const selectTaskState = createFeatureSelector<BoardState>('tasks');

export const selectBoards = createSelector(
  selectTaskState,
  (state: BoardState) => {
    return state.boards;
  }
);
export const selectBoardById = (boardId: number) =>
  createSelector(selectBoards, (boards) =>
    boards.find((board) => board.id === boardId)
  );
