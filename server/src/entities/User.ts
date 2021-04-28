import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey({ type: "number" })
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  firstName!: string;

  @Field(() => String)
  @Property({ type: "text" })
  lastName!: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  userEmail!: string;

  @Property({ type: "text" })
  password!: string;
}
