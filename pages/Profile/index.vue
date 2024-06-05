<template>
  <div
    class="!overflow-hidden mb-4xl grid grid-cols-1 lg:grid-cols-3 !p-0 !items-stretch gap-3"
  >
    <TabSelect :icons="icons" v-model="userTab" />
    <div class="lg:col-span-2">
      <div v-auto-animate class="flex-1 !shadow-none pb-lg">
        <LazyUserInformation v-if="userTab === 'UserInformation'" />
        <LazyUserPasswordReset v-else-if="userTab === 'UserPasswordReset'" />
        <LazyUserLocation v-else-if="userTab === 'Location'" />
        <LazyUserDiscount v-else-if="userTab === 'Discount'" />
        <LazyUserNotification v-else-if="userTab === 'Notification'" />
        <LazyUserFavourite v-else-if="userTab === 'Favourite'" />
        <LazyUserPurchaseHistory v-else-if="userTab === 'PurchaseHistory'" />
        <LazyUserRepairHistory v-else-if="userTab === 'RepairHistory'" />
        <LazyUserGameHistory v-else-if="userTab === 'GameServiceHistory'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate";
let mobileTabDialog = ref(false);

import UserIcon from "@/public/images/icons/user.svg?raw";
import BasketIcon from "@/public/images/icons/basket.svg?raw";
import ShoppingCardIcon from "@/public/images/icons/shop.svg?raw";
import JoystickIcon from "@/public/images/icons/joystick.svg?raw";
import HeartIcon from "@/public/images/icons/heart.svg?raw";
import LocationIcon from "@/public/images/icons/location.svg?raw";
import NotificationIcon from "@/public/images/icons/notification.svg?raw";
import DiscountCode from "@/public/images/icons/discount.svg?raw";
import SignOutIcon from "@/public/images/icons/signout.svg?raw";

const authStore = useAuthStore();

const icons = [
  { key: "UserInformation", name: "اطلاعات کاربری", icon: UserIcon },
  { key: "UserPasswordReset", name: "تغییر رمز عبور", icon: UserIcon },
  { key: "PurchaseHistory", name: "تاریخچه خرید", icon: BasketIcon },
  {
    key: "GameServiceHistory",
    name: "تاریخچه خدمات بازی",
    icon: ShoppingCardIcon,
  },
  { key: "RepairHistory", name: "تاریخچه تعمیرات", icon: JoystickIcon },
  { key: "Favourite", name: "محصولات مورد علاقه", icon: HeartIcon },
  { key: "Location", name: "آدرس ها", icon: LocationIcon },
  { key: "Notification", name: "اعلانات", icon: NotificationIcon },
  { key: "Discount", name: "کد تخفیف", icon: DiscountCode },
  {
    key: "",
    name: "خروج از حساب کاربری",
    icon: SignOutIcon,
    action: () => {
      authStore.setToken("");
      authStore.setUser({} as any);
      navigateTo({
        name: "auth-login",
      });
    },
  },
];

const initialTab = "UserInformation";

const userTab = ref(initialTab);

watch(userTab, () => (mobileTabDialog.value = !mobileTabDialog.value));

useSeoMeta({
  title: "Cheats  - profile page",
  ogTitle: "Cheats  - profile page",
  description: "پروفایل کاربری",
  ogDescription: "پروفایل کاربری",
});

const globalStore = useGlobalStore();

globalStore.setCurrentTextName([
  {
    label: "پروفایل کاربری",
    to: "",
  },
]);
</script>
