import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IssueState } from '../enums/issue-state.enum';

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  state: IssueState;
}
