<script setup lang="ts">
import type { UserOutPut } from "@/api";
import { useDark } from "@vueuse/core";
defineProps<{
  scrollAmount: number;
  currentuser: UserOutPut | null;
}>();

const drawer = ref(false);

function closeDrawer() {
  drawer.value = !drawer.value;
}
</script>
<template>
  <!-- 
    v-auto-animate
  -->
  <!-- a hack for margin 1px error of fucking ios -->
  <LazyMobileDrawer :drawer="drawer" @close="drawer = !drawer" />

  <nav
    :class="{ 'bg-background-primary-light': scrollAmount > 0 }"
    class="!rounded-lg bg-background-primary backdrop-blur w-100vw mx-auto transition-450 !z-9999 header mb-3 -translate-y-2px"
  >
    <div class="flex items-center justify-between relative">
      <div
        class="flex flex-1 relative bg-background-primary items-center justify-between px-6"
      >
        <button
          class="flex flex-col gap-1 relative z-9999"
          @click="closeDrawer"
        >
          <div
            class="w-5 h-2px !bg-dark !dark:bg-white absolute transition-500"
            :class="{ '-rotate-45deg': drawer, '': !drawer }"
          ></div>
          <div
            :class="{ 'rotate-45deg': drawer, 'bottom-4px': !drawer }"
            class="w-5 h-2px !bg-dark !dark:bg-white e absolute transition-500"
          ></div>
        </button>
        <img
          src="@/assets/logo.png"
          class="relative max-w-14 mix-blend-difference"
          alt="website logo"
        />
        <LazyBasketButton :currentuser="currentuser" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.header {
  display: block;
}

@media screen and (min-width: 900px) {
  .header {
    display: none;
  }
}
</style>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
