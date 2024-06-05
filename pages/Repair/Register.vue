<script setup lang="ts">
import {
  apiIssueIssueListRetrieve,
  apiIssueIssueReportCreate,
  apiShopSellOrderReportRetrieve,
} from "@/api";
import { formatPrice } from "@/api/basket-helper";
useSeoMeta({
  title: "Cheats  - repair page register",
  ogTitle: "Cheats  - repair page register",
  description: "خدمات تعمیر - ثبت ت",
  ogDescription: "خدمات تعمیر - ثبت ت",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "خدمات تعمیر",
    to: "Repair",
  },
  {
    label: "ثبت تعمیر",
    to: "",
  },
]);

const router = useRouter();

const issues = router.currentRoute.value.query.selectedIssues?.toString();

const selectedIssues = issues
  ? JSON.parse(router.currentRoute.value.query.selectedIssues?.toString() || "")
  : [];

const { data: issueReportDetail } = useLazyAsyncData(
  "issue_report_detail",
  async () => {
    const res = await apiShopSellOrderReportRetrieve();
    return res;
  }
);

const { data: issueList } = useLazyAsyncData("issue_list", async () => {
  const res = await apiIssueIssueListRetrieve();
  return res?.results ?? [];
});

const sumOfMinPrices = computed(() =>
  issueList.value
    ?.filter((issue) =>
      curr_issue_type.value.some((el) => el.issue === issue.id)
    )
    .reduce((acc, curr) => (acc += parseInt(curr?.min_price ?? "0")), 0)
);
const sumOfMaxPrices = computed(() =>
  issueList.value
    ?.filter((issue) =>
      curr_issue_type.value.some((el) => el.issue === issue.id)
    )
    .reduce((acc, curr) => (acc += parseInt(curr?.max_price ?? "0")), 0)
);
const fullIssuesThatWeHaveSelected = computed(() =>
  issueList.value?.filter((issue) =>
    curr_issue_type.value.some((el) => el.issue === issue.id)
  )
);

const desc = ref("");

const toast = useToast();

async function submitIssues() {
  if (!curr_issue_type) return toast.error("لطفا حداقل یک مشکل انتخاب کنیدی");
  if (!desc.value.length) return toast.error("لطفا توضیحات  را وارد کنید");
  apiIssueIssueReportCreate({
    explanation: desc.value,
    issue_list: curr_issue_type.value.map((el) => el.issue),
  }).then((r) => {
    if (!r) return;
    // I HAVE THE ID NOW
    navigateTo({
      name: "Repair-DateSelect",
      query: {
        id: r.id,
      },
    });
  });
}

const curr_issue_type = ref<any[]>(selectedIssues);
</script>
<template>
  <main>
    <section class="row q-col-gutter-lg p-lg">
      <div class="col-12 col-md-4">
        <SelectRepairParts
          v-model:curr_issue_type="curr_issue_type"
          v-model="desc"
          :selectedIssues="selectedIssues"
        />
      </div>
      <div class="col-12 col-md-8 flex flex-col pa-lg gap-8">
        <h1 class="text-text-primary leading-4 !my-0 !py-0 text_4xl">
          نحوه محاسبه تعرفه تعمیرات:
        </h1>
        <div class="leading-8">
          <p class="text-text-secondary my-lg">
            مشتری گرامی با توجه به اینکه روند تعمیر دسته شما ممکن است با هزینه
            های اضافی همراه باشد تیم ما سعی می کند یک بازه تقریبی برای تعیین
            تعرفه خدمات به شما ارائه کند:
          </p>
          <p v-for="(issue, index) in fullIssuesThatWeHaveSelected">
            <small class="text-text-secondary">{{ index + 1 }}.</small>
            هزینه تعمیر {{ issue.title }} عددی دربازه ی قیمتی
            {{ issue.min_price }} الی {{ issue.max_price }} تومان میباشد
          </p>
          <!-- <p>
            <small class="text-text-secondary">1.</small>
            هزینه تعمیر بدنه کنسول شما دسته شما عددی دربازه ی قیمتی 500.000 الی
            1.000.000 تومان میباشد
          </p>
          <p>
            <small class="text-text-secondary">2.</small>
            هزینه تعمیر ارور C789 _ 646 دسته شما عددی دربازه ی قیمتی 500.000 الی
            1.000.000 تومان میباشد
          </p> -->
        </div>
        <span class="f-text-16-32" v-if="sumOfMinPrices && sumOfMaxPrices">
          بازه حدودی تعرفه خدمات:
          <strong>
            {{ formatPrice(sumOfMinPrices) }} الی
            {{ formatPrice(sumOfMaxPrices) }} تومان
          </strong>
        </span>
        <div class="text-primary flex flex-row gap-2 items-start">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM11.25 8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V8ZM12.92 16.38C12.87 16.51 12.8 16.61 12.71 16.71C12.61 16.8 12.5 16.87 12.38 16.92C12.26 16.97 12.13 17 12 17C11.87 17 11.74 16.97 11.62 16.92C11.5 16.87 11.39 16.8 11.29 16.71C11.2 16.61 11.13 16.51 11.08 16.38C11.03 16.26 11 16.13 11 16C11 15.87 11.03 15.74 11.08 15.62C11.13 15.5 11.2 15.39 11.29 15.29C11.39 15.2 11.5 15.13 11.62 15.08C11.86 14.98 12.14 14.98 12.38 15.08C12.5 15.13 12.61 15.2 12.71 15.29C12.8 15.39 12.87 15.5 12.92 15.62C12.97 15.74 13 15.87 13 16C13 16.13 12.97 16.26 12.92 16.38Z"
                fill="url(#paint0_linear_246_7302)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_246_7302"
                  x1="12"
                  y1="-1.75"
                  x2="12"
                  y2="25.3333"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#4DCAFF" />
                  <stop offset="1" stop-color="#4EA3E0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p class="flex-1">
            کاربر گرامی ما پس از تعمیر دسته شما فاکتور هزینه تعمیر دسته شما را
            برایتان ارسال میکنیم؛ در قدم اول شما نیاز به پرداخت وجه ندارید.
          </p>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="flex-1">
            <PrimaryButton class="!h-10" @click="submitIssues">
              دریافت نوبت برای ارسال
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
