<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate";
import {
  apiUserAddressListUserRetrieve,
  apiShopDeliveryScheduleListRetrieve,
  type AddressDetailInPut,
  type AddressDetailOutPut,
  ApiShopDeliveryScheduleListRetrieveType,
  type DeliveryScheduleListOutPut,
  apiShopBookTimeCreate,
  apiShopDeliveryTypeListRetrieve,
  type DeliveryTypeListOutPut,
  apiIssueIssueReportDetailUpdate,
} from "@/api";
import { formatISO } from "date-fns-jalali";
useSeoMeta({
  title: "Cheats  - repair page register",
  ogTitle: "Cheats  - repair page register",
  description: "سبد خرید - انتخاب تاریخ",
  ogDescription: "سبد خرید - انتخاب تاریخ",
});

const router = useRouter();

const id = router.currentRoute.value.query.id!;

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "تعمیرات",
    to: "Repair",
  },
  {
    label: "ثبت نوبت",
    to: "",
  },
]);

const { data: address } = useAsyncData(
  "address",
  async () =>
    (await apiUserAddressListUserRetrieve()) as unknown as AddressDetailOutPut[],
  {}
);

const currentDate = new Date();

currentDate.setDate(currentDate.getDate() + 1);

const days = ref(new Map());

const { data: schedule } = useAsyncData(
  "schedule",
  async () =>
    (await apiShopDeliveryScheduleListRetrieve({
      type: ApiShopDeliveryScheduleListRetrieveType.NUMBER_1,

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
          days.value.set(
            startDate,

            {
              hours: [...days.value.get(startDate).hours, curr],
            }
          );
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

const currentActiveAddressId = ref();

const currentAddress = ref<AddressDetailInPut & { id?: number }>();

const showEditAddress = ref(false);

const selectedDate = ref();

const toast = useToast();

const { data: deliveryTypes } = useAsyncData(
  "deliveryTypes",
  async () =>
    (await apiShopDeliveryTypeListRetrieve()) as unknown as DeliveryTypeListOutPut[],
  {
    default() {
      return [];
    },
    transform(data) {
      // SIDE 1 MEANS RECIVE FROM USER , LIKE REPAIR STUFF
      return data.filter((el) => el.side === 1);
    },
  }
);

const currentDeliveryMethod = ref<number>();

async function submitNobat() {
  if (!selectedDate.value) return toast.error("لطفا تاریخ انتخاب کنید");
  if (!currentAddress.value) return toast.error("لطفا آدرس انتخاب کنید");
  if (!currentDeliveryMethod.value)
    return toast.error("لطفا نحوه ارسال را انتخاب کنید");

  try {
    const bookTimeResp = await apiShopBookTimeCreate({
      address: currentAddress.value.id,
      schedule: selectedDate.value.id,
      type: currentDeliveryMethod.value,
    });

    if (!bookTimeResp) return;

    const issueReportUpdate = await apiIssueIssueReportDetailUpdate(id, {
      delivery_data: bookTimeResp.id,
    });
    if (!issueReportUpdate) return;
    router.push({
      name: "RepairDetail",
      query: {
        data: JSON.stringify(issueReportUpdate),
      },
    });
    toast.success("نوبت با موفقیت ثبت شد");
  } catch (error) {}
}
</script>
<template>
  <main class="container mx-auto mb-5xl">
    <!-- Edit Current Selected Address -->
    <EditAddress
      v-model="showEditAddress"
      :address="currentAddress!"
      :key="currentAddress?.id"
    />
    <!--  -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-lg-9 flex flex-col gap-4">
        <QCard v-auto-animate class="bg-background-secondary">
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
            <QBtn @click="currentAddress = undefined" flat>
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
        <QCard class="bg-background-secondary">
          <QCardSection>
            <span class="flex gap-2 text-lg items-center">
              <ShipmentExpress class="fill-primary" />
              انتخاب زمان

              <span class="text-text-secondary text-xs">
                (بازه‌های دارای ظرفیت اختصاصی برای اعضای دیجی‌پلاس)</span
              >
            </span>
          </QCardSection>
          <QCardSection>
            <SelectDateTabs
              v-model="days"
              :key="[...days.keys()].length"
              v-model:selectedDate="selectedDate"
            />
          </QCardSection>
        </QCard>
      </div>
      <div class="col-12 col-lg-3">
        <QCard
          class="bg-background-secondary full q-pa-md flex flex-col gap-6 !rounded-2xl"
        >
          <div
            class="flex flex-col gap-3 full-width items-start justify-end text-text-secondary"
          >
            <div class="flex gap-2 items-center">
              <Badge class="fill-gray" />
              گارانتی اصالت و سلامت فیزیکی کالا
            </div>
            <div class="flex gap-2 items-center">
              <ShipmentExpress class="fill-gray" />
              ارسال تا ۷ روز کاری آینده
            </div>
          </div>
          <q-separator />

          <div class="flex justify-between"></div>
          <PrimaryButton @click="submitNobat"> ثبت نوبت</PrimaryButton>
        </QCard>
      </div>
    </div>
  </main>
</template>
