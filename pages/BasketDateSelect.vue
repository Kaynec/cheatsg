<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate";
import {
  apiUserAddressListUserRetrieve,
  apiShopDeliveryScheduleListRetrieve,
  type AddressDetailInPut,
  type AddressDetailOutPut,
  type DeliveryScheduleListOutPut,
  apiShopDeliveryTypeListRetrieve,
  type DeliveryTypeListOutPut,
  apiShopGetOrderDetailRetrieve,
  type OrderDetailCusotmerOutPut,
  type ProductDetailOutPut,
  apiShopBookTimeCreate,
  SideEnum,
  apiShopOrderDetailUpdate,
  type DeliveryDataInPut,
  apiShopCheckUserDiscountCodeCreate,
} from "@/api";
import { formatISO } from "date-fns-jalali";
import OutlinedButton from "@/components/OutlinedButton.vue";

type OrderWithProperProductData = Omit<
  OrderDetailCusotmerOutPut,
  "product_data"
> & {
  product_data: {
    product: ProductDetailOutPut;
  }[];
};

useSeoMeta({
  title: "Cheats  - repair page register",
  ogTitle: "Cheats  - repair page register",
  description: "سبد خرید - انتخاب تاریخ",
  ogDescription: "سبد خرید - انتخاب تاریخ",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "انتخاب تاریخ",
    to: "",
  },
]);

const router = useRouter();

const id = router.currentRoute.value.query.id?.toString();

const is_game = Boolean(router.currentRoute.value.query.is_game);

const { data: order } = useAsyncData(
  "order-detail",
  async () =>
    (await apiShopGetOrderDetailRetrieve(
      Number(id)
    )) as unknown as OrderWithProperProductData
);

const currentDate = new Date();

currentDate.setDate(currentDate.getDate() + 1);

// Available Days for buying Stuff
const days = ref(new Map());

const type = is_game ? SideEnum.NUMBER_1 : SideEnum.NUMBER_2;

useAsyncData(
  "schedule",
  async () =>
    (await apiShopDeliveryScheduleListRetrieve({
      type,
      from_date: formatISO(currentDate).split("T")[0],
      to_date: formatISO(
        currentDate.setMonth(currentDate.getMonth() + 1)
      ).split("T")[0],
    })) as unknown as DeliveryScheduleListOutPut[],
  {
    server: false,
    transform(data) {
      for (let curr of data) {
        const startDate = new Date(curr.start).toISOString().split("T")[0];

        if (days.value.has(startDate)) {
          days.value.set(startDate, {
            hours: [...days.value.get(startDate).hours, curr],
          });
          continue;
        }
        days.value.set(startDate, {
          hours: [curr],
        });
      }

      return data;
    },
  }
);

const { data: address } = useAsyncData(
  "address",
  async () =>
    (await apiUserAddressListUserRetrieve()) as unknown as AddressDetailOutPut[]
);

const currentActiveAddressId = ref();

const currentAddress = ref<AddressDetailInPut & { id?: number }>();

const showEditAddress = ref(false);

const selectedDate = ref();

const { data: deliveryTypes } = useAsyncData(
  "deliveryTypes",
  async () =>
    (await apiShopDeliveryTypeListRetrieve()) as unknown as DeliveryTypeListOutPut[],
  {
    default: () => [],
    // SIDE 1 MEANS RECIVE FROM USER , LIKE REPAIR STUFF

    transform: (data) =>
      data.filter((el) => {
        if (is_game) {
          return el.side === SideEnum.NUMBER_1;
        } else el.side === SideEnum.NUMBER_2;
      }),
  }
);

const currentDeliveryMethod = ref<number>();

const toast = useToast();

async function submitOrder() {
  if (!selectedDate.value) return toast.error("لطفا تاریخ انتخاب کنید");
  if (!currentAddress.value && !is_game)
    return toast.error("لطفا آدرس انتخاب کنید");
  if (!currentDeliveryMethod.value)
    return toast.error("لطفا نحوه ارسال را انتخاب کنید");

  if (!id) return;
  try {
    const booktimeRes = {
      schedule: selectedDate.value.id,
      type: currentDeliveryMethod.value,
    } as DeliveryDataInPut;

    if (!is_game && currentAddress.value?.id) {
      booktimeRes.address = currentAddress.value.id!;
    }

    const bookTimeResp = await apiShopBookTimeCreate(booktimeRes);
    if (!bookTimeResp) return;

    const issueReportBody: {
      schedule: number;
      discount?: string;
    } = {
      schedule: bookTimeResp.id,
    };

    if (discount.value) {
      issueReportBody.discount = discount.value;
    }

    const issueReportUpdate = await apiShopOrderDetailUpdate(
      +id,
      issueReportBody as any
    );
    if (!issueReportUpdate) return;
    toast.success("نوبت با موفقیت ثبت شد");
  } catch (error) {}
}

