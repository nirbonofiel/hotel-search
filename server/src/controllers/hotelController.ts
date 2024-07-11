import express, { Request, Response } from "express";
import { Server as SocketServer } from 'socket.io';
import { HotelResponse, WeskiQuery } from "../types";
import { EXTRNAL_GROUO_SIZE_SAERCH } from "../constants/weSkiConstants";
import { IHotelProvider } from "../providers/interfaces/IHotelProvider";

export const createHotelRouter = (io:SocketServer, hotelProviders: IHotelProvider[]) => {
    const router = express.Router();
    router.post('/search', async (req:Request,res:Response) => {
        const { ski_site, from_date, to_date, group_size } = req.body as WeskiQuery;
        for(let i = group_size; i <= group_size + EXTRNAL_GROUO_SIZE_SAERCH; i++){
            hotelProviders.forEach(async (provider) => {
                try {
                    const data: HotelResponse[] = await provider.fetchHotelData({ ski_site, from_date, to_date, group_size: i });
                    io.emit('searchResults', data);
                } catch (error) {
                    console.error(`Error fetching data from provider for group_size ${i}`, error);
                }
            });
        }
    });

    return router;
}