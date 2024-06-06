<script setup lang="ts">
const globalStore = useGlobalStore();

onMounted(() => {
  globalStore.changeDarkModeSelectors();
});

useSchemaOrg([
  // defineOrganization({
  //   name: "cheats game - چیتز گیم",
  // }),
  defineWebSite({
    name: "cheatsg - چیتز گیم",
  }),
  defineWebPage(),
  defineLocalBusiness({
    address: [
      {
        addressCountry: "IR",
        streetAddress:
          "شعبه تجارت جهانی : تهران، میدان فردوسی، پاساژ تجارت جهانی، طبقه دوم، پلاک ۲۷۰",
        addressLocality: "تهران",
      },
      {
        addressCountry: "IR",
        streetAddress:
          "کارگاه کاستومایز : خیابان فردوسی، کوچه صبح امروز، پلاک ۷",
        addressLocality: "تهران",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday",
      ],
      opens: "9:00",
      closes: "21:00",
    },
    sameAs: [
      "https://www.instagram.com/cheats.game",
      "https://www.telegram.com/cheats_shop",
      "https://www.aparat.com/cheatsgame",
    ],
  }),
]);
</script>
<template>
  <Head>
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta lang="fa" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <NuxtLayout>
    <NuxtLoadingIndicator :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
</template>
