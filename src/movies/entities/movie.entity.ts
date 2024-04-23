import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 2048 })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'int' })
  note: number;
}
