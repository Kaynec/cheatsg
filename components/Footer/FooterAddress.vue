<template>
  <div
    class="flex gap-1 items-center justify-start !flex-nowrap"
    v-for="address in SiteDetails.address"
  >
    <div class="w-5 h-5 i-carbon:location text-primary mb-1" />
    <p class="grow text-start max-w-88% my-auto">{{ address }}</p>
  </div>
</template>
<script setup>
import { SiteDetails } from '@/constant/SiteDetails'
</script>
