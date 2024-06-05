<template>
  <QCard
    class="bg-background-primary px-4 py-6 shadow-none rounded-xl border-3 border-border-primary"
  >
    <div class="flex items-start gap-6 justify-center">
      <div class="flex justify-between grow items-start ps-3">
        <div>
          <span class="pb-3 f-text-13-20 translate-x-3">
            {{ name }}
          </span>
          <span v-if="price" class="text-text-secondary relative f-text-10-13">
            <Bullet
              class="absolute -start-3 fill-primary shadow-2xl top-1/2 !rounded-full bg-primary w-1.25 h-1.25"
            />
            حداقل مبلغ خرید :
            <span class="text-text-primary">
              {{ formatPrice(price) }} تومان
            </span>
          </span>
        </div>
        <!--  -->
        <span
          class="border-2 ms-auto px-sm py-2 border-negative text-negative rounded-2xl"
        >
          {{ discount }}%
        </span>
      </div>
    </div>
    <p
      class="border-2 border-dashed border-primary p-3 text-primary rounded-3xl w-60% max-w-120 mt-10 block text-center mx-auto"
    >
      کد تخفیف : {{ discountCode }}
    </p>
  </QCard>
</template>

<script setup lang="ts">
import { formatPrice } from "@/api/basket-helper";
import defaultImage from "@/assets/home_imgs/cards/controller-big.png";

const props = defineProps<{
  name: string;
  price?: number;
  discount: number;
  discountCode: string;
  image?: string;
}>();

// const getImg = computed(() => props.image ?? defaultImage)
</script>
