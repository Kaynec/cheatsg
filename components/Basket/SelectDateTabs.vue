<script setup lang="ts">
import type { DeliveryScheduleDetailOutPut } from "@/api";

const days = defineModel({ default: new Map(), required: true });
const selectedDate = defineModel<DeliveryScheduleDetailOutPut>("selectedDate");

const keys = [...days.value.keys()];

const currentTab = ref(keys?.[0] ?? "");
if (keys.length) {
  currentTab.value = keys[0];
}
</script>
<template>
  <div class="border-1 border-border-primary rounded-1rem q-pb-lg">
    <q-tabs
      v-model="currentTab"
      content-class="text-text-primary custom"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        :name="date"
        :label="new Date(date).toLocaleDateString('fa-Fa')"
        v-for="date in days.keys()"
        :key="date"
      >
      </q-tab>
    </q-tabs>

    <q-separator />
    <q-tab-panels class="bg-background-primary" v-model="currentTab" animated>
      <q-tab-panel v-for="date in days.keys()" :name="date" :key="date">
        <ScrollSlider class="">
          <div
            v-for="subDate in days.get(date).hours"
            :key="subDate.date"
            class="col-12"
          >
            <button
              flat
              @click="selectedDate = subDate"
              class="p-2 bg-gray-700 border-1 border-solid border-border-primary !rounded-lg"
              :class="{ 'bg-primary': selectedDate?.id === subDate.id }"
            >
              <QCard
                class="shadow-0 rounded-lg !bg-transparent flex flex-col items-center justify-center gap-6 py-3"
              >
                <span>
                  از
                  {{
                    new Date(subDate.start).toLocaleDateString("fa", {
                      year: "numeric",
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </span>
                <span>
                  تا
                  {{
                    new Date(subDate.end).toLocaleDateString("fa", {
                      year: "numeric",
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </span>
              </QCard>
            </button>
          </div>
        </ScrollSlider>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style lang="scss">
.custom {
  border-top-right-radius: 1rem !important;
  border-top-left-radius: 1rem !important;
  background: $background-secondary !important;
}
</style>
