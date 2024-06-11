<template>
  <main>
    <QInnerLoading :showing="loading" class="z-999" />
    <section
      :style="`background-image:url(${blogDetail?.picture})`"
      class="custom-bg flex"
    >
      <div
        class="bg-overlay mt-auto min-h-35 p-lg rounded-2xl relative bottom-2 space-y-xs w-95% left-50% translate-x-50% backdrop-blur-sm"
      >
        <h1 class="text_6xl">عنوان مقاله: {{ blogDetail?.title }}</h1>
        <div class="flex justify-between py-4">
          <div class="flex">
            <QChip color="primary" v-for="cat in categories">
              {{ cat.name }}
            </QChip>
          </div>
          <div class="flex gap-4">
            <span v-if="blogDetail?.created_at" class="flex items-center gap-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M15.7106 15.9298C15.5806 15.9298 15.4506 15.8998 15.3306 15.8198L12.2306 13.9698C11.4606 13.5098 10.8906 12.4998 10.8906 11.6098V7.50977C10.8906 7.09977 11.2306 6.75977 11.6406 6.75977C12.0506 6.75977 12.3906 7.09977 12.3906 7.50977V11.6098C12.3906 11.9698 12.6906 12.4998 13.0006 12.6798L16.1006 14.5298C16.4606 14.7398 16.5706 15.1998 16.3606 15.5598C16.2106 15.7998 15.9606 15.9298 15.7106 15.9298Z"
                  fill="#F2F2F2"
                />
              </svg>
              ساعت درج مقاله:{{
                new Date(blogDetail?.created_at!)
                  .toLocaleDateString("fa", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                  .split(",")?.[1]
              }}
            </span>
            <span class="flex gap-1 items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75022V2C8.75022 1.59 8.41022 1.25 8.00022 1.25C7.59022 1.25 7.25022 1.59 7.25022 2V3.56C4.55022 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
                  fill="#F2F2F2"
                />
                <path
                  opacity="0.4"
                  d="M20 9.83984C20.55 9.83984 21 10.2898 21 10.8398V16.9998C21 19.9998 19.5 21.9998 16 21.9998H8C4.5 21.9998 3 19.9998 3 16.9998V10.8398C3 10.2898 3.45 9.83984 4 9.83984H20Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M14.839 14.9902L14.339 15.5002H14.329L11.299 18.5302C11.169 18.6602 10.899 18.8002 10.709 18.8202L9.35896 19.0202C8.86896 19.0902 8.52898 18.7402 8.59898 18.2602L8.78898 16.9002C8.81898 16.7102 8.94896 16.4502 9.07896 16.3102L12.119 13.2802L12.619 12.7702C12.949 12.4402 13.319 12.2002 13.719 12.2002C14.059 12.2002 14.429 12.3602 14.839 12.7702C15.739 13.6702 15.449 14.3802 14.839 14.9902Z"
                  fill="#F2F2F2"
                />
              </svg>
              تاریخ درج مقاله:{{
                new Date(blogDetail?.created_at!).toLocaleDateString("fa")
              }}
            </span>

            <button
              @click="shareBlog"
              class="flex rounded-3xl gap-2 border-1px border-primary border-solid p-xs items-center"
            >
              <ShareIt class="fill-primary" />
              اشتراک گذاری
            </button>
          </div>
        </div>
      </div>
    </section>

    <h2 class="text_5xl py-3">محتوای بلاگ</h2>

    <section v-html="blogDetail?.content"></section>

    <q-separator class="!my-xl h-2px" color="border-primary" />

    <h2 class="text_5xl py-3">نظرات بلاگ</h2>

    <section>
      <QCard class="p-sm">
        <section class="flex flex-col gap-4 mt-xl">
          <QCard
            v-for="i in blogDetail?.comments"
            :key="i.user.firstname + i.user.lastname"
            class="bg-background-primary pa-2xl space-y-xl border-2px border-border-primary"
          >
            <SchemaOrgComment :text="i.content">
              <div class="flex gap-3 items-start">
                <div class="flex flex-col">
                  <span class="text-text-primary">
                    {{ i.user.firstname + " " + i.user.lastname }}</span
                  >
                </div>
              </div>

              <div class="flex items-end justify-between">
                <p class="text-text-secondary">
                  {{ i.content }}
                </p>
              </div>
            </SchemaOrgComment>
          </QCard>
        </section>
        <q-separator
          v-if="blogDetail?.comments.length"
          class="!my-xl h-2px"
          color="border-primary"
        />
        <section v-if="authStore.isAuthenticated">
          <span class="text-text-primary text-xl"> ثبت نظر </span>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <QInput
                outlined
                dense
                v-model="content"
                bg-color="background-secondary"
                label="متن نظر:"
                rounded
                type="textarea"
                :input-style="inputStylesFN"
              />
            </div>
            <div class="col-12">
              <PrimaryButton
                class="max-w-56 !rounded-full"
                @click="sendComment"
              >
                ثبت نظر</PrimaryButton
              >
            </div>
          </div>
        </section>
        <section v-else>
          <p class="text-center text-warning py-4 text-lg">
            برای ثبت نظر باید ابتدا وارد اکانت کاربری خود شوید!
          </p>
        </section>
      </QCard>
    </section>
  </main>
</template>

<script setup lang="ts">
import {
  apiGeneralBlogCommentDetailDestroy,
  apiGeneralBlogDetailRetrieve,
  apiGeneralLeaveCommentBlogCreate,
  apiProductCategoryListRetrieve,
  type BlogDetailUserOutPut,
  type CategoryOutPut,
} from "@/api";
import Comment from "@/components/Icons/Comment.vue";
import { inputStylesFN } from "@/constant/styles";
import { CategoryTypes, type Label } from "@/types";
import { useQuasar } from "quasar";
const router = useRouter();

const slug = (router.currentRoute.value.params as { slug: string }).slug;

useSeoMeta({
  title: `Cheats - ${slug.replaceAll("-", " ")}`,
  ogTitle: `Cheats - ${slug.replaceAll("-", " ")}`,
  description: "بلاگ" + " " + slug.replaceAll("-", " "),
  ogDescription: "بلاگ" + " " + slug.replaceAll("-", " "),
});

const authStore = useAuthStore();

const BlogTitle = slug.replaceAll("-", " ");

const tabConditions = {
  "محتوای بلاگ": "محتوای بلاگ",
  نظرات: "نظرات",
};

type User = {
  firstname: string;
  lastname: string;
};

type Comment = {
  user: User;
  content: string;
};

const tab = ref(tabConditions["محتوای بلاگ"]);

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "بلاگ",
    to: "Blog",
  },
  {
    label: BlogTitle,
    to: "",
  },
]);

