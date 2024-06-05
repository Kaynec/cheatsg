<script setup lang="ts">
import { apiUserVerifyPhoneCreate } from "@/api";
import { inputStylesFN } from "@/constant/styles";
import { QForm, QSpinnerGears, useQuasar } from "quasar";

const authStore = useAuthStore();

useSeoMeta({
  title: "Cheats  - submit code page",
  ogTitle: "Cheats  - submit code page",
  description: "صفحه تایید کد",
  ogDescription: "صفحه تایید کد",
});

const router = useRouter();

const phone_number =
  authStore.phoneNumber || router.currentRoute.value.query.phone_number;

const shouldGoBackToLogin = router.currentRoute.value.query.goToLogin;

const submitCodeAuthenticationForm = ref<QForm | null>(null);
const q = useQuasar();
const onSubmit = () => {
  submitCodeAuthenticationForm.value?.validate().then(async (success) => {
    if (!success) return;

    q.loading.show({
      message: "درحال ارسال درخواست",
      backgroundColor: "grey",
      customClass: "loader",
    });
    try {
      // it takes a number but it's not supposed to be casted to a number maybe it has 0 before it
      await apiUserVerifyPhoneCreate({
        phone_number: phone_number,
        otp: details.value.otp,
      } as any);
      if (shouldGoBackToLogin)
        navigateTo({
          name: "auth-login",
        });
      else
        navigateTo({
          name: "index",
        });

      q.loading.hide();
    } catch (err) {
      console.error(err);
      q.loading.hide();
    }
  });
};

const details = ref({
  otp: "",
});
</script>

<template>
  <main class="lg:px-6xl column flex items-center justify-start pt-3xl">
    <QForm
      ref="submitCodeAuthenticationForm"
      @submit.prevent="onSubmit"
      class="pa-xs px-xl !m-y-sm flex m-lg flex-col min-h-100 md:min-h-120 lg:min-h-130 w-full gap-3 items-center mx-auto justify-center !rounded-2rem background-image"
    >
      <h1 class="text-primary text_5xl">ورود به حساب کاربری</h1>
      <span class="text_sm text-text-secondary">
        خوش آمدی! لطفا برای دسترسی به حساب کاربری خود وارد شوید.
      </span>
      <div class="flex flex-col w-full max-w-240 gap-3">
        <QInput
          outlined
          bgColor="background-secondary"
          :input-style="inputStylesFN"
          label="کد ارسال شده:"
          maxlength="6"
          type="tel"
          v-model="details.otp"
          input-class="hide-input-arrows"
          :rules="[(val) => !!val || 'لطفا کد تایید  را وارد کنید']"
        />
      </div>
      <div class="flex flex-col w-full items-center gap-3">
        <QBtn class="!rounded-xl !max-w-120 !w-full bg-blue-7" type="submit">
          تایید کد
        </QBtn>
        <QBtn
          class="!rounded-xl !max-w-120 !w-full"
          color="grey-9"
          type="button"
          @click.prevent=""
        >
          ارسال مجدد کد
        </QBtn>
      </div>
      <NuxtLink
        class="text-blue-7"
        to="/auth/forgotPassword"
        @click="$router.back()"
      >
        تغییر شماره موبایل
      </NuxtLink>
    </QForm>
  </main>
</template>

<style scoped>
.body--light .background-image {
  background-image: url("@/assets/login-bg-light.webp");
  background-size: cover;
  background-position: center;
}
.body--dark .background-image {
  background-image: url("@/assets/login-bg.webp");
  background-size: cover;
  background-position: center;
}
</style>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
