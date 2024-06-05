<template>
  <QCard
    class="bg-background-primary px-2 py-3 shadow-none rounded-xl border-3 border-border-primary"
  >
    <div class="flex gap-2">
      <div class="flex gap-1.5 w-fit me-4">
        <section
          v-for="image in images"
          class="rounded-lg w-6rem max-h-6rem bg-background-secondary border-1px border-solid border-#303030 pa-sm"
        >
          <NuxtImg
            :src="image"
            loading="lazy"
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
            :label="` وضعیت سفارش:`"
            :value="getTextTypeForDateSection(purchaseStatus)"
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
            class="flex gap-2 items-center py-3 flex-nowrap whitespace-nowrap"
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
          @click="emit('click:detail')"
          v-if="ongoing"
          class="inline-flex gap-2 text-primary my-auto"
        >
          <span>ادامه خرید </span>
          <CurvedLeftArrow class="stroke-primary" />
        </button>
      </div>
    </div>
  </QCard>
</template>

<script setup lang="ts">
import { formatPrice } from "@/api/basket-helper";
import defaultControllerImage from "@/assets/home_imgs/cards/controller-big.png";
import defaultHeadsetImage from "@/assets/home_imgs/cards/headset-big.png";

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
  type: "Returned" | "Cancelled" | "Delivered" | "Ongoing"
) => {
  switch (type) {
    case "Returned":
      return "مرجوع";
    case "Ongoing":
      return "در جریان";
    case "Cancelled":
      return "لغو";
    default:
      return "تحویل";
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
    name: "مرجوع شده توسط کاربر",
    iconClass: "i-carbon-warning bg-warning",
    backgroundColor: "",
    type: "Returned",
  },
  {
    name: "تحویل داده شده",
    iconClass: "i-carbon-checkmark",
    backgroundColor: "positive",
    type: "Delivered",
  },
  {
    name: `<span class='text-secondary ms-1'>در جریان ...</span>`,
    iconClass: "",
    backgroundColor: "negative",
    type: "Ongoing",
  },
];

const getCurrentState = states.find(
  (el) => el.type === props.purchaseStatus
) ?? {
  name: `<span class='text-secondary ms-1'>در جریان ...</span>`,
  iconClass: "",
  backgroundColor: "negative",
  type: "Ongoing",
};

const getImgs = computed(() =>
  props.images && props.images.length
    ? props.images
    : [defaultHeadsetImage, defaultControllerImage]
);
</script>
