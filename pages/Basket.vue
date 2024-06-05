<script setup lang="ts">
import type { CardItems } from "@/types";
import {
  apiShopCartItemListRetrieve,
  apiShopSubmitOrderCreate,
  type OrderOutPut,
} from "@/api";
import { formatPrice } from "@/api/basket-helper";

useSeoMeta({
  title: "Cheats  - basket page",
  ogTitle: "Cheats  - basket page",
  description: "سبد خرید",
  ogDescription: "سبد خرید",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "سبد خرید",
    to: "",
  },
]);
const { data: cardItems, pending: cardItemsPending } = useAsyncData(
  "card-items",
  async () => (await apiShopCartItemListRetrieve()) as unknown as CardItems,
  {
    default() {
      return [];
    },
  }
);

const suggestions = computed(() => {
  const total = [];

  for (let curr of cardItems.value)
    if (curr.product.suggestions) total.push(curr.product.suggestions);

  return total;
});

const computedPropriesDeriviedFromCardItems = computed(() => {
  const total_off_price = cardItems.value
    .map((el) => Number(el.price ?? el.product.off_price ?? el.product.price))
    .reduce((total, curr) => +(total += curr), 0);
  const total_price = cardItems.value
    .map((el) => Number(el.price ?? el.product.price))
    .reduce((total, curr) => +(total += curr), 0);

  const profitFromPurchase = total_price - total_off_price;
  return {
    total_price,
    profitFromPurchase,
    total_off_price,
  };
});

const toast = useToast();

async function submitBasketItems() {
  try {
    const res = (await apiShopSubmitOrderCreate()) as any as OrderOutPut[];
    if (res.length) {
      navigateTo({
        name: "BasketDateSelect",
        query: {
          id: res[0].id,
          is_game: `${res[0].is_game!}`,
        },
      });
    }
  } catch (error) {
    console.warn(error);
  }

  // if (cardItems.value.length <= 0) {
  //   toast.error('سبد خرید شما خالی است')
  //   return
  // }
}

// const img = useImage();
// const backgroundStyles = computed(() => {
//   const imgUrl = img("/images/shop/background.svg", { format: "webp" });
//   return { backgroundImage: `url('${imgUrl}')` };
// });
</script>
<template>
  <div class="container mx-auto mb-5xl">
    <div class="row q-col-gutter-md">
      <div class="col-12 flex flex-col gap-4">
        <BasketStepper :currentActiveIndex="0" />
      </div>

      <div class="col-12 col-lg-9 flex flex-col gap-4">
        <!-- Reccomended Stuff -->
        <OurReccomendedPackage :products="suggestions" />
        <!-- Actual Basket -->
        <QCard class="min-h-36 bg-background-primary">
          <QInnerLoading :showing="cardItemsPending" />
          <QCardSection>
            <span>
              سبد خرید شما
              <span
                class="!rounded-full inline-flex items-center justify-center w-10 h-10 bg-primary aspect-1 text-text-primary"
              >
                {{ cardItems?.length }}
              </span>
            </span>
          </QCardSection>
          <BasketItems
            v-for="(item, index) in cardItems"
            :key="item.product.id"
            :id="item.id"
            :addSeperator="index !== (cardItems?.length ?? 0) - 1"
            :item="item.product"
            :attachments="(item as any).attachment"
          />
        </QCard>
        <!--  -->
      </div>
      <div class="col-12 col-lg-3">
        <QCard
          class="full q-pa-md flex flex-col gap-6 !rounded-2xl bg-background-primary"
        >
          <div
            class="flex flex-col gap-3 full-width items-start justify-end text-text-secondary"
          >
            <!-- <div class="flex gap-2 items-center">
              <Comment class="fill-gray" />
              ۳۵ نظر ثبت شده
            </div> -->
            <div class="flex gap-2 items-center">
              <Badge class="fill-gray" />
              گارانتی اصالت و سلامت فیزیکی کالا
            </div>
            <div class="flex gap-2 items-center">
              <ShipmentExpress class="fill-gray" />
              ارسال تا ۷ روز کاری آینده
            </div>
          </div>
          <!--  -->
          <q-separator />

          <div class="flex justify-between">
            <span>قیمت اصلی کالاها ({{ cardItems.length }})</span>
            <span>
              {{
                formatPrice(computedPropriesDeriviedFromCardItems.total_price)
              }}
              <strong class="text-text-secondary">تومان</strong>
            </span>
          </div>
          <div class="flex justify-between">
            <span>جمع سبد خرید شما</span>
            <span>
              {{
                formatPrice(
                  computedPropriesDeriviedFromCardItems.total_off_price
                )
              }}
              <strong class="text-text-secondary">تومان</strong>
            </span>
          </div>
          <div
            class="flex justify-between"
            v-if="computedPropriesDeriviedFromCardItems.profitFromPurchase"
          >
            <span>سود شما از این خرید</span>
            <span class="text-text-price">
              {{
                formatPrice(
                  computedPropriesDeriviedFromCardItems.profitFromPurchase
                )
              }}
              <strong class="text-text-secondary">تومان</strong>
            </span>
          </div>

          <q-separator />

          <div class="flex justify-between">
            <span> قیمت کل: </span>
            <span>
              {{
                formatPrice(
                  computedPropriesDeriviedFromCardItems.total_off_price
                )
              }}
              <strong class="text-text-secondary">تومان</strong>
            </span>
          </div>
          <PrimaryButton @click="submitBasketItems"> ثبت سفارش</PrimaryButton>
        </QCard>
      </div>
    </div>
    <SpecialOffer class="!my-lg" />
  </div>
</template>
