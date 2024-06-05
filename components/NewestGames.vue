<script setup lang="ts">
import { apiProductGetProductRetrieve, type ProudctOutPut } from "@/api";
import { PriceTypes, ProductTypes } from "@/types";
import ScrollSlider from "./ScrollSlider.vue";

const { filterTypes = { labels__in: "" } } = defineProps<{
  filterTypes?: {
    labels__in: string;
  };
}>();

const { data, pending } = useAsyncData(
  "newset-games",
  async () =>
    (
      (await apiProductGetProductRetrieve({
        order_by: PriceTypes.FAVOURITE,
        product_type: ProductTypes.GAME,
        ...filterTypes,
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
      <span class="text-2xl pb-2 text-primary font-600">تازه ترین ها</span>
      <button
        @click="
          navigateTo({
            name: 'Products-Games',
            query: {
              order_by: PriceTypes.NEWEST,
            },
          })
        "
        class="text-sm flex items-center flex-nowrap gap-1 whitespace-nowrap text-primary"
      >
        <span>مشاهده همه</span>
        <CurvedLeftArrow class="stroke-primary" />
      </button>
    </div>
    <p class="text-text-secondary pb-4">
      محصولات گیمینگ پر طرفداری که توسط کاربران مورد استقبال قرار گرفته .
    </p>

    <ScrollSlider class="!pb-4rem">
      <template #default="{ canClick }">
        <GameCard
          v-for="product in data"
          :key="product.id"
          class="select-none"
          :img="product.main_image"
          :title="product.title"
          :device_model="product.device_model ?? ''"
          :price="parseInt(product.price)"
          :desc="product.slug"
          :slug="product.slug"
          :time="['22', '14', '35']"
          :final-price="product.off_price"
          :discount-percent="calculatePercentageOffPrice(product)"
          region="آسیا"
          @click="canClick ? gotoProductDetailPage(product) : null"
          :attachments="product.attachments"
          :product_type="product.product_type!"
          :id="product.id"
        />
      </template>
      <!--  -->
    </ScrollSlider>
  </QCard>
</template>
