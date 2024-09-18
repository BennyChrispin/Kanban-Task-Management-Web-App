import { EntityState } from '@ngrx/entity';

export interface Board {
  id: number;
  name: string;
  columns: any[];
}

export interface BoardState extends EntityState<Board> {
  selectedBoardId: number | null;
}
