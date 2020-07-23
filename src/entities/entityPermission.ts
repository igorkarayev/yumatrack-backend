import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Entities } from './enums';

@Entity('entities_permissions')
export class EntityPermission {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  public entityId: string;

  @Column({
    type: 'enum',
    enum: Entities,
    default: Entities.USER,
    nullable: true
  })
  public entityType: Entities;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  public permissionId: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  public value: number;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  public createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  public updatedAt: Date;
}
