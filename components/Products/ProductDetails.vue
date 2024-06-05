<script setup lang="ts">
import type { ProductDetailOutPut, ProudctOutPut } from "@/api";
import { isBefore } from "date-fns-jalali";
import { addToFavourite, shareProduct } from "@/api/basket-helper";
import { ProductTypes } from "@/types";

const { data } = defineProps<{
  data: ProductDetailOutPut &
    ProudctOutPut & { included_products: ProudctOutPut[] };
}>();
const time = ["22", "14", "35"];

const showImageDialog = ref(false);

const has_discount = ref(false);

const timeSplitted = ref<string[]>([]);

onBeforeMount(() => {
  if (data.discount_end_time) {
    const newTime = new Date(data.discount_end_time);

    if (!isBefore(new Date(), newTime)) return;

    has_discount.value = true;
    setInterval(() => {
      const newDate = new Date();
      timeSplitted.value = (
        new Date(newTime.getTime() - newDate.getTime()) as any
      )
        .toLocaleDateString("fa-Fa-u-nu-latn", {
          hour: "numeric",
          second: "numeric",
          minute: "numeric",
        })
        .split(" ")[1]
        .split(":")
        .reverse();
      console.log(newDate);
    }, 1000);
  }
});

//

const images = computed(() => {
  // IF ITS PACKAGE
  if (data.product_type === ProductTypes.PACKAGE) {
    return data.included_products.map((el: any) => el.main_image);
  }
  return data.images.map((el) => el.file);
});
</script>
<template>
  <QCard class="min-h-full !rounded-2xl pa-xs">
    <ImageListView
      :showImageDialog="showImageDialog"
      :images="images"
      @close="showImageDialog = false"
    />
    <div class="flex justify-between my-lg gap-y-lg">
      <span
        class="text_10xl text-negative"
        :class="{ 'visible ': has_discount, 'invisible !h-0': !has_discount }"
      >
        پیشنهاد شگفت انگیز
      </span>
      <div
        class="flex items-center !md:items-end md:self-start !md:flex-col gap-3"
      >
        <div
          :class="{ 'visible ': has_discount, 'invisible !h-0': !has_discount }"
          class="text-text-secondary"
        >
          زمان باقی مانده برای تخفیف:
        </div>
        <div class="flex">
          <div
            :class="{
              'visible ': has_discount,
              'invisible !h-0': !has_discount,
            }"
            v-for="t in timeSplitted"
            :key="t"
            class="flex gap-1 justify-center"
          >
            <div
              class="text-negative w-9 h-9 place-content-center grid border-1 border-solid rounded-lg aspect-1"
              style="border-color: var(--primary)"
            >
              {{ t }}
            </div>
            <div v-if="t !== timeSplitted[time.length - 1]">:</div>
          </div>
        </div>
        <StarComponent :starNumber="parseInt(data.score! ?? '0')" />
      </div>
    </div>
    <div class="items-center justify-between flex gap-10">
      <!-- imgs -->
      <div
        class="flex items-center justify-center !sm:flex-nowrap gap-xl -translate-y-10"
      >
        <!-- THIS IS DIFFERENT FOR PACKAGE AND OTHER SHIT  -->
        <PackageImageList
          v-if="data.product_type === ProductTypes.PACKAGE"
          :data="data as any"
          v-model="showImageDialog"
        />
        <ProductImagesList
          v-else
          :data="data as any"
          v-model="showImageDialog"
        />
        <!--  -->

        <div class="text-text-secondary flex flex-col gap-4">
          <span class="text-h5 text-text-primary">{{ data.title }}</span>
          <span>
            مدل:
            <span class="text-text-primary"> {{ data.device_model }} </span>
          </span>
          <div
            class="gap-y-4 grid grid-cols-2 pb-lg"
            v-if="data.product_type === ProductTypes.PACKAGE"
          >
            <span
              class="flex items-center gap-2"
              v-for="product in data.included_products"
            >
              <Bullet class="fill-primary" />
              {{ product.title }}
            </span>
          </div>

          <div
            class="grid gap-y-4"
            :class="{
              'grid-cols-2': data.product_type === ProductTypes.PACKAGE,
            }"
          >
            <div v-for="note in data.notes" flex gap-2 items-center>
              <CheckCircle class="fill-gray" />
              {{ note.title }}
            </div>
          </div>

          <!--  -->
          <div class="flex gap-3">
            <button
              @click="addToFavourite(data)"
              class="flex rounded-3xl gap-2 border-1px border-#303030 border-solid p-xs items-center"
            >
              <HeartWithPlus class="fill-gray" />
              افزودن به علاقه مندی
            </button>
            <button
              @click="shareProduct(data)"
              class="flex rounded-3xl gap-2 border-1px border-#303030 border-solid p-xs items-center"
            >
              <ShareIt class="fill-gray" />
              اشتراک گذاری
            </button>
            <!-- <div
              class="flex rounded-3xl gap-2 border-1px border-#303030 border-solid p-xs items-center"
            >
              <Bell class="fill-gray" />
              اطلاع از تخفیف محصول
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </QCard>
</template>
