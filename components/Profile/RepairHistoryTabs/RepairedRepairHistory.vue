<template>
  <div class="grid gap-4">
    <UserRepairHistoryCard
      repairType="Repaired"
      :desc="i.explanation!"
      :deliveryType="i.delivery_data"
      :id="i.id.toString()"
      :purchaseStatus="i.is_paid"
      :submitionDate="
        new Date((i.delivery_data?.schedule as any)?.start).toLocaleDateString(
          'fa-Fa'
        )
      "
      :delivery_data="i.delivery_data"
      v-for="i in data"
    />
  </div>
</template>

<script setup lang="ts">
import type { IssueReportListOutPut } from "@/api";

defineProps<{
  data: IssueReportListOutPut[];
}>();
</script>
