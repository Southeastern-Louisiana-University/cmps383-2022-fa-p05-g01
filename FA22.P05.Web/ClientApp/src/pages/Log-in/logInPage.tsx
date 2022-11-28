import { Button, InputLabel, Input, Divider } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useMemo } from "react";
import { LoginDto } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/config";
import "./logInPage.css";

export default function LogIn() {
  const navigate = useNavigate();
  const initialValues = useMemo<LoginDto>(
    () => ({
      username: "",
      password: "",
    }),
    []
  );

  const submitLogin = (values: LoginDto) => {
    axios.post<LoginDto>("api/authentication/login", values).then(() => {
      console.log("Successfully logged in!");
      navigate(routes.home);
    });
  };

  return (
    <>
      <div className="pageWrapper">
        <div className="inputArea">
          <div>
            <img src="https://i.imgur.com/UOokN0u.png" alt="" />
          </div>
          <div className="log-in-and-sign-up">
            <Divider orientation="vertical" flexItem />
            <Formik initialValues={initialValues} onSubmit={submitLogin}>
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
                    <Button type="submit">Login</Button>
                    <Button
                      type="button"
                      onClick={() => {
                        navigate(routes.signUp);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
