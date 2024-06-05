<script setup lang="ts">
import { apiProductGetProductRetrieve, type ProudctOutPut } from "@/api";

const { data, execute, pending } = useAsyncData(
  "special-offer-products",
  async () => {
    const data = await apiProductGetProductRetrieve({
      has_discount: "True",
    });
    return data.results as any as ProudctOutPut[];
  }
);
</script>
<template>
  <ScrollSlider
    ref="sliderRef"
    class="custom-spiderman-bg mx-auto !rounded-xl mb-lg w-full h-max cursor-pointer py-2xl"
  >
    <template #default="{ canClick }">
      <q-inner-loading :showing="pending">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      <div
        class="flex flex-col items-center relative max-w-40 embla__slide min-w-35"
      >
        <div class="ms-lg w-max relative bottom-0 min-h-75 max-h-full h-full">
          <img
            src="@/assets/offer-text.svg?inline"
            class="f-w-80-100 max-h-45 pb-4"
            alt="this is the special offer text"
            loading="lazy"
          />

          <div
            class="absolute bottom-3 start-50% translate-x-50% flex items-center justify-center"
          >
            <NuxtImg
              loading="lazy"
              src="/images/home_imgs/cards/tall-ps5.png"
              alt="tall ps5"
              class="aspect-auto"
              style="width: min(3.75rem, 62px); height: min(185px, 9.5rem)"
            />
            <button
              @click="
                navigateTo({
                  name: 'Products',
                  query: {
                    has_discount: true,
                  },
                })
              "
              class="inline-flex mt-2 text-lg items-center flex-nowrap gap-1 whitespace-nowrap text-primary"
            >
              <span>مشاهده همه</span>
              <CurvedLeftArrow class="stroke-primary" />
            </button>
          </div>
        </div>
      </div>
      <div
        class="pb-lg min-w-55 lg:max-w-70 embla__slide"
        v-for="product in data"
        :key="product?.id"
      >
        <SpecialOfferItem
          class="mt-lg"
          :key="product?.id"
          :img="product.main_image"
          :title="product.title"
          :price="parseInt(product.price)"
          :slug="product.slug"
          :percent="`${calculatePercentageOffPrice(product)}%`"
          :time="product.discount_end_time?.toString()"
          :final-price="parseInt(product.off_price ?? product.price)"
          :discount-percent="calculatePercentageOffPrice(product)"
          region="آسیا"
          @click="canClick ? gotoProductDetailPage(product) : null"
        />
      </div>
    </template>
  </ScrollSlider>
</template>
<style scoped>
.body--light .custom-spiderman-bg {
  background-image: url("@/assets/login-bg-light.webp");
}

.body--dark .custom-spiderman-bg {
  background-image: url("@/assets/login-bg.webp");
}

.custom-spiderman-bg {
  background: var(background-primary);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0;
  border-radius: 1rem !important;
}

@media screen and (max-width: 768px) {
  .custom-spiderman-bg {
    background-position: -1rem;
  }
}
</style>
