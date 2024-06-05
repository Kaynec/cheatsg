<script setup lang="ts">
import {
  apiUserAddressDetailDestroy,
  type AddressDetailInPut,
  type AddressDetailOutPut,
  type AddressListOutPut,
} from "@/api";

defineProps<{
  address: AddressDetailOutPut[];
}>();

const emit = defineEmits(["done"]);

const currentActiveAddressId = defineModel<number>();

const showEditAddress = ref(false);

const changeCurrentAddress = (address: AddressDetailInPut) => {
  currentAddress.value = address;
  showEditAddress.value = true;
};

const currentAddress = ref<AddressDetailInPut>();
function resetCurrentAddress() {
  currentAddress.value = {
    address_detail: "",
    city: "",
    postal_code: "" as any,
    province: "",
  };
  showEditAddress.value = !showEditAddress.value;
}

const toast = useToast();

function deleteAddress(address: AddressListOutPut) {
  apiUserAddressDetailDestroy(address.id).then((res) => {
    toast.success(res.message);
    refreshNuxtData("address");
  });
}
</script>
<template>
  <section>
    <EditAddress
      v-model="showEditAddress"
      :address="currentAddress!"
      :key="currentAddress?.id"
    />

    <span class="text-xl text-text-primary">انتخاب آدرس</span>
    <div class="flex items-center justify-between w-full pa-sm gap-2">
      <OutlinedButton @click="resetCurrentAddress()">
        افزودن آدرس جدید
      </OutlinedButton>
    </div>
    <div
      v-if="!!address?.length"
      class="rounded-lg py-sm space-y-3 text-text-secondary"
    >
      <div
        v-for="addres in address"
        class="flex justify-between items-center"
        :class="{ 'text-primary': addres.id === currentActiveAddressId }"
      >
        <QRadio
          v-model="currentActiveAddressId"
          :val="addres.id"
          :label="addres.address_detail"
          class="text-xs"
        />
        <div class="flex pe-4">
          <QBtn flat @click="deleteAddress(addres)">
            <span> حذف آدرس </span>
            <TrashCan
              class="fill-text-secondary"
              :class="{
                'fill-primary': addres.id === currentActiveAddressId,
              }"
            />
          </QBtn>
          <QBtn
            flat
            class="inline-flex gap-2 text_sm items-center"
            @click="changeCurrentAddress(addres)"
          >
            <span>ویرایش آدرس</span>
            <CurvedLeftArrow
              class="stroke-text-secondary"
              :class="{
                'stroke-primary': addres.id === currentActiveAddressId,
              }"
            />
          </QBtn>
        </div>
      </div>
      <!--  -->
      <div class="w-full text-center">
        <OutlinedButton
          color="primary"
          @click="emit('done')"
          class="gap-2 text_sm items-center max-w-50 !py-2"
        >
          <span>ثبت آدرس فعلی</span>
        </OutlinedButton>
      </div>
    </div>
  </section>
</template>
