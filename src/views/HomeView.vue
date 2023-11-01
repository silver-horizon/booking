<template>
  <section class="container">
    <h2>Upcoming Bookings</h2>

    <Card v-for="booking in bookings" class="mb-3 relative hover">
      <template #title>{{booking.time}} - {{booking.customerName}}</template>
      <template #content>
       <div class="row row-cols-2">
        <div>
          <p>- map goes here -</p>
        </div>
        <div>
          <p>{{booking.address}}</p>
          <p>{{ booking.totalJobs }} Jobs</p>
          <p><Badge size="large" :value="`£${booking.totalCost}`" /></p>
          <a class="stretched-link" href="#"><Button severity="info">Go</Button></a>
        </div>
       </div>
      </template>
    </Card>
  </section>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Button from 'primevue/button'

const bookings = [{
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
}];

</script>