<template>
  <div class="flex gap-4xl pa-lg z-99">
    <LazyRenderCategory
      type="PRODUCT"
      v-for="cat in allCategories"
      @redirect="$emit('redirect')"
      :cat="cat"
    />
  </div>
</template>

<script setup lang="ts">
import { apiProductCategoryListRetrieve, type CategoryOutPut } from "@/api";
import { CategoryTypes } from "@/types";

const emit = defineEmits(["redirect"]);

function recursiveWrapper(labels: any[]) {
  const newLabels = labels;
  function recursivelyFindAllChildrenElement(labels: any[]) {
    if (!labels || !labels.length) return;

    labels.forEach((el) => {
      const { children, name } = el;
      el.label = name;
      recursivelyFindAllChildrenElement(children);
    });
  }
  recursivelyFindAllChildrenElement(newLabels);
  return newLabels;
}

const { data: categoriesPhisical } = useLazyAsyncData(
  `product-categories-${CategoryTypes.PRODUCT}`,

  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.PRODUCT
    )) as unknown as CategoryOutPut[],

  {
    transform(data) {
      return recursiveWrapper(data);
    },
  }
);
const { data: categoriesGame } = useLazyAsyncData(
  `product-categories-${CategoryTypes.GAME}`,
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.GAME
    )) as unknown as CategoryOutPut[],
  {
    transform(data) {
      return recursiveWrapper(data);
    },
  }
);
const { data: categoriesGiftCart } = useLazyAsyncData(
  `product-categories-${CategoryTypes.GIFTCART}`,
  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.GIFTCART
    )) as unknown as CategoryOutPut[],
  {
    transform(data) {
      return recursiveWrapper(data);
    },
  }
);

const allCategories = computed(() => [
  {
    label: "محصولات فیزیکی",
    children: categoriesPhisical.value,
    id: CategoryTypes.PRODUCT,
  },
  {
    label: "گیفت کارت",
    children: categoriesGiftCart.value,
    id: CategoryTypes.GIFTCART,
  },
  {
    label: "محصولات بازی",
    children: categoriesGame.value,
    id: CategoryTypes.GAME,
  },
]);
</script>
