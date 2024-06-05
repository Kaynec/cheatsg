<script setup lang="ts">
import { passRegex } from "@/constant/regex";

useSeoMeta({
  title: "Cheats  - forgot password",
  ogTitle: "Cheats  - forgot password",
  description: "فراموشی رمزعبور",
  ogDescription: "فراموشی رمزعبور",
});

import { apiUserChangePasswordCreate } from "@/api";
import { QForm, useQuasar } from "quasar";
import { inputStylesFN } from "@/constant/styles";

const router = useRouter();

const phone_number = computed(
  () => router.currentRoute.value.query.phone_number
);

const toast = useToast();

const passwordAuthenticationForm = ref<QForm | null>(null);
const q = useQuasar();
const onSubmit = () => {
  passwordAuthenticationForm.value?.validate().then(async (success) => {
    if (!success) return;

    q.loading.show({
      message: "درحال ارسال درخواست",
      backgroundColor: "grey",
      customClass: "loader",
    });
    if (!phone_number.value) return;
    try {
      // it takes a number but it's not supposed to be casted to a number maybe it has 0 before it
      const res = (await apiUserChangePasswordCreate({
        phone_number: phone_number.value as string,
        new_password: details.value.new_password,
        confirm_new_password: details.value.confirm_new_password,
        otp: details.value.otp as any,
      })) as any;
      if (!!res) {
        navigateTo({
          name: "auth-login",
        });

        toast.success("رمز عبور با موفقیت تغییر داده شد");
      }

      q.loading.hide();
    } catch (err) {
      console.error(err);
      q.loading.hide();
    }
  });
};

const details = ref({
  otp: "",
  confirm_new_password: "",
  new_password: "",
});

const isPwd = ref(true);
</script>

<template>
  <main class="lg:px-6xl column flex items-center justify-start pt-3xl">
    <QForm
      @submit.prevent="onSubmit"
      ref="passwordAuthenticationForm"
      class="pa-xs px-xl py-lg !m-y-sm flex m-lg flex-col min-h-100 md:min-h-120 lg:min-h-130 w-full gap-3 items-center mx-auto justify-center !rounded-2rem background-image"
    >
      <h1 class="text-primary text_5xl">تغییر رمزعبور</h1>
      <div class="row q-col-gutter-sm w-full max-w-240">
        <div class="col-12">
          <QInput
            outlined
            bgColor="background-secondary"
            label="کد ارسال شده:"
            maxlength="6"
            type="tel"
            v-model="details.otp"
            dense
            input-class="text-white hide-input-arrows"
          />
        </div>
        <div class="col-12 col-md-6">
          <QInput
            outlined
            bgColor="background-secondary"
            label="رمز ورود جدید خود را وارد کنید"
            :type="isPwd ? 'password' : 'text'"
            v-model="details.new_password"
            dense
            :input-style="inputStylesFN"
            autocomplete="off"
            :rules="[
              (val) => !!val || 'لطفا  رمز عبور جدید خود را وارد کنید',
              (val) =>
                !!passRegex.test(val) ||
                ' رمز عبور باید دارای یه حرف و یک شماره و یک کارکتر خاص (مثل : @ $ ...) باشد ',
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                class="text-text-primary"
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </template>
          </QInput>
        </div>
        <div class="col-12 col-md-6">
          <QInput
            outlined
            bgColor="background-secondary"
            label="نکرار رمز ورود خود را وارد کنید "
            :type="isPwd ? 'password' : 'text'"
            v-model="details.confirm_new_password"
            :input-style="inputStylesFN"
            dense
            autocomplete="off"
            :rules="[
              (val) => !!val || 'لطفا  تکرار عبور خود را وارد کنید',
              (val) =>
                val === details.new_password ||
                'رمز و تکرار عبور باید مطابقت داشته باشند',
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                class="text-text-primary"
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </template>
          </QInput>
        </div>
      </div>
      <NuxtLink class="text-blue-7" to="/auth/login">
        برگشت به صفحه ورود
      </NuxtLink>
      <div class="flex flex-col w-full items-center gap-3">
        <QBtn class="!rounded-xl !max-w-120 !w-full bg-blue-7" type="submit">
          تغییر رمز عبور
        </QBtn>
      </div>
    </QForm>
  </main>
</template>

<style scoped>
.body--light .background-image {
  background-image: url("@/assets/login-bg-light.png");
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
