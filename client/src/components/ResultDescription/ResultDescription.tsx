import React from "react";
import { SearchQuery } from "../../types";
import { Typography } from "@mui/material";
import { DESTINATIONS } from "../../constants/searchConstants";

type ResultDescriptionProps = {
  searchDescription: SearchQuery,
  resultCount:number
}

const ResultDescription: React.FC<ResultDescriptionProps> = ({searchDescription,resultCount}) => {
  const destination = DESTINATIONS.find(dest=>dest.id === searchDescription.ski_site);
    return (
        <Typography color="text.secondary" textAlign="center" fontSize='small'>
          {resultCount} ski trips option * {destination?.name} * {searchDescription.from_date} - {searchDescription.to_date} * {searchDescription.group_size} people
        </Typography>
    );
};

export default ResultDescription;