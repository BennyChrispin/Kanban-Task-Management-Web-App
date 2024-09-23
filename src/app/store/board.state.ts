import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
}

export interface SubTask {
  id: number;
  title: string;
  isComplete: boolean;
}

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface BoardState extends EntityState<Board> {
  tasks: any;
  selectedBoardId: number | null;
}

export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>();

export const initialState: BoardState = {
  ...adapter.getInitialState(),
  tasks: null,
  selectedBoardId: null,
};
