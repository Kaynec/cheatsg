<template>
  <div
    class="flex items-center justify-between mb-6 gap-y-6 mt-3 text-text-secondary px-lg text-1rem"
  >
    <!-- This If Statement is That because we don't want them to see the screen on 
  large devices when they are on blog mode   -->
    <div
      class="flex gap-2"
      v-if="$q.screen.width > 900 && filterType !== 'BLOG'"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.1667 3.41667V5.25C17.1667 5.91667 16.7501 6.75 16.3334 7.16667L12.7501 10.3333C12.2501 10.75 11.9167 11.5833 11.9167 12.25V15.8333C11.9167 16.3333 11.5834 17 11.1667 17.25L10.0001 18C8.91673 18.6667 7.41673 17.9167 7.41673 16.5833V12.1667C7.41673 11.5833 7.0834 10.8333 6.75007 10.4167L6.3584 10.0083C6.10007 9.73333 6.05007 9.31667 6.2584 8.99167L10.5251 2.14167C10.6751 1.9 10.9417 1.75 11.2334 1.75H15.5001C16.4167 1.75 17.1667 2.5 17.1667 3.41667Z"
          fill="#979797"
        />
        <path
          d="M8.62467 3.025L5.66634 7.76667C5.38301 8.225 4.73301 8.29167 4.35801 7.9L3.58301 7.08333C3.16634 6.66667 2.83301 5.91667 2.83301 5.41667V3.5C2.83301 2.5 3.58301 1.75 4.49967 1.75H7.91634C8.56634 1.75 8.96634 2.46667 8.62467 3.025Z"
          fill="#979797"
        />
      </svg>
      فیلتر بر اساس:
    </div>

    <ClientOnly>
      <button @click="$emit('showDialog')" v-if="$q.screen.width < 900">
        <FilterIcon class="fill-primary" />
      </button>

      <!-- we don't want them to see the screen on when they are on blog mode   -->
      <template v-else-if="filterType !== 'BLOG'">
        <span
          v-for="item in Object.keys(filterConditions)"
          :key="item"
          class="cursor-pointer pb-2"
          :class="{
              'text-primary b-b-2  b-b-solid': currentFilterCondition === (filterConditions as any)[item]
            }"
          style="border-color: var(--primary)"
          @click="$emit('update', (filterConditions as any)[item])"
        >
          {{ (filterConditions as any)[item] }}
        </span>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { FilterConditions } from '@/types'

const { filterType = 'PRODUCT' } = defineProps<{
  filterConditions: FilterConditions
  currentFilterCondition: string
  filterType?: 'PRODUCT' | 'BLOG'
}>()

const emit = defineEmits(['update', 'showDialog'])
</script>

<style scoped></style>
