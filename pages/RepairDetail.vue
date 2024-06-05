<script setup lang="ts">
useSeoMeta({
  title: "Cheats  - payment success",
  ogTitle: "Cheats  - payment success",
  description: "خرید موفقیت آمیز",
  ogDescription: "خرید موفقیت آمیز",
});

const router = useRouter();

const data = ref<Record<string, any>>();

if (router.currentRoute.value.query?.data) {
  data.value = JSON.parse(router.currentRoute.value.query.data as string);
} else {
  router.push({
    name: "index",
  });
}

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "ثبت نوبت موفقیت آمیز",
    to: "",
  },
]);

function splitDates(date: string) {
  const splittedDates = date.split("---").map((el: string) =>
    new Date(el).toLocaleDateString("fa-fa", {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "2-digit",
      month: "long",
    })
  );

  return `از ${splittedDates.join(" تا ")}`;
}

const details = ref([
  {
    label: "آیدی پیگیری:",
    text: data.value!.id,
  },
  {
    label: "توضیحات:",
    text: data.value!.explanation,
  },
  {
    label: "نوع تحویل مرسوله:",
    text: "به صورت حضوری",
  },
  {
    label: "تاریخ تعیین شده برای تحویل مرسوله:",
    text: splitDates(data.value!.delivery_data.schedule),
  },
  {
    label: "آدرس:",
    text: data.value!.delivery_data.address,
  },
]);
</script>

<template>
  <div class="p-lg column mb-2rem">
    <QCard
      class="py-sm px-2 !min-h-120 !m-y-sm flex m-lg flex-col col w-full gap-3 items-center mx-auto justify-center !rounded-2rem full-height relative"
    >
      <h1
        class="text-text-primary text-xl flex gap-2 items-center mb-auto mt-4"
      >
        <SuccessPayment />

        نوبت شما با<strong class="text-secondary">موفقیت</strong> ثبت شد.
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
        class="max-w-120 mb-4"
        @click="
          navigateTo({
            name: 'index',
          })
        "
      >
        رفتن به صفحه اصلی
      </PrimaryButton>
    </QCard>
  </div>
</template>
