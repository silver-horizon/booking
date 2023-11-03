<template>
    <section class="container">
        <RouterLink :to="{ name: 'home' }">&lt; Back to Booking List</RouterLink>
        <div v-if="booking != null">
            <h2>{{ booking.customerName }} @ {{ booking.time }}</h2>

            <div class="row">
                <div class="col-12 col-lg-6">
                    <Card class="mb-3">
                        <template #header>
                            <Map :lat="booking.address.lat" :lng="booking.address.lng"></Map>
                        </template>
                        <template #content>
                            <div class="row row-cols-2 align-items-center relative">
                                <div>
                            <p>{{ booking.address.line1 }}</p>
                            <p v-if="booking.address.line2">{{ booking.address.line2 }}</p>
                            <p>{{ booking.address.city }}</p>
                            <p>{{ booking.address.postcode }}</p>
                            </div>
                            <div>
                                <a :href="directions" class="stretched-link" target="_blank">
                               <Button severity="info">Get Directions</Button>
                               </a>
                            </div>
                                </div>
                        </template>
                    </Card>
                </div>
                <div class="col-12 col-lg-6 order-lg-2">
                    <Card class="mb-3">
                        <template #title>Customer Details</template>
                        <template #content>
                            <p>{{ booking.customerName }}</p>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import type { IBooking } from "../type/Bookings"

import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import BookingService from '../service/BookingService';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Map from '../components/Map.vue';

const directions = ref("");
const booking: Ref<IBooking | null> = ref(null);
BookingService.getBooking(1).then(b => {
    booking.value = b;
    directions.value = `https://www.google.com/maps/dir/?api=1&destination=${b.address.line1},${b.address.postcode}`;
});
</script>