<script setup lang="ts">
import {
  addProductToCard,
  addToFavourite,
  formatPrice,
  shareProduct,
} from "@/api/basket-helper";
import { ProductTypes, type Product, type Attachment } from "@/types";
import { AttachmentTypeEnum, type AttachmentListOutPut } from "@/api";
import { useAttachmentHandler } from "@/composable/useAttachmentHandler";

const { data } = defineProps<{
  data: Product;
}>();

const showImageDialog = ref(false);

const time = ["22", "14", "35"];

const has_discount = ref(!!data.discount_end_time);

const timeSplitted = ref<string[]>([]);

const attachments = ref(
  (data as any).attachments.map((attch: Attachment) => ({
    ...attch,
    selected: false,
  })) as Attachment[]
);

const selectedAttachments = ref("");

const images = computed(() => {
  // IF ITS PACKAGE
  if (data.product_type === ProductTypes.PACKAGE) {
    return data.included_products.map((el: any) => el.main_image);
  }
  return data.images.map((el) => el.file);
});

function handleAttachmentSelect(attachment: Attachment) {
  addProductToCard(data, [attachment.id]);
}

const {
  allSelectedAttachments,
  capacities,
  currentLabel,
  currentSelectedAttachments,
  garranties,
  insurance,
  selectedGarranty,
  selectedInsurance,
  selectedcapacity,
  showDialog,
} = useAttachmentHandler(data);
</script>
<template>
  <QCard class="min-h-full bg-background-primary !rounded-2xl pa-xs">
    <ShowProductVariants
      v-model="showDialog"
      :attachments="currentSelectedAttachments as any as AttachmentListOutPut[]"
      :label="currentLabel"
      :product_type="data.product_type"
      @update="handleAttachmentSelect"
    />
    <ImageListView
      :showImageDialog="showImageDialog"
      :images="images"
      @close="showImageDialog = false"
    />
    <div class="flex justify-between my-lg gap-y-lg">
      <span
        class="text_10xl text-center grow"
        :class="{ 'visible ': has_discount, 'invisible !h-0': !has_discount }"
      >
        پیشنهاد شگفت انگیز
      </span>
    </div>
    <div class="items-center justify-center flex gap-10">
      <div class="flex items-center justify-center !sm:flex-nowrap gap-xl">
        <div class="flex justify-between grow items-center gap-4">
          <div class="flex flex-col items-start">
            <div class="flex items-start flex-col gap-3">
              <text
                class="text-text-secondary"
                :class="{
                  'visible ': has_discount,
                  'invisible !h-0': !has_discount,
                }"
              >
                زمان باقی مانده برای تخفیف:
              </text>
              <div class="flex">
                <div
                  v-for="t in timeSplitted"
                  :key="t"
                  class="flex gap-1 justify-center"
                  :class="{
                    'visible ': has_discount,
                    'invisible !h-0': !has_discount,
                  }"
                >
                  <div
                    class="text-negative w-8.5 h-8.5 place-content-center grid border-1 border-solid rounded aspect-1"
                    style="border-color: var(--q-negative)"
                  >
                    {{ t }}
                  </div>
                  <div v-if="t !== timeSplitted[time.length - 1]">:</div>
                </div>
              </div>
            </div>
          </div>

          <section class="w-full pb-lg">
            <div
              v-if="data.product_type === ProductTypes.PACKAGE"
              class="grow w-full"
            >
              <PackageImageList :data="data as any" v-model="showImageDialog" />
            </div>
            <ProductImagesList
              v-else
              :data="data as any"
              v-model="showImageDialog"
            />
          </section>
        </div>
        <div class="text-text-secondary flex flex-col gap-4 grow">
          <span class="text-h5 text-text-primary">{{ data.title }}</span>

          <div class="flex justify-between pb-lg items-center">
            <span class="text-lg">
              مدل:
              <span class="text-#71B5FF"> {{ data.device_model }}</span>
            </span>
            <div
              class="border-1 text-primary border-primary h-7 px-1 text-xs px-2 items-center gap-1 rounded-lg flex"
            >
              <Star class="stroke-primary !w-6 !h-6 mb-1" />
              {{ data.score }}
            </div>
          </div>

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

          <ProductFeatureWithIcon
            :title="note.title"
            v-for="note in data.notes"
          />

          <div class="flex gap-6">
            <button
              @click="addToFavourite(data)"
              class="flex rounded-2xl gap-2 border-1px border-#303030 border-solid p-xs items-center"
            >
              <HeartWithPlus class="fill-gray" />
            </button>
            <button
              @click="shareProduct(data)"
              class="flex rounded-2xl gap-2 border-1px border-#303030 border-solid p-xs items-center"
            >
              <ShareIt class="fill-gray" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <QCard
      class="bg-background-dark my-lg min-h-full !pa-sm flex flex-col gap-3 !rounded-lg"
    >
      <!-- Based on The Type of Product -->
      <AttachmentGroup
        :attachments="garranties"
        label="گارانتی"
        v-model:currentLabel="currentLabel"
        v-model:show-dialog="showDialog"
        v-model:current-selected-attachments="currentSelectedAttachments"
        v-model:selectedAttachments="selectedGarranty"
        :data="data"
        v-if="data.product_type === ProductTypes.PHYCICAL"
      />
      <AttachmentGroup
        :attachments="insurance"
        label="بیمه"
        v-model:currentLabel="currentLabel"
        v-model:show-dialog="showDialog"
        v-model:current-selected-attachments="currentSelectedAttachments"
        v-model:selectedAttachments="selectedInsurance"
        :data="data"
        v-if="data.product_type === ProductTypes.PHYCICAL"
      />

      <AttachmentGroup
        :attachments="capacities"
        label="ظرفیت"
        v-model:currentLabel="currentLabel"
        v-model:show-dialog="showDialog"
        v-model:current-selected-attachments="currentSelectedAttachments"
        v-model:selectedAttachments="selectedcapacity"
        :data="data"
        v-if="data.product_type === ProductTypes.GAME"
      />
    </QCard>
    <div class="flex items-center justify-between ps-sm my-2xl">
      <div class="flex w-full py-4 justify-between mt-auto">
        <span> قیمت: </span>

        <div class="flex gap-2">
          <span class="!line-through text-red" v-if="data.off_price">
            {{ formatPrice(parseInt(data.price)) }} تومان
          </span>

          <span>
            {{ formatPrice(parseInt(data.off_price) ?? parseInt(data.price)) }}
            تومان
          </span>
        </div>
      </div>
      <AddProductToCartButton
        :data="data"
        :selected-attachments="allSelectedAttachments"
      />
    </div>

    <q-separator class="!mb-4 !mt-2" />
    <div class="flex gap-3 full-width justify-between text-text-secondary">
      <div class="flex gap-2 items-center">
        <Comment class="fill-gray" />
        {{ data.comments_count }} نظر ثبت شده
      </div>
      <div class="flex gap-2 items-center">
        <ShipmentExpress class="fill-gray" />
        ارسال تا ۷ روز کاری آینده
      </div>
      <div class="flex gap-2 items-center">
        <Badge class="fill-gray" />
        گارانتی اصالت و سلامت فیزیکی کالا
      </div>
    </div>
  </QCard>
</template>
