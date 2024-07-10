import React from "react";
import { HotelType } from "../../types";
import "./styles.css";
import Hotel from "../Hotel/Hotel";

type HotelsListProps = {
    hotels: HotelType[]
}

const HotelsList: React.FC<HotelsListProps> = ({hotels}) => {

    return (
        <div className="hotelListContainer">
            {hotels.map((hotel, index) => (
               <Hotel hotel={hotel} key={index}/>
            ))}
        </div>
    );
};

export default HotelsList;