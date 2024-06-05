<script setup lang="ts">
import { QForm, useQuasar } from "quasar";
import { useToast } from "vue-toastification";
import {
  apiUserChangePasswordCreate,
  apiUserRequsetChangePasswordCreate,
  type InputChangePassword,
} from "@/api";
import { inputStylesFN } from "@/constant/styles";

// by The Time We Get To This Page We Have Already have The User , Otherwise We Won't have Even Shown It To User
const password_verification_sent = ref(false);

const authStore = useAuthStore();

const currentuser = toRef({ ...authStore.user });

// i do this because otp is type number but it should be actually string ,
// local implementation is fine but the api type should also be number,well any way
const model = ref({
  otp: "",
  new_password: "",
  confirm_new_password: "",
  phone_number: currentuser.value.phone_number,
} as unknown as InputChangePassword);

const isAuthenticated = authStore.isAuthenticated;

const $q = useQuasar();

const toast = useToast();

const passwordAuthenticationForm = ref<QForm | null>();

function verifyUserPhone() {
  $q.loading.show({
    message: "در حال آپدیت اطلاعات",
  });
  apiUserRequsetChangePasswordCreate({
    phone_number: currentuser.value.phone_number,
  })
    .then((r) => {
      const res = r as any;
      if (!res) return;
      toast.success(res.message);
      password_verification_sent.value = true;
    })
    .finally(() => {
      $q.loading.hide();
    });
}

async function submitUserData() {
  const success = (await passwordAuthenticationForm.value?.validate()) ?? false;

  if (!success) return;

  if (!password_verification_sent.value) {
    verifyUserPhone();
    return;
  }

  // Show Loading Spinner
  $q.loading.show({
    message: "در حال آپدیت اطلاعات",
  });

  apiUserChangePasswordCreate(model.value)
    .then(async (r: any) => {
      const res = r as { message: string };

      if (!res) return;
      toast.success(res.message);
    })
    .catch((e) => {
      console.log(e);
      toast.error("مشکلی در ثبت اطلاعات پیش آمده");
    })
    .finally(() => {
      $q.loading.hide();
    });
}
const isPwd = ref(true);
</script>
<template>
  <QCard class="px-sm pb-xs bg-background-primary shadow-none min-h-65 pt-lg">
    <UserNotAllowedToVisit v-if="!isAuthenticated" />
    <section v-else>
      <!-- form -->
      <QForm
        class="row q-col-gutter-lg"
        ref="passwordAuthenticationForm"
        @submit.prevent="submitUserData"
      >
        <div class="col-12 col-lg-6">
          <QInput
            type="password"
            label="رمز عبور"
            v-model="model.new_password"
            bgColor="background-secondary"
            rounded
            outlined
            class="!rounded-full"
            :input-style="inputStylesFN"
            :rules="[(val) => !!val || 'لطفا رمز عبور خود را وارد کنید']"
          />
        </div>
        <div class="col-12 col-lg-6">
          <QInput
            :type="isPwd ? 'password' : 'text'"
            label="تکرار رمز عبور"
            v-model="model.confirm_new_password"
            outlined
            bgColor="background-secondary"
            rounded
            :input-style="inputStylesFN"
            :rules="[(val) => !!val || 'لطفا  تکرار رمز عبور خود را وارد کنید']"
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

        <div
          class="col-12 col-lg-6"
          :class="{
            visible: password_verification_sent,
            invisible: !password_verification_sent,
          }"
        >
          <QInput
            type="tel"
            maxlength="6"
            label="کد تایید:"
            v-model="model.otp"
            outlined
            color="primary"
            :input-style="inputStylesFN"
            bgColor="background-secondary"
            rounded
          />
        </div>
        <div class="col-12">
          <PrimaryButton type="submit" class="!rounded-3xl">
            {{
              password_verification_sent
                ? "تایید کد فرستاده شده به شماره همراه"
                : "تغییر رمز"
            }}
          </PrimaryButton>
        </div>
      </QForm>
    </section>
  </QCard>
</template>

<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
