<template>
  <QCard class="shadow-none bg-background-primary min-h-120">
    <div
      class="text-text-secondary bg-background-primary flex justify-start b-none rounded-lg text-right"
    >
      <QBtn
        flat
        :name="icon.key"
        v-for="icon in icons"
        @click="tab = icon.key"
        class="whitespace-nowrap flex-1 items-center border-b-1 border-border-primary"
        :class="{
          'bg-primary-light border-b-1 border-primary': tab === icon.key
        }"
      >
        <span class="text-xs py-4"> {{ icon.name }} </span>
      </QBtn>
    </div>

    <div class="bg-transparent !p-3 !m-0" v-auto-animate>
      <OngoingPurchase :data="Ongoing" v-if="tab === 'Ongoing'" />
      <DeliveredPurchase :data="paid" v-if="tab === 'Delivered'" />
      <!-- <ReturnedPurchase v-if="tab === 'Returned'" /> -->
      <CancelledPurchase :data="failedOrCancelled" v-if="tab === 'Cancelled'" />
    </div>
  </QCard>
</template>

<script setup lang="ts">
import {
  apiShopOrderListUserList,
  PaymentStatusEnum,
  type OrderListCusotmerOutPut
} from '@/api'
import { vAutoAnimate } from '@formkit/auto-animate'
const icons = [
  { key: 'Ongoing', name: 'در جریان' },
  { key: 'Delivered', name: 'تحویل داده شده' },
  // { key: 'Returned', name: 'مرجوع شده' },
  { key: 'Cancelled', name: 'لغو شده' }
]

import { ref } from 'vue'
const tab = ref('Ongoing')

const { data: history } = await useAsyncData(
  'order-history',
  async () => (await apiShopOrderListUserList()) as OrderListCusotmerOutPut[]
)

const Ongoing =
  history.value?.filter(
    product => product.payment_status === PaymentStatusEnum.NUMBER_1
  ) ?? []
const failedOrCancelled =
  history.value?.filter(
    product =>
      product.payment_status === PaymentStatusEnum.NUMBER_2 ||
      product.payment_status === PaymentStatusEnum.NUMBER_4
  ) ?? []
const paid =
  history.value?.filter(
    product => product.payment_status === PaymentStatusEnum.NUMBER_3
  ) ?? []
</script>
