<script setup lang="ts">
type ScrollEvt = {
  ref: any;
  verticalPosition: number;
  verticalPercentage: number;
  verticalSize: number;
  verticalContainerSize: number;
  horizontalPosition: number;
  horizontalPercentage: number;
  horizontalSize: number;
  horizontalContainerSize: number;
};

const scrollAmount = ref(0);

const state = useGlobalStore();

function handleScroll(e: ScrollEvt) {
  scrollAmount.value = e.verticalPosition;
}

const scrollRef = ref();

// Setting The Ref of Scroll Area to store in Global State
onMounted(() => state.setScrollRef(scrollRef.value));

const globalState = useGlobalStore();

const currentPageMetaName = computed(() => globalState.currentSchema);
</script>
<template>
  <div class="h-screen h-100svh !flex !flex-col">
    <LazyAppHeader :scrollAmount="scrollAmount" />
    <QScrollArea
      ref="scrollRef"
      class="head:mt-10vh !h-screen !h-100svh"
      @scroll="handleScroll"
    >
      <div class="flex flex-col min-h-90svh md:min-h-100svh">
        <div
          class="page-container max-w-100vw mx-auto 2xl:max-w-90rem pb-2.5rem px-xs grow"
        >
          <div class="h-10 z-1">
            <ClientOnly>
              <div
                class="flex gap-3 items-center mb-0.75rem"
                v-if="currentPageMetaName && currentPageMetaName.length"
              >
                <RouterLink to="/">
                  <div class="i-carbon:home" />
                </RouterLink>
                <template v-for="(name, index) in currentPageMetaName">
                  <div class="i-carbon:chevron-left" />
                  <RouterLink
                    :class="`${
                      index ===
                      currentPageMetaName.toString().split('-').length - 1
                        ? 'text-text-primary'
                        : ''
                    }`"
                    :to="{
                      name: name.to,
                    }"
                    >{{ name.label }}</RouterLink
                  >
                </template>
              </div>
            </ClientOnly>
          </div>

          <NuxtPage v-slot="{ Component, route }">
            <transition name="slide-fade" mode="out-in" :key="$route.fullPath">
              <component :is="Component" :key="route" />
            </transition>
          </NuxtPage>
        </div>
        <div>
          <LazyDesktopFooter />
          <LazyMobileFooter />
        </div>
      </div>
    </QScrollArea>
  </div>
</template>

<style lang="scss" scoped>
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
