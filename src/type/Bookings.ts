export interface IBookingSummary {
    id: number,
    customerName: string,
    time:  string,
    address: string,
    totalJobs: number,
    totalCost: number
}

export interface IBookingSummaryGroup {
    date: Date,
    bookings: IBookingSummary[]
};