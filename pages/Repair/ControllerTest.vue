<script setup lang="ts">
useSeoMeta({
  title: "Cheats  - controller test",
  ogTitle: "Cheats  - controller test",
  description: "خدمات تعمیر - تست دسته",
  ogDescription: "خدمات تعمیر - تست دسته",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "خدمات تعمیر",
    to: "Repair",
  },
  {
    label: "تست دسته",
    to: "",
  },
]);

const authStore = useAuthStore();

function submitController() {
  if (!authStore.isAuthenticated)
    return navigateTo({
      name: "auth-login",
    });

  navigateTo({
    name: "Repair-Problems",
    query: {
      type: "gamepad",
      tags: useRouter().currentRoute.value.query.tags,
    },
  });
}
</script>
<template>
  <main>
    <GamePadTester />
    {{}}

    <div
      class="mx-auto w-full py-lg flex-col md:flex-row flex justify-center items-center gap-3"
    >
      <PrimaryButton
        @click="submitController"
        class="!rounded-lg flex-1 !max-w-75 w-full"
      >
        رزرو نوبت
      </PrimaryButton>
    </div>

    <section class="row q-col-gutter-lg pb-lg">
      <div class="col-12 mt-2rem mb-3rem">
        <h1 class="text-2xl py-lg">
          ما چگونه از سالم بودن دسته شما مطمئن می شویم؟
        </h1>
        <p class="text-text-secondary">
          چگونه خرابی کنترلر را تست کنیم؟! برای متصل کردن دسته بازی جهت تست دقیق
          خرابی، با توجه به دستگاهی که به سایت متصل هستید این مراحل را دنبال
          کنید.
        </p>

        <p class="text-text-secondary">
          تست با کامپیوتر (pc)، لب تاب: کنترلر را با کابل شارژ مربوطه به pc متصل
          کنید و مراحل امتحان دسته را اغاز کنید.
        </p>

        <p class="text-text-secondary">
          تست با موبایل، تبلت: در کنترلر های سونی با نگهداشتن همزمان دو دکمه ps
          و share به مدت پنج ثانیه چراغ چشمک زن کنترلر را فعال کرده، سپس با روشن
          کردن بلوتوث موبایل یا تبلت و انتخاب “wireless controller” از میان
          دستگاه های قابل اتصال، دسته را با بلوتوث به موبایل(یا تبلت) متصل کرده
          و مراحل تست خرابی دسته را دنبال کنید.
        </p>

        <p class="text-text-secondary">
          چه فاکتور هایی را باید لحاظ کنیم؟ در مجموع برای رسیدن به نتیجه بهتر در
          برسی خرابی کنترلر(دسته) چند مقوله اصلی از اهمیت بیشتری برخوردار هستند:
        </p>

        <p class="text-text-secondary">
          ۱- وضعیت انالوگ ها؛ که عموما با توجه به میزان انحراف از مرکز یا عدم
          چرخش کامل به دور محور مربوطه عیب یابی میشود.
        </p>

        <p class="text-text-secondary">
          ۲-عملکرد دکمه ها، که عموما با اختلال در کارکرد یا همزمانی عملکرد با
          دکمه های دیگر ایراد آزمایی میشود.
        </p>

        <p class="text-text-secondary">
          ۳-ویبره که عملکرد آن با کلیک بر روی گزینه مربوطه در صفحه تست دسته مشخص
          میشود.
        </p>

        <p class="text-text-secondary">
          چنانچه متوجه ایراداتی در باقی قسمت های دسته بازی خود شده اید میتوانید
          بعد از تکمیل مراحل در بخش توضیحات، جزییات را برای همکاران ما شرح دهید.
        </p>

        <p class="text-text-secondary">
          تعرفه حدودی تعمیرات دسته: (توجه داشته باشید که قیمت دقیق تنها بعد از
          برسی توسط چیتس گیم به شما اطلاع داده شده و در صورت تایید شما فرآیند
          تعمیرات انجام میشود)
        </p>

        <p class="text-text-secondary">قیمت تعمیرات دسته ps4:</p>

        <p class="text-text-secondary">تک انالوگ اصلی تقویت شده ۳۹۰ ت</p>

        <p class="text-text-secondary">جفت انالوگ اصلی تقویت شده ۵۳۰ت</p>

        <p class="text-text-secondary">
          تک آنالوگ و اختلال عملکرد دکمه ها ۴۵۰ت
        </p>

        <p class="text-text-secondary">
          جفت آنالوگ و اختلال عملکرد دکمه ها ۵۵۰ت
        </p>

        <p class="text-text-secondary">قیمت تعمیرات دسته ps5 (dual sense):</p>

        <p class="text-text-secondary">تک انالوگ اصلی تقویت شده ۴۷۰ ت</p>

        <p class="text-text-secondary">جفت انالوگ اصلی تقویت شده ۵۹۰ت</p>

        <p class="text-text-secondary">
          تک آنالوگ و اختلال عملکرد دکمه ها ۵۱۰ت
        </p>

        <p class="text-text-secondary">
          جفت آنالوگ و اختلال عملکرد دکمه ها ۵۹۰ت
        </p>

        <p class="text-text-secondary">قیمت تعمیرات دسته اکس باکس (xbox):</p>

        <p class="text-text-secondary">تک انالوگ اصلی تقویت شده ۴۷۰ ت</p>

        <p class="text-text-secondary">جفت انالوگ اصلی تقویت شده ۵۵۰ت</p>

        <p class="text-text-secondary">
          تک آنالوگ و اختلال عملکرد دکمه ها ۵۱۰ت
        </p>

        <p class="text-text-secondary">
          جفت آنالوگ و اختلال عملکرد دکمه ها ۵۸۰ت
        </p>

        <p class="text-text-secondary">*باکس سوالات رایج که بعدا پر میشود*</p>
      </div>
    </section>
  </main>
</template>
