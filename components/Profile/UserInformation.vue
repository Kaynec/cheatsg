<script setup lang="ts">
import { QForm, useQuasar } from "quasar";
import { newDate } from "date-fns-jalali";

import { inputStylesFN } from "@/constant/styles";

import {
  apiUserRequsetVerifyEmaliCreate,
  apiUserUserUpdate,
  apiUserVerifyEmailCreate,
  type UserInput,
} from "@/api";

// by The Time We Get To This Page We Have Already have The User , Otherwise We Won't have Even Shown It To User

const email_otp = ref("");
const email_verification_sent = ref(false);

const authStore = useAuthStore();

const originalUser = authStore.currentuser;

const currentuser = toRef({ ...authStore.user });

/**
 * When component is mounted, format birthdate
 * to Persian locale if birthdate exists
 */
onMounted(() => {
  if (!currentuser.value.birthdate) return;
  currentuser.value.birthdate = new Date(
    currentuser.value.birthdate
  ).toLocaleDateString("fa-Fa-u-nu-latn");
});

const isAuthenticated = authStore.isAuthenticated;

const $q = useQuasar();

const toast = useToast();

const userAuthenticationForm = ref<QForm | null>();

function formatJalaliToGeorgianDate(date: string): string | null {
  if (!date) return null;
  const splitted = date.split("/");
  const year = parseInt(splitted[0]);
  const month = parseInt(splitted[1]);
  const day = parseInt(splitted[2]);
  const newGeorgianDate = newDate(year, month, day);
  return `${newGeorgianDate.getFullYear()}-${newGeorgianDate.getMonth()}-${newGeorgianDate.getDay()}`;
}

async function submitUserData() {
  userAuthenticationForm.value?.validate().then((success) => {
    if (!success) return;

    const birthDate = formatJalaliToGeorgianDate(currentuser.value.birthdate!);
    // Submit User Data
    const objectToPostToApi = {
      firstname: currentuser.value.firstname,
      lastname: currentuser.value.lastname,
    } as Partial<UserInput>;

    if (birthDate) {
      objectToPostToApi.birthdate = birthDate;
    }
    if (currentuser.value.email) {
      objectToPostToApi.email = currentuser.value.email;
    }
    if (
      currentuser.value.profile_image &&
      typeof currentuser.value.profile_image === "object"
    ) {
      objectToPostToApi.profile_image = currentuser.value.profile_image;
    }
    // Show Loading Spinner
    $q.loading.show({
      message: "در حال آپدیت اطلاعات",
    });
    //
    apiUserUserUpdate(objectToPostToApi as UserInput)
      .then(async (r) => {
        if (!r) return;
        await authStore.setUser(r);
        console.log(authStore.currentuser);
        toast.success("پروفایل با موفقیت آپدیت شد");
      })
      .catch((e) => {
        console.log(e);
        toast.error("مشکلی در ثبت اطلاعات پیش آمده");
      })
      .finally(() => {
        $q.loading.hide();
      });
  });
}
const router = useRouter();
//
const profileImagePreview = ref(currentuser.value.profile_image ?? "");

const profileImageRef = ref();
function onFileChange(e: any) {
  const file = e.target.files[0];
  if (!file) return;
  profileImagePreview.value = URL.createObjectURL(file);
  currentuser.value.profile_image = file;
}

function verifyUserEmail() {
  apiUserVerifyEmailCreate({
    email: currentuser.value.email!,
    otp: email_otp.value as any,
  }).then((r) => {
    const res = r as any;
    if (!res) return;
    toast.success(res.message);
    currentuser.value.email_verified = true;
  });
}

