<script lang="ts" setup>
import { inputStylesFN } from "@/constant/styles";

const props = defineProps<{
  selectedIssues: any[];
}>();

const desc = defineModel({ default: "", required: true });

const curr_issue_type = defineModel<any[]>("curr_issue_type");
</script>
<template>
  <QCard
    class="min-h-full q-pa-md flex flex-col gap-6 !rounded-2xl bg-background-secondary"
  >
    <div
      class="flex flex-col gap-3 full-width items-start justify-end text-text-secondary"
    >
      <span> انتخاب مشکلات : </span>
    </div>

    <div class="flex flex-col">
      <q-checkbox
        class="translate-x-2 text-text-secondary"
        :val="issue"
        :label="issue.issue_title"
        v-for="issue in selectedIssues"
        v-model="curr_issue_type"
      />
    </div>
    <QInput
      type="textarea"
      outlined
      color="primary"
      :input-style="inputStylesFN"
      bgColor="background-secondary"
      label="لطفا توضیحات تکمیلی خود را بنویسید."
      v-model="desc"
    />
  </QCard>
</template>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
