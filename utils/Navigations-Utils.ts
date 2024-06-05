import type { CategoryOutPut, GameListCusotmerOutPut, UserOutPut } from "@/api";
import { CategoryTypes } from "@/types";

export function navigateToProfileOnlyIfUserIsLoggedIn() {
  const store = useAuthStore();

  if (store.isAuthenticated) {
    navigateTo({ name: "Profile" });
  } else {
    navigateTo({
      name: "auth-login",
    });
  }
}
export function navigateCategoryFN(
  route: CategoryOutPut,
  emit: (event: "redirect", ...args: any[]) => void
) {
  if (!route.category_type) return null;

  if (route.category_type === CategoryTypes.PRODUCT) {
    emit("redirect");
    navigateTo({
      name: "Products",
      query: {
        category_id: route.id,
      },
    });
  } else if (+route.category_type === CategoryTypes.GAME) {
    emit("redirect");
    navigateTo({
      name: "Products-Games",
      query: {
        category_id: route.id,
      },
    });
  } else if (+route.category_type === CategoryTypes.GIFTCART) {
    emit("redirect");
    navigateTo({
      name: "Products-GiftCart",
      query: {
        category_id: route.id,
      },
    });
  }
}

export function navigateToProperBasketPage() {
  const store = useAuthStore();
  if (store.isAuthenticated) {
    navigateTo({ name: "Basket" });
  } else navigateTo({ name: "auth-login" });
}

export function navigateToProperProductPage(id: number) {
  const store = useAuthStore();
  if (store.isAuthenticated) {
    navigateTo({ name: "Products-id", params: { id } });
  } else navigateTo({ name: "auth-login" });
}

export function navigateToProperPage(page: {
  query?: Record<string, any>;
  params?: Record<string, any>;
  name: string;
}) {
  const store = useAuthStore();
  if (store.isAuthenticated) {
    navigateTo(page);
  } else navigateTo({ name: "auth-login" });
}

export function gotoBasketDateSelect({ id, is_game }: GameListCusotmerOutPut) {
  navigateTo({
    name: "BasketDateSelect",
    query: {
      id,
      is_game: `${is_game}`,
    },
  });
}
