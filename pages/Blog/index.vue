<script setup lang="ts">
import type {
  Label,
  CategoryOutPutWithSelected,
  BrandWithSelected,
} from "@/types";
import { CategoryTypes } from "@/types";

import {
  apiGeneralBlogListRetrieve,
  apiProductCategoryListRetrieve,
  type ApiProductGetProductRetrieveParams,
  type BlogListOutPut,
  type CategoryOutPut,
} from "@/api";
import { useDebounceFn } from "@vueuse/core";

useSeoMeta({
  title: "Cheats  - blog",
  ogTitle: "Cheats  - blog",
  description: "بلاگ",
  ogDescription: "بلاگ",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "بلاگ",
    to: "Blog",
  },
]);

const route = useRoute();

const filterConditions = {
  All: "همه محصولات",
  Newset: "جدید ترین",
  Cheapest: "ارزان ترین",
  MostExpensive: "گران ترین",
  MostPopular: "پرفروش ترین",
};

const showDialog = ref(false);

const model = ref({
  search: "",
  CurrentFilterCondition: filterConditions.All,
  categories: [] as CategoryOutPutWithSelected[],
  labelName: "بلاگ",
});

/**
 * Computes the filter parameters to pass to the product API based on
 * the filter condition, search terms, and other filters set in the component's
 * reactive model.
 */
const filterTypes = computed(() => {
  const reactive = {} as ApiProductGetProductRetrieveParams & {
    offset: number;
  };
  if (model.value.categories.length)
    reactive.categories__in = model.value.categories
      .filter((cat) => cat.value)
      .map((el) => el.id)
      .join(",");
  reactive.search = model.value.search;
  reactive.offset = current.value * limit.value - limit.value;

  return reactive;
});

/**
 * Fetches product data from the API based on the filter parameters.
 * Uses useAsyncData to asynchronously fetch the data and cache it.
 * watch dependency on filterTypes to refetch when filters change.
 */
// Pagination
const current = ref(0);
const limit = ref(10);
const max = ref(0);
const { data, refresh: refreshBlogs } = useAsyncData(
  "blogs",
  async () => {
    const data = (await apiGeneralBlogListRetrieve(filterTypes.value)) as any;

    limit.value = data.limit;
    max.value = Math.ceil(data.count / limit.value);
    if (!current.value) {
      current.value = 1;
    }
    return data.results as BlogListOutPut[];
  },
  {
    server: false,
  }
);

const debounceFn = useDebounceFn(() => {
  refreshBlogs();
}, 500);

watch(filterTypes, () => debounceFn(), { deep: true });

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
const { data: productCategories } = useAsyncData(
  "blog-categories",
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.BLOG
    )) as unknown as CategoryOutPut[]
);
watch(
  productCategories,
  () => {
    model.value.categories = recursiveWrapper(
      productCategories.value ?? []
    ).map((el) => ({
      ...el,
      value: false,
    }));

    const index = model.value.categories.findIndex(
      (el) => el.id === +route.query.category_id!
    );

    if (index >= 0) {
      model.value.categories[index].value = true;
    }
  },
  { immediate: true }
);
</script>
<template>
  <main>
    <QInnerLoading />
    <section class="grid grid-cols-4 gap-lg">
      <!-- Right Side Search Section => Desktop -->
      <ClientOnly>
        <LazySearchParams :model-value="model" v-if="$q.screen.width > 900" />
      </ClientOnly>
      <!-- Show THis Only On Mobile -->
      <div class="col-span-4 lg:col-span-3">
        <QDialog v-model="showDialog" class="w-full">
          <LazySearchParams
            labelName="بلاگ"
            :model-value="model"
            @close="showDialog = false"
          />
        </QDialog>
        <LazyFilterComponent
          :filterConditions="filterConditions"
          :current-filter-condition="model.CurrentFilterCondition as string"
          @update="
            (newCondition) => (model.CurrentFilterCondition = newCondition)
          "
          @show-dialog="showDialog = true"
          :filter-type="'BLOG'"
        />

        <div class="q-col-gutter-lg row">
          <div
            v-for="blog in data"
            :key="blog.id"
            class="col-12 col-sm-6 col-md-5 col-lg-4"
          >
            <BlogComponent
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
        </div>
        <ClientOnly>
          <div class="flex w-full justify-center mt-4">
            <q-pagination color="primary" v-model="current" :max="max" />
          </div>
        </ClientOnly>
      </div>
    </section>
    <section class="py-2rem">
      <h1 class="text-4xl py-4 text-text-primary font-600">انواع بلاگ</h1>
      <p class="text-text-secondary text-xs">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
        صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با
        تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم
        ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
        طراحان گرافیک است،
      </p>
    </section>
  </main>
</template>
