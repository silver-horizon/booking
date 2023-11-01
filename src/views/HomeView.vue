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
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import {useToast} from 'primevue/usetoast';

const toast = useToast();

const bookings = [{
  date: new Date(),
  bookings: [
    {
      customerName: "Luke Taylor",
      time: "11:00",
      address: "A House, AB1 2CD",
      totalJobs: 3,
      totalCost: 100
    }, {
      customerName: "Luke Taylor",
      time: "13:00",
      address: "A House, AB1 2CD",
      totalJobs: 1,
      totalCost: 60
    }]
}, {
  date: new Date(),
  bookings: [
    {
      customerName: "Luke Taylor",
      time: "11:00",
      address: "A House, AB1 2CD",
      totalJobs: 3,
      totalCost: 100
    }, {
      customerName: "Luke Taylor",
      time: "13:00",
      address: "A House, AB1 2CD",
      totalJobs: 1,
      totalCost: 60
    }]
}];

function load(){
  toast.add({ severity: 'warn', summary: 'No More Bookings', detail: 'No more bookings found', group: 'br', life: 5000 });
}

</script>