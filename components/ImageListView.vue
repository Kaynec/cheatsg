<template>
  <QDialog v-model="showDialog" @update:model-value="$emit('close')">
    <QCard
      class="w-full flex flex-col !flex-nowrap gap-4 pa-sm items-center justify-center"
    >
      <QImg
        width="20em"
        height="20em"
        :src="newImages[currentImageIndex]"
        :alt="newImages[currentImageIndex]"
        :key="newImages[currentImageIndex]"
        class="w-auto max-w-120 h-auto"
        fit="contain"
      />
      <div class="grid grid-cols-3 w-full">
        <div v-for="(img, index) in newImages" :key="img" class="flex-1">
          <QBtn
            @click="currentImageIndex = index"
            class="fit p-2 border-1 border-solid border-#303030"
            flat
          >
            <QImg
              class="cursor-pointer w-full p-1px rounded-xl p-xs"
              :src="img"
              :alt="img"
              fit="contain"
              width="10em"
              height="10em"
            />
          </QBtn>
        </div>
      </div>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
const { showImageDialog, images, ...props } = defineProps<{
  images: string[];
  showImageDialog: boolean;
  currentImageIndex?: number;
}>();

const currentImageIndex = toRef(props.currentImageIndex ?? 0);

const showImageDialogComputed = computed(() => showImageDialog);

const showDialog = toRef(showImageDialogComputed);

const emit = defineEmits(["close"]);

const imageUtil = useImage();

const newImages = images.map((el) => {
  return imageUtil(el, {
    format: "webp",
  });
});
</script>

<style scoped></style>
