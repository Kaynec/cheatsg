<script setup lang="ts">
import circle from "@/assets/circle.svg";
import rectangle from "@/assets/rectangle.svg";
import cross from "@/assets/cross.svg";
import triangle from "@/assets/triangle.svg";

useSeoMeta({
  title: "Cheats  - payment success",
  ogTitle: "Cheats  - payment success",
  description: "خرید موفقیت آمیز",
  ogDescription: "خرید موفقیت آمیز",
});

const router = useRouter();

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "خرید موفقیت آمیز",
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
    label: "آدرس:",
    text: "خیابان دماوند خیابان کیایی کوچه میر امینی پلاک ۵۲ طبقه ۲",
  },
  {
    label: "کد پستی:",
    text: "1641767843496",
  },
  {
    label: "هزینه ارسال:",
    text: "350.000 تومان",
  },
  {
    label: "مجموع فاکتور:",
    text: "1.850.500 تومان",
  },
]);

const card = ref();
</script>

<template>
  <div class="px-6xl column mb-2rem">
    <QCard
      ref="card"
      class="pa-xs !min-h-120 !m-y-sm flex m-lg flex-col col w-full gap-3 items-center mx-auto justify-center !rounded-3rem full-height relative"
    >
      <h1
        class="text-text-primary text-h5 flex gap-2 items-center mb-auto mt-4"
      >
        <!-- Success Icon -->
        <SuccessPayment />

        خرید شما با <strong class="text-secondary">موفقیت</strong> انجام شد.
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

      <span class="flex gap-2 items-center w-full text-lg pt-lg">
        <ShipmentExpress class="fill-primary w-7 h-7" />
        کالاهای ارسالی
      </span>

      <QCardSection
        class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-lg"
      >
        <QCard
          v-for="i in 8"
          class="bg-background-secondary flex flex-col gap-3 pa-sm items-center w-full"
        >
          <NuxtImg
            src="/images/home_imgs/cards/controller-big.png"
            alt="controller-big.png"
          />
          <span class="text-text-primary">دسته PS5 - سفید</span>
          <span class="text-text-secondary">مدل: دوال سنس سفید</span>
        </QCard>
      </QCardSection>
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
