import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: [];
}

export interface SubTask {
  id: number;
  title: string;
  isComplete: boolean;
}

export interface Column {
  id: number;
  name: string;
  tasks: any[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface BoardState extends EntityState<Board> {
  selectedBoardId: number | null;
}

export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>();

export const initialState: BoardState = adapter.getInitialState({
  selectedBoardId: null,
});