const {
  data: blogDetail,
  pending: loading,
  refresh,
} = await useAsyncData(`$blog-detail-${slug}`, async () => {
  const res = await apiGeneralBlogDetailRetrieve(slug);
  const data = { ...res };
  const html_res = await $fetch(res.content);
  data.content = html_res as string;
  return data as BlogDetailUserOutPut & {
    comments: Comment[];
  };
});

useHead({
  title: blogDetail.value?.title || "",
  meta: [
    {
      name: "description",
      content: blogDetail.value?.content,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: "og:site_name", content: "چیتز گیم" },
    { hid: "og:type", property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://cheatsg.ir/blog/${slug}`,
    },
    {
      property: "og:title",
      content: blogDetail.value?.title,
    },
    {
      property: "og:description",
      content: blogDetail.value?.content,
    },
    {
      property: "og:image",
      content: blogDetail.value?.picture,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: "twitter:site", content: "@qdnvubp" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:url",

      content: `https://cheatsg.ir/blog/${slug}`,
    },
    {
      name: "twitter:title",
      content: blogDetail.value?.title,
    },
    {
      name: "twitter:description",
      content: blogDetail.value?.content,
    },
    {
      name: "twitter:image",
      content: blogDetail.value?.picture,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `https://cheatsg.ir/blog/${slug}`,
    },
  ],
});

// Defining Page Schema After The Blog Data is Fetched
useSchemaOrg([
  defineArticle({
    image: blogDetail.value?.picture,
    headline: BlogTitle,
    datePublished: blogDetail.value?.created_at,
  }),
]);

const content = ref("");

const toast = useToast();

async function sendComment() {
  if (!content.value.length) {
    return toast.error("محتوای نظر نمیتوان خالی باشد");
  }
  if (!blogDetail.value?.id) return;
  const comment = await apiGeneralLeaveCommentBlogCreate({
    blog: blogDetail.value?.id,
    content: content.value,
  });
  if (comment) refresh();
}

// Just Flatlining The Response Into One Array
function recursiveWrapper(labels: CategoryOutPut[]) {
  const result: Label[] = [];
  function recursivelyFindAllChildrenElement(labels: any[]) {
    if (!labels || !labels.length) return;

    labels.forEach((el) => {
      const { children, ...rest } = el;
      result.push(rest);
      recursivelyFindAllChildrenElement(children);
    });
  }
  recursivelyFindAllChildrenElement(labels);
  return result;
}
const categories = ref<CategoryOutPut[]>([]);

useAsyncData(
  "blog-categories",
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.BLOG
    )) as unknown as CategoryOutPut[],
  {
    server: false,
    transform(data) {
      const newData = recursiveWrapper(data) as CategoryOutPut[];

      const thisBlogsCategoryListIds =
        (blogDetail.value?.category_list as any).map((el) => el.category) ??
        ([] as number[]);

      for (const cat of newData) {
        if (thisBlogsCategoryListIds.includes(cat.id))
          categories.value.push(cat);
      }
      return data;
    },
  }
);

const $q = useQuasar();
async function deleteComment(id: number) {
  $q.loading.show();

  apiGeneralBlogCommentDetailDestroy(id)
    .then(() => refresh())
    .finally(() => $q.loading.hide());
}

function shareBlog() {
  if (!("share" in window.navigator)) {
    return;
  }
  window.navigator.share({
    url: window.location.href,
    text: blogDetail.value?.content,
    title: blogDetail.value?.title,
  });
  console.log("share");
}
</script>
<style scoped>
.custom-bg {
  background-position: center;
  background-size: cover;
  min-height: 450px;
  width: 100%;
  background-repeat: no-repeat;
}
</style>
