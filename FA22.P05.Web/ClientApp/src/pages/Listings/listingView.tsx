import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListingDto } from "../../types/types";
import { darkTheme } from "./listingPage";

export default function ListingDetail() {
  const [listing, setListing] = useState<ListingDto>();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.get<ListingDto>(`/api/listings/${id}`).then((response) => {
      console.log(response.data);
      setListing(response.data);
    });
  }, []);

  if (!listing) {
    return <p>No listing</p>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Card
          sx={{
            display: "center",
            border: "3px solid",
            borderColor: "gray",
            "&:hover": {
              borderColor: "white",
              transition: "800ms ease-in-out",
            },
          }}
        >
          <Box sx={{ width: 600, height: 600 }} maxWidth="md">
            <CardContent>
              <CardMedia
                component="img"
                image="https://source.unsplash.com/random"
                alt="random"
                sx={{ border: "solid" }}
              />
            </CardContent>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: "block" }}>
            <Box sx={{ border: "solid" }}>
              <Typography gutterBottom variant="h5" component="h2"></Typography>
              <Typography variant="h5">{"Title: " + listing.name}</Typography>
              <Typography variant="h5">
                {"Description: " + listing.description}
              </Typography>
              <Typography variant="h5">{"Price: $" + listing.price}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