// // // // DISCOUNT
const discount = ref("");
const discountedPrice = ref(0);
function checkDiscount() {
  apiShopCheckUserDiscountCodeCreate({
    code: discount.value,
    total_price: (order.value?.total_price_discount ??
      order.value?.total_price)!,
  }).then((r) => {
    const res = r as any;
    if (res && res?.message) return toast.success("کد تخفیف صحیح است");
    else if (res?.error || !res.message)
      toast.error(res?.error ?? "کد تخفیف وارد شده اشتباه است یا منقظی است");
  });
}
</script>
<template>
  <main class="container mx-auto mb-5xl">
    <span v-if="!id"> محتوایی برای مشاهده وجود ندارد </span>
    <!--  -->
    <template v-else>
      <!-- Edit Current Selected Address -->
      <EditAddress
        v-model="showEditAddress"
        :address="currentAddress!"
        :key="currentAddress?.id"
      />
      <!--  -->
      <div class="row q-col-gutter-md">
        <div class="col-12 flex flex-col gap-4">
          <BasketStepper :currentActiveIndex="1" />
        </div>
        <div class="col-12 col-lg-9 flex flex-col gap-4">
          <!-- Select  Address -->
          <QCard v-auto-animate v-if="!is_game" class="bg-background-secondary">
            <!--  -->
            <QCardSection
              class="flex gap-5 flex-col"
              v-if="currentAddress === undefined"
            >
              <SelectAddress
                :address="address!"
                :currentActiveAddressId="currentActiveAddressId"
                v-model="currentActiveAddressId"
                @done="
                  currentAddress = address?.find(
                    (el) => el.id === currentActiveAddressId
                  )
                "
              />
            </QCardSection>
            <!--  -->

            <QCardSection v-else class="flex gap-5 flex-col">
              <span>آدرس تحویل سفارش</span>
              <div class="gap-2 flex items-center">
                <Location class="fill-primary" />
                {{ currentAddress?.address_detail }}
              </div>
              <QBtn
                aria-label="change address"
                @click="currentAddress = undefined"
                flat
              >
                <div class="w-full flex justify-between items-center">
                  <!-- <span class="text-text-secondary">بهراد قاسمی</span> -->
                  <span class="text-primary flex gap-1"
                    >تغییر یا ویرایش آدرس <AngleLeft class="fill-primary" />
                  </span>
                </div>
              </QBtn>
            </QCardSection>
          </QCard>

          <SelectDeliveryType
            :key="deliveryTypes?.length"
            v-model="deliveryTypes"
            v-model:currentDeliveryMethod="currentDeliveryMethod"
          />
          <!-- SelectDate  -->

          <QCard class="bg-background-secondary">
            <QCardSection
              class="flex gap-2 text-lg items-center text-text-primary"
            >
              <ShipmentExpress class="fill-primary" />
              کالاهای ارسالی
            </QCardSection>
            <QCardSection
              class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-lg"
            >
              <QCard
                v-for="item in order?.product_data"
                :key="item.product.id"
                class="bg-background-secondary flex flex-col gap-3 pa-sm items-center"
              >
                <NuxtImg
                  loading="lazy"
                  :src="item.product.main_image"
                  alt="controller-big.png"
                />
                <span class="text-text-primary">{{ item.product.title }}</span>
              </QCard>
            </QCardSection>

            <QCardSection>
              <span class="flex gap-2 text-lg items-center text-text-primary">
                <ShipmentExpress class="fill-primary" />
                انتخاب زمان ارسال

                <!-- <span class="text-text-secondary text-xs">
                  (بازه‌های دارای ظرفیت اختصاصی برای اعضای دیجی‌پلاس)</span
                > -->
              </span>
            </QCardSection>

            <SelectDateTabs
              v-model="days"
              :key="[...days.keys()].length"
              v-model:selectedDate="selectedDate"
            />
          </QCard>
        </div>
        <!--  -->
        <div class="col-12 col-lg-3 space-y-lg">
          <QCard
            class="bg-background-secondary text-text-primary full q-pa-md flex flex-col gap-6 !rounded-2xl"
          >
            <span class="flex gap-2 text-lg items-center text-text-primary">
              ثبت کد تخفیف
            </span>

            <QInput type="text" v-model="discount" label="کد تخفیف" outlined />

            <div class="flex gap-2">
              <OutlinedButton @click="checkDiscount" class="flex-1 h-10 !p-0">
                چک کردن کد</OutlinedButton
              >
            </div>
          </QCard>
          <QCard
            class="bg-background-secondary text-text-primary full q-pa-md flex flex-col gap-6 !rounded-2xl"
          >
            <div class="flex justify-between">
              <span>قیمت کالاها ({{ order?.product_data.length }})</span>
              <span>
                {{ order?.total_price_discount ?? order?.total_price }}
                <strong class="text-text-secondary">تومان</strong>
              </span>
            </div>
            <div class="flex justify-between">
              <span>جمع سبد خرید شما</span>
              <span>
                {{ order?.total_price }}
                <strong class="text-text-secondary">تومان</strong>
              </span>
            </div>
            <div class="flex justify-between">
              <span>سود شما از این خرید</span>
              <span class="text-text-price">
                {{
                  Number(order?.total_price) -
                  Number(order?.total_price_discount ?? order?.total_price)
                }}
                <strong class="text-text-secondary">تومان</strong>
              </span>
            </div>

            <q-separator />

            <div class="flex justify-between">
              <span> قیمت کل: </span>
              <span>
                {{ order?.total_price_discount }}
                <strong class="text-text-secondary">تومان</strong>
              </span>
            </div>
            <PrimaryButton @click="submitOrder"> ثبت سفارش</PrimaryButton>
          </QCard>
        </div>
      </div>
    </template>
  </main>
</template>
