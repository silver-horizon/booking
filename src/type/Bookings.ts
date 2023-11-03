export interface IBookingSummary {
    id: number,
    customerName: string,
    time: string,
    address: string,
    lat: number,
    lng: number
    totalJobs: number,
    totalCost: number,
}

export interface IBookingSummaryGroup {
    date: Date,
    bookings: IBookingSummary[]
};

export interface IAddress{
    line1: string,
    line2?: string,
    city: string,
    postcode: string,
    lat: number,
    lng: number
}

export interface IBooking {
    id: number,
    customerName: string,
    time: string,
    address: IAddress,
    jobs: [],
    totalCost: number
}