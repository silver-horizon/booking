export interface IBookingSummary {
    id: number,
    customerName: string,
    time: string,
    address: string,
    totalJobs: number,
    totalCost: number
}

export interface IBookingSummaryGroup {
    date: Date,
    bookings: IBookingSummary[]
};

export interface IAddress{
    line1: string,
    line2?: string,
    city: string,
    postcode: string
}

export interface IBooking {
    id: number,
    customerName: string,
    time: string,
    address: IAddress,
    jobs: [],
    totalCost: number
}