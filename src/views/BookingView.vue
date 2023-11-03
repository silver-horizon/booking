<template>
    <section class="container">
        <RouterLink :to="{ name: 'home' }">&lt; Back to Booking List</RouterLink>
        <div v-if="booking != null">
            <h2>{{ booking.customerName }} @ {{ booking.time }}</h2>

            <div class="row">
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


const booking: Ref<IBooking | null> = ref(null);
BookingService.getBooking(1).then(b => booking.value = b);
</script>