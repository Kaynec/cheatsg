<template>
  <ClientOnly>
    <div v-if="cat?.children?.length">
      <span class="text-text-primary text-xl text-header text-primary">{{
        cat.label
      }}</span>
      <QTree
        :nodes="cat.children"
        no-connectors
        node-key="label"
        class="text-text-primary"
        ref="tree"
        dense
        :duration="250"
        icon=""
      >
        <template #default-header="{ node }">
          <QBtn
            flat
            @click="navigate(node, node.children, type)"
            class="text-text-secondary shadow-none"
            >{{ node.label }}</QBtn
          >
        </template>
      </QTree>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
defineProps<{
  type: "BLOG" | "PRODUCT";
  cat: {
    children: any[];
    label: string;
  };
}>();

const tree = ref();

const emit = defineEmits(["redirect"]);

function navigate(node: any, children: any[], type: "BLOG" | "PRODUCT") {
  if (type === "BLOG") {
    navigateTo({
      name: "Blog",
      query: {
        category_id: node.id,
      },
    });
    return emit("redirect");
  } else {
    navigateCategoryFN(node, emit);
  }
}
</script>
