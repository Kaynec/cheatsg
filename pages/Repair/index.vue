<script setup lang="ts">
import {
  ApiIssueTagListRetrieveIssueType,
  apiGeneralCommonQuestionListRetrieve,
  apiIssueTagListRetrieve,
  type CommonQuestionListOutPut,
  type TagListOutPut,
} from "@/api";
import type { TagOutPutWithSelected } from "@/types";

useSeoMeta({
  title: "Cheats  - repair page",
  ogTitle: "Cheats  - repair page",
  description: "خدمات تعمیر ",
  ogDescription: "خدمات تعمیر ",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "خدمات تعمیر",
    to: "Repair",
  },
]);

const { data: commonQuestions } = useAsyncData(
  "common-questions",
  async () =>
    ((await apiGeneralCommonQuestionListRetrieve()) as any)
      .results as CommonQuestionListOutPut[]
);

// one is console two is controller
const issue_type = ref<ApiIssueTagListRetrieveIssueType>(1);
const {
  data: tags,
  refresh,
  pending: tagLoading,
} = useAsyncData(
  "tag-list",
  async () =>
    (await apiIssueTagListRetrieve({
      issue_type: issue_type.value,
    })) as any as TagOutPutWithSelected[],
  {
    transform(data) {
      return data.map((el) => ({ ...el, selected: false }));
    },
  }
);

watch(issue_type, () => refresh());

// specefic issue type
function onSubmit() {
  const store = useAuthStore();

  if (issue_type.value === ApiIssueTagListRetrieveIssueType.NUMBER_2) {
    // Controller

    return navigateTo({
      name: "Repair-ControllerTest",
      query: {
        issue_type: issue_type.value,
        tags: JSON.stringify(
          tags.value?.filter((el) => el.selected).map((el) => el.id)
        ),
      },
    });
  }

  // Console
  if (issue_type.value === ApiIssueTagListRetrieveIssueType.NUMBER_1) {
    navigateTo({
      name: "Repair-Problems",
      query: {
        issue_type: issue_type.value,
        tags: JSON.stringify(
          tags.value?.filter((el) => el.selected).map((el) => el.id)
        ),
      },
    });
  }
}
</script>

<template>
  <main>
    <section class="row q-col-gutter-lg pb-lg">
      <div class="col-12 col-sm-5 col-md-4">
        <RepairType
          :issue_type="issue_type"
          @submit="onSubmit"
          @update:issue_type="(new_issue_type) => (issue_type = new_issue_type)"
          v-model:tag-list="tags"
          :loading="tagLoading"
        />
      </div>
      <div class="col-12 col-sm-7 col-md-8 flex flex-col pa-lg gap-5">
        <h1 class="text-text-primary text-h4 mb-6">
          بزرگ ترین مرجع تعمیر دسته و کنسول ایران
        </h1>
        <!-- <p class="text-text-secondary">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی
          نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم
          متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
          گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
          و با استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید
          سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم
          ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
          طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
          صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با
          تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی
          نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم
          متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
          گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
          و با استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید
          سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم
          ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
          طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
          صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با
          تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
        </p> -->
        <NuxtImg
          src="/images/repair_banner.jpg"
          format="webp"
          class="rounded-lg min-h-45"
        />
      </div>
      <!--  -->

      <div class="col-12 col-md-7">
        <q-list class="!rounded-2xl !bg-transparent space-y-lg">
          <h2 class="text-2xl py-lg">سوالات متداول</h2>
          <q-expansion-item
            class="bg-background-secondary !rounded-2xl border-1 border-border-primary"
            :label="item?.question"
            v-for="item in commonQuestions"
          >
            <q-card class="!rounded-2xl">
              <q-card-section>
                <span class="break-all">
                  {{ item?.answer }}
                </span>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="col-12 col-md-5 flex justify-center">
        <NuxtImg
          width="400"
          height="400"
          class="w-full"
          src="/images/FAQs.svg"
          alt="FAQs image"
        />
      </div>
      <!--  -->
      <div class="col-12 flex flex-col pa-lg gap-5 my-xl">
        <h2 class="text-text-primary text-h6">
          نحوه محاسبه و تعرفه خدمات تعمیر
        </h2>
        <p class="text-text-secondary">
          ‏ چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با
          تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی
          نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم
          متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
          گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
          و با استفاده از طراحان گرافیک است،
        </p>
      </div>
      <div
        class="flex flex-col items-start w-full bg-background-secondary !rounded-2xl mb-lg"
      >
        <span class="text-primary pb-lg text-xl">قیمت خدمات تعمیر دسته</span>
        <SmallDetail
          label="خرابی بدنه دسته"
          desc="در صورت شکستگی یا ... حدود عددی ما بین 1.000.000 تومان الی 2.500.000 هزینه بر خواهد بود"
        />
        <SmallDetail label="دکمه های اصلی" desc="500.000 الی 1.000.000 تومان" />
        <SmallDetail label="دکمه های اصلی" desc="500.000 الی 1.000.000 تومان" />
        <SmallDetail
          label="دکمه های اصلی"
          desc="در صورت شکستگی یا ... حدود عددی ما بین 1.000.000 تومان الی 2.500.000 هزینه بر خواهد بود"
        />
        <SmallDetail
          label="دکمه های اصلی"
          desc="در صورت شکستگی یا ... حدود عددی ما بین 1.000.000 تومان الی 2.500.000 هزینه بر خواهد بود"
          :addSeperator="false"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
:deep(.q-item__label) {
  word-wrap: break-word;
}
</style>
