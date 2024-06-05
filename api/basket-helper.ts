import {
  apiShopAddToCartCreate,
  apiShopUdpateCartItemDestroy,
  apiShopUdpateCartItemUpdate,
  apiUserAddFavoriteProductCreate,
  type CartItemListOutPut,
  type ProductDetailOutPut,
  type ProudctOutPut,
} from "@/api";

const toast = useToast();

export function shareProduct(data: ProductDetailOutPut) {
  if (navigator && Object.keys(navigator).includes("share")) {
    navigator.share({
      url: window.location.href,
      text: data.slug,
      title: `Cheats Product ${data.title}`,
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    toast.success("آدرس محصول در کلیپ بورد شما ذخیره شد");
  }
}

export function addToFavourite(data: ProductDetailOutPut) {
  apiUserAddFavoriteProductCreate({
    product: data.id,
  }).then((res) => {
    if (!res) return;
    toast.success("محصول شما به لیست علاقه مندی ها اضافه شد");
  });
}

export function addProductToCard(
  data: ProductDetailOutPut,
  oldSelectedAttachments: string[]
) {
  const selectedAttachments = oldSelectedAttachments.filter((el) => el);

  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    toast.error("لطفا اول وارد حساب کاربری خود شوید");
    navigateTo({
      name: "auth-login",
    });
    return;
  }
  const dataToSend = {
    attachment: [...selectedAttachments].map((el) => ({
      // it takes a number but id might actually start with 0 somehow , sooooo
      attachment: el as unknown as number,
    })),
    product: data.id,
    quantity: 1,
  };

  apiShopAddToCartCreate(dataToSend).then((res) => {
    if (!res) return;
    toast.success("محصول با موفقیت به سبد خرید اضافه شد");
    refreshNuxtData("card-items");
  });
}

export function removeItemFromCart(item: ProductDetailOutPut) {
  apiShopUdpateCartItemDestroy(item.id).then((res: any) => {
    if (!res) return;
    toast.success("محصول از سبد خرید حذف شد");
    refreshNuxtData("card-items");
  });
}

export function doesItemExistInCart(
  cardItems: CartItemListOutPut[],
  item: ProductDetailOutPut
): boolean | ProductDetailOutPut | undefined {
  if (!cardItems || cardItems.length === 0) return false;
  return cardItems.find(
    (el) => el.product.id === item.id
  ) as unknown as ProductDetailOutPut;
}

export function updateQuantityOfCartItem(
  item: ProductDetailOutPut,
  operation: "ADD" | "DELETE",
  id: number,
  addedQuantity: number = operation === "ADD" ? 1 : -1
) {
  // Just Remove It If It's Gonna Be Less Than 0
  if (item.quantity === 1 && operation === "DELETE") {
    removeItemFromCart(item);
    return;
  }
  //
  const newQuantity = addedQuantity + item.quantity;
  apiShopUdpateCartItemUpdate(id, {
    quantity: newQuantity,
  }).then((res) => {
    if (!res) return;
    item.quantity = newQuantity;
  });
}
export function calculatePercentageOffPrice(product: ProudctOutPut) {
  const discountAmount =
    parseInt(product?.off_price || product.price) / parseInt(product.price);

  const actualDiscountAmount = Math.floor((1 - discountAmount) * 100);
  return actualDiscountAmount;
}

const IranDollar = new Intl.NumberFormat("fa-Fa", {
  currency: "IRR",
});

export function formatPrice(price: number | string) {
  return IranDollar.format(Number(price));
}
