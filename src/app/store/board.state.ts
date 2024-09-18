import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface Board {
  id: number;
  name: string;
  columns: any[];
}

export interface BoardState extends EntityState<Board> {
  selectedBoardId: number | null;
}

export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>();

export const initialState: BoardState = adapter.getInitialState({
  selectedBoardId: null,
});
