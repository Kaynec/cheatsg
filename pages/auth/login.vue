<script setup lang="ts">
import { QForm, useQuasar } from "quasar";
import {
  apiAuthJwtCustomerLoginCreate,
  apiUserRequestVerifyPhoneCreate,
} from "@/api/index";
import { useAuthStore } from "@/store/auth";
import { inputStylesFN } from "@/constant/styles";
const authStore = useAuthStore();
const routerStore = useRouterStore();

const toast = useToast();
useSeoMeta({
  title: "Cheats  - login page",
  ogTitle: "Cheats  - login page",
  description: "صفحه ورود",
  ogDescription: "صفحه ورود",
});

const loginAuthenticationForm = ref<QForm | null>(null);
const isPwd = ref(true);
const q = useQuasar();

const previousRoute = ref("");

onBeforeMount(() => {
  previousRoute.value = routerStore.routerStack.pop() ?? "/";
});

function gotoProperPageForUserToVisit() {
  navigateTo({
    path: previousRoute.value,
  });
}

const onSubmit = () => {
  loginAuthenticationForm.value?.validate().then(async (success) => {
    if (!success) return;

    q.loading.show({
      message: "درحال ارسال درخواست",
      backgroundColor: "grey",
      customClass: "loader",
    });

    apiAuthJwtCustomerLoginCreate({
      phone_number: details.value.phone_number,
      password: details.value.password,
    })
      .catch((error) => {
        if (error.message === "Phone number must be verified") {
          apiUserRequestVerifyPhoneCreate({
            phone_number: details.value.phone_number,
          });
          authStore.setCurrentPhoneNumber(details.value.phone_number);
          navigateTo({
            name: "auth-SubmitCode",
            query: {
              goToLogin: "true",
              phone_number: details.value.phone_number,
            },
          });
        }
      })
      .then((res) => {
        if (!res) return;
        authStore.setToken(res.token.access);
        authStore.setRefreshToken(res.token.refresh);
        authStore.setUserData().then((r) => {
          toast.success("فرآیند ورود با موفقیت انجام شد");
          gotoProperPageForUserToVisit();
        });
      })
      .finally(() => {
        q.loading.hide();
      });
  });
};

const details = ref({
  phone_number: "",
  password: "",
});
</script>

<template>
  <main class="lg:px-6xl column flex items-center justify-start pt-3xl">
    <QForm
      @submit.prevent="onSubmit"
      ref="loginAuthenticationForm"
      class="pa-xs px-xl py-lg !m-y-sm flex m-lg flex-col min-h-100 md:min-h-120 lg:min-h-130 w-full background-image gap-3 items-center mx-auto justify-center !rounded-2rem"
    >
      <h1 class="text-primary text_5xl">ورود به حساب کاربری</h1>
      <span class="text_sm text-text-secondary">
        خوش آمدی! لطفا برای دسترسی به حساب کاربری خود وارد شوید.
      </span>
      <div class="flex flex-col w-full max-w-240">
        <QInput
          outlined
          bgColor="background-secondary"
          label="شماره همراه خود را وارد کنید"
          type="tel"
          v-model="details.phone_number"
          :input-style="inputStylesFN"
          autocomplete="off"
          :rules="[
            (val) => !!val || 'لطفا شماره همراه خود را وارد کنید',
            (val) => val.length === 11 || 'شماره همراه اشتباه است',
          ]"
          lazy-rules
          dense
        />

        <QInput
          outlined
          bgColor="background-secondary"
          label="رمز ورود خود را وارد کنید"
          :type="isPwd ? 'password' : 'text'"
          v-model="details.password"
          :input-style="inputStylesFN"
          autocomplete="off"
          :rules="[(val) => !!val || 'لطفا  رمز عبور خود را وارد کنید']"
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
      <NuxtLink class="text-blue-7" to="/auth/forgotPassword">
        فراموشی رمز عبور؟
      </NuxtLink>
      <div class="flex flex-col w-full items-center gap-3">
        <QBtn class="!rounded-xl !max-w-120 !w-full bg-blue-7" type="submit">
          ورود به حساب کاربری
        </QBtn>
        <QBtn
          class="!rounded-xl !max-w-120 !w-full"
          color="grey-9"
          type="button"
          @click="navigateTo('/auth/register')"
        >
          ثبت نام
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
