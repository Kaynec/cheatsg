<script setup lang="ts">
import type { Product } from "@/types";

enum tabConditions {
  Comments = "نظرات",
  QandA = "پرسش و پاسخ",
}

const tab = ref<keyof typeof tabConditions>("Comments");

const { data } = defineProps<{ data: Product }>();
</script>
<template>
  <!-- Intro -->

  <QCard class="pa-lg my-4">
    <TabsIntro :data="data" />
  </QCard>
  <!-- Details -->

  <QCard class="pa-lg my-4">
    <TabsDetails :data="data" />
  </QCard>

  <QCard class="p-lg my-4">
    <TabsComments :data="data" />
  </QCard>
  <!-- QandA -->
  <QCard class="p-lg my-4">
    <TabsQAndA :data="data" />
  </QCard>
</template>