async function sendOtpToEmail() {
  if (currentuser.value.email) {
    // Request Email Verification
    apiUserRequsetVerifyEmaliCreate({ email: currentuser.value.email })
      .then((r) => {
        const res = r as any;
        if (!res) return;
        toast.success(res?.message);
        email_verification_sent.value = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const emailRules = [
  (val: string | undefined) => {
    if (!val) return true;
    if (val.length && Boolean(emailRegex.test(val))) return true;
    return "لطفا ایمیل صحیح وارد کنید";
  },
];
</script>
<template>
  <QCard class="px-sm pb-xs bg-background-primary shadow-none min-h-65">
    <UserNotAllowedToVisit v-if="!isAuthenticated" />
    <section v-else>
      <div class="flex items-center justify-between w-full py-lg">
        <div class="flex gap-2 items-center">
          <input
            hidden
            type="file"
            ref="profileImageRef"
            @change="onFileChange"
          />
          <QAvatar
            class="!rounded-full bg-black grid place-content-center w-18 h-18 aspect-1"
            @click="profileImageRef.click()"
          >
            <div
              v-if="!profileImagePreview"
              class="i-carbon-user text-3xl text-primary"
            />
            <img v-else :src="profileImagePreview" />
          </QAvatar>
          <!-- <div
            class="!rounded-full bg-black grid place-content-center w-18 h-18 aspect-1"
          >
            <div class="i-carbon-user text-3xl text-primary" />
          </div> -->
          <div class="space-y-2" v-if="originalUser">
            <span class="text-xl text-text-primary">
              {{ originalUser.firstname + " " + originalUser.lastname }}
            </span>
            <span class="text-xs text-text-secondary">
              {{ originalUser.phone_number }}
            </span>
          </div>
        </div>
      </div>
      <!-- form -->
      <QForm
        class="row q-col-gutter-lg"
        ref="userAuthenticationForm"
        @submit.prevent="submitUserData"
      >
        <div class="col-12 col-lg-6">
          <QInput
            type="text"
            label="نام"
            v-model="currentuser.firstname"
            bgColor="background-secondary"
            rounded
            outlined
            class="!rounded-full"
            :input-style="inputStylesFN"
            :rules="[(val) => !!val || 'لطفا نام خود را وارد کنید']"
          />
        </div>
        <div class="col-12 col-lg-6">
          <QInput
            type="text"
            label="نام خانوادگی:"
            v-model="currentuser.lastname"
            outlined
            bgColor="background-secondary"
            rounded
            :input-style="inputStylesFN"
            :rules="[(val) => !!val || 'لطفا نام خانوادگی خود را وارد کنید']"
          />
        </div>

        <div class="col-12 col-lg-6">
          <q-input
            v-model="currentuser.birthdate"
            label="تاریخ تولد:"
            type="text"
            outlined
            bgColor="background-secondary"
            rounded
            :input-style="inputStylesFN"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="currentuser.birthdate"
                    default-year-month="1397/03"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 col-lg-6">
          <QInput
            type="email"
            label="ایمیل"
            v-model="currentuser.email"
            :disable="email_verification_sent"
            outlined
            bgColor="background-secondary"
            rounded
            :input-style="inputStylesFN"
            :rules="emailRules"
          >
            <template v-slot:append v-if="email_verification_sent">
              <q-icon
                class="bg-positive !rounded-full"
                name="check"
              /> </template
          ></QInput>
        </div>
        <div
          class="col-12 col-lg-6"
          :class="{
            visible: email_verification_sent,
            invisible: !email_verification_sent,
          }"
        >
          <QInput
            type="tel"
            maxlength="6"
            label="کد تایید ایمیل:"
            v-model="email_otp"
            outlined
            bgColor="background-secondary"
            rounded
            :input-style="inputStylesFN"
          />
        </div>
        <div class="col-9 flex gap-2">
          <div class="flex-1">
            <PrimaryButton type="submit" class="!rounded-3xl !py-3 h-full">
              ذخیره تغییرات
            </PrimaryButton>
          </div>
          <div class="flex-1">
            <OutlinedButton
              type="button"
              @click="sendOtpToEmail"
              class="!rounded-3xl !py-3 h-full"
            >
              ارسال کد تاییده به ایمیل
            </OutlinedButton>
          </div>
          <!-- 
            /** * Conditionally renders a button to verify the email OTP * if
          email verification has been sent. * Triggers verifyUserEmail method
          when clicked. */
         -->
          <div class="flex-1" v-if="email_verification_sent">
            <OutlinedButton
              type="button"
              @click="verifyUserEmail"
              class="!rounded-3xl !py-3 h-full"
            >
              تایید کد فرستاده شده
            </OutlinedButton>
          </div>
        </div>
      </QForm>
    </section>
  </QCard>
</template>
<style scoped lang="scss">
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
