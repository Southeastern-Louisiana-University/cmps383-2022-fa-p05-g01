import { useEffect, useState } from "react";
import { ApiResponse, ListingDto } from "../../types/types";
import axios from "axios";
import { Button, Card, CardContent, List, Typography } from "@mui/material";
import React from "react";

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
          <Typography variant="h2" color="black">
            THESE ARE THE CURRENT ACTIVE LISTINGS
          </Typography>
        </p>
        {listingsToShow?.map((listingDto) => {
          return (
            <Typography variant="h5">
              <CardContent >  
              <li key={listingDto.id}>
                {"Title: "+listingDto.name +
                  " , " +
                 "Price: "+listingDto.price +
                  " , " +
                  "Description: "+listingDto.description +
                  " ," +
                  "Start: "+listingDto.startUtc +
                  " , " +
                  "End: "+listingDto.endUtc}
              </li>
              </CardContent>
            </Typography>
          );
        })}
      </div>
    </>
  );
}
