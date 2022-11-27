import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useMemo, useState } from "react";
import { ApiResponse, ListingDto } from "../../constants/types";
import { Field, Form, Formik } from "formik";
import axios, { AxiosError } from "axios";
import { Navigate, useNavigate } from "react-router";

type CreateListingRequest = Omit<ListingDto, "id">;
type CreateListingResponse = ApiResponse<ListingDto>;

export default function CreateListing() {
  const navigate = useNavigate();
  const [listing, setListing] = useState<ListingDto>();
  const initialValues = useMemo<CreateListingRequest>(
    () => ({
      name: "",
      price: 0,
      description: "",
      startUtc: new Date(),
      endUtc: new Date(),
    }),
    []
  );

  const submitListing = (values: CreateListingRequest) => {
    axios
      .post<CreateListingResponse>("api/listings/add", values)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach(
            (err: { property: any; message: any }) => {
              console.error(`${err.property}: ${err.message}`);
            }
          );
          alert("There was an error");
          return;
        }

        console.log("Successfully Created Listing");
      })

      .catch(({ response }: AxiosError<CreateListingResponse>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
          alert(response?.data.errors[0].message);
        }

        setListing(response?.data.data);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch", height: "100" },
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
      noValidate
      autoComplete="off"
    >
      <Box>
        <Card
          sx={{
            size: "inherit",
            border: "1px solid",
            "&:hover": {
              border: "2px solid",
            },
          }}
        >
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={submitListing}>
              <Form>
                <TextField
                  placeholder="Title"
                  multiline
                  sx={{ display: "flex" }}
                >
                  <InputLabel>Title</InputLabel>
                  <Field id="name" name="name"></Field>
                </TextField>

                <TextField
                  placeholder="Price...$"
                  multiline
                  sx={{ display: "flex" }}
                >
                  <InputLabel>price</InputLabel>
                  <Field id="price" name="price"></Field>
                </TextField>

                <TextField
                  placeholder="Description"
                  multiline
                  sx={{ display: "flex" }}
                >
                  <InputLabel>...</InputLabel>
                  <Field id="description" name="description"></Field>
                </TextField>
               <Card>
                <TextField
                  name="startUtc"
                  type="date"
                  value={listing?.startUtc}
                />
                </Card>
                <TextField
                  name="endUtc"
                  sx={{display: "flex" }}
                  type="date"
                  value={listing?.endUtc}
                />
                <Button type="submit" sx={{ display: "flex" }}>
                  Create
                </Button>
                <IconButton>
                  <UploadIcon />
                </IconButton>
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
