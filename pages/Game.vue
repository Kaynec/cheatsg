<template>
  <div>
    <!--  -->
    <QCard class="bg-background-secondary shadow-0 pa-lg">
      <p class="text-text-secondary py-4">
        کاربر گرامی لطفا نوع کنسول و ظرفیت اکانت مد نظر خود را در باکس زیر وارد
        کنید.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <QSelect
            type="textarea"
            label="نوع کنسول"
            bgColor="background-secondary"
            clearable
            outlined
            class="!rounded-full"
            v-model="currentConsole"
            autogrow
            :options="consoles?.map((el) => ({ ...el }))"
            multiple
            option-label="name"
            option-value="id"
          />
        </div>
        <div>
          <QSelect
            type="textarea"
            label="نوع ظرفیت اکانت"
            clearable
            bgColor="background-secondary"
            outlined
            class="!rounded-full"
            v-model="currentCapacitie"
            autogrow
            :options="capacity?.map((el) => ({ ...el }))"
            multiple
            option-label="name"
            option-value="id"
          />
        </div>
        <div>
          <QBtn
            :class="{ 'bg-btn-gradient-game': $q.dark.isActive }"
            @click="refreshNuxtData('games'), key++"
            class="bg-btn-gradient text-white !rounded-3xl fit"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1667 3.41667V5.25C17.1667 5.91667 16.7501 6.75 16.3334 7.16667L12.7501 10.3333C12.2501 10.75 11.9167 11.5833 11.9167 12.25V15.8333C11.9167 16.3333 11.5834 17 11.1667 17.25L10.0001 18C8.91673 18.6667 7.41673 17.9167 7.41673 16.5833V12.1667C7.41673 11.5833 7.0834 10.8333 6.75007 10.4167L6.3584 10.0083C6.10007 9.73333 6.05007 9.31667 6.2584 8.99167L10.5251 2.14167C10.6751 1.9 10.9417 1.75 11.2334 1.75H15.5001C16.4167 1.75 17.1667 2.5 17.1667 3.41667Z"
                fill="#979797"
              />
              <path
                d="M8.62467 3.025L5.66634 7.76667C5.38301 8.225 4.73301 8.29167 4.35801 7.9L3.58301 7.08333C3.16634 6.66667 2.83301 5.91667 2.83301 5.41667V3.5C2.83301 2.5 3.58301 1.75 4.49967 1.75H7.91634C8.56634 1.75 8.96634 2.46667 8.62467 3.025Z"
                fill="#979797"
              />
            </svg>

            <span> اعمال فیلتر </span>
          </QBtn>
        </div>
      </div>
    </QCard>

    <NewestGames :key="key" :filterTypes="filterTypes" />

    <GameImages />

    <SpecialOfferPackage :key="key" :filterTypes="filterTypes" />

    <QCard
      class="bg-background-secondary mt-6rem shadow-0 rounded-lg w-95vw min-w-400px max-w-900px mx-auto grid grid-flow-col gap-1 pa-2"
    >
      <QInnerLoading :showing="apiCatsPending" />
      <button
        v-for="cat in apiCats?.slice(0, 5)"
        :key="cat.id"
        :class="{
          'border-1 border-primary border-solid bg-primary-light text-primary':
            model.currentCategoryName === cat.name,
        }"
        class="rounded-xl flex-1 text-text-secondary text-center text_xs p-sm max-w-50"
        @click="
          (model.currentCategoryName = cat.name), (model.currentCategory = cat)
        "
      >
        <span> {{ cat.name }}</span>
      </button>
    </QCard>
    <!--  -->

    <ScrollSlider class="pb-4rem pt-1rem">
      <template #default="{ canClick }">
        <GameCard
          :product_type="product.product_type as ProductTypeEnum"
          v-for="product in data"
          :attachments="product.attachments as any"
          :key="product.id"
          :id="product.id"
          class="select-none"
          :device_model="product.device_model ?? ''"
          :img="product.main_image"
          :title="product.title"
          :price="parseInt(product.price)"
          :desc="product.slug"
          :slug="product.slug"
          :time="['22', '14', '35']"
          :final-price="product.off_price"
          :discount-percent="calculatePercentageOffPrice(product)"
          region="آسیا"
          @click="canClick ? gotoProductDetailPage(product) : null"
        />
      </template>
    </ScrollSlider>

    <Blog :isGameBlog="true" />

    <div class="pb-2rem">
      <h1 class="text-4xl py-4 text-text-primary font-600">
        انواع اکانت های ظرفیتی برای انواع کنسول
      </h1>
      <p class="text-text-secondary text-xs">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
        صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم ایپسوم متن ساختگی با
        تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، لورم
        ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
        طراحان گرافیک است،
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  apiProductCapacityLabelListRetrieve,
  apiProductCategoryListRetrieve,
  apiProductConsoleLabelListRetrieve,
  apiProductGetProductRetrieve,
  ProductTypeEnum,
  type ApiProductGetProductRetrieveParams,
  type CategoryOutPut,
  type ProudctOutPut,
} from "@/api";
import { CategoryTypes, PriceTypes, ProductTypes, type Brand } from "@/types";

