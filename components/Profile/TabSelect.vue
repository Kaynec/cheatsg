<template>
  <div class="min-w-75 lg:m-0">
    <div
      class="text-text-secondary flex flex-col bg-background-primary b-none rounded-lg pa-2 text-right"
    >
      <QBtn
        flat
        :class="{ 'bg-primary-light': userTab === icon.key }"
        :name="icon.key"
        v-for="icon in icons"
        @click.prevent="
          () => (icon?.action ? icon.action() : (userTab = icon.key))
        "
      >
        <div
          class="w-full rounded-lg flex items-center gap-2 !w-full !justify-start !rounded-lg"
        >
          <div class="flex items-center gap-2 py-2">
            <span
              :src="icon.icon"
              :style="`
                fill: ${icon.key === userTab ? 'var(--q-primary)' : '#636363'} !important;
                `"
              class="!w-7 !h-7"
              v-html="icon.icon"
            />

            {{ icon.name }}
          </div>
        </div>
      </QBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCssVar } from "@vueuse/core";

const { value } = useCssVar("primary");

console.log(value);
defineProps<{
  icons: {
    key: string;
    icon: string;
    name: string;
    action?: () => void;
  }[];
}>();

const userTab = defineModel<string>();
</script>
