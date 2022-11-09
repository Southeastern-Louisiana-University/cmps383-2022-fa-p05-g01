import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  ThemeProvider,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiResponse, ListingDto, BidDto } from "../../constants/types";
import { darkTheme } from "./listingPage";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useFormik } from "formik";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  display: "flex",
  justifyContent: "flexbox",
};
type CreateBidRequest = Omit<BidDto, "id">;
type CreateBidResponse = ApiResponse<BidDto>;

export default function ListingDetail() {
  const [listing, setListing] = useState<ListingDto>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bid, setBid] = useState<ApiResponse<BidDto>>();

  const formik = useFormik<CreateBidRequest>({
    initialValues: {
      userId: 1,
      bidAmount: 0,
      listingId: 4,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const createBid = (values: CreateBidRequest) => {
    axios
      .post<CreateBidResponse>(`/api/bids`, values)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: ${err.message}`);
          });
          alert("There was an error");
          return;
        }
        console.log("Successfully Created Bid");
        alert("Successfully Created Bid");
      })
      .catch(({ response }: AxiosError<CreateBidResponse>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
          alert(response?.data.errors[0].message);
        } else {
          alert(`There was an error creating bid`);
        }
        setBid(response?.data);
        navigate.arguments(response);
      });
  };

  useEffect(() => {
    axios.get<ListingDto>(`/api/listings/${id}`).then((response) => {
      console.log(response.data);
      setListing(response.data);
    });
  }, [id]);

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
          }}
        >
          <Box sx={{ width: 600, height: 600 }} maxWidth="md">
            <CardContent>
              <CardMedia
                component="img"
                image="https://source.unsplash.com/random"
                alt="random"
                sx={{
                  border: "solid",
                  "&:hover": {
                    backgroundColor: "blue",
                  },
                }}
              />
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
            <Button variant="contained" onClick={handleOpen}>
              Bid
            </Button>
            <Modal open={open}>
              <Box sx={style}>
                <Button
                  sx={{
                    marginBottom: "50px",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  onClick={handleClose}
                >
                  <ArrowBackIosNewOutlinedIcon> </ArrowBackIosNewOutlinedIcon>
                </Button>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <Typography>Enter in Bid amount:</Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      name="bidAmount"
                      onChange={formik.handleChange}
                      value={formik.values.bidAmount}
                    />

                    <div style={buttonStyle}>
                      <Button
                        onClick={() => navigate("/listings")}
                        sx={{ display: "flex" }}
                      >
                        Back
                      </Button>
                      <Button type="submit" sx={{ display: "block" }}>
                        Confirm
                      </Button>
                    </div>
                  </form>
                </Typography>
              </Box>
            </Modal>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: "block" }}>
            <Box>
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
