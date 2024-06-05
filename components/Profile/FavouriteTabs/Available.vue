<template>
  <div class="grid gap-4 lg:grid-cols-2 mt-1">
    <FavouriteAndAvailableCard
      :price="1_850_000"
      name="دسته بازی مدل DualShock 4"
      :discount="15"
      discountCode="ED34FBL"
      class="col-12 col-lg-6"
      :notAvailable="true"
    />
    <FavouriteAndAvailableCard
      :price="1_850_000"
      name="دسته بازی مدل DualSense"
      :discount="15"
      discountCode="23TSPP"
      class="col-12 col-lg-6"
      :notAvailable="true"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
