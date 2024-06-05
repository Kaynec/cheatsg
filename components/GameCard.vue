<template>
  <div
    @click="emit('click')"
    class="min-w-50 sm:min-w-60 lg:min-w-65 !flex !flex-col bg-background-primary custom-opacity pt-xs !overflow-visible !rounded-1.75rem hover:opacity-90 transition-ease transition-250"
  >
    <ShowProductVariants
      v-model="showDialog"
      :attachments="attachments"
      label="ظرفیت"
      :product_type="product_type"
      @update="handleAttachmentSelect"
    />
    <div
      class="basis-full bg-background-secondary m-2 flex justify-center rounded-lg"
    >
      <NuxtImg
        :src="img"
        width="140"
        height="140"
        class="object-contain h-auto"
        alt="product card image"
        :draggable="false"
        loading="lazy"
      />
    </div>

    <div class="flex justify-between gap-1 items-center px-xs">
      <span class="f-text-14-18">{{ title }}</span>
    </div>

    <div class="flex !flex-nowrap pe-3 justify-between items-center py-1">
      <span
        class="text-text-secondary !f-text-14-14 pt-2 text-start ps-xs basis-full"
        >مدل : <span class="text-primary-alternate">{{ desc }}</span>
      </span>

      <QBtn flat @click.stop="showPopUp">
        <AddToCard />
      </QBtn>
    </div>

    <ClientOnly>
      <span
        v-if="$q.screen.width < 640"
        class="Shabnam text-primary f-text-14-17 font-bold ps-xs"
        >{{ formatPrice(price) }} تومان</span
      >
    </ClientOnly>
    <!-- TODO Maki This Dynamic TOO -->
    <button
      @click="navigate"
      class="!rounded-b-1.75rem text-primary bg-primary-light full-width flex justify-center !p-0 !py-2 !f-text-14-18 gap-2 items-center !border-t-2 !border-t-#007AFF !border-t-solid"
    >
      <Bag class="fill-primary w-5 h-5" />
      {{ formatPrice(price) }} تومان
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AttachmentListOutPut, ProductTypeEnum } from "@/api";
import { addProductToCard, formatPrice } from "@/api/basket-helper";

const { slug, ...rest } = defineProps<{
  img: string;
  title: string;
  slug: string;
  desc: string;
  price: number;
  id: number;
  attachments: AttachmentListOutPut[];
  product_type: ProductTypeEnum;
  device_model: string;
}>();

const navigate = () => {
  navigateTo({
    name: "Products-id",
    params: {
      id: slug,
    },
  });
};

const showDialog = ref(false);

function showPopUp() {
  showDialog.value = true;
}

function handleAttachmentSelect(attachment: AttachmentListOutPut) {
  addProductToCard(
    {
      ...(rest as any),
    },
    [attachment.id.toString()]
  );
}

const emit = defineEmits(["click"]);
</script>
