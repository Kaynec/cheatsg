<script setup lang="ts">
import {
  apiUserAddressListUserRetrieve,
  apiUserCreateAddressCreate,
  type AddressDetailInPut,
  type AddressDetailOutPut,
  apiUserAddressDetailDestroy,
  type AddressListOutPut,
} from "@/api";
import OutlinedButton from "../OutlinedButton.vue";

const currentActiveAddressId = ref();

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

const showEditAddress = ref(false);
const changeCurrentAddress = (address: AddressDetailInPut) => {
  currentAddress.value = address;
  showEditAddress.value = true;
};

const { data: address } = useAsyncData(
  "address",
  async () =>
    (await apiUserAddressListUserRetrieve()) as unknown as AddressDetailOutPut[]
);

function deleteAddress(address: AddressListOutPut) {
  apiUserAddressDetailDestroy(address.id).then((res) => {
    toast.success(res.message);
    refreshNuxtData("address");
  });
}
</script>
<template>
  <QCard class="px-sm pb-xs bg-background-primary shadow-none">
    <EditAddress
      v-model="showEditAddress"
      :address="currentAddress"
      :key="currentAddress?.id"
    />
    <div class="flex items-center justify-between w-full pa-sm gap-2">
      <div class="flex gap-2 items-center">
        <div class="space-y-2">
          <span class="text-xl text-text-primary">انتخاب آدرس</span>
        </div>
      </div>
      <OutlinedButton @click="resetCurrentAddress()">
        افزودن آدرس جدید
      </OutlinedButton>
    </div>
    <section
      v-if="!!address?.length"
      class="border-1 rounded-lg py-sm border-border-primary space-y-3 text-text-secondary"
    >
      <div
        v-for="addres in address"
        class="flex justify-between px-1 gap-1 items-center"
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
    </section>
  </QCard>
</template>
