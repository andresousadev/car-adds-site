import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class CarAdd {
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
  brand!: string;

  @Field(() => String)
  @Property({ type: "text" })
  model!: string;

  /*@Field(() => Int)
  @Property({ type: "number" })
  firstRegist!: number;

  @Field(() => String)
  @Property({ type: "text" })
  month!: string;

  @Field(() => String)
  @Property({ type: "text" })
  mileage!: string;

  @Field(() => String)
  @Property({ type: "text" })
  doors!: string;

  @Field(() => String)
  @Property({ type: "text" })
  category!: string;

  @Field(() => String)
  @Property({ type: "text" })
  fuelType!: string;

  @Field(() => String)
  @Property({ type: "text" })
  modelDescription!: string;

  @Field(() => Int)
  @Property({ type: "number" })
  PowerHp!: Number;

  @Field(() => Int)
  @Property({ type: "number" })
  PowerKw!: Number;

  @Field(() => Boolean)
  @Property({ type: "boolean" })
  negotiable!: boolean;*/

  @Field(() => Float)
  @Property({ type: "number", columnType: 'decimal(10, 2)'})
  price!: Number;
}
