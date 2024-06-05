import type { ProductDetailOutPut, ProudctOutPut } from '@/api'
import { ProductTypes } from '@/types'

export function gotoProductDetailPage (data: ProudctOutPut) {
  if (data.product_type === ProductTypes.PACKAGE) {
    navigateTo({
      name: 'Products-Package-id',
      params: {
        id: data.slug
      }
    })
  } else {
    navigateTo({
      name: 'Products-id',
      params: {
        id: data.slug
      }
    })
  }
}
