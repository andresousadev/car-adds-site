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
  logoutUser: Scalars['Boolean'];
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
  carAdds: Array<CarAdd>;
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

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'userEmail'>
);

export type LoginMutationVariables = Exact<{
  options: UserPasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutUser'>
);

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
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
      & RegularUserFragment
    )> }
  ) }
);

export type CarAddsQueryVariables = Exact<{ [key: string]: never; }>;


export type CarAddsQuery = (
  { __typename?: 'Query' }
  & { carAdds: Array<(
    { __typename?: 'CarAdd' }
    & Pick<CarAdd, 'id' | 'createdAt' | 'updatedAt' | 'brand' | 'model' | 'price'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  createdAt
  updatedAt
  firstName
  lastName
  userEmail
}
    `;
export const LoginDocument = gql`
    mutation Login($options: UserPasswordInput!) {
  loginUser(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserRegisterInput!) {
  registerUser(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CarAddsDocument = gql`
    query CarAdds {
  carAdds {
    id
    createdAt
    updatedAt
    brand
    model
    price
  }
}
    `;

export function useCarAddsQuery(options: Omit<Urql.UseQueryArgs<CarAddsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CarAddsQuery>({ query: CarAddsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};