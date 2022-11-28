import {
  Box,
  Button,
  Card,
  IconButton,
  InputLabel,
  Input,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useMemo, useState } from "react";
import { ListingDto } from "../../constants/types";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import "./addListing.css";

export default function CreateListing() {
  const [listing] = useState<ListingDto>();
  const initialValues = useMemo<ListingDto>(
    () => ({
      name: "",
      price: 0,
      description: "",
      listingTypeId: 0,
      startUtc: new Date(),
      endUtc: new Date(),
    }),
    []
  );

  const submitListing = (values: ListingDto) => {
    axios.post<ListingDto>("/api/listings", values).then((response) => {
      console.log("Successfully Created Listing");
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card classes={"field-formatter"} sx={{ border: "2px solid" }}>
        <Formik initialValues={initialValues} onSubmit={submitListing}>
          <Form>
            <InputLabel>Title</InputLabel>
            <Field
              id="name"
              name="name"
              render={({ field }: any) => <Input {...field} />}
            />

            <InputLabel>price</InputLabel>
            <Field
              id="price"
              name="price"
              render={({ field }: any) => <Input {...field} />}
            />

            <InputLabel>description</InputLabel>
            <Field
              id="description"
              name="description"
              render={({ field }: any) => <Input {...field} />}
            />
            <br />
            <InputLabel>Start Date</InputLabel>
            <Field
              id="startUtc"
              name="startUtc"
              type="date"
              value={listing?.startUtc}
            />
            <InputLabel>End Date</InputLabel>
            <Field
              id="endUtc"
              name="endUtc"
              type="date"
              value={listing?.endUtc}
            />
            <br />
            <Field id="listingTypeId" name="listingTypeId" component="select">
              <option value="1">Auction</option>
              <option value="2">Sale</option>
            </Field>

            <Button type="submit" sx={{ display: "flex" }}>
              Create
            </Button>
            <IconButton>
              <UploadIcon />
            </IconButton>
          </Form>
        </Formik>
      </Card>
    </Box>
  );
}
