<template>
    <div :id="el" class="map-container" :class="{'large-map': !inline}"></div>
</template>

<script setup lang="ts">
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

import { onMounted } from "vue";

const {lat, lng, zoom, inline} = defineProps<{
    lat: number,
    lng: number,
    zoom?: number,
    inline?: boolean
}>();



const el = self.crypto.randomUUID();
let map = null;

onMounted(() => {
    map = new mapboxgl.Map({
        container: el,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom ?? 15,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
});
</script>