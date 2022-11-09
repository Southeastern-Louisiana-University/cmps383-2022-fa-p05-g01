import { useEffect, useState } from "react";
import { ListingDto } from "../../constants/types";
import axios from "axios";
import { CardContent, Typography } from "@mui/material";

export default function ActiveListings() {
  const [listings, setListings] = useState<ListingDto[]>();

  useEffect(() => {
    axios.get<ListingDto[]>("/api/listings/active").then((response) => {
      setListings(response.data);
      console.log(response.data);
    });
  }, []);

  const listingsToShow = listings;

  return (
    <>
      <div>
        <p>
          <Typography variant="h2" color="inherit">
            Active Listings
          </Typography>
        </p>
        {listingsToShow?.map((listingDto) => {
          return (
            <Typography variant="h5">
              <CardContent>
                <li key={listingDto.id}>
                  {"Title: " +
                    listingDto.name +
                    " , " +
                    "Price: " +
                    listingDto.price +
                    " , " +
                    "Description: " +
                    listingDto.description +
                    " ," +
                    "Start: " +
                    listingDto.startUtc +
                    " , " +
                    "End: " +
                    listingDto.endUtc}
                </li>
              </CardContent>
            </Typography>
          );
        })}
      </div>
    </>
  );
}
