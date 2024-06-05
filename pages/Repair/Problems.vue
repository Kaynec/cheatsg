<script setup lang="ts">
import {
  apiIssueIssueListRetrieve,
  apiProductCategoryListRetrieve,
  type CategoryOutPut,
  type IssueListOutPut,
} from "@/api";
import { CategoryTypes } from "@/types";

const router = useRouter();

const type = router.currentRoute.value.query.type;

const typeTranslated = type === "gamepad" ? "دسته" : "کنسول";

useSeoMeta({
  title: "Cheats - repair problems page",
  ogTitle: "Cheats - repair problems page",
  description: `خدمات تعمیر - ${typeTranslated}`,
  ogDescription: `خدمات تعمیر - ${typeTranslated}`,
});

const tags = JSON.parse(
  router.currentRoute.value.query?.tags?.toString() ?? "[]"
);

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "خدمات تعمیر",
    to: "Repair",
  },
  {
    label: `تست ${typeTranslated}`,
    to: "",
  },
]);

const currentCategory = ref();

const selectedIssues = ref<IssueListOutPut[]>([]);

const setElementToActive = (issue: IssueListOutPut) => {
  const index = selectedIssues.value.findIndex((el) => el.id === issue.id);
  if (index > -1) {
    selectedIssues.value = selectedIssues.value.filter(
      (el) => el.id !== selectedIssues.value[index].id
    );
  } else {
    selectedIssues.value.push(issue);
  }
};

const { data: issueCategory, refresh: issueCategoryRefresh } = useAsyncData(
  "issue-category",
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.SERVICE
    )) as any as CategoryOutPut[]
);

const {
  data: issueList,
  refresh,
  pending: issueLoading,
} = useAsyncData(
  "issue-list",
  async () =>
    (
      (await apiIssueIssueListRetrieve({
        categories__in: currentCategory.value,
        tags__in: tags.join(","),
      })) as any
    ).results as IssueListOutPut[],
  {
    transform(data) {
      // on initial data fetch i want to set the current tab to first element of this category list
      return data.map((el) => ({ ...el, selected: false }));
    },
    immediate: false,
    watch: [currentCategory],
  }
);

let hasbeenDone = false;
watch(
  issueCategory,
  () => {
    if (!issueCategory.value?.length || hasbeenDone) return;
    currentCategory.value = issueCategory.value?.[0]?.id;
    refresh();
    hasbeenDone = true;
  },
  { deep: true, immediate: true }
);

const store = useAuthStore();
const toast = useToast();
function submitIssue() {
  const selectedIssue = selectedIssues.value.length;
  if (!selectedIssue) toast.error("لطفا مشکل  مورد نظر را انتخاب کنید");

  if (!store.isAuthenticated)
    return navigateTo({
      name: "auth-login",
    });
  //
  else
    navigateTo({
      name: "Repair-Register",
      query: {
        selectedIssues: JSON.stringify(
          selectedIssues.value.map((selectedIssue) => ({
            issue: selectedIssue.id,
            issue_title: selectedIssue.title,
          }))
        ),
      },
    });
}

function isElementSelected(id: number) {
  return selectedIssues.value.some((el) => el.id === id);
}
</script>
<template>
  <main>
    <QCard class="mt-lg mb-3rem !rounded-xl q-pb-lg">
      <q-tabs
        v-model="currentCategory"
        content-class="text-text-primary !border-1 !border-solid !border-dark"
        active-color="text-primary"
        active-bg-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          :name="item.id"
          :label="item.name"
          v-for="item in issueCategory"
          :key="item.id"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="currentCategory"
        animated
        v-for="item in issueCategory"
      >
        <q-tab-panel :name="item.id">
          <QInnerLoading :showing="issueLoading" />

          <ScrollSlider class="row w-full min-h-75 items-center">
            <div
              class="col-10 col-md-5 col-lg-3 mx-auto md:mx-0"
              v-for="error in issueList"
              @click="setElementToActive(error)"
            >
              <div
                class="relative border-1 min-h-50 after:rounded-b-xl rounded-xl after:z-1 after:absolute after:content-[''] after:w-full after:h-8 after:bg-black after-bottom-0 after-end-0"
                :class="{
                  ' border-primary': isElementSelected(error.id),
                  'border-border-primary': !isElementSelected(error.id),
                }"
              >
                <NuxtImg
                  loading="lazy"
                  :src="error.picture"
                  :alt="error.picture"
                  class="absolute rounded-xl object-cover w-full max-h-full"
                  aria-details="it's a background image"
                />
                <span
                  class="text-left end-2 text-text-primary bottom-2 absolute z-2"
                  >Error {{ error.title }}</span
                >
              </div>
            </div>
          </ScrollSlider>
        </q-tab-panel>
      </q-tab-panels>

      <div class="ps-4 w-11/12">
        <PrimaryButton class="max-w-130" @click="submitIssue">
          ثبت خرابی {{ typeTranslated }}
        </PrimaryButton>
      </div>
    </QCard>
  </main>
</template>
