<template>
  <QCard
    class="bg-background-primary px-2 py-3 shadow-none rounded-xl border-3 border-border-primary"
  >
    <div class="flex gap-2">
      <div class="flex gap-1.5 w-fit me-4">
        <section v-for="image in images" class="min-w-6rem max-h-6rem">
          <NuxtImg
            loading="lazy"
            :src="image"
            class="rounded-xl h-full !aspect-1"
          />
        </section>
      </div>
      <div class="flex justify-between grow items-start pt-2">
        <div class="grid grid-cols-2 gap-x-2">
          <TextWithBullet
            label="تاریخ ثبت سفارش:"
            :value="submitionDate"
            v-if="submitionDate"
          />
          <TextWithBullet
            v-if="price"
            label="مبلغ سفارش:"
            :value="`${formatPrice(price)} تومان `"
          />
          <TextWithBullet
            v-if="off_price"
            label="  مبلغ سفارش با محاسبه تخفیف :"
            :value="`${formatPrice(off_price)} تومان `"
          />
          <TextWithBullet
            v-if="purchaseStatus"
            :label="`وضعیت سفارش ${getTextTypeForDateSection(
              purchaseStatus
            )} سفارش:`"
            :value="purchaseStatus"
          />
          <TextWithBullet
            v-if="id"
            label="آیدی محصول : "
            :value="id.toString()"
          />
          <TextWithBullet
            label="کد پیگیری سفارش:"
            :value="transactionCode"
            v-if="transactionCode"
          />

          <TextWithBullet
            v-if="installType"
            label="نحوه نصب:"
            :value="installType"
          />

          <!-- Current Text Bases On State example ongoing or cancelled -->

          <div
            class="flex gap-2 items-center py-3 flex-nowrap whitespace-nowrap ms-1"
          >
            <div
              :style="`background:var(--q-${getCurrentState.backgroundColor})`"
              class="!rounded-full w-5 h-5 flex items-center justify-center"
              v-if="getCurrentState.iconClass"
            >
              <div :class="getCurrentState.iconClass" />
            </div>
            <span v-html="getCurrentState.name"></span>
          </div>
        </div>
        <!--  -->

        <button
          v-show="ongoing"
          class="inline-flex gap-2 text-primary my-auto"
          @click="emit('click:detail')"
        >
          <span>ادامه سفارش</span>
          <CurvedLeftArrow class="stroke-primary" />
        </button>
      </div>
    </div>
  </QCard>
</template>

<script setup lang="ts">
import { formatPrice } from "@/api/basket-helper";

type PurchaseStatus = "Returned" | "Cancelled" | "Delivered" | "Ongoing";

const props = withDefaults(
  defineProps<{
    price?: string;
    off_price?: string;
    transactionCode?: string;
    images?: string[];
    submitionDate?: string;
    currentStatusDate?: string;
    purchaseStatus?: PurchaseStatus;
    installType?: string;
    id?: string | number;
    ongoing: boolean;
  }>(),
  {
    ongoing: false,
  }
);

const emit = defineEmits(["click:detail"]);

const getTextTypeForDateSection = (
  type: "Cancelled" | "Installed" | "Ongoing"
) => {
  switch (type) {
    case "Installed":
      return "نصب شده";
    case "Cancelled":
      return "لغو";
    case "Ongoing":
      return "در جریان";
  }
};

const states = [
  {
    name: "لغو شده توسط کاربر",
    iconClass: "i-carbon-close",
    backgroundColor: "negative",
    type: "Cancelled",
  },
  {
    name: "تحویل داده شده",
    iconClass: "i-carbon-checkmark",
    backgroundColor: "positive",
    type: "Installed",
  },
  {
    name: `<span class='text-secondary ms-1'>در جریان ...</span>`,
    iconClass: "",
    backgroundColor: "negative",
    type: "Ongoing",
  },
];

const getCurrentState =
  states.find((el) => el.type === props.purchaseStatus) ?? states[2];
</script>
