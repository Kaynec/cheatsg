<template>
  <QDialog
    v-model="showDialog"
    @update:model-value="
      store.setCurrentStorySource({
        title: '',
        picture: '',
        content_picture: '',
        link: '',
        id: -500,
      })
    "
  >
    <QCard
      class="w-90vw max-w-210 !overflow-visible pt-2 shadow-0 relative flex flex-col gap-4 flex items-center justify-center"
    >
      <q-linear-progress
        :value="currentValue"
        class="absolute top-1 rounded-xl w-full"
        reverse
      />

      <QImg
        width="100%"
        fit="contain"
        :src="currentStory?.content_picture"
        :alt="currentStory?.content_picture"
        @click="gotoProperPage"
      >
        <QCardSection class="w-full bottom-0 text-center">
          {{ currentStory?.title }}
        </QCardSection>
      </QImg>
      <!--  -->
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
const store = useGlobalStore();

const imageUtil = useImage();

const showDialog = ref(false);

const currentStory = ref(store.getCurrentStorySource());

const currentValue = ref(0);

let interval: any = null;

function resetTimer() {
  currentValue.value = 0;
  interval = setInterval(() => {
    if (currentValue.value >= 1) {
      showDialog.value = false;
      clearInterval(interval);

      return;
    }
    currentValue.value += 0.01;
  }, 150);
}

function gotoProperPage() {
  if (currentStory.value?.link)
    navigateTo(currentStory.value.link, { external: true });
}

/**
 * Watches for changes to the currentStorySource in the store, and updates
 * the local currentStory ref with the latest value from the store.
 *
 * It also opens the showDialog if the current story has an image and name,
 * otherwise it closes the dialog.
 */
watch(
  () => store.currentStorySource,
  () => {
    // Clearing Any Interval That Might have Been Left Behind
    clearInterval(interval);
    currentStory.value = store.getCurrentStorySource();

    if (!!currentStory.value?.picture && !!currentStory.value.title) {
      showDialog.value = true;
      // Optimize The Image For better Usage
      currentStory.value.content_picture = imageUtil(
        currentStory.value.content_picture,
        {
          format: "webp",
          quality: 80,
        }
      );
      resetTimer();
    } else showDialog.value = false;
  }
);
</script>

<style scoped></style>
