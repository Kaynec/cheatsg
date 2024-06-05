<script setup lang="ts">
import {
  AttachmentTypeEnum,
  type AttachmentListOutPut,
  type CartItemListOutPut,
  type ProductDetailOutPut,
} from "@/api";
import { addProductToCard, formatPrice } from "@/api/basket-helper";
import { ProductTypes, type Attachment } from "@/types";

import { useAttachmentHandler } from "@/composable/useAttachmentHandler";

const { data } = defineProps<{
  data: ProductDetailOutPut;
}>();

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
  <QCard class="min-h-full q-pa-md flex flex-col gap-6 !rounded-2xl">
    <ShowProductVariants
      v-model="showDialog"
      :attachments="currentSelectedAttachments as any as AttachmentListOutPut[]"
      :label="currentLabel"
      :product_type="data.product_type"
      @update="handleAttachmentSelect"
    />
    <div
      class="flex flex-col gap-3 full-width items-start justify-end text-text-secondary"
    >
      <div class="flex gap-1 tracking-tighter items-center">
        <Comment class="fill-gray" />
        {{ (data as any).comments_count }} نظر ثبت شده
      </div>
      <div class="flex gap-1 tracking-tighter items-center">
        <Badge class="fill-gray" />
        گارانتی اصالت و سلامت فیزیکی کالا
      </div>
      <div class="flex gap-1 tracking-tighter items-center">
        <ShipmentExpress class="fill-gray" />
        ارسال تا ۷ روز کاری آینده
      </div>
    </div>
    <!--  -->
    <q-separator v-if="(data as any).attachments.length" />
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

    <q-separator />
    <div class="flex justify-between mt-auto">
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
  </QCard>
</template>
