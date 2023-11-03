<template>
  <section class="container">
    <h2>Upcoming Bookings</h2>

    <div v-for="date in bookings" class="mb-5">
      <p class="separator">{{ date.date.toLocaleDateString() }}</p>

      <div class="row row-cols-1 row-cols-lg-2">
        <div v-for="booking in date.bookings" >
        <Card class="mb-3 relative hover">
          <template #title>{{ booking.time }} - {{ booking.customerName }}</template>
          <template #content>
            <div class="row row-cols-2">
              <div>
                <p>- map goes here -</p>
              </div>
              <div>
                <p>{{ booking.address }}</p>
                <p>{{ booking.totalJobs }} Jobs</p>
                <p>
                  <Badge size="large" :value="`£${booking.totalCost}`" />
                </p>
                <a class="stretched-link" href="#"><Button severity="info">Go</Button></a>
              </div>
            </div>
          </template>
        </Card>
        </div>
      </div>
    </div>

    <div class="text-center">
    <Button outlined @click="load">Load More</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type {IBookingSummary, IBookingSummaryGroup} from "../type/Bookings";

import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import {useToast} from 'primevue/usetoast';

import BookingService from '../service/BookingService';

const toast = useToast();

const bookings: Ref<IBookingSummaryGroup[]> = ref([]);
const lastBooking = computed(() => {
  let highestNum = 0;

  bookings.value.forEach((b: IBookingSummaryGroup) => {
    b.bookings.forEach((booking: IBookingSummary) => {
      if(highestNum < booking.id){
        highestNum = booking.id;
      }
    });
  });

  return highestNum;
})

BookingService.getBookings().then((data: IBookingSummaryGroup[]) => bookings.value = data);

function load(){
  if(!lastBooking){
    return;
  }

  BookingService.getBookingsAfter(lastBooking.value).then((newData: IBookingSummaryGroup[]) => {
    if(newData.length === 0){
      toast.add({ severity: 'warn', summary: 'No More Bookings', detail: 'No more bookings found', group: 'br', life: 5000 });
      return;
    }
    
    newData.forEach(newBooking => {
      const match = bookings.value.find(x => x.date == newBooking.date);

      if(match != null){
        match.bookings = match.bookings.concat(newBooking.bookings).sort((a: IBookingSummary, b: IBookingSummary) => a.time.localeCompare(b.time));
      } else {
        bookings.value = bookings.value.concat(newBooking).sort((a: IBookingSummaryGroup, b: IBookingSummaryGroup) => a.date.getTime() - b.date.getTime());
      }
    });
  }); 
}
</script>