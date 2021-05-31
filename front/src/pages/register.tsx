import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Input } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUT = `
mutation Register(
  $email: String!,
  $firstName: String!,
  $lastName: String!,
  $password: String!,
	$confirmPassword: String!){
  registerUser(options: {
    userEmail: $email,
    firstName: $firstName,
  	lastName: $lastName,
  	password: $password,
  	confirmPassword: $confirmPassword
  }){
    errors{field, message},
    user{
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

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="firstName"
              placeholder="First Name"
              label="First Name"
            />
            <Box mt={4}>
              <InputField
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
              />
            </Box>
            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
              mt={4}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
