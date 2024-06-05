<template>
  <div class="row !items-stretch q-col-gutter-lg">
    <h1 class="text-center !md-text-start w-full text-4xl text-text-primary">
      تماس با ما
    </h1>

    <div class="col-12 col-md-6">
      <QCard class="h-full pa-sm text-lg text-text-primary">
        <span class="text-text-primary text-2xl pb-4 block"
          >با ما در ارتباط باشید</span
        >
        <p class="text-text-secondary text-sm">
          از طریق فرم زیر می‌توانید با گروه بعد پنجم در ارتباط باشید. ما منتظر
          شنیدن انتقادات و پیشنهادات شما هستیم.
        </p>
        <QForm
          @submit.prevent="onSubmit"
          ref="form"
          class="row q-col-gutter-md pa-sm"
        >
          <div class="col-6">
            <QInput
              outlined
              v-model="model.firstname"
              label="نام"
              :rules="[(val) => !!val || 'نام خود را وارد کنید']"
            />
          </div>
          <div class="col-6">
            <QInput
              outlined
              v-model="model.lastname"
              label="نام خانوادگی"
              :rules="[(val) => !!val || 'نام خود را وارد  کنید']"
            />
          </div>

          <div class="col-12">
            <QInput
              outlined
              v-model="model.phone_number"
              :rules="[(val) => !!val || 'شماره همراه خود را را وارد  کنید']"
              label="شماره همراه"
              type="tel"
            />
          </div>
          <div class="col-12">
            <QInput
              outlined
              v-model="model.subject"
              label="موضوع"
              type="text"
              :rules="[(val) => !!val || 'موضوع   را را وارد  کنید']"
            />
          </div>
          <div class="col-12">
            <QInput
              type="textarea"
              outlined
              v-model="model.description"
              :rules="[(val) => !!val || 'نوضیحات  را وارد کنید']"
              label="نوضیحات"
            />
          </div>
          <div class="col-6">
            <PrimaryButton class="!rounded-xl max-w-40" type="submit">
              <div class="flex gap-2 justify-center">
                <span> ارسال فرم </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5878 14.4111L7.01031 10.8336H14.9986V9.16697H7.01031L10.5878 5.58947L9.40948 4.41113L3.82031 10.0003L9.40948 15.5895L10.5878 14.4111Z"
                    fill="white"
                  />
                </svg>
              </div>
            </PrimaryButton>
          </div>
        </QForm>
      </QCard>
    </div>
    <div class="col-12 col-md-6 h-full">
      <QCard class="!h-full pa-lg space-y-lg">
        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1036_14046)">
                <path
                  d="M4.50898 0.673273C4.29844 0.164679 3.74336 -0.106024 3.21289 0.0388978L0.806641 0.695148C0.330859 0.826398 0 1.25843 0 1.75062C0 8.51546 5.48516 14.0006 12.25 14.0006C12.7422 14.0006 13.1742 13.6698 13.3055 13.194L13.9617 10.7877C14.1066 10.2573 13.8359 9.70218 13.3273 9.49163L10.7023 8.39788C10.2566 8.21194 9.73984 8.34046 9.43633 8.71507L8.33164 10.0631C6.40664 9.15257 4.84805 7.59398 3.9375 5.66898L5.28555 4.56702C5.66016 4.26077 5.78867 3.74671 5.60273 3.30101L4.50898 0.676007V0.673273Z"
                  fill="#103989"
                />
              </g>
              <defs>
                <clipPath id="clip0_1036_14046">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span> تلفن تماس </span>
          </div>
          <span> 021-44293581 </span>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1036_14040)">
                <path
                  d="M3.5 1.5V3.75H5.25V1.5H10.5738L11.375 2.18672V3.75H13.125V2.18672C13.125 1.78828 12.9418 1.40625 12.6137 1.125L11.8125 0.438281C11.4844 0.157031 11.0387 0 10.5738 0H5.25C4.28477 0 3.5 0.672656 3.5 1.5ZM0 3.75V11.25C0 11.6648 0.391016 12 0.875 12H1.75C2.23398 12 2.625 11.6648 2.625 11.25V3.75C2.625 3.33516 2.23398 3 1.75 3H0.875C0.391016 3 0 3.33516 0 3.75ZM13.125 4.5H3.5V11.25C3.5 11.6648 3.89102 12 4.375 12H13.125C13.609 12 14 11.6648 14 11.25V5.25C14 4.83516 13.609 4.5 13.125 4.5ZM7 7.5C6.51602 7.5 6.125 7.16484 6.125 6.75C6.125 6.33516 6.51602 6 7 6C7.48398 6 7.875 6.33516 7.875 6.75C7.875 7.16484 7.48398 7.5 7 7.5ZM11.375 6.75C11.375 7.16484 10.984 7.5 10.5 7.5C10.016 7.5 9.625 7.16484 9.625 6.75C9.625 6.33516 10.016 6 10.5 6C10.984 6 11.375 6.33516 11.375 6.75ZM10.5 10.5C10.016 10.5 9.625 10.1648 9.625 9.75C9.625 9.33516 10.016 9 10.5 9C10.984 9 11.375 9.33516 11.375 9.75C11.375 10.1648 10.984 10.5 10.5 10.5ZM7.875 9.75C7.875 10.1648 7.48398 10.5 7 10.5C6.51602 10.5 6.125 10.1648 6.125 9.75C6.125 9.33516 6.51602 9 7 9C7.48398 9 7.875 9.33516 7.875 9.75Z"
                  fill="#103989"
                />
              </g>
              <defs>
                <clipPath id="clip0_1036_14040">
                  <rect width="14" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span> شماره فکس</span>
          </div>
          <span> 021-44293581 </span>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.3125 0.75C0.587891 0.75 0 1.33789 0 2.0625C0 2.47539 0.194141 2.86367 0.525 3.1125L6.475 7.575C6.78672 7.80742 7.21328 7.80742 7.525 7.575L13.475 3.1125C13.8059 2.86367 14 2.47539 14 2.0625C14 1.33789 13.4121 0.75 12.6875 0.75H1.3125ZM0 3.8125V9.5C0 10.4652 0.784766 11.25 1.75 11.25H12.25C13.2152 11.25 14 10.4652 14 9.5V3.8125L8.05 8.275C7.42656 8.74258 6.57344 8.74258 5.95 8.275L0 3.8125Z"
                fill="#103989"
              />
            </svg>

            <span> ایمیل آدرس</span>
          </div>
          <span> info@5thD.ir </span>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <svg
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.74062 15.6C8.34375 13.5938 12 8.73125 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.73125 3.65625 13.5938 5.25938 15.6C5.64375 16.0781 6.35625 16.0781 6.74062 15.6ZM6 8C4.89687 8 4 7.10312 4 6C4 4.89687 4.89687 4 6 4C7.10313 4 8 4.89687 8 6C8 7.10312 7.10313 8 6 8Z"
                fill="#103989"
              />
            </svg>

            <span>آدرس ما </span>
          </div>
        </div>
        <p class="text-text-secondary">
          تهران، بزرگراه جلال آل احمد، شرق به غرب، بعد از پل آزمایش و نرسیده به
          چهارراه آریافر(دانش)، پلاک 279، واحد 10
        </p>
        <!-- Map Image -->
        <NuxtImg
          src="/images/Google_Map.png"
          alt="address picture"
          class="w-full min-h-65"
        />
        <!--  -->
      </QCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiUserCreateContanctFormCreate, type ContactFormInPut } from "@/api";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { useQuasar, type QForm, QSpinnerGears } from "quasar";
import type { PartialByKeys } from "unocss";

const globalStore = useGlobalStore();

const model = ref({
  description: "",
  firstname: "",
  lastname: "",
  phone_number: "",
  subject: "",
});
const subject = ref("");

const form = ref<QForm>();

const toast = useToast();

const $q = useQuasar();

async function onSubmit() {
  const success = await form.value?.validate();

  if (!success) return;

  $q.loading.show({
    spinner: QSpinnerGears,
  });

  apiUserCreateContanctFormCreate(model.value)
    .then((res) => {
      if (!res) return;
      toast.success("اطلاعات با موفقیت ارسال شد");
      model.value = {
        description: "",
        firstname: "",
        lastname: "",
        phone_number: "",
        subject: "",
      };
      form.value?.reset();
    })
    .finally(() => {
      $q.loading.hide();
    });
}

globalStore.setCurrentTextName([
  {
    label: "تماس با ما",
    to: "",
  },
]);
</script>
