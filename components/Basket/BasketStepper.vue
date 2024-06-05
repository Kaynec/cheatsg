d
<template>
  <QCard
    class="bg-background-primary text-primary flex flex-col gap-4 items-center justify-center min-h-55"
  >
    <div class="f-text-32-48 mb-2rem">LOGO</div>
    <div class="flex w-82% max-w-175 relative">
      <div
        class="background absolute inset-0 h-1px bg-primary full-width"
      ></div>
      <div
        class="w-5 h-5 absolute -top-0.75rem -left-6"
        :class="`${
          currentActiveIndex === 0 ? 'brightness-100' : 'brightness-35'
        }`"
      >
        <ShoppingCard class="stroke-primary w-5 h-5" />
        <span class="whitespace-nowrap -me-3 mt-2 inline-block">سبد خرید</span>
      </div>

      <div
        class="bg-background-primary left-39% md:left-41% lg:left-42% 2xl:left-44% w-9 h-9 flex items-center justify-center center-absolute"
      >
        <ShipmentExpress
          :class="`${
            currentActiveIndex === 1 ? 'brightness-100' : 'brightness-35'
          }`"
          class="stroke-primary w-5 h-5 mt-2"
        />
        <span
          :class="`${
            currentActiveIndex === 1 ? 'brightness-100' : 'brightness-35'
          }`"
          class="whitespace-nowrap -ml-3 mt-2 inline-block"
          >آدرس و زمان ارسال</span
        >
      </div>

      <div
        class="stroke-primary w-5 h-5 absolute -top-0.75rem -right-6"
        :class="`${
          currentActiveIndex === 2 ? 'brightness-100' : 'brightness-35'
        }`"
      >
        <Payment class="w-5 h-5" />
        <span class="whitespace-nowrap -ms-4 mt-2 inline-block">پرداخت</span>
      </div>
    </div>
  </QCard>
</template>

<script setup lang="ts">
defineProps<{
  currentActiveIndex: number;
}>();
</script>

<style scoped>
.background {
  position: relative;
}
</style>
