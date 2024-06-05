<script setup lang="ts">
useSeoMeta({
  title: "Cheats  - forgot password",
  ogTitle: "Cheats  - forgot password",
  description: "فراموشی رمزعبور",
  ogDescription: "فراموشی رمزعبور",
});

import { apiUserRequsetChangePasswordCreate } from "@/api";
import { inputStylesFN } from "@/constant/styles";
import { QForm, useQuasar } from "quasar";

const passwordAuthenticationForm = ref<QForm | null>(null);
const router = useRouter();
const q = useQuasar();
const onSubmit = () => {
  passwordAuthenticationForm.value?.validate().then(async (success) => {
    if (!success) return;
    q.loading.show({
      message: "درحال ارسال درخواست",
      backgroundColor: "grey",
      customClass: "loader",
    });
    try {
      const res = await apiUserRequsetChangePasswordCreate({
        phone_number: details.value.phone_number,
      });
      navigateTo({
        name: "auth-ChangePassword",
        query: {
          phone_number: details.value.phone_number,
        },
      });
      q.loading.hide();
    } catch (err) {
      console.error(err);
      q.loading.hide();
    }
  });
};

const details = ref({
  phone_number: "",
});
</script>

<template>
  <main class="lg:px-6xl column flex items-center justify-start pt-3xl">
    <QForm
      @submit.prevent="onSubmit"
      ref="passwordAuthenticationForm"
      class="pa-xs px-xl py-lg !m-y-sm flex m-lg flex-col min-h-100 md:min-h-120 lg:min-h-130 w-full gap-3 items-center mx-auto justify-center !rounded-2rem background-image"
    >
      <h1 class="text-primary text_5xl">فراموشی رمز عبور</h1>
      <!-- <span class="text_sm text-text-secondary">
       
      </span> -->
      <div class="flex flex-col w-full max-w-240 gap-3">
        <QInput
          outlined
          bgColor="background-secondary"
          :input-style="inputStylesFN"
          label="شماره موبایل خود را وارد کنید"
          type="tel"
          v-model="details.phone_number"
          :rules="[(value) => !!value || 'لطفا شماره همراه خود را وارد کنید']"
        />
      </div>
      <NuxtLink class="text-blue-7" to="/auth/login">
        برگشت به صفحه ورود
      </NuxtLink>
      <div class="flex flex-col w-full items-center gap-3">
        <QBtn class="!rounded-xl !max-w-120 !w-full bg-blue-7" type="submit">
          ارسال کد تایید
        </QBtn>
      </div>
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
