<script setup lang="ts">
import { apiProductGetProductRetrieve, type ProudctOutPut } from "@/api";
import { ProductTypes } from "@/types";

const { filterTypes = { labels__in: "" } } = defineProps<{
  filterTypes?: {
    labels__in: string;
  };
}>();

const { data, pending } = useAsyncData(
  "special-offer-products",
  async () =>
    (
      (await apiProductGetProductRetrieve({
        has_discount: "True",
        product_type: ProductTypes.PACKAGE,
        ...filterTypes,
      })) as any
    )?.results?.filter(
      (el: ProudctOutPut) => el.discount_end_time
    ) as any as ProudctOutPut[]
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
        <div class="ms-lg w-max relative bottom-0 min-h-90 max-h-full h-full">
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
              src="/images/GOW.png"
              alt="tall ps5"
              style="
                width: clamp(10rem, 11rem, 12rem);

                height: clamp(12rem, 13rem, 15rem);
              "
            />
            <button
              @click="
                navigateTo({
                  name: 'Products-Games',
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

      <div class="px-3xl" v-for="product in data" :key="product.id">
        <Package class="lg:min-w-120" :packg="product" />
      </div>
    </template>
  </ScrollSlider>
</template>
<style lang="scss" scoped>
.body--light .custom-spiderman-bg {
  background-image: url("@/assets/login-bg-light.png");
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

<!--TODO This is Just For Special Price part Change it In Different Sections  -->
<style>
.swiper-pagination {
  /* ... other styles ... */
  bottom: -5px !important;
}
</style>
