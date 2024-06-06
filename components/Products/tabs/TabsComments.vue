<script setup lang="ts">
import {
  apiProductIsBoughtProductCreate,
  apiProductProductReviewCreate,
  type RatingEnum,
} from "@/api";
import { inputStylesFN } from "@/constant/styles";
import type { Product, Review } from "@/types";
import type { QForm } from "quasar";

const { data } = defineProps<{ data: Record<string, any> }>();

const reviews = data.reviews as Review[];

const model = ref({
  rating: 0,
  comment: "",
});

const { data: isbought } = useLazyAsyncData(
  `apiProductIsBoughtProductCreate-${data.id}`,
  async () => {
    const res = await apiProductIsBoughtProductCreate({
      product: data.id,
    });

    return (res as any)?.is_bought === "True" ? true : false;
  }
);

const form = ref<QForm>();

const toast = useToast();

async function submitForm() {
  // TODO API CALL
  const success = await form.value?.validate();

  if (!success) return;

  apiProductProductReviewCreate({
    product: data.id,
    // This is Okay beucase rating is from one to 5 and enum expects one to five , soo
    rating: model.value.rating as any as RatingEnum,
    comment: model.value.comment,
  }).then((res) => {
    if (!res) return;
    toast.success("نظر شما با موفقیت ثبت شد");
  });
}

const unchangebleInputField = ref("");

watch(unchangebleInputField, () => {
  unchangebleInputField.value = "";
});
</script>
<template>
  <div class="flex flex-col gap-4 mt-xl">
    <h2 class="text-2xl">نظرات</h2>

    <QCard
      v-for="i in reviews"
      :key="i.id"
      class="bg-background-primary pa-2xl space-y-xl border-2px border-border-primary"
    >
      <div class="flex gap-3 items-start">
        <!-- <img
          src="@/assets/avatar.png"
          alt="avatar picture"
          class="max-w-13 !rounded-full object-cover"
        /> -->
        <div class="flex flex-col">
          <span class="text-text-primary">
            {{ i.user.firstname + " " + i.user.lastname }}</span
          >
          <span class="text-text-secondary">
            {{ new Date(i.created_at).toLocaleDateString("fa-Fa") }}
          </span>
        </div>
        <Heart class="stroke-text-secondary fill-none" />
        <Reply class="stroke-text-secondary fill-none" />
      </div>
      <p class="text-text-secondary">
        {{ i.comment }}
      </p>
    </QCard>
  </div>
  <q-separator
    v-if="reviews.length"
    class="!my-xl h-2px"
    color="border-primary"
  />
  <QForm v-if="isbought" ref="form" @submit.prevent="submitForm">
    <span class="text-text-primary text-lg"> ثبت نظر </span>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <QInput
          outlined
          dense
          bg-color="background-secondary"
          label="امتیاز شما به محصول:"
          v-model="unchangebleInputField"
        >
          <template #append>
            <div dir="ltr">
              <q-rating
                :rules="[(val) => !!val || 'لطفا امتیاز خود را مشخص کنید']"
                size="sm"
                v-model="model.rating"
                :max="5"
                color="primary"
              />
            </div>
          </template>
        </QInput>
      </div>
      <div class="col-12">
        <QInput
          outlined
          dense
          bg-color="background-secondary"
          label="متن نظر:"
          rounded
          v-model="model.comment"
          type="textarea"
        />
      </div>
      <div class="col-12">
        <PrimaryButton class="max-w-56 !rounded-full"> ثبت نظر</PrimaryButton>
      </div>
    </div>
  </QForm>
</template>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
