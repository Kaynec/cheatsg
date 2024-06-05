<script setup lang="ts">
import type {
  Label,
  Brand,
  CategoryOutPutWithSelected,
  BrandWithSelected,
} from "@/types";
import { ProductTypes, PriceTypes, CategoryTypes } from "@/types";

import {
  apiProductBrandListRetrieve,
  apiProductCategoryListRetrieve,
  apiProductGetProductRetrieve,
  type ApiProductGetProductRetrieveParams,
  type CategoryOutPut,
  type ProudctOutPut,
} from "@/api";
import { useDebounceFn } from "@vueuse/core";

useSeoMeta({
  title: "Cheats  - products",
  ogTitle: "Cheats  - products",
  description: "محصولات",
  ogDescription: "محصولات",
});
const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "محصولات",
    to: "",
  },
]);

const route = useRoute();
const router = useRouter();

const baseCategoryType = ProductTypes.PHYCICAL;

function filterBasedOnPriceOrder() {
  if (model.value.CurrentFilterCondition === filterConditions.Newset)
    return PriceTypes.NEWEST;
  if (model.value.CurrentFilterCondition === filterConditions.MostExpensive)
    return PriceTypes.EXPENSIVE;
  if (model.value.CurrentFilterCondition === filterConditions.Cheapest)
    return PriceTypes.INEXPENSIVE;
  if (model.value.CurrentFilterCondition === filterConditions.MostPopular)
    return PriceTypes.FAVOURITE;
}

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
  is_exists: false,
  // LETS CHECK IT AGAINST ROUTER
  has_discount: Boolean(
    router.currentRoute.value.query.has_discount ?? undefined
  ),
  CurrentFilterCondition: filterConditions.All,
  categories: [] as CategoryOutPutWithSelected[],
  brands: [] as BrandWithSelected[],
});

// IF A ORDER BY PROPERTY HAS BEEN SET , SET THE FILTER CONDITION TO THAT
const order_by = parseInt(
  router.currentRoute.value.query.order_by?.toString() ?? "NaN"
);
if (order_by === PriceTypes.FAVOURITE) {
  model.value.CurrentFilterCondition = filterConditions.MostPopular;
}

/**
 * Computes the filter parameters to pass to the product API based on
 * the filter condition, search terms, and other filters set in the component's
 * reactive model.
 */
const filterTypes = computed(() => {
  const reactive = {} as ApiProductGetProductRetrieveParams & {
    offset: number;
  };
  const orderByValue = filterBasedOnPriceOrder();
  if (orderByValue) reactive.order_by = orderByValue;
  if (model.value.has_discount) reactive.has_discount = "True";
  if (model.value.is_exists) reactive.is_exists = "True";
  if (model.value.categories.length)
    reactive.categories__in = model.value.categories
      .filter((cat) => cat.value)
      .map((el) => el.id)
      .join(",");
  if (model.value.brands.length)
    reactive.labels__in = model.value.brands
      .filter((cat) => cat.value)
      .map((el) => el.id)
      .join(",");

  reactive.search = model.value.search;
  reactive.product_type = baseCategoryType!;
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
const { data, refresh: refreshProducts } = useAsyncData(
  "products",
  async () => {
    const data = (await apiProductGetProductRetrieve(filterTypes.value)) as any;

    limit.value = data.limit;
    max.value = Math.ceil(data.count / limit.value);
    if (!current.value) {
      current.value = 1;
    }
    return data.results as ProudctOutPut[];
  },
  {
    server: false,
  }
);

const debounceFn = useDebounceFn(() => {
  refreshProducts();
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
  "product-categories",
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.PRODUCT
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
      (el) => el.id === +router.currentRoute.value.query.category_id!
    );

    if (index >= 0) {
      model.value.categories[index].value = true;
    }
  },
  { immediate: true }
);

const { data: brands } = useAsyncData(
  "brands",
  async () => (await apiProductBrandListRetrieve()) as unknown as Brand[]
);
watch(
  brands,
  () => {
    model.value.brands =
      brands.value?.map((el) => ({
        ...el,
        value: false,
      })) ?? [];
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
          <LazySearchParams :model-value="model" @close="showDialog = false" />
        </QDialog>
        <LazyFilterComponent
          :filterConditions="filterConditions"
          :current-filter-condition="model.CurrentFilterCondition as string"
          @update="
            (newCondition) => (model.CurrentFilterCondition = newCondition)
          "
          @show-dialog="showDialog = true"
        />

        <div class="q-col-gutter-lg row">
          <div
            v-for="product in data"
            :key="product.id"
            class="col-12 col-sm-6 col-lg-4"
          >
            <ProductItem :data="product" />
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
      <h1 class="text-4xl py-4 text-text-primary font-600">انواع محصولات</h1>
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
