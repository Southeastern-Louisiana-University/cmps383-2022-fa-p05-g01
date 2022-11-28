import { Typography } from "@mui/material";
import axios from "axios";
import { stringify } from "querystring";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUserDto } from "../../constants/types";
import { routes } from "../../routes/config";

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
      <Typography>Create An Account</Typography>
    </>
  );
}
