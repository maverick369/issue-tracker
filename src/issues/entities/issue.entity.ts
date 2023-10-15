import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  state: number;
}
