<script setup lang="ts">
import {
  apiProductProductDetailRetrieve,
  type ProductDetailOutPut,
} from "@/api";
import type { Review } from "@/types";

const router = useRouter();

const id = (router.currentRoute.value.params as { id: string }).id;

const { data } = await useAsyncData(
  `product-${id}`,
  async () => (await apiProductProductDetailRetrieve(id)) as Record<string, any>
);
const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "محصولات",
    to: "Products",
  },
  {
    label: id.replaceAll("-", " "),
    to: "",
  },
]);

// Defining Page Schema After The Blog Data is Fetched
useSchemaOrg([
  defineProduct({
    name: data.value?.title,
    image: data.value?.main_image,
    offers: [{ price: data.value?.off_price }],
    aggregateRating: {
      ratingValue: data.value?.score,
    },
    review: data.value?.reviews.map((el: Review) => ({
      name: el.comment,
      author: {
        name: el.user.firstname + " " + el.user.lastname,
      },
    })),
  }),
]);

useSeoMeta({
  title: `Cheats - محصولات  - ${id}`,
  ogTitle: `Cheats - محصولات  - ${id}`,
  description: "صفحه محصول" + " " + id,
  ogDescription: "صفحه محصول" + " " + id,
});
</script>

<template>
  <div class="my-3rem" v-if="data">
    <!-- We Show a Full Desktop Version here 40% percent of the view is filled with garanty and 60 percent is details of the product -->
    <section class="row q-col-gutter-md col-12" v-if="$q.screen.width > 900">
      <div class="col-12 col-md-9">
        <LazyProductDetails :data="data" />
      </div>
      <div class="col-12 col-md-3">
        <LazyProductGaranty :data="data" />
      </div>
    </section>
    <LazyProductDetailsMobile :data="data" v-else />
    <!-- We Here Show The mobile Version With is just combineing the above two toghether -->
    <!--  Tabs -->
    <LazyProductTabs :data="data" />
    <!-- Related Products -->

    <RelatedProducts v-if="data" :data="data" />
  </div>
</template>
