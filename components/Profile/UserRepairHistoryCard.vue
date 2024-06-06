<template>
  <QCard
    class="bg-background-primary px-2 py-3 shadow-none rounded-xl border-3 border-border-primary"
  >
    <div class="flex gap-2">
      <div class="flex items-start gap-3">
        <div class="text-lg pt-xl lg:hidden">
          {{ name }}
        </div>
      </div>

      <div class="flex justify-between flex-nowrap grow items-start pt-2">
        <div
          class="grid grid-cols-2 lg:grid-cols-2 xl:gap-x-7 lg:gap-x-4 md:gap-x-3 gap-x-2 gap-y-3 ms-3"
        >
          <TextWithBullet
            label="تاریخ ثبت سفارش:"
            :value="submitionDate"
            v-if="submitionDate"
          />
          <TextWithBullet
            label="آدرس:"
            :value="delivery_data?.address?.address_detail"
            v-if="submitionDate"
          />
          <TextWithBullet
            label="کد پستی:"
            :value="delivery_data?.address?.postal_code"
            v-if="submitionDate"
          />

          <TextWithBullet
            label="نحوه ارسال:"
            :value="deliveryType?.type?.name"
            v-if="deliveryType?.type?.name"
          />
          <TextWithBullet label="توضیحات:" :value="desc" v-if="desc" />

          <TextWithBullet
            v-if="price"
            label="مبلغ سفارش:"
            :value="`${formatPrice(price)} تومان `"
          />

          <TextWithBullet
            v-if="currentStatusDate"
            :label="`تاریخ  سفارش:`"
            :value="currentStatusDate"
          />
          <TextWithBullet
            v-if="transactionCode"
            label="کد پیگیری سفارش:"
            :value="transactionCode"
          />
          <TextWithBullet v-if="id" label="آیدی:" :value="id" />
        </div>
        <!-- This Little Part Is Dynamic based On The Condition we are inside -->
        <div
          class="flex flex-row flex-nowrap whitespace-nowrap flex-1 pt-5 lg:p-0 lg:flex-col gap-2 md:gap-4 items-end my-auto"
        >
          <template v-if="repairType === 'Ongoing'">
            <button
              @click="
                navigateTo({
                  name: 'RepairDetail',
                  query: {
                    data: JSON.stringify(data),
                  },
                })
              "
              class="inline-flex gap-2 text-primary"
            >
              <span>مشاهده جزییات </span>
              <CurvedLeftArrow class="stroke-primary" />
            </button>
          </template>
          <template v-else-if="repairType === 'Imperfect'">
            <button
              class="inline-flex gap-2 text-primary"
              @click="
                navigateTo({
                  name: 'Repair-DateSelect',
                  query: {
                    id,
                  },
                })
              "
            >
              <span>ادامه تعمیر</span>
              <CurvedLeftArrow class="stroke-primary" />
            </button>
          </template>
          <!-- <template v-else-if="repairType === 'Repaired'">
              <button class="inline-flex gap-2 text-primary">
                <span>جزییات تعمیرات</span>
                <CurvedLeftArrow class="stroke-primary" />
              </button>
            </template> -->
          <!-- <template v-else-if="repairType === 'Cancelled'">
              <button class="inline-flex gap-2 text-primary">
                <span>تعمیر</span>
                <CurvedLeftArrow class="stroke-primary" />
              </button>
            </template> -->
        </div>
      </div>
    </div>
  </QCard>
</template>

<script setup lang="ts">
// navigateTo({
//   name:"RepairDetail"
// })

import type { DeliveryDataOutPut, IssueReportDetailOutPut } from "@/api";
import { formatPrice } from "@/api/basket-helper";

type RepairType = "Imperfect" | "Cancelled" | "Repaired" | "Ongoing";

const props = withDefaults(
  defineProps<{
    price?: number;
    transactionCode?: string;
    image?: string;
    name?: string;
    desc?: string;
    deliveryType?: Record<string, any>;
    id?: string;
    submitionDate?: string;
    currentStatusDate?: string;
    repairType?: RepairType;
    paid: boolean;
    delivery_data: DeliveryDataOutPut;
    data?: IssueReportDetailOutPut;
  }>(),
  {
    paid: false,
  }
);
</script>
