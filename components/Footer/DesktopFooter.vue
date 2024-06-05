<script setup lang="ts">
import { SiteDetails } from "@/constant/SiteDetails";
import { inputStylesFN } from "@/constant/styles";
import { links } from "@/layouts/links";

const phone_number = ref("");

const showBottomSectionOfNavbar = ref(false);
</script>
<template>
  <div class="bg-transparent text-xs footer mt-auto">
    <QCard class="relative pb-8 !rounded-0 px-8xl bg-background-primary">
      <UpwardAngle />
      <div class="content flex flex-col">
        <!-- Logo And Top Part Of The Footer Section -->
        <div class="flex justify-between items-center">
          <div class="flex gap-3 justify-center py-3 items-center flex-1">
            <img
              src="@/assets/logo.png"
              class="relative max-w-20 mix-blend-difference"
              alt="foooter logo"
            />
          </div>

          <div class="flex gap-15">
            <template v-for="link in links" :key="link.name">
              <a
                class="f-text-8-12 text-text-primary span-border"
                :href="link.route"
                v-if="link.query?.isSubSection"
                >{{ link.name }}
              </a>
              <NuxtLink
                class="f-text-8-12 text-text-primary span-border"
                v-else
                :to="link.route"
                >{{ link.name }}</NuxtLink
              >
            </template>
          </div>
          <div class="!flex gap-3 justify-center py-3 items-center flex-1">
            <InstagramIconLink />
            <YoutubeIconLink />
            <TelgramIconLink />
          </div>
        </div>
        <q-separator class="!my-2 !xl:my-1 !2xl:my-0" />
        <!-- Bottom Part Of The Footer Section -->
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-2 text-text-primary">
            <div class="flex gap-1 items-center">
              <div class="text-lg i-carbon:phone text-primary" />
              {{ SiteDetails.phone_number }}
            </div>
            <div class="flex gap-1 items-center">
              <div class="text-lg i-ri-telegram-line text-primary" />
              @cheats_shop
            </div>
            <FooterAddress />
          </div>

          <span class="text_xs">
            تمامی حقوق مادی و معنوی برای چیتس گیم محفوظ است
          </span>
        </div>
      </div>
    </QCard>
  </div>
</template>
<style scoped>
.span-border {
  padding-inline-end: 24px;
  border-inline-end: 2px solid #ffffff4d;
}
.span-border:last-child {
  border-inline-end: none;
}

.footer {
  display: none;
}

@media screen and (width > 900px) {
  .footer {
    display: block;
  }
}
</style>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
