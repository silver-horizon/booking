<template>
    <section class="container">
        <RouterLink :to="{ name: 'home' }">&lt; Back to Booking List</RouterLink>
        <div v-if="booking != null">
            <h2>{{ booking.customerName }} @ {{ booking.time }}
                <Badge size="large" :value="booking.status" :severity="getSeverity(booking.status)" />
            </h2>

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
                        <template #content>
                            <div v-for="job in booking.jobs" :key="job.id" class="mb-3">
                                <Checkbox v-model="job.complete" :inputId="`job-${job.id}`" name="job" :value="job.id" @change="checkForCompletion" />
                                <label :for="`job-${job.id}`" class="ml-2">{{ job.description }}</label>
                            </div>

                            <Button severity="success" class="mt-5" :disabled="!allChecked" @click="complete">Complete</Button>
                        </template>
                    </Card>

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
import type { IBooking, BookingStatus } from "../type/Bookings"

import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import BookingService from '../service/BookingService';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import Checkbox from 'primevue/checkbox';
import Map from '../components/Map.vue';
import Swal from 'sweetalert2'
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const toast = useToast();

function getSeverity(status: BookingStatus) {
    if (status == "Not Started") {
        return "warning";
    }

    if (status == "In Progress") {
        return "info";
    }

    return "success";
}

const allChecked: Ref<boolean> = ref(false);
function checkForCompletion() {
    if(!booking.value){
        return;
    }

    booking.value.status = "In Progress";

    if (booking.value?.jobs.some(x => !x.complete) || allChecked.value) {
        allChecked.value = false;
        return;
    }

    allChecked.value = true;
}

async function complete(){
    const result = await Swal.fire({
        icon: 'question',
        title: "Complete Booking?",
        text: "Are you sure you wish to mark this booking as complete?",
        showCancelButton: false,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Yes"
    });

    if(!result.isConfirmed){
        return;
    }

    //pretend to tell the server that we're done and then...
    toast.add({
      severity: "success",
      summary: "Booking Complete",
      detail: `Booking completed. Great job!`,
      group: 'br',
      life: 5000
    });

    router.push({name: "home"});
}

const directions = ref("");
const booking: Ref<IBooking | null> = ref(null);
BookingService.getBooking(1).then(b => {
    booking.value = b;
    directions.value = `https://www.google.com/maps/dir/?api=1&destination=${b.address.line1},${b.address.postcode}`;
});
</script>