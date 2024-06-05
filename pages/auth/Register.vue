<script setup lang="ts">
import { apiUserRegisterCreate, apiUserRequestVerifyPhoneCreate } from "@/api";
import { QForm, useQuasar } from "quasar";
import { useAuthStore } from "@/store/auth";
import { passRegex } from "@/constant/regex";
import { inputStylesFN } from "@/constant/styles";
const authStore = useAuthStore();
useSeoMeta({
  title: "Cheats  - register page",
  ogTitle: "Cheats  - register page",
  description: "صفحه ثبت نام",
  ogDescription: "صفحه ثبت نام",
});
const router = useRouter();

const isPwd = ref(true);

const details = ref({
  firstname: "",
  lastname: "",
  phone_number: "",
  password: "",
  confirm_password: "",
});

const registerAuthenticationForm = ref<QForm | null>(null);
const q = useQuasar();
const onSubmit = () => {
  registerAuthenticationForm.value?.validate().then(async (success) => {
    if (!success) return;
    q.loading.show({
      message: "درحال ارسال درخواست",
      backgroundColor: "grey",
      customClass: "loader",
    });
    try {
      console.log("Sending A Request");
      const res = await apiUserRegisterCreate(details.value);
      console.log("Request Sent");
      console.log(res, "RES");
      authStore.setToken(res.token);
      authStore.setUser(res);
      apiUserRequestVerifyPhoneCreate({
        phone_number: res.phone_number,
      });

      navigateTo({
        name: "auth-SubmitCode",
        query: {
          phone_number: details.value.phone_number,
        },
      });

      q.loading.hide();
    } catch (err) {
      q.loading.hide();
    }
  });
};
</script>

<template>
  <main class="lg:px-6xl column flex items-center justify-start pt-3xl">
    <QForm
      ref="registerAuthenticationForm"
      @submit.prevent="onSubmit"
      class="pa-xs px-xl py-lg !m-y-sm flex m-lg flex-col min-h-100 md:min-h-120 lg:min-h-130 w-full gap-3 items-center mx-auto justify-center !rounded-2rem background-image"
    >
      <h1 class="text-primary text_5xl">ثبت نام</h1>
      <span class="text_sm text-text-secondary">
        خوش امدید! لطفا برای ورود یک حساب کاربری بسازید.
      </span>
      <div class="flex flex-col w-full max-w-240 gap-2">
        <div class="row gap-2">
          <div class="col">
            <QInput
              outlined
              bgColor="background-secondary"
              :input-style="inputStylesFN"
              label="نام:"
              type="text"
              v-model="details.firstname"
              :rules="[(val) => !!val || 'لطفا نام خود را وارد کنید']"
              dense
            />
          </div>
          <div class="col">
            <QInput
              outlined
              bgColor="background-secondary"
              :input-style="inputStylesFN"
              label="نام خانوادگی:"
              type="text"
              v-model="details.lastname"
              :rules="[(val) => !!val || 'لطفا نام خانوادگی خود را وارد کنید']"
              dense
            >
            </QInput>
          </div>
        </div>

        <div class="row gap-2">
          <div class="col">
            <QInput
              outlined
              bgColor="background-secondary"
              :input-style="inputStylesFN"
              label="شماره همراه خود را وارد کنید"
              type="tel"
              v-model="details.phone_number"
              autocomplete="off"
              :rules="[
                (val) => !!val || 'لطفا شماره همراه خود را وارد کنید',
                (val) => val.length === 11 || 'شماره همراه اشتباه است',
              ]"
              lazy-rules
              dense
            />
          </div>
        </div>

        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-6">
            <QInput
              outlined
              bgColor="background-secondary"
              :input-style="inputStylesFN"
              label="رمز عبور خود را وارد کنید"
              type="password"
              v-model="details.password"
              autocomplete="off"
              :rules="[
                (val) => !!val || 'لطفا  رمز عبور خود را وارد کنید',
                (val) =>
                  !!passRegex.test(val) ||
                  ' رمز عبور باید دارای یه حرف و یک شماره و یک کارکتر خاص (مثل : @ $ ...) باشد ',
              ]"
              lazy-rules
              dense
            />
          </div>
          <div class="col-12 col-md-6">
            <QInput
              outlined
              bgColor="background-secondary"
              :input-style="inputStylesFN"
              label="نکرار رمز عبور خود را وارد کنید "
              :type="isPwd ? 'password' : 'text'"
              v-model="details.confirm_password"
              autocomplete="off"
              :rules="[
                (val) => !!val || 'لطفا  تکرار رمز عبور خود را وارد کنید',
                (val) =>
                  val === details.password ||
                  'رمز عبور و تکرار رمز عبور باید مطابقت داشته باشند',
              ]"
              lazy-rules
              dense
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
      </div>
      <div class="flex flex-col w-full items-center gap-3">
        <QBtn
          class="!rounded-xl !max-w-120 !w-full"
          color="primary"
          type="submit"
        >
          ثبت نام
        </QBtn>
        <QBtn
          class="!rounded-xl !max-w-120 !w-full"
          type="button"
          color="grey-9"
          @click="navigateTo('/auth/login')"
        >
          ورود به حساب کاربری
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
