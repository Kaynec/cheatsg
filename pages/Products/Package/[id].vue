<script setup lang="ts">
import { apiProductProductDetailRetrieve } from "@/api";

useSeoMeta({
  title: "Cheats  - package page",
  ogTitle: "Cheats  - package page",
  description: "صفحه پکیج",
  ogDescription: "صفحه پکیج",
});

const router = useRouter();

const id = (router.currentRoute.value.params as { id: string }).id;

const { data } = useAsyncData(
  `package-${id}`,
  async () => (await apiProductProductDetailRetrieve(id)) as any
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
    <QCard class="mt-lg mb-4xl !rounded-xl">
      <ProductTabs :data="data" />
    </QCard>
  </div>
</template>
