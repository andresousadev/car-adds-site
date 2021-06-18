import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../util/validateUserInput";
import argon2 from "argon2";

@InputType()
export class UserRegisterInput {
  @Field(() => String)
  firstName!: string;
  @Field(() => String)
  lastName!: string;
  @Field(() => String)
  userEmail!: string;
  @Field(() => String)
  password!: string;
  @Field(() => String)
  confirmPassword!: string;
}

@InputType()
export class UserPasswordInput {
  @Field(() => String)
  userEmail!: string;
  @Field(() => String)
  password!: string;
}

@ObjectType()
export class FieldError {
  @Field(() => String)
  field!: string;
  @Field(() => String)
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { req, em }: MyContext
  ) {
    // you are not logged in
    if(!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: +req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("options", () => UserRegisterInput) options: UserRegisterInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const { errors, valid } = validateRegisterInput(options);

    if (!valid) {
      return { errors };
    }

    const existingUser = await em.findOne(User, {
      userEmail: options.userEmail.toLowerCase(),
    });

    if (existingUser) {
      return {
        errors: [
          {
            field: "userEmail",
            message: "This email is taken",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      firstName: options.firstName,
      lastName: options.lastName,
      userEmail: options.userEmail.toLowerCase(),
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      return {
        errors: [
          {
            field: "server",
            message: "An error occurred"
          }
        ]
      }
    }
    
    req.session.userId = user.id.toString();
    
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("options", () => UserPasswordInput) options: UserPasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const { errors, valid } = validateLoginInput(options);
    var success = false;

    if (!valid) {
      return { errors };
    }

    const user = await em.findOne(User, {
      userEmail: options.userEmail.toLowerCase(),
    });

    if(user) {
      success = await argon2.verify(user.password, options.password);
    }

    if (!user || !success) {
      return {
        errors: [
          {
            field: "password",
            message: "Login is incorrect or your account is disabled",
          },
        ],
      };
    }

    req.session.userId = user.id.toString();

    return {
      user,
    };
  }
}
