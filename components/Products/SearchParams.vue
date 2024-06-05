<template>
  <div class="flex flex-col !flex-nowrap w-full gap-3 col-span-4 lg:col-span-1">
    <QInput
      outlined
      v-model="model.search"
      :label="`جستجو ${model.labelName}`"
      class="z-3"
      rounded
      bgColor="background-primary"
    >
      <template v-slot:append>
        <div class="i-carbon:search text-blue-9" />
      </template>
    </QInput>
    <q-list
      bordered
      class="rounded-24px bg-background-primary pa-lg text-text-primary"
    >
      <div class="flex justify-between">
        <span>فیلترها</span>

        <ClientOnly>
          <QBtn v-if="$q.screen.width < 768" flat @click="emit('close')">
            <div class="i-carbon:close-filled w-8 h-8 bg-red"></div>
          </QBtn>
        </ClientOnly>
      </div>
      <!-- <q-separator class="!my-sm" /> -->

      <q-expansion-item
        expand-separator
        label="بر اساس برند"
        :default-opened="Boolean(model?.brands?.length)"
        v-if="model.hasOwnProperty('brands')"
        :key="model.brands?.length"
      >
        <q-card class="bg-background-primary">
          <q-card-section class="flex flex-col">
            <QCheckbox
              :label="filter.name"
              v-for="filter in model.brands"
              :key="filter.name"
              v-model="filter.value"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        :label="`بر اساس نوع ${model.labelName}`"
        :default-opened="Boolean(model?.categories?.length)"
        v-if="model.hasOwnProperty('categories')"
        :key="model.categories?.length"
      >
        <q-card class="bg-background-primary">
          <q-card-section class="flex flex-col">
            <QCheckbox
              :label="filter.name"
              v-for="filter in model.categories"
              :key="filter.name"
              v-model="filter.value"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div
        class="flex flex-col !my-lg"
        v-if="
          model.hasOwnProperty('is_exists') &&
          model.hasOwnProperty('has_discount')
        "
      >
        <SwitchComponent label="فقط کالاهای موجود" v-model="model.is_exists" />
        <q-separator class="!my-lg" />
        <div class="flex justify-between">
          <SwitchComponent
            v-model="model.has_discount"
            label="کالای های تخفیف دار"
          />
        </div>
      </div>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import type { CategoryOutPutWithSelected, BrandWithSelected } from "@/types";

const emit = defineEmits(["close"]);

const model = defineModel<{
  search: string;
  is_exists?: boolean;
  has_discount?: boolean;
  categories?: CategoryOutPutWithSelected[];
  brands?: BrandWithSelected[];
  labelName?: string;
}>({ required: true });

if (!model.value.labelName) {
  model.value.labelName = "محصول";
}
</script>
