import { Button, InputLabel, Typography, Link } from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useMemo } from 'react'
import { LoginDto } from '../../constants/types';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { routes } from '../../routes/config';
import './logInPage.css';

export default function LogIn() {

  const navigate = useNavigate();
  const initialValues = useMemo<LoginDto>( () => ({
    username: "",
    password: "",
  }),
  []);

  const submitLogin = (values: LoginDto) => {
    axios.post<LoginDto>("api/authentication/login", values)
      .then(() => {
        console.log("Successfully logged in!");
        navigate("/");
      })
  };

  return (
    <>
      <div className='pageWrapper'>
        <div className='inputArea'>
          <div>
            <img src="https://i.imgur.com/UOokN0u.png" alt=''/>
          </div>
          <Formik initialValues={initialValues} onSubmit={submitLogin}>
            <Form>
              <div>
                <div>
                    <InputLabel>Username</InputLabel>
                    <Field id="username" name="username" />
                </div>
                <div>
                    <InputLabel>Password</InputLabel>
                    <Field id="password" name="password" />
                </div>
                <div>
                  <Button type="submit">
                    Login
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
          <div>
            <Typography>Dont have an account?</Typography>
          </div>
          <div>
            <Link component={RouterLink} to={routes.signUp}>
              Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
