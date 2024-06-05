<template>
  <Transition name="expand">
    <div
      v-show="drawer"
      class="fixed h-screen w-screen transition-800 backdrop-blur !z-99999 bg-purple"
    >
      <!--  -->
      <!-- <GOBackOneSection /> -->

      <QBtn
        v-if="showCategories || showBlogCategories"
        @click="
          () => {
            if (showBlogCategories) showBlogCategories = false;
            if (showCategories) showCategories = false;
          }
        "
        flat
        class="z-999 absolute end-0 mt-2 me-4"
      >
        <div class="i-carbon-chevron-left text-2xl" />
      </QBtn>
      <!--  -->
      <aside
        show-if-above
        :width="200"
        :breakpoint="500"
        class="absolute inset-0 bg-background-primary z-99"
        ref="aside"
        v-auto-animate
      >
        <button class="absolute top-6 start-6" @click="$emit('close')">
          <div
            class="w-5 h-2px !bg-dark !dark:bg-white absolute transition-500"
            :class="{ '-rotate-45deg': drawer, '': !drawer }"
          ></div>
          <div
            :class="{ 'rotate-45deg': drawer, 'bottom-4px': !drawer }"
            class="w-5 h-2px !bg-dark !dark:bg-white e absolute transition-500"
          ></div>
        </button>
        <div v-if="!showCategories && !showBlogCategories">
          <div
            class="flex flex-col items-center bg-background-primary px-2xl text-text-primary"
          >
            <img
              src="@/assets/logo.png"
              class="relative max-w-30 aspect-1 mix-blend-difference"
              alt="website logo"
            />

            <template v-for="link in links" :key="link.name">
              <a
                class="self-start w-full py-2"
                :href="link.route"
                @click="emit('close')"
                v-if="link.query?.isSubSection"
                >{{ link.name }}</a
              >
              <NuxtLink
                @click="emit('close')"
                class="self-start w-full py-2"
                exact-active-class="text-primary"
                v-else
                :to="link.route"
                >{{ link.name }}</NuxtLink
              >
              <q-separator class="!my-xs" />
            </template>
            <button class="w-full text-start mb-8">
              <span class="text-text-primary" @click="showCategories = true">
                دسته بندی محصولات
              </span>
            </button>
            <button class="w-full text-start">
              <span
                class="text-text-primary"
                @click="showBlogCategories = true"
              >
                دسته بندی بلاگ
              </span>
            </button>

            <!-- <ProductCategoriesDropDown class="self-start w-full !py-0" /> -->
            <q-separator class="!my-xs" />

            <div class="flex justify-between w-full items-center">
              <span class="text-text-primary">تم سایت:</span>

              <div
                class="bg-#24272C rounded-xl px-2"
                @click="store.toggleDark()"
              >
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
            <!--  -->
            <div class="w-full">
              <button
                @click="navigateToProfileOnlyIfUserIsLoggedIn(), emit('close')"
                class="bg-opacity-40 py-1 px-2 gap-2 text-xs flex items-center !tracking-tighter justify-evenly bg-#007AFF1A text-primary !rounded-full border-1px border-solid border-#007AFF"
              >
                <QImg
                  v-if="currentuser?.profile_image"
                  :src="currentuser?.profile_image"
                  alt="user image"
                  width="36px"
                  height="36px"
                  class="rounded-full"
                />
                <QIcon
                  v-else="currentuser?.profile_image"
                  name="portrait"
                  size="24px"
                />
                {{ userDisplayName }}
              </button>
            </div>
            <!--  -->
          </div>
        </div>

        <div class="container mx-auto mt-2.5rem" v-else-if="showCategories">
          <QScrollArea style="width: 100%; height: 90vh">
            <LazyCategories @redirect="toggleMobileDrawerAndSubMenu" />
          </QScrollArea>
        </div>
        <div class="container mx-auto mt-2.5rem" v-else-if="showBlogCategories">
          <QScrollArea style="width: 100%; height: 90vh">
            <LazyBlogCategories @redirect="toggleMobileDrawerAndSubMenu" />
          </QScrollArea>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate";
import { links } from "@/layouts/links";

import { navigateToProfileOnlyIfUserIsLoggedIn } from "@/utils/Navigations-Utils";
import { useDark } from "@vueuse/core";

defineProps<{
  drawer: boolean;
}>();

const dark = useDark();

const showSubMenu = ref(false);

const showCategories = ref(false);

const showBlogCategories = ref(false);

const currentuser = useAuthStore().user;

const aside = ref();

const emit = defineEmits(["close", "redirect"]);

const userDisplayName = ref("کاربر مهمان");

function toggleMobileDrawerAndSubMenu() {
  showSubMenu.value = false;
  emit("close");
}

onMounted(() => {
  if (!currentuser || Object.keys(currentuser).length < 1) return;
  userDisplayName.value = currentuser.firstname + " " + currentuser?.lastname;
});

const store = useGlobalStore();
</script>
<style scoped>
.expand-leave-active,
.expand-enter-active {
  transition: all 500ms linear;
  overflow: hidden !important;
}

.expand-enter-to,
.expand-leave-from {
  height: 100dvh;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}
</style>
