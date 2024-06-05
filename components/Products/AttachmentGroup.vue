<template>
  <div>
    <section>
      <div class="flex justify-between items-center">
        <span class="text-h6 text-text-primary pb-2"> {{ label }} محصول </span>

        <QBtn
          @click="
            currentSelectedAttachments = attachments;
            currentLabel = label;
            showDialog = true;
          "
          flat
          color="primary"
          v-if="attachments.length"
        >
          مطالعه بیشتر
          <LinkIcon />
        </QBtn>
      </div>

      <q-radio
        v-for="attachment in attachments"
        :val="attachment.id"
        class="translate-x-2 text-text-secondary"
        :label="`${attachment.title.substring(0, 50)}...`"
        v-model="selectedAttachments"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProductDetailOutPut } from "@/api";
import { ProductTypes, type Attachment } from "@/types";

const props = defineProps<{
  label: string;
  data: ProductDetailOutPut;
  attachments: Attachment[];
}>();

const currentSelectedAttachments = defineModel("currentSelectedAttachments");
const showDialog = defineModel("showDialog");
const currentLabel = defineModel("currentLabel");
const selectedAttachments = defineModel<string>("selectedAttachments");
</script>

<style scoped></style>
