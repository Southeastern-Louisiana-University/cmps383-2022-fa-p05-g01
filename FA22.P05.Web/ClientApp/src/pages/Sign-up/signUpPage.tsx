import {
  Button,
  Card,
  CardContent,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUserDto } from "../../constants/types";
import { routes } from "../../routes/config";
import "./signUpPage.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const initialValues = useMemo<CreateUserDto>(
    () => ({
      username: "",
      password: "",
      roles: [],
    }),
    []
  );

  const submitCreate = (values: CreateUserDto) => {
    axios.post<CreateUserDto>("api/users", values).then((response) => {
      console.log("User Created: ", response);
      navigate(routes.logIn);
    });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="account-creation-area">
          <Card classes={"account-creation-area"}>
            <CardContent>
              <Typography variant="h5">Create Account</Typography>
              <br />
              <Formik initialValues={initialValues} onSubmit={submitCreate}>
                <Form>
                  <div>
                    <div>
                      <InputLabel>Username</InputLabel>
                      <Field
                        id="username"
                        name="username"
                        render={({ field }: any) => <Input {...field} />}
                      />
                    </div>
                    <div>
                      <InputLabel>Password</InputLabel>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        render={({ field }: any) => (
                          <Input {...field} type="password" />
                        )}
                      />
                    </div>
                    <div>
                      <InputLabel>Roles</InputLabel>
                      <Field id="roles" name="roles" component={Select}>
                        <MenuItem value={"User"}>User</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                      </Field>
                    </div>
                    <div>
                      <Button type="submit">Create Account</Button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
