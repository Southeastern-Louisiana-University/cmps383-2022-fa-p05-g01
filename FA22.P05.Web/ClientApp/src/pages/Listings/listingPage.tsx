import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ListingDto } from "../../constants/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  
  
});

export default function Album() {
  const [listings, setListings] = useState<ListingDto[]>([]);


  const navigate = useNavigate();

  useEffect(() => {
    axios.get<ListingDto[]>("/api/listings/active").then((response) => {
      setListings(response.data);
    });
  }, []);

  const listingsToShow = listings;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Active Listings
            </Typography>
            <Typography align="center" >Select a listing to view closer</Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {listingsToShow && listingsToShow?.map((response) => (
              <Grid key={response.id} xs={12} sm={6} md={4}>
                <Button
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      transition: "800ms",
                    },
                  }}
                  onClick={() => navigate(`/listings/${response.id}`)}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      border: "2px solid",
                      borderColor: "white",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        
                        pt: "20%",
                      }}
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                      ></Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          borderStyle: "double",
                          textcolor: "white",
                          borderColor: "grey",
                        }}
                      >
                        Title: {response.name + "\n"}
                        Price: {response.price + "\n"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Welcome to the Matrix
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Select a Listing to view more closely.
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
