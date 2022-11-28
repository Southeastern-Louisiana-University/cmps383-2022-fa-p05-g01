import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { ListingDto } from "../../constants/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";



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
   
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Box sx={{display: "flex",justifyContent:"flex-start", marginLeft:"50px"}}>
          <Button sx ={{border: '1px solid', backgroundImage: 'linear-gradient(blue, whitesmoke)',
          "&:hover": {
           boxShadow: '0 0 15px #ffee10'
          }
          }}
           onClick={() => navigate("/listings/add")}>
           <Typography sx={{ color: "black",  
           "&:hover": {
            color: '#ffee10'
           }
          }} >Create Listing</Typography>

            </Button>
          </Box>
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
                    <Box sx={{ width: 200, height: 150  }} >
                    <CardMedia
                      component="img"
                      sx={{
                       height: 100,
                       width: 250,
                        objectFit: "contain"
                      }} 
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    </Box>

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
   
  );
}
