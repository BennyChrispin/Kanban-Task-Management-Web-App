import { createAction, props } from '@ngrx/store';

export const loadBoards = createAction(
  '[Board] Load Boards',
  props<{ boards: any[] }>()
);

export const addColumn = createAction(
  '[Board] Add Column',
  props<{ boardId: number; column: any }>()
);

export const selectBoard = createAction(
  '[Board] Select Board',
  props<{ boardId: number }>()
);
