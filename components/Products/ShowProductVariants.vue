<template>
  <QDialog v-model="showDialog" maximized rounded>
    <main
      class="flex overflow-auto flex-nowrap flex-col relative pointer-events-auto gap-8 !w-92vw !rounded-1rem pa-lg !max-w-240 !h-90vh !max-h-190 bg-background-primary"
    >
      <QBtn class="absolute end-0 top-3" flat @click="showDialog = false">
        <div class="i-carbon:close-filled w-8 h-8"></div>
      </QBtn>

      <span class="text-h5">
        <span>جزئیات نوع {{ label }} محصول</span>
      </span>

      <div class="max-h-30rem w-full flex flex-col gap-4">
        <button
          @click="selectedInsuranceOrCapacity = attachment"
          v-for="attachment in attachments"
          class="p-3 bg-background-secondary !rounded-lg my-2 !min-h-30 !w-full"
          :class="{
            '!border-1 border-primary !border-solid':
              selectedInsuranceOrCapacity?.id === attachment.id,
            'border-1 border-transparent !border-solid':
              selectedInsuranceOrCapacity?.id !== attachment.id,
          }"
        >
          <div class="grid grid-cols-4 flex-nowrap items-start w-full">
            <p class="text_xl text-start col-span-3 py-2 break-words">
              {{ attachment.title }}
            </p>
            <strong class="text-primary whitespace-nowrap text_xl pt-2">
              {{ formatPrice(attachment.price) }} تومان
            </strong>
          </div>
          <p class="text_md text-start">
            {{ attachment.description }}
          </p>
        </button>
      </div>

      <section class="mt-auto space-y-4">
        <p
          class="text-warning text_xl"
          v-if="product_type === ProductTypes.GAME"
        >
          در انتخاب دو‌ظرفیت متفاوت به صورت همزمان این نکته را مورد توجه قرار
          دهید که بازی های با ظرفیت آفلاین(یک) در صورت اتصال به اینترنت( که در
          بازی های ظرفیت دو بلامانع است) از دسترس خارج شده و برای اجرای مجدد
          نیاز به خریداری و نصب مجدد دارند. بنابراین بهتر است در هر نوبت نصب
          بازی، تمام بازی ها دارای ظرفیت یکسان باشند
        </p>
        <PrimaryButton @click="emitUpdateAndCloseDialog">
          افزودن به سبد خرید
        </PrimaryButton>
      </section>
    </main>
  </QDialog>
</template>

<script setup lang="ts">
import { ProductTypeEnum } from "@/api";
import { formatPrice } from "@/api/basket-helper";
import { ProductTypes, type Attachment } from "@/types";

const showDialog = defineModel({ default: false });
const { attachments, product_type } = defineProps<{
  attachments: Attachment[];
  product_type: ProductTypeEnum;
  label: string;
}>();

const emit = defineEmits(["update"]);

const selectedInsuranceOrCapacity = ref<{ id: string }>();

function emitUpdateAndCloseDialog() {
  emit("update", selectedInsuranceOrCapacity.value);
  showDialog.value = false;
}

const toast = useToast();

// Check if typeof product is game then make sure we don't have a different variant in basket already

//  const gameIsDuplicate = ref(false)
// async function checkForDuplicates(
//   data: ProductDetailOutPut,
//   selectedAttachments: string
// ) {
//   const items =
//     (await apiShopCartItemListRetrieve()) as unknown as CartItemListOutPut[];

//     return items.some((el) => el.product.id === data.id);

//   // if (item) {
//   //   toast.info(
//   //     ``,
//   //     {
//   //       timeout: false,
//   //       position: POSITION.TOP_CENTER,
//   //     }
//   //   );
//   // }
// }

// if (product_type === ProductTypes.GAME) {
//   checkForDuplicates(data)
// }
</script>

<style scoped></style>
