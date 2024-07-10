import axios from "axios";
import { HotelResponse, WeskiQuery , WeskiRequest} from "../types";
import { WESKIURL } from "../constants/weSkiConstants";

    export const fetchHotelData = async ({ski_site, from_date, to_date, group_size}: WeskiQuery) => {
        try{
            const reqBody = {
                query: {
                    ski_site,
                    from_date,
                    to_date,
                    group_size
                }
            } as WeskiRequest
            const response = await axios.post(WESKIURL, reqBody);
            const accommodations = response.data.body.accommodations;
            const mappedData = accommodations.map((elem:any)=>mapHotelData(elem,ski_site));
            const sortedData = mappedData.sort((a: { price: string; }, b: { price: string; }) => parseFloat(a.price) - parseFloat(b.price));

            return sortedData;
        }catch(error) {
            console.error(`Error fetching data for group_count ${group_size}`, error);
            throw error;
        }
    }

    const mapHotelData = (hotel: any,site_id:number): HotelResponse => {
        return {
          name: hotel.HotelName,
          mainURL: hotel.HotelDescriptiveContent.Images[0].URL,
          rating: hotel.HotelInfo.Rating,
          price: hotel.PricesInfo.AmountAfterTax,
          destination: site_id
        };
    };