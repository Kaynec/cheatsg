<template>
  <QCard
    class="flex flex-col gap-3 p-2 custom-opacity hover:scale-[1.01] transition-ease transition-250 select-none bg-background-primary"
    ref="cardRef"
  >
    <div
      class="basis-full bg-background-secondary py-3 flex justify-center rounded-lg"
    >
      <NuxtImg
        :src="img"
        width="140"
        height="140"
        class="object-contain h-auto"
        alt="product card image"
        :draggable="false"
        loading="lazy"
      />
    </div>

    <div class="flex justify-between full-width items-center">
      <span class="f-text-11-14">{{ title }}</span>
      <QChip
        color="primary"
        size="clamp(8px,10px,14px)"
        text-color="white"
        square
        >{{ percent }}</QChip
      >
    </div>

    <!-- <span class="text-text-secondary f-text-11-14 text-start full-width"
      >{{ desc }}
    </span> -->

    <div class="flex justify-between full-width items-center">
      <span class="f-text-11-14 line-through">{{ price }}</span>
      <div class="flex gap-1">
        <div
          v-for="t in timeSplitted"
          :key="t"
          class="flex gap-1 justify-center"
        >
          <div
            class="text-primary w-5.5 h-5.5 place-content-center grid border-1 border-solid rounded aspect-1"
            style="border-color: var(--primary)"
          >
            {{ t }}
          </div>
          <div v-if="t !== timeSplitted[timeSplitted.length - 1]">:</div>
        </div>
      </div>
    </div>
    <!-- TODO Make THis Dynamic TOO -->
    <div class="flex">
      <PrimaryButton dense class="!rounded-full grow">
        {{ formatPrice(finalPrice) }} تومان
      </PrimaryButton>
    </div>
  </QCard>
</template>

<script setup lang="ts">
import { apiShopAddToCartCreate } from "@/api";
import { formatPrice } from "@/api/basket-helper";
import { isBefore } from "date-fns-jalali";

const { time } = defineProps<{
  img: string;
  title: string;
  percent: string;
  slug: string;
  price: string;
  time?: string;
  finalPrice: number;
}>();

const cardRef = ref();

defineExpose({
  ref: cardRef,
});

const timeSplitted = ref<string[]>([]);

onBeforeMount(() => {
  if (!time) return;
  const newTime = new Date(time);

  /**
   * Checks if the current date is before the specified date (newTime).
   * If current date is not before newTime, returns immediately to exit the function.
   * Used to check if the offer time has expired.
   */
  if (!isBefore(new Date(), newTime)) return;

  setInterval(() => {
    const newDate = new Date();
    timeSplitted.value = (
      new Date(new Date(newTime.getTime() - newDate.getTime())) as any
    )
      .toLocaleDateString("fa-Fa", {
        hour: "numeric",
        second: "numeric",
        minute: "numeric",
      })
      .split(" ")[1]
      .split(":")
      .reverse();
  }, 1000);
});
</script>
