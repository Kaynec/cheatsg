<template>
  <div class="grid gap-4">
    <UserPurchaseCard
      submition-date="1402/08/23"
      :price="1_850_000"
      transaction-code="1500 6579 15"
      currentStatusDate="1402/09/16"
      purchaseStatus="Returned"
      v-for="i in 4"
    />
  </div>
</template>
