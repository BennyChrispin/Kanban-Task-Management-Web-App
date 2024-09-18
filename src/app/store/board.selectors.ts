import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BoardState, adapter } from './board.state';

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const {
  selectAll: selectAllBoards,
  selectEntities: selectBoardEntities,
} = adapter.getSelectors(selectBoardState);

export const selectBoardById = (boardId: number) =>
  createSelector(selectBoardEntities, (entities) => entities[boardId]);
