<script setup lang="ts">
import { apiProductQuestionCreate, type ProudctOutPut } from "@/api";
import { inputStylesFN } from "@/constant/styles";
import type { Product, Question } from "@/types";
const toast = useToast();

const { data } = defineProps<{ data: Product }>();

const questions = data.questions as Question[];

const model = ref({
  question: "",
  product: data.id,
});

function submitForm() {
  apiProductQuestionCreate(model.value).then((res) => {
    if (!res) return;
    toast.success("پاسخ شما با موفقیت ثبت شد");
  });
}
</script>

<template>
  <div class="flex flex-col gap-4 mt-xl">
    <h2 class="text-2xl">پرسش و پاسخ</h2>
    <QCard
      v-for="i in questions"
      :key="i.id"
      class="bg-background-primary pa-lg space-y-xl border-2px border-border-primary"
    >
      <div class="flex flex-col gap-3 items-start">
        <div class="flex items-center gap-2">
          <span class="text-text-primary">
            {{ i.sender.firstname + "" + i.sender.lastname }}
          </span>
        </div>
        <div class="text-text-primary flex gap-2">
          <QuestionMark class="fill-text-primary" /> سوال:
        </div>
      </div>
      <p class="text-text-secondary">
        {{ i.question }}
      </p>
      <!--  -->
      <div>
        <div
          class="text-text-primary border-1px border-solid border-border-secondary rounded-2xl pa-sm"
        >
          <div class="text-primary mb-sm flex gap-2">
            <Answer class="fill-primary" /> پاسخ::
          </div>
          {{ i.answer }}
        </div>
      </div>
    </QCard>
  </div>
  <q-separator
    v-if="questions.length"
    class="my-xl h-2px !my-4"
    color="border-primary"
  />
  <span class="text-text-primary text-lg"> ثبت سوال </span>
  <QForm @submit.prevent="submitForm" class="row q-col-gutter-md py-2">
    <div class="col-12">
      <QInput
        outlined
        dense
        bg-color="background-secondary"
        label="متن سوال:"
        rounded
        v-model="model.question"
        type="textarea"
        :input-style="inputStylesFN"
      />
    </div>
    <div class="col-12">
      <PrimaryButton type="submit" class="max-w-56 !rounded-full">
        ارسال سوال</PrimaryButton
      >
    </div>
  </QForm>
</template>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
