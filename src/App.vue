<template>
  <Header @set-main-currency="setMainCurrency" :main-currency="mainCurrency" />
  <RouterView />
</template>

<script setup lang="ts">
import { ComputedRef, onMounted } from "vue";
import Header from "./components/Header.vue";
import { useCurrencyStore } from "./stores/currencyStore";
import { CurrencyEnum } from "./types";
import { computed } from "vue";

const currencyStore = useCurrencyStore();

const mainCurrency: ComputedRef<CurrencyEnum> = computed(() => {
  return currencyStore.mainCurrency;
});

onMounted(() => {
  currencyStore.getMainCurrency();
  currencyStore.fetchCurrency();
});

const setMainCurrency = (val: CurrencyEnum) => {
  currencyStore.setMainCurrency(val);
};
</script>
