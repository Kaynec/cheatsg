<script setup lang="ts">
const props = defineProps<{
  scrollAmount: number;
  currentuser?: UserOutPut | null;
}>();

import { links } from "@/layouts/links";
import { type UserOutPut } from "@/api";
import { navigateToProfileOnlyIfUserIsLoggedIn } from "@/utils/Navigations-Utils";

const userDisplayName = ref("کاربر مهمان");

onMounted(() => {
  if (!props.currentuser) return;

  userDisplayName.value =
    `${props.currentuser.firstname} ${props.currentuser?.lastname}`.substring(
      0,
      25
    );
});

const showProductCategories = ref(false);
const showBlogCategories = ref(false);

const store = useGlobalStore();

const height_container = ref<HTMLDivElement>();
const height = ref();

onMounted(
  () => (height.value = height_container.value?.getBoundingClientRect().height)
);
</script>
<template>
  <div
    class="fixed inset-0 pointer-events-none z-99"
    :class="{ 'backdrop-blur-sm': showProductCategories || showBlogCategories }"
  >
    <nav
      @mouseleave="
        (showProductCategories = false), (showBlogCategories = false)
      "
      key="header"
      class="!rounded-lg bg-background-primary-light max-h-10vh pointer-events-initial backdrop-blur !shadow-none mx-auto transition-450 header relative"
    >
      <div
        ref="height_container"
        class="flex items-center container shadow-none mx-auto flex flex-1 items-center pb-2 justify-between py-3"
      >
        <img
          src="@/assets/logo.png"
          class="relative max-w-12 mix-blend-difference"
          alt="website logo"
        />
        <!-- <ProductCategoriesDropDown class="!f-text-8-12" /> -->
        <button
          class="f-text-8-12 text-text-primary"
          @mouseover="
            (showBlogCategories = false), (showProductCategories = true)
          "
        >
          دسته بندی محصولات
        </button>

        <template v-for="link in links" :key="link.name">
          <a
            class="f-text-8-12 text-text-primary"
            :href="link.route"
            v-if="link.query?.isSubSection"
            >{{ link.name }}
          </a>
          <NuxtLink
            class="f-text-8-12 text-text-primary"
            v-else
            :to="link.route"
            >{{ link.name }}</NuxtLink
          >
        </template>

        <button
          class="f-text-8-12 text-text-primary"
          @mouseover="
            (showProductCategories = false), (showBlogCategories = true)
          "
        >
          دسته بندی بلاگ
        </button>

        <!-- Toggle And content Below Toggle -->
        <div class="flex flex-col gap-2px items-end">
          <div class="flex items-center gap-2 mb-2">
            <button
              @click="navigateToProfileOnlyIfUserIsLoggedIn()"
              class="bg-opacity-40 gap-1 text-xs flex items-center px-2 py-1 !tracking-tighter justify-evenly bg-#007AFF1A text-primary !rounded-full border-1px border-solid border-#007AFF"
              aria-label="profile page button"
            >
              <NuxtImg
                v-if="currentuser?.profile_image"
                :src="currentuser?.profile_image"
                alt="user image"
                width="32px"
                height="32px"
                class="rounded-full"
              />
              <QIcon v-else name="portrait" size="24px" />
              {{ userDisplayName }}
            </button>
            <BasketButton :currentuser="currentuser" />

            <div class="bg-#24272C rounded-xl px-2" @click="store.toggleDark()">
              <q-btn
                class="text-light"
                :class="{ 'opacity-30': !$q.dark.isActive }"
                flat
                icon="dark_mode"
                dense
                round
              />
              <q-btn
                class="relative text-light"
                :class="{ 'opacity-30': $q.dark.isActive }"
                flat
                icon="light_mode"
                dense
                round
              />
            </div>
          </div>
        </div>

        <!-- before:bg-#121212 -->
        <!-- <div
        class="w-62% mx-auto absolute top-[3.85rem] lg:top-[4.7rem] xl:top-[5.4rem] 2xl:xl:top-[5.8rem] left-1/2 translate-x-1/2"
      >
        <QInput
          rounded
          outlined
          color="primary"
          :input-style="inputStylesFN"
          bgColor="background-secondary"
          v-model="search"
          label="جست و جو کنید"
          class="z-3 !rounded-full"
          :dark="true"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="blue-10" />
          </template>
        </QInput>
      </div> -->
      </div>

      <!-- when clicked on دسته بندی محصولات this shows -->
      <Transition name="expand">
        <div
          class="w-full absolute !bg-opacity-80 pt-xl flex min-h-25rem bg-background-primary-light"
          :style="`top:${height}px`"
          v-show="showProductCategories"
        >
          <div class="container mx-auto">
            <LazyCategories @redirect="showProductCategories = false" />
          </div>
        </div>
      </Transition>
      <Transition name="expand">
        <div
          class="w-full absolute !bg-opacity-80 pt-xl flex z-99999 min-h-25rem bg-background-primary-light"
          :style="`top:${height}px`"
          v-show="showBlogCategories"
        >
          <div class="container mx-auto">
            <LazyBlogCategories @redirect="showBlogCategories = false" />
          </div>
        </div>
      </Transition>
    </nav>
  </div>
</template>
<style scoped>
.header {
  display: none !important;
}

@media screen and (min-width: 900px) {
  .header {
    display: grid !important;
  }
}
</style>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<style scoped>
.expand-leave-active,
.expand-enter-active {
  transition: all 400ms ease-in-out;
  overflow: hidden !important;
}

.expand-enter-to,
.expand-leave-from {
  height: 25rem;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
  opacity: 0;
}
</style>
