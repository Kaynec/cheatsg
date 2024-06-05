<template>
  <div>
    <QCardSection class="flex flex-col">
      <div class="flex items-start gap-5">
        <div class="flex gap-3">
          <NuxtImg
            class="max-w-30"
            :src="item.main_image"
            :alt="item.main_image"
            loading="lazy"
          />
          <span class="text-lg"> عنوان محصول : {{ item.title }}</span>
        </div>
        <div class="flex flex-col gap-4 pb-xl grow">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 justify-between">
            <div
              class="text-text-secondary flex items-center"
              v-for="(option, optionIndex) in options"
              :key="optionIndex"
            >
              <Bullet class="fill-primary" />
              <span class="ps-1">{{ option.label }} : </span>
              <span class="text-text-primary ps-1"> {{ option.value }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-3 justify-end items-center gap-4rem">
        <div
          class="icons flex justify-between text-primary items-center min-w-50 rounded-3xl border-1 border-border-primary px-xl py-xs"
        >
          <QBtn
            flat
            @click="updateQuantityOfCartItem({ ...item, id }, 'ADD', id)"
          >
            <Plus class="fill-primary w-6 h-6" />
          </QBtn>
          <span>{{ item.quantity }}</span>
          <QBtn
            flat
            @click="updateQuantityOfCartItem({ ...item, id }, 'DELETE', id)"
          >
            <TrashCan class="stroke-primary !fill-none w-6 h-6" />
          </QBtn>
        </div>
        <!-- if We Have Attahment we want to show the attachment price  -->
        <span class="text-xl">
          {{ formatPrice(parseInt(item.off_price ?? item.price)) }}
          <span class="text-sm text-text-secondary">تومان</span>
        </span>
      </div>
      <q-separator class="q-mt-lg" color="border-primary" v-if="addSeperator" />
    </QCardSection>
  </div>
</template>

<script setup lang="ts">
import { formatPrice, updateQuantityOfCartItem } from "@/api/basket-helper";
import { AttachmentTypeEnum, type ProductDetailOutPut } from "@/api";
import { type Attachment } from "@/types";

const { item, attachments } = defineProps<{
  item: ProductDetailOutPut;
  attachments: Attachment[];
  addSeperator: boolean;
  id: number;
}>();

const options = [
  {
    label: "قیمت اصلی محصول",
    value: item.price,
  },
];

if (item.off_price) {
  options.push({
    label: "قیمت ویژه محصول",
    value: item.off_price,
  });
}

for (let attachment of attachments) {
  let attachmentTypeToLabel = "";

  if (attachment.attachment_type === AttachmentTypeEnum.NUMBER_1) {
    attachmentTypeToLabel = "گارانتی";
  }
  if (attachment.attachment_type === AttachmentTypeEnum.NUMBER_2) {
    attachmentTypeToLabel = "بیمه";
  }
  if (attachment.attachment_type === AttachmentTypeEnum.NUMBER_3) {
    attachmentTypeToLabel = "ظرفیت";
    options.push({
      label: "قیمت ظرفیت",
      value: attachment.price,
    });
  }

  options.push({
    label: `${attachmentTypeToLabel} محصول`,
    value: attachment.title,
  });
  options.push({
    label: `توضیحات ${attachmentTypeToLabel} `,
    value: attachment.description,
  });
}
</script>
