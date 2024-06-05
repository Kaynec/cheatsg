<template>
  <QCard class="shadow-none bg-background-primary min-h-120">
    <div
      class="text-text-secondary bg-background-primary flex justify-start b-none rounded-lg text-right"
    >
      <Favourite v-if="tab === 'Favourite'" />

      <!-- <QBtn
        flat
        :name="icon.key"
        v-for="icon in icons"
        @click="tab = icon.key"
        class="whitespace-nowrap flex-1 items-center border-b-1 border-border-primary"
        :class="{
          'bg-primary-light border-b-1 border-primary': tab === icon.key,
        }"
      >
        <span class="text-xs py-4"> {{ icon.name }} </span>
      </QBtn> -->
    </div>

    <!-- <div class="bg-transparent !p-3 !m-0" v-auto-animate>
      <Available v-if="tab === 'Available'" />
    </div> -->
  </QCard>
</template>

<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate";

const icons = [
  { key: "Favourite", name: "محصولات مورد علاقه" },
  // { key: "Available", name: "اطلاع رسانی از موجودی ها" },
];

import { ref } from "vue";
const tab = ref("Favourite");
</script>
