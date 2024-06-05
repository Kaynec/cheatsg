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
      <OngoingRepairHistory :data="Ongoing" v-if="tab === 'Ongoing'" />
      <RepairedRepairHistory :data="Repaired" v-if="tab === 'Repaired'" />
      <CancelledRepairHistory :data="Cancelled" v-if="tab === 'Cancelled'" />
    </div>
  </QCard>
</template>

<script setup lang="ts">
import {
  apiIssueIssueReportListList,
  StatusEnum,
  type IssueReportListOutPut,
} from "@/api";
import { vAutoAnimate } from "@formkit/auto-animate";

const icons = [
  { key: "Ongoing", name: "در جریان" },
  { key: "Repaired", name: "تعمیر شده" },
  { key: "Cancelled", name: "لغو شده" },
];

import { ref } from "vue";
const tab = ref("Ongoing");

const { data: history } = await useAsyncData(
  "order-history",
  async () => (await apiIssueIssueReportListList()) as IssueReportListOutPut[]
);

const Repaired =
  history.value?.filter((issue) => issue.status === StatusEnum.NUMBER_2) ?? [];
const Ongoing =
  history.value?.filter((issue) => issue.status === StatusEnum.NUMBER_1) ?? [];
const Cancelled =
  history.value?.filter((issue) => issue.status === StatusEnum.NUMBER_3) ?? [];
</script>
