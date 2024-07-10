export type WeskiRequest = {
    query: WeskiQuery
}

export type WeskiQuery = {
    ski_site: number,
    from_date: string,
    to_date: string,
    group_size: number,
}

export type HotelResponse = {
    name: string,
    mainURL: string,
    rating: string,
    price: string,
    destination: number
}