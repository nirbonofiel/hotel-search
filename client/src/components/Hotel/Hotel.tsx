import React from "react";
import { HotelType } from "../../types";
import {  Card, CardContent, CardMedia, Divider, Rating, Typography } from "@mui/material";
import "./styles.css";
import { DESTINATIONS } from "../../constants/searchConstants";

type HotelProps = {
    hotel: HotelType
}

const Hotel: React.FC<HotelProps> = ({hotel}) => {
    const {destination,mainURL,name,price,rating} = hotel
    const dest = DESTINATIONS.find(dest=>dest.id === Number(destination));
    return (
        <Card sx={{ display: 'flex',minWidth: 600, margin:5 }}>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={mainURL}
          alt={name}
        />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="p" variant="h6" fontSize="medium" fontWeight={600}>
              {name}
            </Typography>
            <Rating value={Number(rating)} readOnly max={Number(rating)} size='small'/>
            <Typography variant="subtitle1" color="text.secondary" component="div" fontSize='small'>
              {dest?.name}
            </Typography>
            <Divider/>
            <div className="price">

            <Typography component="span" fontWeight={600}>
              ${price}
            </Typography>
            <Typography color="text.secondary" component="span" fontSize='smaller'>
                /per person
            </Typography>
            </div>
          </CardContent>
      </Card>
    );
};

export default Hotel;