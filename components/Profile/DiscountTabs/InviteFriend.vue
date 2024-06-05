<template>
  <div class="flex flex-col items-center gap-1 max-w-125 mx-auto gap-3">
    <NuxtImg
      loading="lazy"
      src="/images/discount-pic.png"
      alt="discount-pic.png"
      width="275"
      height="275"
    />
    <p class="text-text-secondary">
      کاربر گرامی شما میتوانید با معرفی ما به دوستان خود از تخفیف های ما
      برخوردار شوید.
    </p>
    <!-- <QInput
      type="tel"
      label=" شماره موبایل :"
      v-model="phone"
      rounded
      class="w-full mb-2"
      dense
      outlined
      color="primary"
      :input-style="inputStylesFN"
      bgColor="background-secondary"
    /> -->
    <PrimaryButton class="max-w-125 !rounded-xl mb-4" @click="startShare">
      اشتراک لینک ثبت نام
    </PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import { useShare } from "@vueuse/core";
const { share } = useShare();

function startShare() {
  share({
    title: "ثبت نام",
    text: "ثبت نام در سایت cheats game",
    url: location.href,
  });
}

const phone = ref("***********");
</script>

<style scoped></style>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
