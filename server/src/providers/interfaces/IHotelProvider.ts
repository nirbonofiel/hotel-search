import { HotelResponse, WeskiQuery } from '../../types';

export interface IHotelProvider {
  fetchHotelData(query: WeskiQuery): Promise<HotelResponse[]>;
}