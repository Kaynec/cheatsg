<template>
  <q-dialog v-model="showEditAddress">
    <q-card class="shadow-none pa-xs w-full max-w-210">
      <q-card-section class="flex items-center gap-3">
        <button
          class="i-carbon-arrow-right text-lg"
          @click="showEditAddress = !showEditAddress"
        />
        <div class="text-h6">جزییات آدرس</div>
        <button
          class="i-carbon-close ms-auto text-lg"
          @click="showEditAddress = !showEditAddress"
        />
      </q-card-section>

      <q-separator class="my-3" />

      <q-card-section class="mt-xl">
        <QForm class="space-y-4" @submit.prevent="submitAddresChanges">
          <QInput
            type="text"
            label="کد پستی"
            bgColor="background-secondary"
            outlined
            class="!rounded-full"
            :input-style="inputStyles"
            v-model="model.postal_code"
          />
          <QInput
            type="textarea"
            label="آدرس"
            bgColor="background-secondary"
            outlined
            class="!rounded-full"
            :input-style="inputStyles"
            v-model="model.address_detail"
            autogrow
          />
          <QSelect
            type="textarea"
            label="استان"
            bgColor="background-secondary"
            outlined
            class="!rounded-full"
            :input-style="inputStyles"
            v-model="model.province"
            autogrow
            :options="provinces"
            option-label="name"
            option-value="id"
          />
          <QSelect
            type="textarea"
            label="شهر"
            bgColor="background-secondary"
            outlined
            class="!rounded-full"
            :input-style="inputStyles"
            v-model="model.city"
            autogrow
            :options="getCities"
            option-label="name"
            option-value="id"
          />
          <PrimaryButton type="submit"> ثبت تغییرات </PrimaryButton>
        </QForm>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import provinces from "@/constant/provinces.json";
import cities from "@/constant/cities.json";
import {
  apiUserAddressDetailUpdate,
  apiUserCreateAddressCreate,
  type AddressDetailInPut,
} from "@/api";
import { useVModel } from "@vueuse/core";
const props = defineProps<{
  address: AddressDetailInPut & { id?: number };
  modelValue: boolean;
}>();

const getCities = computed(() => {
  const provinceId = (model.value.province as any)?.id ?? model.value.province;
  return cities.filter((city) => city.province_id === provinceId) ?? [];
});

const emit = defineEmits(["update:modelValue"]);

const showEditAddress = useVModel(props, "modelValue", emit);

const model = ref({ ...props.address });

function closeTheDialog() {
  showEditAddress.value = false;

  refreshNuxtData("address");
}

async function submitAddresChanges() {
  const objectToSend = { ...model.value };
  objectToSend.city = (model.value.city as any)?.name ?? model.value.city;
  objectToSend.province =
    (model.value.province as any)?.name ?? model.value.province;

  if (model.value?.id) {
    // Update Address
    apiUserAddressDetailUpdate(model.value.id, objectToSend).finally(() =>
      closeTheDialog()
    );

    return;
  }
  // Create Address
  apiUserCreateAddressCreate(objectToSend).finally(() => closeTheDialog());
}
</script>

<style scoped>
:deep(.q-field--outlined .q-field__control:before) {
  border: 0 solid #cccccc41;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
