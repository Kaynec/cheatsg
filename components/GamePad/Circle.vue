<template>
  <svg class="!overflow-visible">
    <g overflow-visible :transform="transform">
      <circle
        cx="0"
        cy="0"
        r="78.5"
        fill="none"
        stroke="gray"
        stroke-width="1"
      ></circle>
      <line
        x1="0"
        y1="-78.5"
        x2="0"
        y2="78.5"
        stroke="gray"
        stroke-width="1"
      ></line>
      <line
        x1="-78.5"
        y1="0"
        x2="78.5"
        y2="0"
        stroke="gray"
        stroke-width="1"
      ></line>
      <line
        x1="0"
        y1="0"
        :x2="X * (100 - amountOfMaxRadiusAllowedForCircle)"
        :y2="Y * (100 - amountOfMaxRadiusAllowedForCircle)"
        stroke="var('--q-primary')!"
        stroke-width="2"
      ></line>
      <circle
        :cx="X * (100 - amountOfMaxRadiusAllowedForCircle)"
        :cy="Y * (100 - amountOfMaxRadiusAllowedForCircle)"
        r="4"
        fill="var('--q-primary')!"
      ></circle>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  X: number;
  Y: number;
  transform: string;
}>();

const amountOfMaxRadiusAllowedForCircle = 22;
</script>

<style scoped></style>
