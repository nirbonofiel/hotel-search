import { fetchHotelData } from "../services/weskiService";
import { HotelResponse, WeskiQuery } from "../types";
import { IHotelProvider } from "./interfaces/IHotelProvider";

export class WeskiProvider implements IHotelProvider {

    async fetchHotelData(query: WeskiQuery): Promise<HotelResponse[]> {
        return fetchHotelData(query);
    }
}