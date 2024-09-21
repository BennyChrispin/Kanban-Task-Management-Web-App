import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  boardId: number;
  columnId: number;
}

export interface Column {
  id: string;
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
