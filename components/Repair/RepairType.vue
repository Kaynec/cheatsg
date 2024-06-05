<script lang="ts" setup>
import {
  ApiIssueTagListRetrieveIssueType,
  IssueTypeEnum,
  type TagListOutPut,
} from "@/api";
import type { TagOutPutWithSelected } from "@/types";

defineProps<{
  issue_type: ApiIssueTagListRetrieveIssueType;
  tagList: TagOutPutWithSelected[];
  loading: boolean;
}>();

const tagList = defineModel("tagList");

const emit = defineEmits(["update:issue_type", "submit"]);

const curr_issue_type = ref([]);
</script>
<template>
  <QCard
    class="min-h-full q-pa-md flex flex-col gap-6 !rounded-2xl bg-background-primary"
  >
    <div
      class="flex flex-col gap-3 full-width items-start justify-end text-text-secondary"
    >
      <span> لطفا نوع خدمات تعمیر خود را انتخاب کنید. </span>
      <div
        class="bg-background-primary rounded-lg w-full flex items-center justify-between gap-1 pa-xs"
      >
        <button
          :class="{
            'border-1 border-primary border-solid  !shadow-md  shadow-blue-2':
              issue_type === 2,
          }"
          class="rounded-xl flex-1 flex !flex-row text-primary items-center gap-1 text-xs py-8px"
          @click="
            emit('update:issue_type', ApiIssueTagListRetrieveIssueType.NUMBER_2)
          "
        >
          <img
            class="w-8 h-8 object-contain"
            alt="image of card"
            src="@/assets/home_imgs/cards/controller-big.png"
          />
          <span> دسته بازی </span>
        </button>
        <button
          :class="{
            'border-1 border-primary border-solid  !shadow-md  shadow-blue-2 ':
              issue_type === 1,
          }"
          class="rounded-xl flex-1 flex !flex-row text-primary items-center gap-1 text-xs py-8px"
          @click="
            emit('update:issue_type', ApiIssueTagListRetrieveIssueType.NUMBER_1)
          "
        >
          <img
            class="w-8 h-8 object-contain"
            alt="image of card"
            src="@/assets/home_imgs/cards/ps5-big.png"
          />
          <span> کنسول بازی </span>
        </button>
      </div>
    </div>

    <QCard class="flex flex-col min-h-24">
      <QInnerLoading size="lg" :showing="loading" />
      <q-checkbox
        class="translate-x-2 text-text-secondary"
        :val="tag.title"
        :label="tag.title"
        v-for="tag in tagList"
        v-model="tag.selected"
      />
    </QCard>

    <PrimaryButton @click="emit('submit', curr_issue_type)">
      {{
        issue_type === IssueTypeEnum.NUMBER_1
          ? " رزرو نوبت  کنسول"
          : "شروع تست خرابی دسته"
      }}
    </PrimaryButton>
  </QCard>
</template>
