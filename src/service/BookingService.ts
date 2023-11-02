/* mocking only */
const lastId = 4;

const today = new Date();

function addDay(date: Date, numDays: number){
    date.setDate(date.getDate() + numDays);
    return date;
}

const data = [{
    date: today,
    bookings: [
      {
        id: 1,
        customerName: "Luke Taylor",
        time: "11:00",
        address: "A House, AB1 2CD",
        totalJobs: 3,
        totalCost: 100
      }, {
        id: 2,
        customerName: "Luke Taylor",
        time: "13:00",
        address: "A House, AB1 2CD",
        totalJobs: 1,
        totalCost: 60
      }]
  }, {
    date: addDay(new Date(), 3),
    bookings: [
      {
        id: 3,
        customerName: "Luke Taylor",
        time: "11:00",
        address: "A House, AB1 2CD",
        totalJobs: 3,
        totalCost: 100
      }, {
        id: lastId,
        customerName: "Luke Taylor",
        time: "13:00",
        address: "A House, AB1 2CD",
        totalJobs: 1,
        totalCost: 60
      }]
  }, {
    date: today,
    bookings: [
      {
        id: 5,
        customerName: "Luke Taylor",
        time: "12:00",
        address: "A House, AB1 2CD",
        totalJobs: 3,
        totalCost: 100
      }, {
        id: 6,
        customerName: "Luke Taylor",
        time: "15:00",
        address: "A House, AB1 2CD",
        totalJobs: 1,
        totalCost: 60
      }]
  }];

import type { IBookingSummaryGroup } from "../type/Bookings";

export default {
    async getBookings(): Promise<IBookingSummaryGroup[]>{
        return data.slice(0, 2);
    },

    async getBookingsAfter(id: number): Promise<IBookingSummaryGroup[]>{
        if(id === lastId){
            return data.slice(2);
        }

        return [];
    }
};