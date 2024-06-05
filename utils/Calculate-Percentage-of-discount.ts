import type { ProudctOutPut } from "@/api";

export function calculatePercentageOffPrice(product: ProudctOutPut) {
  const discountAmount =
    parseInt(product?.off_price || product.price) / parseInt(product.price);

  const actualDiscountAmount = Math.round((1 - discountAmount) * 100);
  return actualDiscountAmount;
}
