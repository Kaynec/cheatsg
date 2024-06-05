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
          'bg-primary-light border-b-1 border-primary': tab === icon.key,
        }"
      >
        <span class="text-xs py-4"> {{ icon.name }} </span>
      </QBtn>
    </div>

    <div class="bg-transparent !p-3 !m-0" v-auto-animate>
      <OngoingGame :data="OngoingGames" v-if="tab === 'Ongoing'" />
      <InstalledGame :history="paidGames" v-if="tab === 'Installed'" />
      <CancelledGame :history="failedOrCancelled" v-if="tab === 'Cancelled'" />
    </div>
  </QCard>
</template>

<script setup lang="ts">
import {
  apiShopGameListUserList,
  PaymentStatusEnum,
  type GameListCusotmerOutPut,
} from "@/api";
import { vAutoAnimate } from "@formkit/auto-animate";

const icons = [
  { key: "Ongoing", name: "در جریان" },
  { key: "Installed", name: "نصب شده" },
  { key: "Cancelled", name: "لغو شده" },
];

import { ref } from "vue";
const tab = ref("Ongoing");

const { data: history } = await useAsyncData(
  "game-history",
  async () => (await apiShopGameListUserList()) as GameListCusotmerOutPut[]
);

const OngoingGames =
  history.value?.filter(
    (game) => game.payment_status === PaymentStatusEnum.NUMBER_1
  ) ?? [];
const failedOrCancelled =
  history.value?.filter(
    (game) =>
      game.payment_status === PaymentStatusEnum.NUMBER_2 ||
      game.payment_status === PaymentStatusEnum.NUMBER_4
  ) ?? [];
const paidGames =
  history.value?.filter(
    (game) => game.payment_status === PaymentStatusEnum.NUMBER_3
  ) ?? [];
</script>
