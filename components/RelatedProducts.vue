<script setup lang="ts">
import {
  apiProductGetProductRetrieve,
  type ProductDetailOutPut,
  type ProudctOutPut,
} from "@/api";
import ScrollSlider from "./ScrollSlider.vue";

const { data: propsData } = defineProps<{
  data: ProductDetailOutPut;
}>();

const labelIds = propsData.labels.map((el) => el.id).join(",");
const { data, pending } = useAsyncData(
  "products",
  async () =>
    (
      (await apiProductGetProductRetrieve({
        labels__in: labelIds,
      })) as any
    )?.results as ProudctOutPut[]
);
</script>
<template>
  <QCard class="bg-transparent shadow-0 gap-4 my-6xl cursor-pointer">
    <q-inner-loading :showing="pending">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <div class="flex items-center justify-between gap-4 mb-4">
      <span class="text-2xl pb-2 text-text-primary font-600"
        >محصولات مرتبط</span
      >
    </div>
    <p class="text-text-secondary">
      محصولات گیمینگ پر طرفداری که توسط کاربران مورد استقبال قرار گرفته .
    </p>

    <ScrollSlider class="!pb-4rem">
      <template #default="{ canClick }">
        <PopularProductItem
          v-for="product in data"
          :key="product.id"
          class="select-none"
          :img="product.main_image"
          :title="product.title"
          :price="parseInt(product.price)"
          :desc="product.slug"
          :slug="product.slug"
          :time="['22', '14', '35']"
          :final-price="product.off_price"
          :discount-percent="calculatePercentageOffPrice(product)"
          region="آسیا"
          @click="canClick ? gotoProductDetailPage(product) : null"
        />
      </template>
    </ScrollSlider>
  </QCard>
</template>
