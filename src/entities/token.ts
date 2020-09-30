import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { TokenType } from "@entities/enums";
import { User } from "./user";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({
    type: "integer",
    nullable: true,
  })
  public refreshTokenId: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  public signedString: string;

  @Column({
    type: "boolean",
    nullable: false,
    default: true,
  })
  public active: boolean;

  @Column({
    type: "enum",
    enum: TokenType,
    default: TokenType.ACCESS,
    nullable: false,
  })
  public type: TokenType;

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

  @ManyToOne("User", "tokens", {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  public user: User;

  @ManyToOne("Token", "accessTokens")
  public refreshToken: Token;

  @OneToMany("Token", "refreshToken")
  public accessTokens: Token[];
}
