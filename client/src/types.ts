export type SearchQuery = {
    ski_site: number,
    from_date?: string,
    to_date?: string,
    group_size: number,
}

export type HotelType = {
    name: string,
    destination: string,
    mainURL: string,
    rating: string,
    price: string
}