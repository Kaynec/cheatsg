<template>
  <div
    class="flex items-center flex-col gap-2 mx-auto text-text-secondary min-w-25"
  >
    <div
      class="rounded-full border-2 border-primary p-3 bg-primary-light aspect-1"
    >
      <NuxtImg
        :src="story.picture"
        :alt="story.picture"
        class="rounded-full object-cover"
        width="125"
        height="125"
        draggable="false"
        loading="lazy"
      />
    </div>
    {{ story.title }}
  </div>
</template>

<script setup lang="ts">
import type { StoryDetailOutPut } from "@/api";

defineProps<{
  story: StoryDetailOutPut;
}>();
</script>
