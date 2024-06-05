<template>
  <div class="mt-5rem relative">
    <div class="flex">
      <div class="flex-1 space-y-xl">
        <!-- blog svg icon -->
        <div class="flex justify-between items-center">
          <div class="flex gap-3">
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                fill="#007AFF"
              />
              <path
                d="M18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z"
                fill="#007AFF"
              />
              <path
                d="M12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z"
                fill="#007AFF"
              />
              <path
                d="M16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z"
                fill="#007AFF"
              />
            </svg>

            <h2 class="text-2xl pb-2 text-text-primary font-600">وبلاگ</h2>
          </div>
          <button
            @click="
              navigateTo({
                name: 'Blog',
                query: {
                  category_id: categories.map((el) => el.id).join(','),
                },
              })
            "
            class="text-sm flex items-center flex-nowrap gap-1 whitespace-nowrap text-primary"
          >
            <span>مشاهده همه</span>
            <CurvedLeftArrow class="stroke-primary" />
          </button>
        </div>
        <p class="text-text-secondary max-w-65ch">
          مطالعه جدید ترین اخبار، آموزش ها و مطالب دنیای گیم
        </p>
      </div>
    </div>
    <ScrollSlider class="!pb-0rem">
      <template #default="{ canClick }">
        <div v-for="blog in data" class="pb-2rem embla__slide">
          <BlogComponent
            class="max-w-120 min-w-85"
            :blog="blog"
            @click="
              navigateTo({
                name: 'Blog-slug',
                params: {
                  slug: blog.slug,
                },
                query: {
                  id: blog.id,
                },
              })
            "
          />
        </div>
      </template>
    </ScrollSlider>
  </div>
</template>

<script setup lang="ts">
// TODO THis is Important
import {
  apiGeneralBlogListRetrieve,
  apiProductCategoryListRetrieve,
  type BlogListOutPut,
  type CategoryOutPut,
} from "@/api";
import ScrollSlider from "../ScrollSlider.vue";
import { CategoryTypes } from "@/types";
import { recursiveWrapper } from "@/api/extract-categories-recursively";

const props = defineProps<{
  isGameBlog?: boolean;
}>();

const { data: categories } = useLazyAsyncData(
  `blog-categories-${CategoryTypes.BLOG}`,
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.BLOG
    )) as unknown as CategoryOutPut[],
  {
    transform(data) {
      // I Need It As A Array Because Some More Items That Are Like Game Could Be
      // Later Needed
      return recursiveWrapper(data).filter((el) => el.name === "وبلاگ گیم");
    },
    immediate: props.isGameBlog,
    default: () => [] as any[],
  }
);

const { data } = useLazyAsyncData("blogs", async () => {
  const data = (await apiGeneralBlogListRetrieve({
    categories__in: categories.value.map((el) => el.id).join(","),
  })) as any;
  return data.results as BlogListOutPut[];
});
</script>
