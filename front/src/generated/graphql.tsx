import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CarAdd = {
  __typename?: 'CarAdd';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  brand: Scalars['String'];
  model: Scalars['String'];
  price: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCarAdd: CarAdd;
  updateCarAdd?: Maybe<CarAdd>;
  deleteCarAdd: Scalars['Boolean'];
  registerUser: UserResponse;
  loginUser: UserResponse;
};


export type MutationCreateCarAddArgs = {
  price: Scalars['Float'];
  model: Scalars['String'];
  brand: Scalars['String'];
};


export type MutationUpdateCarAddArgs = {
  price: Scalars['Float'];
  model: Scalars['String'];
  brand: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteCarAddArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterUserArgs = {
  options: UserRegisterInput;
};


export type MutationLoginUserArgs = {
  options: UserPasswordInput;
};

export type Query = {
  __typename?: 'Query';
  CarAdds: Array<CarAdd>;
  carAdd?: Maybe<CarAdd>;
  me?: Maybe<User>;
};


export type QueryCarAddArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userEmail: Scalars['String'];
};

export type UserPasswordInput = {
  userEmail: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userEmail: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'userEmail'>
    )> }
  ) }
);


export const RegisterDocument = gql`
    mutation Register($email: String!, $firstName: String!, $lastName: String!, $password: String!, $confirmPassword: String!) {
  registerUser(
    options: {userEmail: $email, firstName: $firstName, lastName: $lastName, password: $password, confirmPassword: $confirmPassword}
  ) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      firstName
      lastName
      userEmail
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};