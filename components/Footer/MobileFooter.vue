<script setup lang="ts">
import { SiteDetails } from "@/constant/SiteDetails";
import { links } from "@/layouts/links";
</script>
<template>
  <footer class="text-xs relative !mt-auto text-center footer mt-auto">
    <QCard class="bg-background-primary relative !rounded-t-2.5rem px-lg pt-lg">
      <UpwardAngle />

      <div class="flex py-sm gap-2">
        <div
          v-for="(link, idx) in links.filter((link) => !link.query)"
          :key="link.name"
          class="basis-48%"
          :class="{ 'span-border': idx % 2 === 0 }"
        >
          <NuxtLink class="f-text-12-16 pt-3" :to="link.route">{{
            link.name
          }}</NuxtLink>
        </div>
      </div>

      <q-separator class="!my-4 text-text-secondary" />
      <div class="flex gap-3 py-lg justify-center">
        <InstagramIconLink />
        <YoutubeIconLink />
        <TelgramIconLink />
      </div>
      <q-separator class="!my-2" />
      <!-- Bottom Part Of The Footer Section -->
      <div class="flex flex-col !gap-3 py-xs text-text-secondary">
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
      <q-separator class="!my-2" />

      <span class="block text_sm mt-lg">
        تمامی حقوق مادی و معنوی برای چیتس گیم محفوظ است
      </span>
    </QCard>
  </footer>
</template>
<style scoped>
.span-border {
  padding-inline: 24px;
  border-inline-end: 1px solid #ffffff4d;
}
.span-border:last-child {
  border-inline-end: none;
}

.footer {
  display: block;
}

@media screen and (width > 900px) {
  .footer {
    display: none;
  }
}
</style>
<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
