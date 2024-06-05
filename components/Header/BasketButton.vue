<template>
  <button aria-label="basket page" @click="navigateToProperBasketPage">
    <HeaderShopIcon class="!cursor-pointer" />
  </button>
</template>
<script setup lang="ts">
import { navigateToProperBasketPage } from "@/utils/Navigations-Utils";
</script>
