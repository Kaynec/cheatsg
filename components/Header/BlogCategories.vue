<template>
  <div class="flex gap-4xl pa-lg">
    <LazyRenderCategory
      type="BLOG"
      v-for="cat in allCategories"
      @redirect="$emit('redirect')"
      :cat="cat"
    />
  </div>
</template>

<script setup lang="ts">
import { apiProductCategoryListRetrieve, type CategoryOutPut } from "@/api";
import { recursiveWrapper } from "@/api/extract-categories-recursively";
import { CategoryTypes } from "@/types";

const emit = defineEmits(["redirect"]);

const { data: categories } = useLazyAsyncData(
  `blog-categories-${CategoryTypes.BLOG}`,
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.BLOG
    )) as unknown as CategoryOutPut[],
  {
    transform(data) {
      return recursiveWrapper(data);
    },
  }
);

const allCategories = computed(() => [
  {
    label: "بلاگ",
    children: categories.value,
    id: CategoryTypes.BLOG,
  },
]);
</script>
