<script setup lang="ts">
import { apiProductGetProductRetrieve, type ProudctOutPut } from "@/api";
import { PriceTypes, ProductTypes } from "@/types";
import ScrollSlider from "../ScrollSlider.vue";

const { data, pending } = useAsyncData(
  "products",
  async () =>
    (
      (await apiProductGetProductRetrieve({
        order_by: PriceTypes.FAVOURITE,
        product_type: ProductTypes.PHYCICAL,
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
      <div class="items-center flex gap-2 pb-2">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M25.6527 7.44024H25.1193L20.6127 2.93357C20.2527 2.57357 19.666 2.57357 19.2927 2.93357C18.9327 3.29357 18.9327 3.88024 19.2927 4.25357L22.4793 7.44024H9.51935L12.706 4.25357C13.066 3.89357 13.066 3.30691 12.706 2.93357C12.346 2.57357 11.7593 2.57357 11.386 2.93357L6.89268 7.44024H6.35935C5.15935 7.44024 2.66602 7.44024 2.66602 10.8536C2.66602 12.1469 2.93268 13.0002 3.49268 13.5602C3.81268 13.8936 4.19935 14.0669 4.61268 14.1602C4.99935 14.2536 5.41268 14.2669 5.81268 14.2669H26.186C26.5993 14.2669 26.986 14.2402 27.3593 14.1602C28.4793 13.8936 29.3327 13.0936 29.3327 10.8536C29.3327 7.44024 26.8393 7.44024 25.6527 7.44024Z"
            fill="#007AFF"
          />
          <path
            d="M26.1999 14.2665H5.81328C5.42661 14.2665 4.99995 14.2532 4.61328 14.1465L6.29328 24.3998C6.66661 26.6932 7.66661 29.3332 12.1066 29.3332H19.5866C24.0799 29.3332 24.8799 27.0798 25.3599 24.5598L27.3733 14.1465C26.9999 14.2398 26.5999 14.2665 26.1999 14.2665ZM15.9999 24.6665C12.8799 24.6665 10.3333 22.1198 10.3333 18.9998C10.3333 18.4532 10.7866 17.9998 11.3333 17.9998C11.8799 17.9998 12.3333 18.4532 12.3333 18.9998C12.3333 21.0265 13.9733 22.6665 15.9999 22.6665C18.0266 22.6665 19.6666 21.0265 19.6666 18.9998C19.6666 18.4532 20.1199 17.9998 20.6666 17.9998C21.2133 17.9998 21.6666 18.4532 21.6666 18.9998C21.6666 22.1198 19.1199 24.6665 15.9999 24.6665Z"
            fill="#007AFF"
          />
        </svg>

        <span class="text-2xl text-text-primary font-600">محصولات پر فروش</span>
      </div>
      <button
        @click="
          navigateTo({
            name: 'Products',
            query: {
              order_by: PriceTypes.FAVOURITE,
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
        <PopularProductItem
          v-for="product in data"
          :key="product.id"
          class="select-none"
          :img="product.main_image"
          :title="product.title"
          :price="parseInt(product.price)"
          :device_model="product.slug"
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
