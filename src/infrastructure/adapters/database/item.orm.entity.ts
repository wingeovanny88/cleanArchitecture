import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('items')
export class ItemOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
