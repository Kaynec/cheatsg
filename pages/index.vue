<script setup lang="ts">
import {
  apiGeneralHomePageReportRetrieve,
  apiGeneralSliderListRetrieve,
  apiGeneralStoryListRetrieve,
  type SliderOutPut,
  type StoryOutPut,
} from "@/api";
import { openURL } from "quasar";

useSeoMeta({
  title: "Cheats  - Home page",
  ogTitle: "Cheats  - Home page",
  description: "صفحه اصلی",
  ogDescription: "صفحه اصلی",
  titleTemplate: "صفحه اصلی",
});

const slide = ref(0);

const { data: sliders } = useLazyAsyncData(
  "sliders",
  async () =>
    (await apiGeneralSliderListRetrieve()) as unknown as SliderOutPut[]
);
const { data: stories } = useLazyAsyncData("stories", async () => {
  const res = await apiGeneralStoryListRetrieve();
  return res as unknown as StoryOutPut[];
});

const { data: homepageReport, pending: homepageReportPending } =
  useLazyAsyncData(
    "homepage-report",
    async () => await apiGeneralHomePageReportRetrieve()
  );

const globalStore = useGlobalStore();

function handleStoryClick(story: any) {
  globalStore.setCurrentStorySource(story);
}
</script>

<template>
  <div>
    <!-- Doesn't Need Anything Because it Takes it From The Global Store -->
    <LazyStoryComponent />
    <LazyScrollSlider>
      <template #default="{ canClick }">
        <Story
          :story="story"
          @click="canClick ? handleStoryClick(story) : null"
          class="!select-none"
          v-for="story in stories"
          :key="story.id"
        />
      </template>
    </LazyScrollSlider>
    <div class="min-h-90 md:min-h-110" v-if="$q.screen.width > 0">
      <ClientOnly>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="white"
          navigation
          :autoplay="true"
          :swipeable="true"
          class="text-white !border-none !shadow-none bg-transparent !h-max w-full !p-0 mt-lg"
        >
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <div class="translate-y-3">
              <q-btn
                v-if="active"
                size="sm"
                color="yellow"
                flat
                round
                @click="onClick"
                aria-label="navigation button"
              >
                <img
                  src="@/assets/home_imgs/selected_navigation.svg?inline"
                  alt="selected banner icon"
                  width="35"
                  height="35"
                />
              </q-btn>
              <q-btn
                v-else
                size="12px"
                :icon="btnProps.icon"
                color="white"
                flat
                round
                @click="onClick"
                aria-label="navigation button"
              />
            </div>
          </template>

          <q-carousel-slide
            class="!overflow-hidden w-full !p-0 cursor-pointer"
            @click="openURL(slide_image.link)"
            v-for="(slide_image, index) in sliders"
            :name="index"
          >
            <div class="pointer-events-none max-w-full w-full">
              <NuxtImg
                loading="lazy"
                class="w-full h-full mobile_pic"
                alt="carousel image"
                :src="slide_image.mobile_picture"
                v-if="$q.screen.width < 768 && !!slide_image.mobile_picture"
              />
              <NuxtImg
                loading="lazy"
                class="w-full h-full tablet_pic"
                alt="carousel image"
                :src="slide_image.middle_picture"
                v-if="
                  $q.screen.width > 768 &&
                  $q.screen.width < 1200 &&
                  !!slide_image.middle_picture
                "
              />
              <NuxtImg
                loading="lazy"
                class="w-full h-full pc_pic"
                alt="carousel image"
                :src="slide_image.laptop_picture"
                v-if="$q.screen.width > 1200 && !!slide_image.laptop_picture"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </ClientOnly>
    </div>
    <div>
      <LazyOurServices />
    </div>
    <LazySpecialOffer />
    <LazyHomePageImages />
    <div class="w-full">
      <LazyPopularProducts />
    </div>
    <div class="w-full">
      <LazyAboutUs :data="homepageReport" v-if="homepageReport" />
      <QInnerLoading v-else :showing="homepageReportPending" />
    </div>

    <div class="w-full">
      <LazyBlog />
    </div>
  </div>
</template>

<style lang="scss">
.carousel-image {
  height: 150px !important;
  width: 100%;
  margin: 0 auto;
}

.mobile_pic {
  display: block;
}

.tablet_pic {
  display: none;
}

.pc_pic {
  display: none;
}

@media screen and (min-width: 768px) {
  .mobile_pic {
    display: none;
  }
  .tablet_pic {
    display: block;
  }
  .pc_pic {
    display: none;
  }
}

@media screen and (min-width: 1240px) {
  .mobile_pic {
    display: none;
  }
  .tablet_pic {
    display: none;
  }
  .pc_pic {
    display: block;
  }
}

@media screen and (min-width: 1024px) {
  .carousel-image {
    min-height: 25rem !important;
  }

  .show-mydata {
    flex-direction: row;
  }
}

.animation {
  animation: scale-down 0.8s ease-in-out forwards;
}

@keyframes scale-down {
  from {
    transform: translateY(-600px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
