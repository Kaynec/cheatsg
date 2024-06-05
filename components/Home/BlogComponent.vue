<template>
  <QCard
    class="relative custom-card-class shadow-lg shadow-red cursor-pointer transition-300 hover:scale-[1.03] select-none flex bg-transparent shadow-0 justify-center items-center min-h-75 card-with-border relative"
  >
    <div class="mask bg-background-primary"></div>
    <QImg
      :src="newImageSrc"
      alt="warzone image"
      class="pa-xs !rounded-t-2xl"
      fit="cover"
      loading="lazy"
      width="100%"
      height="200px"
      :draggable="false"
    >
      <div
        class="bg-overlay rounded-2xl relative !px-2 !py-1 bottom-2 space-y-xs w-95% left-50% translate-x-50% backdrop-blur-sm"
      >
        <span class="text_md">{{ blog.title }}</span>
        <p>
          <span
            class="text-text-secondary text_xs leading-4 !text-ellipsis !whitespace-nowrap !overflow-hidden block !max-h-10"
            v-html="blogDetail"
          >
          </span>
        </p>
      </div>
    </QImg>
    <!--  -->
    <div
      class="flex z-999 justify-start w-full gap-3 mb-auto px-xs text-text-secondary"
    >
      <div
        v-if="blog.created_at"
        class="flex gap-2 items-center border-e-1 border-e-#ddd p-e-lg"
      >
        <QIcon size="20px" name="calendar_month" />

        {{
          new Date(blog.created_at).toLocaleDateString("fa", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })
        }}
      </div>

      <div
        v-if="blog.hasOwnProperty('comments_number')"
        class="flex gap-2 items-center"
      >
        <QIcon size="20px" name="chat" />
        {{ blog.comments_number }} نظر
      </div>
    </div>
    <button
      class="bg-background-primary rounded-full absolute -bottom-2px end-18% p-6px z-55"
    >
      <div class="i-carbon-chevron-left text-lg" />
    </button>
  </QCard>
</template>
<script setup lang="ts">
import {
  apiGeneralBlogDetailRetrieve,
  type BlogDetailUserOutPut,
  type BlogListOutPut,
} from "@/api";
const props = defineProps<{ blog: BlogListOutPut }>();

const imageUtil = useImage();

const newImageSrc = imageUtil(props.blog.picture, {
  format: "webp",
  width: 900,
});

const { data: blogDetail } = useAsyncData(
  `$blog-detail-${props.blog.slug}`,
  async () => {
    const res = await apiGeneralBlogDetailRetrieve(props.blog.slug);
    const data = { ...res };
    const html_res = await $fetch(res.content);
    return html_res as string;
  }
);
</script>
<style scoped>
.mask {
  inset: 0;
  position: absolute;
  mask-image: url("@/assets/home_imgs/cards/Subtract.svg");
  mask-type: initial;
  mask-size: 100% 90%;
  mask-repeat: no-repeat;
  mask-position: bottom;
  box-shadow: none;
}
</style>
