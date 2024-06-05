<template>
  <QCard class="rounded-lg pa-lg bg-background-secondary">
    <span class="text-xl text-text-primary">انتخاب نحوه ارسال</span>

    <QCardSection v-for="delivery in deliveryData" :key="delivery.id">
      <QRadio
        v-model="currentDeliveryMethod"
        :label="delivery.name"
        :val="delivery.id"
      />
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import type { DeliveryTypeListOutPut } from "@/api";

const deliveryData = defineModel<DeliveryTypeListOutPut[]>({
  required: true,
});

const currentDeliveryMethod = defineModel<number>("currentDeliveryMethod");
</script>