useSeoMeta({
  title: "Cheats  - game",
  ogTitle: "Cheats  - game",
  description: "بازی ها ",
  ogDescription: "بازی ها ",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "بازی ها",
    to: "",
  },
]);

// Brands

type OptionType = { label: string; id: string };

// when we fetch again we change this key so that vue rerenders this data
const key = ref(0);

const currentConsole = ref<OptionType[]>();
const currentCapacitie = ref<OptionType[]>();

const { data: consoles } = useLazyAsyncData(
  "consoles",
  async () => (await apiProductConsoleLabelListRetrieve()) as unknown as Brand[]
);
const { data: capacity } = useLazyAsyncData(
  "capacity",
  async () =>
    (await apiProductCapacityLabelListRetrieve()) as unknown as Brand[]
);

/**
 * Computes the filter parameters to pass to the product API based on
 * the filter condition, search terms, and other filters set in the component's
 * reactive model.
 */

const filterTypes = ref();

const getFilterTypes = () => {
  const reactive = {} as ApiProductGetProductRetrieveParams;

  const allBrands = [
    ...(currentConsole.value ?? []),
    ...(currentCapacitie.value ?? []),
  ];

  if (allBrands) reactive.labels__in = allBrands.map((el) => el.id).join(",");

  return reactive;
};

const setFilterData = () => {
  filterTypes.value = getFilterTypes();
};
watch(currentConsole, setFilterData);
watch(currentCapacitie, setFilterData);

const { data } = useLazyAsyncData("games", async () => {
  return (
    (await apiProductGetProductRetrieve({
      order_by: PriceTypes.FAVOURITE,
      product_type: ProductTypes.GAME,
      ...filterTypes.value,
    })) as any
  )?.results as ProudctOutPut[];
});
function recursiveWrapper(labels: any[]) {
  const res: CategoryOutPut[] = [];
  function recursivelyFindAllChildrenElement(labels: any[]) {
    if (!labels || !labels.length) return;

    labels.forEach((el) => {
      const { children, ...rest } = el;
      res.push({
        ...rest,
      });
      recursivelyFindAllChildrenElement(children);
    });
  }
  recursivelyFindAllChildrenElement(labels);

  return res;
}

const { pending: apiCatsPending, data: apiCats } = useLazyAsyncData(
  `product-categories-${CategoryTypes.GAME}`,

  async () =>
    (await apiProductCategoryListRetrieve(
      CategoryTypes.GAME
    )) as unknown as CategoryOutPut[],
  {
    transform(data) {
      if (!data?.length) return;
      // the children exist but we only care about it only on first fetch
      // after that we are mapping the data anyway so it should not matter
      return recursiveWrapper((data?.[0] as any).children);
    },
  }
);

const model = ref({
  type: "",
  capacity: "",
  currentCategoryName: "اکشن",
  currentCategory: null as any as CategoryOutPut,
});
</script>

<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
