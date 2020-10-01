import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Statuses } from "@entities/enums";
import { Company } from "@entities/company";
import { Role } from "@entities/role";
import { Permission } from "@entities/permission";
import { Token } from "@entities/token";
import { Reports } from "./reports";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  public fullName: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  public tradingName: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  public phone: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  public password: string;

  @Column({
    type: "enum",
    enum: Statuses,
    default: Statuses.INVITED,
    nullable: true,
  })
  public status: Statuses;

  @Column({
    type: "timestamp",
    default: () => "now()",
  })
  public registeredAt: Date;

  @Column({
    type: "timestamp",
    default: () => "now()",
  })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "now()",
  })
  public updatedAt: Date;

  @ManyToMany("Company", "users", {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "users_companies",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "company_id",
      referencedColumnName: "id",
    },
  })
  public companies: Company[];

  @ManyToMany("Role", "users", {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "users_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  public roles: Role[];

  @ManyToMany("Permission", "users")
  @JoinTable({
    name: "users_permissions",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
  })
  public permissions: Permission[];

  @OneToMany("Token", "user")
  @JoinColumn({
    name: "id",
    referencedColumnName: "user_id",
  })
  public tokens: Token[];

  @OneToMany("Reports", "user")
  @JoinColumn({
    name: "id",
    referencedColumnName: "user_id",
  })
  public reports: Reports[];
}
