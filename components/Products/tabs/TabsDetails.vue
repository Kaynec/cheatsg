<script setup lang="ts">
import type { ProudctOutPut } from "@/api";

const { data } = defineProps<{ data: ProudctOutPut }>();

export interface Spec {
  id: string;
  feature: Feature;
  value: string;
}
export interface Feature {
  name: string;
  category: Category;
}
export interface Category {
  name: string;
}

const specs = (data as any).valueslist as Spec[];

const categories = ref<any[]>([]);

const newCategories = ref<any[]>([]);

for (let spec of specs) {
  const name = spec.feature.category.name;
  categories.value.push(name);
}

// Filter in the array

categories.value = [...new Set(categories.value)];

for (let cat of categories.value) {
  const name = cat;
  newCategories.value.push({
    name,
    children: specs
      .filter((spec) => spec.feature.category.name === name)
      .map((el) => ({
        name: el.feature.name,
        value: el.value,
      })),
  });
}
</script>

<template>
  <div class="flex flex-col items-start mb-3xl" v-for="cat in newCategories">
    <span class="text-primary pb-lg text-xl">
      {{ cat.name }}
    </span>
    <SmallDetail
      v-for="child in cat.children"
      :label="child.name"
      :desc="child.value"
    />
  </div>
</template>
