<script setup lang="ts">
useSeoMeta({
  title: "Cheats  - repair success",
  ogTitle: "Cheats  - repair success",
  description: "درخواست تعمیر موفقیت آمیز",
  ogDescription: "درخواست تعمیر موفقیت آمیز",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "درخواست تعمیر موفقیت آمیز",
    to: "",
  },
]);

const details = ref([
  {
    label: "شماره پیگیری:",
    text: "1000 5085 874964",
  },
  {
    label: "نوع تحویل مرسوله:",
    text: "به صورت حضوری",
  },
  {
    label: "تاریخ تعیین شده برای تحویل مرسوله:",
    text: "چهارشنبه 1402/08/25",
  },
  {
    label: "ساعت تعیین شده برای تحویل مرسوله:",
    text: "12:30",
  },

  {
    label: "خرابی های ثبت شده:",
    text: "تعمیر دکمه ضبدر دسته ؛ تعمیر دکمه آنالوگ سمت راست",
  },
]);
</script>

<template>
  <div class="px-6xl mb-2rem">
    <QCard
      class="pa-xs !min-h-120 !m-y-sm flex m-lg flex-col col w-full gap-3 items-center mx-auto justify-center !rounded-3rem full-height"
    >
      <h1
        class="text-text-primary text-h5 flex gap-2 items-center mb-auto mt-4"
      >
        <!-- Success Icon -->
        <SuccessPayment />

        دریافت نوبت برای تعمیر دسته با
        <strong class="text-secondary">موفقیت</strong> ثبت شد.
      </h1>

      <div
        v-for="item in details"
        class="justify-between flex items-center gap-3 w-full border-b-1px border-border-primary b-b-solid pb-3 px-3"
        :key="item.label"
      >
        <span class="">
          {{ item.label }}
        </span>
        <span class="text-text-secondary">
          {{ item.text }}
        </span>
      </div>

      <PrimaryButton
        class="max-w-120"
        @click="
          $router.replace({
            name: '',
          })
        "
      >
        رفتن به صفحه اصلی
      </PrimaryButton>
    </QCard>
  </div>
</template>

<style lang="scss">
.authentication {
  margin: auto;
  max-width: 30em;
  width: 100%;
  .q-img {
    height: 190px;
  }
}

.pa-xs {
  background-image: url("@/assets/login-bg.webp");
  background-size: cover;
  background-position: center;
}
</style>
