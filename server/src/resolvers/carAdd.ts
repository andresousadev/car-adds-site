import { Arg, Ctx, Float, Mutation, Query, Resolver } from "type-graphql";
import { CarAdd } from "../entities/CarAdd";
import { MyContext } from "../types";

@Resolver()
export class CarAddResolver {
  @Query(() => [CarAdd])
  CarAdds(@Ctx() { em }: MyContext): Promise<CarAdd[]> {
    return em.find(CarAdd, {});
  }

  @Query(() => CarAdd, { nullable: true })
  carAdd(
    @Arg("id", () => Number) id: number,
    @Ctx() { em }: MyContext
  ): Promise<CarAdd | null> {
    return em.findOne(CarAdd, { id });
  }

  @Mutation(() => CarAdd)
  async createCarAdd(
    @Arg("brand", () => String) brand: string,
    @Arg("model", () => String) model: string,
    @Arg("price", () => Float) price: number,
    @Ctx() { em }: MyContext
  ): Promise<CarAdd | null> {
    const carAdd = em.create(CarAdd, { brand, model, price });
    await em.persistAndFlush(carAdd);
    return carAdd;
  }

  @Mutation(() => CarAdd, { nullable: true })
  async updateCarAdd(
    @Arg("id", () => Number) id: number,
    @Arg("brand", () => String) brand: string,
    @Arg("model", () => String) model: string,
    @Arg("price", () => Float) price: number,
    @Ctx() { em }: MyContext
  ): Promise<CarAdd | null> {
    const carAdd = await em.findOne(CarAdd, { id });

    if (!carAdd) {
      return null;
    }

    if (typeof brand !== "undefined" && typeof model !== "undefined" && typeof price !== "undefined") {
      carAdd.brand = brand;
      carAdd.model = model;
      carAdd.price = price;
      await em.persistAndFlush(carAdd);
    }

    return carAdd;
  }

  @Mutation(() => Boolean)
  async deleteCarAdd(
    @Arg("id", () => Number) id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(CarAdd, { id });
    } catch (err) {
      return false;
    }
    return true;
  }
}
