<template>
  <QCard
    class="bg-background-primary px-4 py-6 shadow-none rounded-xl border-1 border-primary"
  >
    <div class="flex items-start gap-6 justify-center">
      <section
        class="rounded-lg lg:basis-12rem bg-background-secondary border-1px border-solid border-#303030 pa-sm"
      >
        <NuxtImg class="w-full h-full" :src="image" loading="lazy" />
      </section>
      <section class="flex flex-col grow">
        <div
          class="mt-auto min-h-25 flex flex-col justify-between grow items-start ps-3"
        >
          <span class="pb-3 f-text-13-20 translate-x-3">
            {{ name }}
          </span>
          <span class="text-text-secondary relative f-text-10-13">
            <Bullet
              class="absolute -start-3 fill-primary shadow-2xl top-1/2 !rounded-full bg-primary w-1.25 h-1.25"
            />
            قیمت محصول :
            <span class="text-text-primary">
              {{ formatPrice(price) }} تومان
            </span>
          </span>
        </div>
        <div class="grid grid-cols-2 lg:flex-row pt-3xl gap-1.5 items-center">
          <div class="w-full">
            <OutlinedButton
              @click="removeFromFavurite"
              label="حذف"
              color="red"
              class="border-negative flex items-center !rounded-2xl !w-full h-12 justify-center !p-0 md:max-w-65"
            >
              <TrashCan class="stroke-negative fill-red" />
            </OutlinedButton>
          </div>
          <!-- Showing Two Seperate Buttons based on their availablee status -->
          <div class="w-full" v-if="notAvailable">
            <button
              class="h-11 w-full relative justify-center !p-0 !rounded-2xl custom-bg flex items-center gap-1"
            >
              <div
                class="absolute bg-primary-light rounded-es-xl rounded-ee-xl rounded-ss-xl rounded-es-xl rounded-se-lg inset-0 t"
              ></div>
              <div class="i-carbon-warning bg-#FFCE20 text-xl" />
              عدم موجودی
            </button>
          </div>
          <div class="w-full" v-else>
            <PrimaryButton
              @click="navigateToProperProductPage(id)"
              class="!h-12 !w-full !p-0 !rounded-2xl text-xs"
            >
              <div class="flex justify-center items-center">
                <Bag class="fill-white" />
                <span> افزودن به سبد خرید </span>
              </div>
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  </QCard>
</template>

<script setup lang="ts">
import { apiUserRemoveFavoriteProductDestroy } from "@/api";
import { formatPrice } from "@/api/basket-helper";
import defaultImage from "@/assets/home_imgs/cards/controller-big.png";

const toast = useToast();

const props = defineProps<{
  name: string;
  price: number;
  discount: number;
  discountCode: string;
  image?: string;
  notAvailable?: boolean;
  id: number;
}>();

const emit = defineEmits(["refresh-items"]);

const getImg = computed(() => props.image ?? defaultImage);

function removeFromFavurite() {
  apiUserRemoveFavoriteProductDestroy(props.id).then((r) => {
    const res = r as unknown as { message: string };
    if (!res) return;
    toast.success(
      res?.message ?? "محصول مورد نظر از علاقه مندی های شما حذف شد"
    );
  });
}
</script>
<style scoped>
.custom-bg {
  background: url("@/assets/gradient-button.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.card-with-border {
  position: relative;
  z-index: 999;
}

.card-with-border::before {
  content: "";
  position: absolute;
  border-bottom-left-radius: 1rem;
  left: 0;
  bottom: 0;
  width: 35%;
  height: 75%;
  background: linear-gradient(
    to bottom,
    #74a1d2ad,
    #4f94deac,
    #4262859b,
    #163250ae
  );
  z-index: -1;
}

.card-with-border::after {
  content: "";
  position: absolute;
  border-bottom-left-radius: 1rem;
  left: 1px;
  bottom: 1px;
  width: 40%;
  height: 75%;
  background: inherit;
  z-index: -1;
}

.left-border {
  position: absolute;
  right: 0;
  top: 0;
  width: 40%;
  height: 75%;

  background: linear-gradient(
    to bottom,
    #74a1d276,
    #4f94deac,
    #4262859b,
    #163250ae
  );
  z-index: -1;
}
.left-border-overlay {
  content: "";
  position: absolute;
  border-top-right-radius: 1rem;
  width: 40%;
  height: 75%;
  background: inherit;
  right: 1px;
  top: 1px;
  z-index: -1;
}
</style>
