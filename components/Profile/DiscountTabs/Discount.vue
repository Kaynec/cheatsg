<template>
  <div class="grid h-max h-full gap-4 lg:grid-cols-2 mt-1">
    <DiscountCard
      v-for="discount in data"
      :price="parseInt(discount.discount.min_purchase_amount)"
      :name="discount.discount.name"
      :discount="discount.discount.percent"
      :discountCode="discount.discount.code"
      class="col-12 col-lg-6"
    />
    <!--  -->
    <div class="mt-auto col-span-2">
      <div class="flex w-full justify-center mt-4">
        <!-- <q-pagination color="primary" v-model="current" :max="max" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  apiShopDiscountListUserRetrieve,
  type UserDiscountOutPut,
} from "@/api";

const filterTypes = computed(() => {
  const reactive = {} as { offset: number };
  reactive.offset = current.value * limit.value - limit.value;

  return reactive;
});

const { data } = useAsyncData("user-discounts", async () => {
  const data = (await apiShopDiscountListUserRetrieve()) as any;

  // limit.value = data.limit
  // max.value = Math.ceil(data.count / limit.value)
  // if (!current.value) {
  //   current.value = 1
  // }
  return data.results as UserDiscountOutPut[];
});

const current = ref(0);
const limit = ref(10);
const max = ref(1);
</script>
